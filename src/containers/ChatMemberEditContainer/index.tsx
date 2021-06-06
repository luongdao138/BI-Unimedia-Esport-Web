import Box from '@material-ui/core/Box'
import { List, makeStyles } from '@material-ui/core'
import { socketActions } from '@store/socket/actions'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { members } from '@store/socket/selectors'
import { currentUserId } from '@store/auth/selectors'
import React, { useEffect } from 'react'
import RoomMemberItem from '@components/Chat/RoomMemberItem/index'
import { CHAT_ACTION_TYPE, CHAT_MEMBER_STATUS, CHAT_MEMBER_TYPE } from '@constants/socket.constants'
import _ from 'lodash'
interface ChatRoomContainerProps {
  roomId: string | string[]
}

const ChatMemberEditContainer: React.FC<ChatRoomContainerProps> = ({ roomId }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const roomMembers = useAppSelector(members)
  const memberList = _.isArray(roomMembers) ? roomMembers : []
  const userId = useAppSelector(currentUserId)
  useEffect(() => {
    if (userId && roomId) {
      dispatch(
        socketActions.socketSend({
          action: CHAT_ACTION_TYPE.GET_ROOM_MEMBERS,
          userId: userId,
          roomId: roomId,
        })
      )
    }
  }, [userId, roomId])

  const onItemDelete = (id: number) => {
    dispatch(
      socketActions.socketSend({
        action: CHAT_ACTION_TYPE.REMOVE_MEMBER,
        userId: userId,
        roomId: roomId,
        memberId: `${id}`,
      })
    )
  }

  return (
    <Box className={classes.room}>
      <List>
        {memberList
          .filter((member) => member.memberStatus === CHAT_MEMBER_STATUS.ACTIVE && member.memberType !== CHAT_MEMBER_TYPE.CHAT_ADMIN)
          .map((val) => (
            <RoomMemberItem key={val.userId} userCode={val.userCode} id={val.userId} name={val.nickName} onDelete={onItemDelete} />
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
