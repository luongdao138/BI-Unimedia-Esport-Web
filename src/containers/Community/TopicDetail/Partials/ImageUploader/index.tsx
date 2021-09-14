import { makeStyles } from '@material-ui/core/styles'
import { Box, IconButton, Icon } from '@material-ui/core'

import { useDropzone } from 'react-dropzone'
import { Colors } from '@theme/colors'

type ProfileAvatarProps = {
  editable?: boolean
  src: string
  isUploading: boolean
  onChange?: (file: File) => void
}

const ImageUploader: React.FC<ProfileAvatarProps> = ({ onChange, isUploading }) => {
  const classes = useStyles()

  const dropZoneConfig = {
    accept: 'image/*',
    multiple: false,
    onDrop: (files: any) => handleChange(files),
  }
  const { getRootProps, getInputProps } = useDropzone(dropZoneConfig)

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
        <input {...getInputProps()} disabled={isUploading} />
      </div>

      <Box display="flex" alignItems="flex-end">
        <IconButton disableRipple className={classes.iconButton}>
          <Icon className={`${classes.icon} fas fa-image`} />
        </IconButton>
      </Box>
    </div>
  )
}

ImageUploader.defaultProps = {
  editable: false,
  isUploading: false,
}

export default ImageUploader

const useStyles = makeStyles(() => ({
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
  image: {
    position: 'absolute',
    zIndex: 30,
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-end',
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
