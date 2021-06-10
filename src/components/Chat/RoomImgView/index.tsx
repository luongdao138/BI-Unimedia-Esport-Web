import React, { useState, useRef } from 'react'
import Avatar from '@components/Avatar'
import moment from 'moment'

import { makeStyles, Box } from '@material-ui/core'
import { useAppDispatch } from '@store/hooks'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import ImageUploader from '@containers/ChatRoomContainer/ImageUploader'
import { socketActions } from '@store/socket/actions'
import ESLoader from '@components/Loader'
import { CameraAlt as Camera } from '@material-ui/icons'

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

  const renderAvatar = () => {
    if (!uploadMeta.uploading) {
      if (isAdmin) {
        return (
          <Box className={classes.avatarHolderEdit} onClick={onAvatarClick}>
            <Box className={classes.avatarBox}>
              <Avatar
                src={roomImg}
                alt={roomName}
                size={36}
                className={classes.avatar}
                style={isAdmin ? { cursor: 'pointer' } : undefined}
              />
              <Camera fontSize="default" className={classes.camera} />
            </Box>
          </Box>
        )
      } else {
        return (
          <Box className={classes.avatarHolder}>
            <Avatar src={roomImg} alt={roomName} size={36} className={classes.avatar} />
          </Box>
        )
      }
    }
    return (
      <Box className={classes.loaderHolder}>
        <Box className={classes.loaderBox}>
          <ESLoader />
        </Box>
      </Box>
    )
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
      {renderAvatar()}
    </>
  )
}

const useStyles = makeStyles(() => ({
  loaderBox: {
    width: 18,
    height: 18,
    margin: '0 auto',
    '& svg': {
      width: '100%',
      height: '100%',
    },
  },
  loaderHolder: {
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
    borderRadius: '100%',
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  camera: {
    position: 'absolute',
    left: 0,
    top: '50%',
    right: 0,
    margin: '0 auto',
    transform: 'translateY(-50%)',
    display: 'none',
  },
  avatarHolder: {
    position: 'absolute',
    left: 0,
    top: 0,
    overflow: 'hidden',
    background: '#4d4d4d',
    borderRadius: '100%',
  },
  avatarHolderEdit: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: '100%',

    zIndex: 100,
    width: 36,
    height: 36,
    '&:hover $avatarBox': {
      width: 100,
      height: 100,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    '&:hover $avatarBox:before': {
      width: 100,
      height: 100,
      background: 'rgba(77, 77, 77, 0.8)',
      content: '',
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      display: 'block',
      bottom: 0,
    },
    '&:hover $avatar': {
      width: 100,
      height: 100,
      opacity: 0.2,
      display: 'block',
      transition: 'all 0.3s ease',
      lineHeight: 100,
    },
    '&:hover $camera': {
      display: 'block',
      transition: 'all 0.5s ease',
    },
  },
  avatarBox: {
    width: 36,
    height: 36,
    willChange: 'auto',
    overflow: 'hidden',
    position: 'relative',
    background: '#4d4d4d',
    borderRadius: '100%',
  },
}))

RoomImgView.defaultProps = {}

export default RoomImgView
