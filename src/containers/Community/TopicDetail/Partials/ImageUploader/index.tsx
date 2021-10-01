import { makeStyles } from '@material-ui/core/styles'
import { Box, IconButton, Icon } from '@material-ui/core'
import { useEffect, Dispatch, SetStateAction } from 'react'
import { useDropzone } from 'react-dropzone'
import { Colors } from '@theme/colors'
import { useAppDispatch } from '@store/hooks'
import * as commonActions from '@store/common/actions'
import ESLoader from '@components/Loader'
import i18n from '@locales/i18n'

type ProfileAvatarProps = {
  src: string
  setSrc: Dispatch<SetStateAction<string>>
  isUploading: boolean
  onChange?: (file: File) => void
}

const ImageUploader: React.FC<ProfileAvatarProps> = ({ onChange, isUploading, src, setSrc }) => {
  const classes = useStyles()

  const dispatch = useAppDispatch()
  const MAX_SIZE = 1048576 * 5 //1MB * 5 = 5MB
  const FILE_TYPES = 'image/jpeg, image/jpg, image/png, image/gif'

  const dropZoneConfig = {
    accept: FILE_TYPES,
    maxSize: MAX_SIZE,
    multiple: false,
    noDrag: true,
    onDrop: (files: any) => handleChange(files),
  }
  const { getRootProps, getInputProps, fileRejections } = useDropzone(dropZoneConfig)

  useEffect(() => {
    if (fileRejections.length > 0 && fileRejections[0].file) dispatch(commonActions.addToast(i18n.t('common:messages.file_size_limit')))
  }, [fileRejections])

  const handleChange = (files: File[]) => {
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
      <div {...getRootProps()} className={classes.dropZone}>
        <input {...getInputProps()} disabled={isUploading || src !== ''} />
      </div>
      {isUploading ? (
        <Box display="flex" alignItems="flex-end" width={34} height={34}>
          <Box className={classes.loader}>
            <ESLoader />
          </Box>
        </Box>
      ) : src ? (
        <>
          <Box className={classes.clearButton}>
            <IconButton
              className={classes.removeIconButton}
              disableRipple
              onClick={() => {
                setSrc('')
              }}
            >
              <Icon className={`${classes.removeIcon} fas fa-times-circle`} />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="flex-end">
            <img className={classes.thumbnail} src={src} />
          </Box>
        </>
      ) : (
        <Box display="flex" alignItems="flex-end">
          <IconButton disableRipple className={classes.iconButton}>
            <Icon className={`${classes.icon} fas fa-image`} />
          </IconButton>
        </Box>
      )}
    </div>
  )
}

ImageUploader.defaultProps = {
  isUploading: false,
}

export default ImageUploader

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'block',
    '&:hover $icon': {
      color: Colors.primary,
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      background: 'none',
    },
  },
  loader: {
    display: 'flex',
    position: 'absolute',
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButton: {
    position: 'absolute',
    top: theme.spacing(-0.5),
    right: theme.spacing(-0.5),
    display: 'flex',
    alignItems: 'flex-start',
  },
  removeIconButton: {
    zIndex: 70,
    padding: 0,
    '&:hover $removeIcon': {
      color: Colors.primary,
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      background: 'none',
    },
  },
  removeIcon: {
    fontSize: 15,
    padding: 0,
  },
  image: {
    position: 'absolute',
    zIndex: 30,
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  thumbnail: {
    width: 34,
    height: 28,
    marginBottom: theme.spacing(0.5),
    borderRadius: 4,
    objectFit: 'cover',
  },
  dropZone: {
    display: 'flex',
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 60,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  iconButton: {
    padding: 0,
  },
  icon: {
    fontSize: 34,
    color: Colors.grey[400],
  },
}))
