import { memo, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { CameraAlt as Camera } from '@material-ui/icons'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import CoverSelector from '@components/ImagePicker/CoverSelector'
import ESLoader from '@components/Loader'

type ProfileAvatarProps = {
  src: string
  isUploading: boolean
  onChange?: (file: File, blob: any) => void
  disabled?: boolean
}

const CoverUploader: React.FC<ProfileAvatarProps> = ({ src, isUploading = false, onChange, disabled = false }) => {
  const classes = useStyles()
  const [drag, setDrag] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [localSrc, setLocalSrc] = useState<string | ArrayBuffer>('')
  const { t } = useTranslation(['common'])

  useEffect(() => {
    if (src) {
      setLocalSrc(src)
    }
  }, [src])

  const handleChange = (file: File, blob: any) => {
    setOpen(false)

    if (file) {
      if (onChange) {
        onChange(file, blob)
      }
    }
  }

  return (
    <div className={classes.root}>
      <label
        htmlFor="cover-upload"
        className={`${classes.touch} ${disabled && classes.touchDisabled}`}
        onMouseEnter={() => {
          if (!isUploading && !disabled) setDrag(true)
        }}
        onMouseLeave={() => setDrag(false)}
        onClick={() => {
          if (!isUploading && !disabled) setOpen(true)
        }}
      >
        {localSrc.toString() !== '' && <img className={classes.image} src={localSrc.toString()} />}

        <Box display="flex" flexDirection="column" alignItems="center" position="absolute" zIndex="100" className={classes.logoWhite}>
          <Camera fontSize="large" className={classes.camera} />
          <Typography>{t('common:tournament.cover_upload_select_img')}</Typography>
        </Box>

        <img src="/images/logo.svg" className={classes.logo} />

        <div className={classes.outerBackdrop} />

        {drag || isUploading ? <div className={classes.backdrop} /> : null}
        {isUploading ? (
          <Box className={classes.loader}>
            <ESLoader />
          </Box>
        ) : null}
      </label>
      {open && (
        <CoverSelector
          src={localSrc.toString()}
          cancel={() => setOpen(false)}
          onUpdate={(file: File, blob: any) => handleChange(file, blob)}
        />
      )}
    </div>
  )
}

export default memo(CoverUploader)

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
  },
  logoWhite: {
    color: Colors.text[200],
  },
  image: {
    position: 'absolute',
    zIndex: 30,
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  touch: {
    zIndex: 30,
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px dashed ${Colors.text[200]}`,
    borderRadius: 4,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  touchDisabled: {
    '&:hover': {
      cursor: 'default',
    },
  },
  camera: {
    display: 'flex',
    zIndex: 50,
  },
  outerBackdrop: {
    display: 'flex',
    background: '#000000',
    opacity: 0.6,
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
  backdrop: {
    display: 'flex',
    opacity: 0.6,
    background: '#1A1A1A',
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
  logo: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 8,
    width: 38,
  },
  loader: {
    display: 'flex',
    position: 'absolute',
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
