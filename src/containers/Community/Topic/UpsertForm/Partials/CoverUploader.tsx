import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { CameraAlt as Camera } from '@material-ui/icons'
import ESLoader from '@components/Loader'
import { useDropzone } from 'react-dropzone'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'

type ProfileAvatarProps = {
  editable?: boolean
  src: string
  isUploading: boolean
  onChange?: (file: File) => void
}

const CoverUploader: React.FC<ProfileAvatarProps> = ({ src, isUploading, onChange }) => {
  const classes = useStyles()
  const [drag, setDrag] = useState<boolean>(false)
  const [localSrc, setLocalSrc] = useState<string | ArrayBuffer>('')
  const { t } = useTranslation()

  const dropZoneConfig = {
    accept: 'image/*',
    multiple: false,
    onDrop: (files: any) => handleChange(files),
  }
  const { getRootProps, getInputProps } = useDropzone(dropZoneConfig)

  useEffect(() => {
    if (src) {
      setLocalSrc(src)
    }
  }, [src])

  const handleChange = (files: File[]) => {
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
      <label htmlFor="cover-upload" className={classes.touch}>
        {localSrc.toString() !== '' && <img className={classes.image} src={localSrc.toString()} />}
        {!isUploading ? (
          <>
            <div className={classes.camera}>
              <Camera fontSize="large" />
              <Typography>{t('common:tournament.cover_upload_select_img')}</Typography>
            </div>
            <img src="/images/logo.svg" className={classes.logo} />
          </>
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
          <svg width="100%">
            <rect width="100%" height={120} strokeDasharray="4, 4" fill="transparent" stroke={Colors.white_opacity[30]} strokeWidth="1" />
          </svg>
        </div>
      </label>
    </div>
  )
}

CoverUploader.defaultProps = {
  editable: false,
  isUploading: false,
}

export default CoverUploader

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    display: 'block',
  },
  image: {
    position: 'absolute',
    zIndex: 30,
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  dashed: {
    position: 'absolute',
    top: 0,
    zIndex: 31,
    width: '100%',
  },
  touch: {
    zIndex: 32,
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: 120,
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
    background: '#1A1A1A',
    position: 'absolute',
    height: 120,
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    content: '""',
    zIndex: 30,
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
  logo: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 8,
    width: 38,
  },
}))
