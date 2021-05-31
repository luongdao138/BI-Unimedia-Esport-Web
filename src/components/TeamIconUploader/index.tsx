import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Box, Typography } from '@material-ui/core'
import { CameraAlt as Camera } from '@material-ui/icons'
import ESLoader from '@components/Loader'
import { useDropzone } from 'react-dropzone'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

type ProfileAvatarProps = {
  editable?: boolean
  size?: number
  src: string
  isUploading: boolean
  onChange?: (file: File) => void
}

const ESTeamIconUploader: React.FC<ProfileAvatarProps> = ({ editable, size, src, isUploading, onChange }) => {
  const classes = useStyles()
  const [drag, setDrag] = useState<boolean>(false)
  const [localSrc, setLocalSrc] = useState<string | ArrayBuffer>('')
  const { t } = useTranslation()

  const dropZoneConfig = {
    accept: 'image/*',
    onDrop: (files: any) => handleChange(files),
  }
  const { getRootProps, getInputProps } = useDropzone(dropZoneConfig)

  useEffect(() => {
    if (src) {
      setLocalSrc(src)
    }
  }, [src])

  const handleChange = (files: Array<File>) => {
    setDrag(false)
    const file = files[0]
    const reader = new FileReader()
    if (file) {
      if (onChange) {
        onChange(file)
      }

      reader.readAsDataURL(file)
      reader.onload = () => {
        setLocalSrc(reader.result)
      }
    }
  }

  return (
    <div className={classes.root}>
      {editable ? (
        <label htmlFor="cover-upload" className={classes.touch}>
          <Avatar className={classes.avatar} src={localSrc.toString() || '/images/avatar-black.png'} />
          {!isUploading ? (
            <div className={classes.camera}>
              <Camera fontSize="large" />
              <Typography>{t('common:common.select_an_image')}</Typography>
            </div>
          ) : null}
          {drag || isUploading ? <div className={classes.backdrop} /> : null}
          <div
            {...getRootProps()}
            className={classes.dropZone}
            onMouseEnter={() => {
              if (!isUploading) setDrag(true)
            }}
            onMouseLeave={() => setDrag(false)}
            onDragEnter={() => {
              if (!isUploading) setDrag(true)
            }}
            onDragLeave={() => setDrag(false)}
          >
            <input {...getInputProps()} />
          </div>
          {isUploading ? (
            <Box className={classes.loader}>
              <ESLoader />
            </Box>
          ) : null}
          <div className={classes.dashed}>
            <svg viewBox="0 0 120 120">
              <circle
                width="120"
                height="120"
                cx="60"
                cy="60"
                r="59"
                strokeDasharray="4, 4"
                fill="transparent"
                stroke={Colors.white_opacity[30]}
                strokeWidth="1"
              />
            </svg>
          </div>
        </label>
      ) : (
        <Avatar className={classes.avatar} src={src ?? '/images/avatar-black.png'} style={size && { width: size, height: size }} />
      )}
    </div>
  )
}

ESTeamIconUploader.defaultProps = {
  editable: false,
  isUploading: false,
}

export default ESTeamIconUploader

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'block',
  },
  avatar: {
    zIndex: 30,
    width: 120,
    height: 120,
  },
  dashed: {
    position: 'absolute',
    top: 0,
    zIndex: 31,
    width: 120,
    height: 120,
  },
  touch: {
    zIndex: 32,
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
    flexDirection: 'column',
    alignItems: 'center',
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
