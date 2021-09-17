import { Box, IconButton, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import InputBase from '@material-ui/core/InputBase'
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import useUploadImage from '@utils/hooks/useUploadImage'
import { useTranslation } from 'react-i18next'
import ImageUploader from '../ImageUploader'
import ESLoader from '@components/Loader'
import { useRouter } from 'next/router'
import _ from 'lodash'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { useAppDispatch } from '@store/hooks'
import { showDialog } from '@store/common/actions'
import { NG_WORD_AREA, NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import useTopicDetail from '../../useTopicDetail'

type CommunityHeaderProps = {
  reply_param?: { hash_key: string; comment_no: number }
  setPage: Dispatch<SetStateAction<number>>
}
const Comment: React.FC<CommunityHeaderProps> = ({ reply_param, setPage }) => {
  const classes = useStyles()
  const { query } = useRouter()
  const { topic_hash_key } = query
  const { t } = useTranslation(['common'])
  const dispatch = useAppDispatch()
  const { checkNgWord } = useCheckNgWord()
  const { createComment, createCommentMeta, getCommentsList } = useTopicDetail()
  const { uploadArenaCoverImage } = useUploadImage()
  const [isUploading, setUploading] = useState(false)
  const [imageURL, setImageURL] = useState('')
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    if (!_.isEmpty(reply_param)) {
      setInputText(inputText.concat('>>' + reply_param.comment_no))
    }
  }, [reply_param])

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

  const isInputEmpty = (text: string) => {
    const textArray = _.split(text, '\n')
    for (let i = 0; i < textArray.length; i++) {
      if (textArray[i] !== '') {
        return false
      }
    }
    return true
  }

  const send = async () => {
    if (_.isEmpty(checkNgWord(inputText.trim()))) {
      const data = {
        topic_hash: String(topic_hash_key),
        content: isInputEmpty(inputText) ? '' : inputText,
        reply_to_comment_hash: !_.isEmpty(reply_param) && reply_param.hash_key,
        attachments: imageURL,
      }
      if (!createCommentMeta.pending) {
        await createComment(data)
        setPage(1)
      }

      getCommentsList({ hash_key: String(topic_hash_key), page: 1 })
      setInputText('')
      setImageURL('')
    } else {
      dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.chat_section }))
    }
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
            <IconButton className={classes.iconButton} onClick={send} disabled={imageURL === '' && inputText.trim() === ''}>
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
        </Box>
      )}
      {isUploading ? (
        <Box className={classes.loader}>
          <ESLoader />
        </Box>
      ) : null}
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
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 97px)',
    marginLeft: 13,
    marginRight: theme.spacing(1),
  },
  reply: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1.5),
    zIndex: 2,
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
    color: Colors.primary,
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
    '&.Mui-disabled .MuiIconButton-label .MuiIcon-root': {
      color: `${Colors.grey[400]} !important`,
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
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

export default Comment
