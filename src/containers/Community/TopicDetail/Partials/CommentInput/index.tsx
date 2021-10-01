import { Box, IconButton, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import InputBase from '@material-ui/core/InputBase'
import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import useUploadImage from '@utils/hooks/useUploadImage'
import { useTranslation } from 'react-i18next'
import ImageUploader from '../ImageUploader'
import router, { useRouter } from 'next/router'
import _ from 'lodash'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { useAppDispatch } from '@store/hooks'
import * as commonActions from '@store/common/actions'
import { showDialog } from '@store/common/actions'
import { NG_WORD_AREA, NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import useTopicDetail from '../../useTopicDetail'
import { REPLY_REGEX } from '@constants/community.constants'

const TEXT_INPUT_LIMIT = 5000

type CommunityHeaderProps = {
  reply_param?: { hash_key: string; comment_no: number }
  setPage: Dispatch<SetStateAction<number>>
  setCommentCount?: Dispatch<SetStateAction<number>>
  commentCount?: number
}

const Comment: React.FC<CommunityHeaderProps> = ({ reply_param, setPage, setCommentCount, commentCount }) => {
  const classes = useStyles()
  const { query } = useRouter()
  const { topic_hash_key } = query
  const { t } = useTranslation(['common'])
  const dispatch = useAppDispatch()
  const { checkNgWord } = useCheckNgWord()
  const { createComment, createCommentMeta, resetCommentCreateMeta } = useTopicDetail()
  const { uploadCommentImage } = useUploadImage()

  const [isUploading, setUploading] = useState(false)
  const [isMaxLength, setIsMaxLength] = useState(false)
  const [imageURL, setImageURL] = useState('')
  const [inputText, setInputText] = useState('')

  useEffect(() => {
    if (!_.isEmpty(reply_param)) {
      if (!_.includes(_.split(inputText, REPLY_REGEX), `>>${reply_param.comment_no}`)) {
        setInputText(inputText.concat('>>' + reply_param.comment_no))
      }
    }
  }, [reply_param])

  useEffect(() => {
    if (!createCommentMeta.pending && createCommentMeta.loaded) {
      setInputText('')
      setImageURL('')
      setPage(1)
      setCommentCount(commentCount + 1)
    } else if (!createCommentMeta.pending && createCommentMeta.error) {
      dispatch(commonActions.addToast(t('common:topic.topic_not_found')))
      router.back()
    }
    resetCommentCreateMeta()
  }, [createCommentMeta])

  const handleUpload = (file: File) => {
    setUploading(true)
    uploadCommentImage(file, undefined, (imageUrl) => {
      setUploading(false)
      setImageURL(imageUrl)
    })
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

  const send = () => {
    if (_.isEmpty(checkNgWord(inputText.trim()))) {
      const reply_comment_nos = _.map(_.filter(_.split(inputText, REPLY_REGEX)), (c) => Number(c.slice(2)))
      const data = {
        topic_hash: String(topic_hash_key),
        content: isInputEmpty(inputText) ? '' : inputText,
        reply_to_comment_nos: reply_comment_nos,
        attachments: imageURL,
      }
      if (!createCommentMeta.pending) {
        createComment(data)
      }
    } else {
      dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.comment_section }))
    }
  }

  const handleChange = (event) => {
    if (event.target.value.length > TEXT_INPUT_LIMIT) {
      setIsMaxLength(true)
    } else {
      setIsMaxLength(false)
    }
    setInputText(event.target.value)
  }

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.toolbarCont}>
          <ImageUploader src={imageURL} setSrc={setImageURL} onChange={handleUpload} isUploading={isUploading} />
        </Box>
        <Box className={classes.inputCont}>
          <InputBase
            value={inputText}
            onChange={handleChange}
            className={classes.input}
            multiline
            rowsMax={9}
            placeholder={t('common:topic_create.comment_placeholder')}
            inputProps={{ maxLength: TEXT_INPUT_LIMIT, style: { overflow: 'visible' } }}
          />
        </Box>
        <Box className={classes.sendCont}>
          <Box display="flex" alignItems="center">
            <IconButton
              className={classes.iconButton}
              onClick={send}
              disabled={(imageURL === '' && inputText.trim() === '') || isMaxLength}
            >
              <Icon className={`${classes.icon} fas fa-paper-plane`} />
            </IconButton>
          </Box>
        </Box>
      </Box>
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
