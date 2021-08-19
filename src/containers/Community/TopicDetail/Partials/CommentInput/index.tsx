import { Box, IconButton, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import InputBase from '@material-ui/core/InputBase'
import React, { useState } from 'react'
import useUploadImage from '@utils/hooks/useUploadImage'
import { useTranslation } from 'react-i18next'
import ImageUploader from '../ImageUploader'
import ESLoader from '@components/Loader'

type CommunityHeaderProps = {
  username?: string
  mail?: string
  discription?: string
  date?: string
  number?: number
  image?: string
}
const Comment: React.FC<CommunityHeaderProps> = () => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const { uploadArenaCoverImage } = useUploadImage()
  const [isUploading, setUploading] = useState(false)
  const [imageURL, setImageURL] = useState('')
  const [inputText, setInputText] = useState('')

  const handleUpload = (file: File) => {
    setUploading(true)

    uploadArenaCoverImage(file, undefined, 1, true, (imageUrl) => {
      setUploading(false)
      setImageURL(imageUrl)
    })
  }

  const closeImage = () => {
    setImageURL('')
  }

  const sent = () => {
    setImageURL('')
    setInputText('')
  }

  const handleChange = (event) => {
    setInputText(event.target.value)
  }

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.toolbarCont}>
          <ImageUploader src={imageURL} onChange={handleUpload} isUploading={isUploading} />
        </Box>
        <Box className={classes.inputCont}>
          <InputBase
            value={inputText}
            onChange={handleChange}
            className={classes.input}
            multiline
            rowsMax={9}
            placeholder={t('common:topic_create.comment_placeholder')}
          />
        </Box>
        <Box className={classes.sendCont}>
          <Box display="flex" alignItems="center">
            <IconButton className={classes.iconButton} disableRipple onClick={sent} disabled={imageURL === '' && inputText === ''}>
              <Icon className={`${classes.icon} fas fa-paper-plane`} />
            </IconButton>
          </Box>
        </Box>
      </Box>
      {imageURL && (
        <Box className={classes.imageContainer}>
          <Box position="absolute" top={0} right={0}>
            <IconButton className={classes.removeIconButton} disableRipple onClick={closeImage}>
              <Icon className={`${classes.removeIcon} fas fa-times`} />
            </IconButton>
          </Box>

          <img src={imageURL} className={classes.coverImg} />

          {isUploading ? (
            <Box className={classes.loader}>
              <ESLoader />
            </Box>
          ) : null}
        </Box>
      )}
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '100%',
    width: '100%',
    position: 'relative',
  },
  toolbarCont: {
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: 5,
  },
  inputCont: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginLeft: 13,
    marginRight: 8,
  },
  sendCont: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: 5,
    marginRight: 13,
  },

  input: {
    borderRadius: 24,
    border: '1px solid #777',
    backgroundColor: '#101010',
    width: '100%',
    padding: 9,
    fontSize: 14,
    color: Colors.white,
  },
  icon: {
    fontSize: 24,
    color: Colors.grey[400],
  },
  removeIcon: {
    fontSize: 14,
  },
  removeIconButton: {
    '&:hover $removeIcon': {
      color: Colors.primary,
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      background: 'none',
    },
  },
  iconButton: {
    padding: 0,
    '&:hover $icon': {
      color: Colors.primary,
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      background: 'none',
    },
  },
  imageContainer: {
    display: 'flex',
    position: 'relative',
    marginTop: theme.spacing(1),
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImg: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    objectPosition: '50% 50%',
    borderRadius: 4,
  },
  loader: {
    display: 'flex',
    position: 'absolute',
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export default Comment
