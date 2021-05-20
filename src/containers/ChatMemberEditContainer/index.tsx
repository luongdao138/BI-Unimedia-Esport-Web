import Box from '@material-ui/core/Box'
import { List, makeStyles } from '@material-ui/core'
import { socketActions } from '@store/socket/actions'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getRoomMembers } from '@store/socket/selectors'
import { currentUserId } from '@store/auth/selectors'
import React, { useEffect } from 'react'
import RoomMemberItem from '@components/Chat/RoomMemberItem/index'

interface ChatRoomContainerProps {
  roomId: string | string[]
}

const ChatMemberEditContainer: React.FC<ChatRoomContainerProps> = ({ roomId }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const roomMembers = useAppSelector(getRoomMembers)
  const userId = useAppSelector(currentUserId)
  useEffect(() => {
    if (userId && roomId) {
      dispatch(
        socketActions.socketSend({
          action: 'GET_ROOM_MEMBERS',
          userId: userId,
          roomId: roomId,
        })
      )
    }
  }, [userId, roomId])

  return (
    <Box className={classes.room}>
      <List>
        {roomMembers.map((val) => (
          <RoomMemberItem key={val.userId} name={val.nickName} />
        ))}
      </List>
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
  },
  input: {
    padding: 9,
    position: 'relative',
    flexGrow: 1,
    width: '100%',
  },
}))

export default ChatMemberEditContainer
