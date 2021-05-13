import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import RoomListItem from '@components/Chat/RoomListItem'
import List from '@material-ui/core/List'
import { ChatDataType } from '@components/Chat/types/chat.types'

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
  return (
    <Box className={`${classes.sidebarCont} ${expand ? 'expanded-sidebar' : ''}`}>
      <IconButton onClick={() => toggleChatBar(!expand)} className={classes.arrowBtn} disableRipple>
        <span className={classes.arrow}></span>
      </IconButton>
      <Box className={classes.content}>
        <Box className={classes.header}></Box>
        <Box className={classes.inner}>
          <List>
            {ChatListExample.map((item, index) => (
              <RoomListItem expand={expand} item={item} key={index} />
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
    transform: (expand) => (expand ? 'rotate(-45deg)' : 'rotate(135deg)'),
    left: (expand) => (expand ? '7px' : '4px'),
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
  header: {},
})
export default ChatSideBar
