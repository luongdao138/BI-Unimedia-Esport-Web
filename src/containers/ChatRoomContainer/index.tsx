import { useEffect } from 'react'
import { makeStyles, Box, Typography } from '@material-ui/core'
import MessageInputArea from '@components/Chat/MessageInputArea'
import { socketActions } from '@store/socket/actions'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { currentUserId } from '@store/auth/selectors'
import { messages } from '@store/socket/selectors'
import { ChatSuggestionList } from '@components/Chat/types/chat.types'
import { CHAT_ACTION_TYPE, CHAT_MESSAGE_TYPE } from '@constants/socket.constants'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
import moment from 'moment'

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

  const dispatch = useAppDispatch()

  const userId = useAppSelector(currentUserId)
  const data = useAppSelector(messages)

  useEffect(() => {
    if (userId && roomId) {
      const payload = {
        action: CHAT_ACTION_TYPE.GET_ROOM_MESSAGES,
        roomId: roomId,
        userId: userId,
        lastKey: null,
      }
      dispatch(socketActions.socketSend(payload))
    }
  }, [userId, roomId])

  const handlePress = (text: string) => {
    const currentTimestamp = moment().valueOf()
    const clientId = uuidv4()
    const payload = {
      action: CHAT_ACTION_TYPE.SEND_MESSAGE,
      roomId: roomId,
      createdAt: currentTimestamp,
      userId: userId,
      msg: text,
      clientId: clientId,
      type: CHAT_MESSAGE_TYPE.TEXT,
    }
    dispatch(socketActions.sendMessage(payload))
  }

  return (
    <Box className={classes.room}>
      <Box className={classes.list}>
        <Box className={classes.header}>{roomId}</Box>
        {!_.isEmpty(data) &&
          _.isArray(data) &&
          data.map((value, index) => {
            return (
              <Box
                style={{ padding: 10, marginBottom: 5, maxWidth: 'auto', background: value.sent ? '#555' : '#212121', display: 'block' }}
                key={index}
              >
                <Typography color="textSecondary" noWrap={false} variant="body2">
                  {value.msg}
                </Typography>
              </Box>
            )
          })}
      </Box>
      <Box className={classes.input}>
        <MessageInputArea onPressSend={handlePress} users={users} />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  header: {
    padding: 24,
  },
  room: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: '#000',
  },
  list: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    minHeight: '1.25em',
    position: 'relative',
    padding: 20,
  },
  input: {
    padding: 9,
    position: 'relative',
    flexGrow: 1,
    width: '100%',
    background: '#101010',
  },
}))

export default ChatRoomContainer
