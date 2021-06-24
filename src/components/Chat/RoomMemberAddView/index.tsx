import React, { useState, useEffect } from 'react'
import { Box, makeStyles, DialogContent, Typography, Theme, IconButton, Badge, Icon, Container } from '@material-ui/core'
import ESDialog from '@components/Dialog'
import ESInput from '@components/Input'
import Avatar from '@components/Avatar'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import MemberItem from './MemberItem'
import { CHAT_MEMBER_STATUS } from '@constants/socket.constants'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import useMemberAdd from './useMemberAdd'
import InfiniteScroll from 'react-infinite-scroll-component'
import _ from 'lodash'
import ESLoader from '@components/Loader'
import i18n from '@locales/i18n'
import { useRect } from '@utils/hooks/useRect'

export interface RoomMemberAddViewProps {
  roomId: string
  open: boolean
  hide: () => void
}

export interface ShortMember {
  id: number
  nickName: string
  userCode: string
  profile: string
  isSelected: boolean
  isAdded: boolean
}
const contentRef = React.createRef<HTMLDivElement>()
const layoutConsts = {
  paperMargin: 32,
  title: 70,
  input: 107,
  bottomSpacing: 34,
}

const RoomMemberAddView: React.FC<RoomMemberAddViewProps> = ({ roomId, open, hide }) => {
  const classes = useStyles()
  const [memberList, setMemberList] = useState([] as ShortMember[]) // friends in search list
  const [selectedList, setSelectedList] = useState([] as ShortMember[]) // friends who are going to enter the room

  const { roomMembers, resetMeta, friends, getFriends, page, currentUserId, meta, socketSend, cleanFriendsData } = useMemberAdd()
  const [hasMore, setHasMore] = useState(true)
  const [keyword, setKeyword] = useState('')
  const [bottomGap, setBottomGap] = useState<number>(0)

  const userId = currentUserId
  const contentRect = useRect(contentRef)

  const listHeight = layoutConsts.paperMargin + layoutConsts.input + layoutConsts.title + layoutConsts.bottomSpacing + bottomGap

  useEffect(() => {
    if (userId && open) {
      setSelectedList([])
      setMemberList([])
      getFriends({ type: 'group', keyword: '', page: 1 })
    }
  }, [userId, open])

  useEffect(() => {
    setBottomGap(contentRect?.height)
  }, [contentRect?.height])

  useEffect(() => {
    if (_.isArray(friends)) {
      filterItems()
    }
  }, [friends])

  const filterItems = () => {
    if (_.isArray(friends) && _.isArray(roomMembers)) {
      const filtered = friends.map((item) => ({
        id: parseInt(item.id),
        nickName: item.attributes.nickname,
        userCode: item.attributes.user_code,
        profile: item.attributes.avatar,
        isSelected: !!selectedList.find((selected) => `${selected.id}` === `${item.id}`),
        isAdded: checkIsAdded(item.id),
      }))
      setMemberList(filtered)
    }
  }

  const checkIsAdded = (id: string) => {
    const exist = roomMembers.find((c) => c.id === id)
    if (exist && id === exist.id) {
      if (exist.memberStatus === CHAT_MEMBER_STATUS.INACTIVE) {
        return false
      } else {
        return true
      }
    }
    return false
  }

  const onSearch = () => {
    cleanFriendsData()
    getFriends({ type: 'group', keyword: keyword, page: 1 })
  }

  const handleChange = (event) => {
    setKeyword(event.target.value)
  }

  const onSubmit = () => {
    socketSend({
      action: CHAT_ACTION_TYPE.ADD_MEMBERS,
      roomId: roomId,
      userId: userId,
      userIds: selectedList.map((item) => item.id),
    })
    hide()
  }

  const onItemToggle = (id: number) => {
    const newList = [...memberList]
    const index = newList.findIndex((item) => item.id === id)
    if (index < 0) return
    const chosenItem = newList[index]
    chosenItem.isSelected = true
    setMemberList(newList)
    const newSelectedList = [...selectedList]
    const selectedIndex = newSelectedList.findIndex((item) => `${item.id}` === `${chosenItem.id}`)
    if (selectedIndex < 0) {
      newSelectedList.push({ ...chosenItem })
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

  const fetchMoreData = () => {
    if (page.current_page >= page.total_pages) {
      setHasMore(false)
      return
    }
    getFriends({ page: page.current_page + 1, keyword: keyword, type: 'group' })
  }

  const onClosing = () => {
    hide()
    resetMeta()
    cleanFriendsData()
    setHasMore(true)
  }

  const renderFooter = () => (
    <div className={classes.stickyFooter} ref={contentRef}>
      <Box className={classes.bottomSection}>
        <Container maxWidth="md" className={classes.horizantalScroller}>
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
        </Container>
      </Box>
      <Box maxWidth={280} className={classes.buttonBottom}>
        <ButtonPrimary type="submit" disabled={_.isEmpty(selectedList)} round fullWidth onClick={onSubmit}>
          変更する
        </ButtonPrimary>
      </Box>
    </div>
  )

  return (
    <Box className={classes.container}>
      <ESDialog
        open={open}
        title={i18n.t('common:chat.member_add_title')}
        handleClose={() => onClosing()}
        bkColor="rgba(0,0,0,0.8)"
        alignTop
      >
        <DialogContent style={{ padding: 0 }}>
          <Box pt={6}>
            <ESInput
              placeholder={i18n.t('common:chat.member_add_placeholder')}
              value={keyword}
              fullWidth
              onChange={handleChange}
              endAdornment={
                <>
                  {
                    <IconButton onClick={onSearch}>
                      <Icon className={`fa fa-search ${classes.icon}`}></Icon>
                    </IconButton>
                  }
                </>
              }
            />
            <Typography> 指定できるのは相互フォローユーザーのみです</Typography>
          </Box>
          {meta.loaded && _.isEmpty(memberList) && (
            <div className={classes.loaderCenter}>
              <Typography>{i18n.t('common:common.no_data')}</Typography>
            </div>
          )}
          {open ? (
            <div id="scrollableDiv" className={`${classes.scroll} ${classes.list}`} style={{ height: `calc(100vh - ${listHeight}px)` }}>
              <InfiniteScroll
                dataLength={memberList && memberList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                scrollableTarget="scrollableDiv"
                scrollThreshold={0.99}
                style={{ overflow: 'hidden' }}
                loader={
                  meta.pending && (
                    <div className={classes.loaderCenter}>
                      <ESLoader />
                    </div>
                  )
                }
              >
                {memberList.map((member) => (
                  <MemberItem key={member.id} item={member} onChange={onItemToggle} />
                ))}
              </InfiniteScroll>
            </div>
          ) : null}

          {renderFooter()}
        </DialogContent>
      </ESDialog>
    </Box>
  )
}

RoomMemberAddView.defaultProps = {}

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  disableScroll: {},
  horizantalScroller: {
    paddingBottom: 10,
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      height: 5,
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
  user: {
    marginRight: 5,
    marginLeft: 5,
    marginTop: 20,
    '&:first-child': {
      marginLeft: 0,
    },
  },
  nameInfoMsg: {
    textAlign: 'center',
  },
  loaderCenter: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
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
  icon: {
    fontSize: 14,
  },
  list: {
    overflow: 'auto',
    overflowX: 'hidden',
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
    height: 'auto',
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
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
  },
  [theme.breakpoints.down('md')]: {},
}))

export default RoomMemberAddView
