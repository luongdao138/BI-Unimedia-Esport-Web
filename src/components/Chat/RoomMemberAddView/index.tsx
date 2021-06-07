import React, { useState, useEffect, useCallback } from 'react'
import { Box, makeStyles, DialogContent, Typography, Theme, List, CircularProgress, Badge, IconButton, Icon } from '@material-ui/core'
import ESDialog from '@components/Dialog'
import ESInput from '@components/Input'
import Avatar from '@components/Avatar'
import ButtonPrimary from '@components/ButtonPrimary'
import { createMetaSelector } from '@store/metadata/selectors'
import { Colors } from '@theme/colors'
import MemberItem from './MemberItem'
import { CHAT_MEMBER_STATUS } from '@constants/socket.constants'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import { socketActions } from '@store/socket/actions'
import { getFriendList } from '@store/chat/actions'
import { friendList } from '@store/chat/selectors'
import { members } from '@store/socket/selectors'
import { currentUserId } from '@store/auth/selectors'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import _ from 'lodash'

export interface RoomMemberAddViewProps {
  roomId: string
  open: boolean
  hide: () => void
}

interface ShortMember {
  id: number
  nickName: string
  userCode: string
  profile: string
  isSelected: boolean
}

const _getFriendsMeta = createMetaSelector(getFriendList)

const RoomMemberAddView: React.FC<RoomMemberAddViewProps> = ({ roomId, open, hide }) => {
  const classes = useStyles()
  const [newName, setNewName] = useState('')
  const [memberList, setMemberList] = useState([] as ShortMember[]) // friends in search list
  const [selectedList, setSelectedList] = useState([] as ShortMember[]) // friends who are going to enter the room

  const dispatch = useAppDispatch()
  const userId = useAppSelector(currentUserId)
  const friends = useAppSelector(friendList) // friends who can enter the room
  const roomMembers = useAppSelector(members) // members who are already in room
  const getFriendsMeta = useAppSelector(_getFriendsMeta)

  const isNoSelected = selectedList.length == 0

  useEffect(() => {
    if (userId && open) {
      setSelectedList([])
      setMemberList([])
      dispatch(getFriendList({ type: 'group', keyword: '' }))
    }
  }, [userId, open])

  useEffect(() => {
    if (_.isArray(friends)) {
      filterItems()
    }
  }, [friends])

  const filterItems = () => {
    if (_.isArray(friends) && _.isArray(roomMembers)) {
      const filtered = _.filter(friends, (friend) => {
        const member = roomMembers.find((member) => `${member.id}` === `${friend.id}`)
        if (!member) return true
        return member.memberStatus === CHAT_MEMBER_STATUS.INACTIVE
      })
      setMemberList(
        filtered.map((item) => ({
          id: parseInt(item.id),
          nickName: item.attributes.nickname,
          userCode: item.attributes.user_code,
          profile: item.attributes.avatar,
          isSelected: !!selectedList.find((selected) => `${selected.id}` === `${item.id}`),
        }))
      )
    }
  }

  const searchInput = (keyword: string) => {
    dispatch(getFriendList({ type: 'group', keyword: keyword }))
  }

  const inputDebounce = useCallback(
    _.debounce((keyword: string) => {
      searchInput(keyword)
    }, 500),
    []
  )
  const handleChange = (event) => {
    setNewName(event.target.value)
    inputDebounce(event.target.value)
  }

  const renderFooter = () => <Box className={classes.stickyFooter} style={{ height: isNoSelected ? 162 : 249 }}></Box>

  const onSubmit = () => {
    dispatch(
      socketActions.socketSend({
        action: CHAT_ACTION_TYPE.ADD_MEMBERS,
        roomId: roomId,
        userId: userId,
        userIds: selectedList.map((item) => item.id),
      })
    )
    hide()
  }

  const onItemToggle = (id: number) => {
    const newList = [...memberList]
    const index = newList.findIndex((item) => item.id === id)
    if (index < 0) return
    const chosenItem = newList[index]
    chosenItem.isSelected = !chosenItem.isSelected
    setMemberList(newList)
    const newSelectedList = [...selectedList]
    const selectedIndex = newSelectedList.findIndex((item) => `${item.id}` === `${chosenItem.id}`)
    if (selectedIndex < 0) {
      newSelectedList.push({ ...chosenItem })
    } else {
      newSelectedList.splice(selectedIndex, 1)
    }

    setSelectedList(newSelectedList)
  }

  const removeFromList = (id: number) => {
    const deletedArray = _.filter(selectedList, function (n) {
      return n.id !== Number(id)
    })
    setSelectedList(deletedArray)
    const unselectedArray = _.map(memberList, function (n) {
      if (n.id === Number(id)) {
        return { ...n, isSelected: false }
      } else return n
    })
    setMemberList(unselectedArray)
  }

  return (
    <Box className={classes.container}>
      <ESDialog
        open={open}
        title="メンバーを追加"
        handleClose={() => hide()}
        bkColor="rgba(0,0,0,0.8)"
        alignTop
        fixedFooter={renderFooter()}
      >
        <DialogContent>
          <Box mt={8}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
              }}
            >
              <ESInput
                placeholder=""
                value={newName}
                fullWidth
                onChange={handleChange}
                endAdornment={<>{getFriendsMeta.pending ? <CircularProgress color="inherit" size={20} /> : null}</>}
              />
              <Typography> 指定できるのは相互フォローユーザーのみです</Typography>
            </form>
          </Box>
          <Box className={`${isNoSelected ? classes.list : classes.listShrink} ${classes.scroll}`}>
            <List>
              {memberList.map((member) => (
                <MemberItem
                  id={member.id}
                  key={member.id}
                  profile={member.profile}
                  nickName={member.nickName}
                  userCode={`@${member.userCode}`}
                  check={member.isSelected}
                  onChange={onItemToggle}
                />
              ))}
            </List>
          </Box>
          <Box className={classes.bottomSection} mt={4.25}>
            <Box className={classes.selectedAvatars}>
              {selectedList.map((member, index) => (
                <Badge
                  className={classes.user}
                  key={index}
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  badgeContent={
                    <IconButton onClick={() => removeFromList(member.id)} disableRipple className={classes.closeBtn}>
                      <Icon className={`fa fa-times ${classes.closeIcon}`} />
                    </IconButton>
                  }
                >
                  <Avatar key={member.id} src={member.profile} alt={member.nickName} />
                </Badge>
              ))}
            </Box>
            <Box maxWidth={280} className={classes.buttonBottom}>
              <ButtonPrimary type="submit" round fullWidth onClick={onSubmit}>
                変更する
              </ButtonPrimary>
            </Box>
          </Box>
        </DialogContent>
      </ESDialog>
    </Box>
  )
}

RoomMemberAddView.defaultProps = {}

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  user: {
    marginRight: 5,
    marginLeft: 5,
    '&:first-child': {
      marginLeft: 0,
    },
  },
  nameInfoMsg: {
    textAlign: 'center',
  },
  closeBtn: {
    background: 'rgba(77,77,77, 0.8)',
    padding: 8,
    '&:hover': {
      background: 'rgba(77,77,77, 0.8)',
    },
  },
  closeIcon: {
    fontSize: 12,
  },
  list: {
    overflow: 'auto',
    overflowX: 'hidden',
    height: 'calc(100vh - 408px)',
  },
  listShrink: {
    overflow: 'auto',
    overflowX: 'hidden',
    height: 'calc(100vh - 501px)',
  },
  scroll: {
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      borderRadius: 6,
    },
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid`,
    borderTopColor: Colors.text['300'],
    height: 162,
  },
  selectedAvatars: {
    display: 'flex',
    flexDirection: 'row',
  },
  bottomSection: {
    // position: 'fixed',
  },
  buttonBottom: {
    margin: 'auto',
    width: theme.spacing(35),
    minWidth: theme.spacing(18),
    marginTop: theme.spacing(3),
  },
  [theme.breakpoints.down('md')]: {
    stickyFooter: {
      height: theme.spacing(10),
    },
    buttonBottom: {
      bottom: theme.spacing(5.2),
      width: theme.spacing(24),
    },
  },
}))

export default RoomMemberAddView
