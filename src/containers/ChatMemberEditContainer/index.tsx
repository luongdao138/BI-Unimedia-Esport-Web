import { List, makeStyles, DialogContent, Box, Theme } from '@material-ui/core'
import { socketActions } from '@store/socket/actions'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { membersFilter } from '@store/socket/selectors'
import { currentUserId } from '@store/auth/selectors'
import React, { useEffect } from 'react'
import RoomMemberItem from '@components/Chat/RoomMemberItem/index'
import { CHAT_ACTION_TYPE, CHAT_MEMBER_STATUS, CHAT_MEMBER_TYPE } from '@constants/socket.constants'
import ESDialog from '@components/Dialog'
import { addToast } from '@store/common/actions'
import _ from 'lodash'
import i18n from '@locales/i18n'

interface ChatRoomContainerProps {
  roomId: string
  open: boolean
  disabled: boolean
  hide: () => void
}

const ChatMemberEditContainer: React.FC<ChatRoomContainerProps> = ({ roomId, open, hide, disabled }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const roomMembers = useAppSelector(membersFilter)
  const memberList = _.isArray(roomMembers) ? roomMembers : []
  const userId = useAppSelector(currentUserId)
  useEffect(() => {
    if (userId && roomId) {
      dispatch(
        socketActions.socketSend({
          action: CHAT_ACTION_TYPE.GET_ROOM_MEMBERS,
          roomId: roomId,
        })
      )
    }
  }, [userId, roomId])

  const onItemDelete = (id: number) => {
    dispatch(
      socketActions.socketSend({
        action: CHAT_ACTION_TYPE.REMOVE_MEMBER,
        roomId: roomId,
        memberId: `${id}`,
      })
    )
    setTimeout(function () {
      dispatch(addToast(i18n.t('common:chat.toast_delete_member')))
    }, 1000)
  }

  return (
    <ESDialog
      open={open}
      title={i18n.t('common:chat.member_list_title')}
      handleClose={() => hide()}
      bkColor="rgba(0,0,0,0.8)"
      alignTop
      className={'scroll-bar'}
    >
      <DialogContent className={classes.dialogContent}>
        <Box>
          <List>
            {memberList
              .filter((member) => member.memberStatus === CHAT_MEMBER_STATUS.ACTIVE)
              .map((val) => (
                <RoomMemberItem
                  profile={val.profile}
                  key={val.userId}
                  disabled={disabled}
                  userCode={val.userCode}
                  isAdminOrSelf={val.memberType === CHAT_MEMBER_TYPE.CHAT_ADMIN || val.userId === userId}
                  id={val.userId}
                  name={val.nickName}
                  onDelete={onItemDelete}
                />
              ))}
          </List>
        </Box>
      </DialogContent>
    </ESDialog>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  dialogContent: {},
  [theme.breakpoints.down('sm')]: {
    dialogContent: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
  },
}))

export default ChatMemberEditContainer
