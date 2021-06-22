import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CameraAlt as Camera } from '@material-ui/icons'
import ESAvatar from '@components/Avatar'
import AvatarSelector from '@components/ImagePicker/AvatarSelector'

type ProfileAvatarProps = {
  editable?: boolean
  size?: number
  src: string
  onChange?: (file: File, blob: any) => void
  alt?: string
}

const ESProfileAvatar: React.FC<ProfileAvatarProps> = ({ editable, size, alt, src, onChange }) => {
  const classes = useStyles()
  const [drag, setDrag] = useState<boolean>(false)
  const [setAvatar, toggleSetAvatar] = useState<boolean>(false)

  useEffect(() => {
    toggleSetAvatar(false)
  }, [src])

  return (
    <div className={classes.root}>
      <ESAvatar className={classes.avatar} alt={alt} src={src} style={size && { width: size, height: size }} />
      {editable ? (
        <label htmlFor="cover-upload" className={classes.touch} onClick={() => toggleSetAvatar(true)}>
          {drag ? <Camera fontSize="large" className={classes.camera} /> : null}
          {drag ? <div className={classes.backdrop} /> : null}
          <div
            className={classes.dropZone}
            onMouseEnter={() => setDrag(true)}
            onMouseLeave={() => setDrag(false)}
            onDragEnter={() => setDrag(true)}
            onDragLeave={() => setDrag(false)}
          ></div>
        </label>
      ) : null}
      {setAvatar ? (
        <AvatarSelector
          src={src}
          alt={alt}
          cancel={() => toggleSetAvatar(false)}
          onUpdate={(file: File, blob: any) => onChange(file, blob)}
        />
      ) : null}
    </div>
  )
}

ESProfileAvatar.defaultProps = {
  editable: false,
}
export default ESProfileAvatar

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
    position: 'relative',
  },
  avatar: {
    zIndex: 30,
    width: 120,
    height: 120,
  },
  touch: {
    zIndex: 30,
    display: 'flex',
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
    width: 120,
    height: 120,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  camera: {
    display: 'flex',
    position: 'absolute',
    zIndex: 50,
  },
  backdrop: {
    display: 'flex',
    opacity: 0.6,
    background: '#000',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    content: '""',
    zIndex: 40,
  },
  dropZone: {
    display: 'flex',
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 60,
  },
}))
