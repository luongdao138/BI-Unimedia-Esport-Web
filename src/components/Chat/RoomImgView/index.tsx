import React from 'react'
import Avatar from '@components/Avatar'
import { makeStyles, Box } from '@material-ui/core'
import ESLoader from '@components/Loader'
import { AVATAR_PATH } from '@constants/common.constants'
import _ from 'lodash'

export interface RoomImgViewProps {
  roomImg: string
  roomName: string
  loading: boolean
}

const RoomImgView: React.FC<RoomImgViewProps> = ({ roomImg, roomName, loading }) => {
  const classes = useStyles()

  const getRoomImg = () => {
    if (!_.isString(roomImg)) return AVATAR_PATH
    if (roomImg.length < 2) return AVATAR_PATH
    return roomImg
  }

  const renderAvatar = () => {
    if (!loading) {
      return (
        <Box className={classes.avatarHolder}>
          <Avatar src={getRoomImg()} alt={roomName} size={36} className={classes.avatar} />
        </Box>
      )
    }
    return (
      <Box className={classes.loaderHolder}>
        <Box className={classes.loaderBox}>
          <ESLoader />
        </Box>
      </Box>
    )
  }

  return <>{renderAvatar()}</>
}

const useStyles = makeStyles((theme) => ({
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
      lineHeight: 4,
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
  [theme.breakpoints.down('sm')]: {
    avatarHolder: {
      display: 'none',
    },
    loaderHolder: {
      display: 'none',
    },
  },
}))

RoomImgView.defaultProps = {}

export default RoomImgView
