import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Box } from '@material-ui/core'
import { CameraAlt as Camera } from '@material-ui/icons'
import ESLoader from '@components/Loader'
import ESAvatar from '@components/Avatar'
import { useDropzone } from 'react-dropzone'

type ProfileAvatarProps = {
  editable?: boolean
  size?: number
  src: string
  alt?: string
  onChange?: (file: File) => void
}

const ESProfileAvatar: React.FC<ProfileAvatarProps> = ({ editable, size, alt, src, onChange }) => {
  const classes = useStyles()
  const [update, setUpdate] = useState<boolean>(false)
  const [drag, setDrag] = useState<boolean>(false)
  const dropZoneConfig = {
    accept: 'image/*',
    onDrop: (files: any) => handleChange(files),
  }
  const { getRootProps, getInputProps } = useDropzone(dropZoneConfig)

  useEffect(() => {
    setUpdate(false)
  }, [src])

  const handleChange = (files: Array<File>) => {
    setUpdate(true)
    setDrag(false)
    const file = files[0]
    const reader = new FileReader()
    if (file) {
      if (onChange) {
        onChange(file)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={classes.root}>
      {editable ? (
        <label htmlFor="cover-upload" className={classes.touch}>
          <Avatar className={classes.avatar} src={src ?? '/images/avatar.png'} />
          {drag && !update ? <Camera fontSize="large" className={classes.camera} /> : null}
          {drag || update ? <div className={classes.backdrop} /> : null}
          <div
            {...getRootProps()}
            className={classes.dropZone}
            onMouseEnter={() => {
              if (!update) setDrag(true)
            }}
            onMouseLeave={() => setDrag(false)}
            onDragEnter={() => {
              if (!update) setDrag(true)
            }}
            onDragLeave={() => setDrag(false)}
          >
            <input {...getInputProps()} />
          </div>
          {update ? (
            <Box className={classes.loader}>
              <ESLoader />
            </Box>
          ) : null}
        </label>
      ) : (
        <ESAvatar className={classes.avatar} alt={alt} src={src} style={size && { width: size, height: size }} />
      )}
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
  },
  avatar: {
    zIndex: 30,
    width: 120,
    height: 120,
  },
  touch: {
    zIndex: 30,
    display: 'flex',
    position: 'relative',
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
  loader: {
    display: 'flex',
    position: 'absolute',
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
