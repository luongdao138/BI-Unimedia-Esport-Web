import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Icon } from '@material-ui/core'
import RoomListItem from '@components/Chat/RoomListItem'
import List from '@material-ui/core/List'
import { ChatDataType } from '@components/Chat/types/chat.types'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Colors } from '@theme/colors'
import { ESRoutes } from '@constants/route.constants'

interface ChatSideBarProps {
  expand: boolean
  toggleChatBar: (state: boolean) => void
}

const ChatListExample: ChatDataType[] = [
  {
    unseenCount: 0,
    chatRoomId: '123',
    lastMsgAt: 1620109342592,
    roomName: 'Name of the room Long Name Long',
    lastMsg: 'asdasdsad',
    roomImg:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BNTk2OGU4NzktODhhOC00Nzc2LWIyNzYtOWViMjljZGFiNTMxXkEyXkFqcGdeQXVyMTE1NTQwOTk@._V1_UY256_CR12,0,172,256_AL_.jpg',
    sortKey: '123123',
    createdAt: 1620794831,
    groupType: 1,
    isAdmin: false,
  },
  {
    unseenCount: 100,
    chatRoomId: '123',
    lastMsgAt: 1620109342592,
    roomName: 'sadsadsad',
    lastMsg: 'asdasdsad',
    roomImg:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BNTk2OGU4NzktODhhOC00Nzc2LWIyNzYtOWViMjljZGFiNTMxXkEyXkFqcGdeQXVyMTE1NTQwOTk@._V1_UY256_CR12,0,172,256_AL_.jpg',
    sortKey: '123123',
    createdAt: 1620794831,
    groupType: 1,
    isAdmin: false,
  },
  {
    unseenCount: 4,
    chatRoomId: '123',
    lastMsgAt: 1620109342592,
    roomName: 'Name of the room',
    lastMsg: 'asdasdsad',
    roomImg: 'https://uifaces.co/our-content/donated/DUhuoeI8.jpg',
    sortKey: '123123',
    createdAt: 1620794831,
    groupType: 1,
    isAdmin: false,
  },
]

const ChatSideBar: React.FC<ChatSideBarProps> = ({ toggleChatBar, expand }) => {
  const classes = useStyles(expand)
  const { t } = useTranslation(['common'])
  const router = useRouter()

  const navigateRoom = (id: string) => {
    router.push(`${ESRoutes.MESSAGE}${id}`, undefined, { shallow: true })
  }

  return (
    <Box className={`${classes.sidebarCont} ${expand ? 'expanded-sidebar' : ''}`}>
      <IconButton onClick={() => toggleChatBar(!expand)} className={classes.arrowBtn} disableRipple>
        <span className={classes.arrow}></span>
      </IconButton>
      <Box className={classes.content}>
        <Box className={classes.header} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography className={classes.headerTitle} variant={'body1'}>
            {t('common:chat.title')}
          </Typography>
          <Icon className={`fas fa-inbox ${classes.headerIcon}`} />
        </Box>
        <Box className={classes.inner}>
          <List>
            {ChatListExample.map((item, index) => (
              <RoomListItem onClick={navigateRoom} expand={expand} item={item} key={index} />
            ))}
          </List>
        </Box>
      </Box>
      <div className="back-drop"></div>
    </Box>
  )
}

const useStyles = makeStyles({
  sidebarCont: {
    width: (expand) => (expand ? 260 : 90),
    height: '100%',
    willChange: 'width',
    display: 'block',
    position: 'fixed',
    transform: (expand) => (expand ? 'translateX(calc(-170px))' : 'translateX(calc(0px))'),
    transition: 'all 0.1s ease',
    borderLeft: '1px solid #70707070',
    top: 61,
    bottom: 0,
  },
  arrow: {
    display: 'inline-block',
    position: 'absolute',
    width: 8,
    height: 8,
    background: 'transparent',
    borderTop: '1px solid #bfbfbf',
    borderLeft: '1px solid #bfbfbf',
    transition: 'none',
    color: 'transparent',
    transform: (expand) => (expand ? 'rotate(135deg)' : 'rotate(-45deg)'),
    left: (expand) => (expand ? '4px' : '7px'),
  },
  arrowBtn: {
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid #ffffff30',
    borderRight: 'none',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 50,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    position: 'absolute',
    left: -20,
    zIndex: 100,
    padding: 0,
    top: 40,
    '&:hover': {
      background: 'rgba(0,0,0,0.5)',
    },
  },

  content: {},
  inner: {},
  header: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  headerTitle: {
    color: Colors.white,
    display: (expand) => (expand ? 'flex' : 'none'),
  },
  headerIcon: {
    color: Colors.white,
    fontSize: (expand) => (expand ? '14px' : '18px'),
    paddingLeft: (expand) => (expand ? '0' : '14px'),
  },
})
export default ChatSideBar
