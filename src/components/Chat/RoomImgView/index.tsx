import React, { useState, useRef } from 'react'
import Avatar from '@components/Avatar'
import moment from 'moment'

import { makeStyles, Box } from '@material-ui/core'
import { useAppDispatch } from '@store/hooks'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import ImageUploader from '@containers/ChatRoomContainer/ImageUploader'
import { socketActions } from '@store/socket/actions'
import ESLoader from '@components/Loader'

export interface RoomImgViewProps {
  userId: number
  roomId: string
  roomImg: string
  roomName: string
  isAdmin: boolean
}

interface UploadStateType {
  uploading: boolean
}

const RoomImgView: React.FC<RoomImgViewProps> = ({ userId, roomId, roomImg, roomName, isAdmin }) => {
  const [uploadMeta, setMeta] = useState<UploadStateType>({ uploading: false })
  const ref = useRef<{ handleUpload: () => void }>(null)
  const dispatch = useAppDispatch()
  const classes = useStyles()

  const imageErrorHandler = (error: any) => {
    // eslint-disable-next-line no-console
    console.log(error)
    setMeta({ uploading: false })
  }

  const imageEventHandler = (url: string, isPending: boolean) => {
    const currentTimestamp = moment().valueOf()
    currentTimestamp
    if (isPending) {
      setMeta({ uploading: true })
    } else {
      const payload = {
        action: CHAT_ACTION_TYPE.CHANGE_ROOM_IMG,
        roomId: roomId,
        userId: userId,
        img: url,
      }
      dispatch(socketActions.socketSend(payload))
      setMeta({ uploading: false })
    }
  }

  const onAvatarClick = () => {
    if (!isAdmin) return
    if (ref.current && !uploadMeta.uploading) {
      setMeta({ uploading: false })
      ref.current.handleUpload()
    }
  }

  return (
    <>
      <ImageUploader
        ref={ref}
        roomId={roomId}
        onResponse={imageEventHandler}
        onImageSelected={imageEventHandler}
        onError={imageErrorHandler}
      />
      {uploadMeta.uploading ? (
        <Box className={classes.loader}>
          <ESLoader />
        </Box>
      ) : null}
      <Avatar src={roomImg} alt={roomName} size={36} onClick={onAvatarClick} style={isAdmin ? { cursor: 'pointer' } : undefined} />
    </>
  )
}

const useStyles = makeStyles(() => ({
  loader: {
    position: 'absolute',
    zIndex: 4,
    width: 36,
    background: '#000000d4',
    marginTop: 1,
  },
}))

RoomImgView.defaultProps = {}

export default RoomImgView
