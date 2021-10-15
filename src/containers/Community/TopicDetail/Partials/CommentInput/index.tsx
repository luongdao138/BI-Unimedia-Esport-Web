import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

import React, { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react'
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
import CommentInputArea from './CommentInputArea'

type CommunityHeaderProps = {
  reply_param?: { hash_key: string; comment_no: number }
  setPage: Dispatch<SetStateAction<number>>
  setCommentCount?: Dispatch<SetStateAction<number>>
  commentCount?: number
  setShowReply: Dispatch<SetStateAction<boolean[]>>
}

const Comment: React.FC<CommunityHeaderProps> = ({ reply_param, setPage, setCommentCount, commentCount, setShowReply }) => {
  const classes = useStyles()
  const { query } = useRouter()
  const { topic_hash_key } = query
  const { t } = useTranslation(['common'])
  const dispatch = useAppDispatch()
  const { checkNgWord } = useCheckNgWord()
  const { createComment, createCommentMeta, resetCommentCreateMeta } = useTopicDetail()
  const { uploadCommentImage } = useUploadImage()

  const [isUploading, setUploading] = useState(false)

  const inputRef = useRef<{ clearInput: () => void }>(null)

  const [imageURL, setImageURL] = useState('')

  useEffect(() => {
    if (!createCommentMeta.pending && createCommentMeta.loaded) {
      if (inputRef.current) inputRef.current.clearInput()
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

  const send = (text: string) => {
    setShowReply((comments) => _.map(comments, () => false))
    if (_.isEmpty(checkNgWord(text.trim()))) {
      const reply_comment_nos = _.map(_.filter(_.split(text, REPLY_REGEX)), (c) => Number(c.slice(2)))
      const data = {
        topic_hash: String(topic_hash_key),
        content: isInputEmpty(text) ? '' : text,
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

  return (
    <div className={classes.inputContainer}>
      <Box className={classes.root}>
        <Box className={classes.toolbarCont}>
          <ImageUploader src={imageURL} setSrc={setImageURL} onChange={handleUpload} isUploading={isUploading} />
        </Box>
        <CommentInputArea replyParam={reply_param} ref={inputRef} onPressSend={send} disabled={imageURL === ''} />
      </Box>
    </div>
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
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    bottom: 0,
    padding: 11,
    width: '100%',
    background: '#101010',
    willChange: 'transform',
    zIndex: 2,
  },
  toolbarCont: {
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: 5,
    position: 'relative',
    top: '-3px',
  },
  inputCont: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 97px)',
    marginLeft: 13,
    marginRight: theme.spacing(1),
    minHeight: 36,
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
    marginBottom: 7,
    marginRight: 13,
  },
  input: {
    borderRadius: 24,
    border: '1px solid #777',
    backgroundColor: '#101010',
    width: '100%',
    height: '100%',
    padding: 9,
    paddingTop: 7,
    paddingBottom: 7,
    fontSize: 14,
    color: Colors.white,
  },
  icon: {
    fontSize: 22,
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
    borderRadius: 0,
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
