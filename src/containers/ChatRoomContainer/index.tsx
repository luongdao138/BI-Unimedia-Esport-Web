import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core'
import MessageInputArea from '@components/Chat/MessageInputArea'
import { ChatSuggestionList } from '@components/Chat/types/chat.types'
interface ChatRoomContainerProps {
  roomId: string | string[]
}

const users: ChatSuggestionList[] = [
  {
    userId: 1375,
    memberType: 1,
    unseenCount: 0,
    chatRoomId: '9755f87e-3527-4914-8902-cf9d450ad796',
    sortKey: 'member_1375_room',
    memberStatus: 1,
    createdAt: 1618291535119,
    groupType: 1,
    userCode: 'Magnai',
    nickName: 'Magnai',
    profile: 'sdofij',
    display: '@Magnai',
    id: '1375',
  },
  {
    userId: 1372,
    memberType: 0,
    unseenCount: 0,
    chatRoomId: '9755f87e-3527-4914-8902-cf9d450ad796',
    sortKey: 'member_1428_room',
    memberStatus: 1,
    createdAt: 1618455294679,
    groupType: 1,
    userCode: 'Och',
    nickName: 'Och',
    profile: 'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/users/avatar/1428/1618466867-1428.jpg',
    display: '@Och',
    id: '1372',
  },
  {
    userId: 1322,
    memberType: 0,
    unseenCount: 0,
    chatRoomId: '9755f87e-3527-4914-8902-cf9d450ad796',
    sortKey: 'member_1428_room',
    memberStatus: 1,
    createdAt: 1618455294679,
    groupType: 1,
    userCode: 'Boldoo',
    nickName: 'Boldoo',
    profile: 'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/users/avatar/1428/1618466867-1428.jpg',
    display: '@Boldoo',
    id: '1322',
  },
  {
    userId: 1371,
    memberType: 0,
    unseenCount: 0,
    chatRoomId: '9755f87e-3527-4914-8902-cf9d450ad796',
    sortKey: 'member_1428_room',
    memberStatus: 1,
    createdAt: 1618455294679,
    groupType: 1,
    userCode: 'Dorjoo',
    nickName: 'Dorjoo',
    profile: 'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/users/avatar/1428/1618466867-1428.jpg',
    display: '@Dorjoo',
    id: '1371',
  },
]

const ChatRoomContainer: React.FC<ChatRoomContainerProps> = ({ roomId }) => {
  const classes = useStyles()

  return (
    <Box className={classes.room}>
      <Box className={classes.list}>{roomId}</Box>
      <Box className={classes.input}>
        <MessageInputArea users={users} />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  room: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#333',
  },
  list: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    minHeight: '1.25em',
    position: 'relative',
    backgroundColor: 'green',
  },
  input: {
    padding: 9,
    position: 'relative',
    flexGrow: 1,
    width: '100%',
  },
}))

export default ChatRoomContainer
