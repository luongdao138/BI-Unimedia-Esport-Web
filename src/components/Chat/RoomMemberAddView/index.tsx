import React, { useState, useEffect } from 'react'
import { Box, makeStyles, DialogContent, Typography, Theme, IconButton, Badge, Icon, Container, useTheme } from '@material-ui/core'
import ESDialog from '@components/Dialog'
import ESInput from '@components/Input'
import Avatar from '@components/Avatar'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'
import MemberItem from './MemberItem'
import { CHAT_MEMBER_STATUS } from '@constants/socket.constants'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import useMemberAdd from './useMemberAdd'
import _ from 'lodash'
import ESLoader from '@components/Loader'
import i18n from '@locales/i18n'
import { useRect } from '@utils/hooks/useRect'
import ESSlider from '@components/Slider'
import useMediaQuery from '@material-ui/core/useMediaQuery'

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
}
const contentRef = React.createRef<HTMLDivElement>()

const RoomMemberAddView: React.FC<RoomMemberAddViewProps> = ({ roomId, open, hide }) => {
  const [memberList, setMemberList] = useState([] as ShortMember[]) // friends in search list
  const [selectedList, setSelectedList] = useState([] as ShortMember[]) // friends who are going to enter the room
  const theme = useTheme()
  const { roomMembers, resetMeta, friends, getFriends, currentUserId, meta, socketSend, cleanFriendsData } = useMemberAdd()
  const [keyword, setKeyword] = useState('')
  const [bottomGap, setBottomGap] = useState<number>(0)
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const height = matches ? bottomGap + 100 : bottomGap + 68
  const classes = useStyles()
  const userId = currentUserId
  const contentRect = useRect(contentRef)

  useEffect(() => {
    if (userId && open) {
      setSelectedList([])
      setMemberList([])
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
        }))
      )
    }
  }

  const onSearch = () => {
    cleanFriendsData()
    getFriends({ type: 'group', keyword: keyword })
  }

  const handleChange = (event) => {
    setKeyword(event.target.value)
  }

  const onSubmit = () => {
    socketSend({
      action: CHAT_ACTION_TYPE.ADD_MEMBERS,
      roomId: roomId,
      userIds: selectedList.map((item) => item.id),
    })
    hide()
  }

  const onAdd = (data: ShortMember) => {
    setSelectedList((state) => [...state, data])
  }

  const removeFromList = (id: number) => {
    setSelectedList(
      _.filter(selectedList, function (s) {
        return s.id != id
      })
    )
  }

  const onClosing = () => {
    hide()
    resetMeta()
    cleanFriendsData()
  }

  const renderLoader = () => {
    if (friends === undefined && !meta.loaded && meta.pending && !meta.error) {
      return (
        <Box height={'100%'} width={'100%'} display="flex" justifyContent="center" alignItems="center">
          <Box className={classes.loaderBox}>
            <ESLoader />
          </Box>
        </Box>
      )
    }
    return null
  }

  const renderFooter = () => (
    <div className={classes.stickyFooter} ref={contentRef}>
      <Box className={classes.bottomSection}>
        <Container maxWidth="md" className={classes.horizantalScroller}>
          <Box className={classes.selectedAvatars}>
            <ESSlider
              containerClass={classes.slider}
              slidesPerView={'auto'}
              navigation={false}
              items={selectedList.map((member, index) => (
                <Box className={classes.item} key={index}>
                  <Badge
                    className={classes.user}
                    key={index}
                    overlap="circle"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    badgeContent={
                      <>
                        <IconButton onClick={() => removeFromList(member.id)} disableRipple className={classes.closeBtn}>
                          <Icon className={`fa fa-times ${classes.closeIcon}`} />
                        </IconButton>
                      </>
                    }
                  >
                    <Avatar key={member.id} src={member.profile} alt={member.nickName} />
                  </Badge>
                  <Box className={classes.nameHolder}>
                    <Typography variant="body2" noWrap={true}>
                      {member.nickName}
                    </Typography>
                  </Box>
                </Box>
              ))}
            />
          </Box>
        </Container>
      </Box>
      <Box maxWidth={280} className={classes.buttonBottom}>
        <ButtonPrimary type="submit" disabled={_.isEmpty(selectedList)} round fullWidth onClick={onSubmit}>
          {i18n.t('common:chat.add_submit')}
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
        <DialogContent className={classes.dialogContentWrap} style={{ height: `calc(100vh - ${height}px)` }}>
          <Box className={classes.inputHolder}>
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
          {renderLoader()}
          {open ? (
            <div id="scrollableDiv" className={`${classes.scroll} ${classes.list}`}>
              {_.filter(
                memberList,
                ({ id }) =>
                  !_.includes(
                    selectedList.map(({ id }) => id),
                    id
                  )
              ).map((member) => (
                <MemberItem key={member.id} item={member} onAdd={onAdd} />
              ))}
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
  dialogContentWrap: {
    padding: 0,
    position: 'relative',
    paddingTop: '100px',
    overflow: 'hidden',
  },
  inputHolder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    flexDirection: 'column',
    paddingBottom: 30,
  },
  item: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  nameHolder: {
    width: '100%',
    textAlign: 'center',
  },
  slider: {
    marginTop: 0,
    '& .swiper-container': {
      padding: '0 !important',
    },
  },
  container: {},
  disableScroll: {},
  horizantalScroller: {
    width: '100%',
    padding: 0,
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
    height: '100%',
    paddingBottom: 30,
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
    width: '100%',
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
  [theme.breakpoints.down('sm')]: {
    dialogContentWrap: {
      padding: '0px 16px',
      paddingTop: '100px !important',
    },
    inputHolder: {
      padding: '0 16px',
    },
    buttonBottom: {
      margin: 'auto',
      width: theme.spacing(35),
      minWidth: theme.spacing(18),
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
    },
  },
}))

export default RoomMemberAddView
