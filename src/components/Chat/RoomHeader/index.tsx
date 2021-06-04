import React, { useState } from 'react'
import Avatar from '@components/Avatar'
import { useEffect } from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { selectedRoomInfo } from '@store/socket/selectors'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import { socketActions } from '@store/socket/actions'
import { currentUserId } from '@store/auth/selectors'
import { useTranslation } from 'react-i18next'
import ESMenu from '@components/Menu'
import ESMenuItem from '@components/Menu/MenuItem'
import RoomNameEditor from '@components/Chat/RoomNameEditor'
import _ from 'lodash'

export interface RoomHeaderProps {
  roomId: string | string[]
}

enum MENU {
  MEMBER_LIST = 0,
  ADD_MEMBER = 1,
  CHANGE_NAME = 2,
  CHANGE_IMG = 3,
}

const RoomHeader: React.FC<RoomHeaderProps> = ({ roomId }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [dialogOpen, setDialogOpen] = useState(null as MENU | null)

  const roomInfo = useAppSelector(selectedRoomInfo)
  const userId = useAppSelector(currentUserId)
  const roomName = _.get(roomInfo, 'roomName', '')
  const hasNoRoomInfo = roomInfo === undefined
  const roomImg = _.get(roomInfo, 'roomImg')

  useEffect(() => {
    if (roomId && userId)
      dispatch(
        socketActions.socketSend({
          action: CHAT_ACTION_TYPE.GET_ROOM_AND_MESSAGE,
          roomId: roomId,
          userId: userId,
        })
      )
  }, [roomId, userId])

  const isRoomNameMenuShow = () => {
    if (!_.get(roomInfo, 'sortKey', '').startsWith('chat_room')) return false
    return _.get(roomInfo, 'isAdmin', false)
  }

  return (
    <>
      {hasNoRoomInfo ? null : (
        <RoomNameEditor roomName={roomName} roomId={roomId} open={dialogOpen === MENU.CHANGE_NAME} hide={() => setDialogOpen(null)} />
      )}
      <Box className={classes.row}>
        {hasNoRoomInfo ? null : <Avatar src={roomImg} alt={roomName} size={36} />}
        <Box pl={2} className={classes.roomName}>
          <Typography variant="h2" noWrap={true}>
            {roomName}
          </Typography>
        </Box>
        {hasNoRoomInfo ? null : (
          <ESMenu>
            <ESMenuItem onClick={() => setDialogOpen(MENU.MEMBER_LIST)}>{t('common:chat.room_options.member_list')}</ESMenuItem>
            <ESMenuItem onClick={() => setDialogOpen(MENU.ADD_MEMBER)}>{t('common:chat.room_options.add_member')}</ESMenuItem>
            {isRoomNameMenuShow() ? (
              <ESMenuItem onClick={() => setDialogOpen(MENU.CHANGE_NAME)}>{t('common:chat.room_options.change_room_name')}</ESMenuItem>
            ) : null}
            <ESMenuItem onClick={() => setDialogOpen(MENU.CHANGE_IMG)}>{t('common:chat.room_options.change_img')}</ESMenuItem>
            <ESMenuItem onClick={() => console.error('退出する')}>{t('common:chat.room_options.exit')}</ESMenuItem>
          </ESMenu>
        )}
      </Box>
    </>
  )
}

RoomHeader.defaultProps = {}

const useStyles = makeStyles(() => ({
  row: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
  },
  roomName: {
    overflow: 'hidden',
  },
}))

export default RoomHeader
