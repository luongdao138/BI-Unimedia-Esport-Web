import React, { Ref, useImperativeHandle, useState, forwardRef, useEffect } from 'react'
import { Box, Icon, IconButton, makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import InputBase from '@material-ui/core/InputBase'
import { REPLY_REGEX } from '@constants/community.constants'
import _ from 'lodash'

export interface ClearInputrRef {
  clearInput: () => void
}
const TEXT_INPUT_LIMIT = 5000

export interface MessageInputAreaProps {
  onPressSend?: (text: string) => void
  disabled?: boolean
  ref: Ref<ClearInputrRef>
  replyParam: { hash_key: string; comment_no: number }
}

const CommentInputArea: React.FC<MessageInputAreaProps> = forwardRef<ClearInputrRef, MessageInputAreaProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    clearInput: () => {
      setText('')
    },
  }))
  const { onPressSend, disabled, replyParam } = props

  const [text, setText] = useState<string>('')

  const classes = useStyles()

  const { t } = useTranslation(['common'])

  const handleChange = (event) => {
    setText(event.target.value)
  }

  const send = (e: React.MouseEvent) => {
    onPressSend ? onPressSend(text.trim()) : undefined
    e.preventDefault()
  }

  useEffect(() => {
    if (!_.isEmpty(replyParam)) {
      if (!_.includes(_.split(text, REPLY_REGEX), `>>${replyParam.comment_no}`)) {
        setText(text.concat('>>' + replyParam.comment_no))
      }
    }
  }, [replyParam])

  return (
    <>
      <Box className={classes.inputCont}>
        <InputBase
          value={text}
          onChange={handleChange}
          className={classes.input}
          multiline
          rowsMax={9}
          placeholder={t('common:topic_create.comment_placeholder')}
          inputProps={{
            maxLength: TEXT_INPUT_LIMIT,
          }}
        />
      </Box>
      <Box className={classes.sendCont}>
        <Box display="flex" alignItems="center">
          <IconButton className={classes.iconButton} onClick={send} disabled={disabled && text.trim() === ''}>
            <Icon className={`${classes.icon} fas fa-paper-plane`} />
          </IconButton>
        </Box>
      </Box>
    </>
  )
})

const useStyles = makeStyles((theme) => ({
  inputCont: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 97px)',
    marginLeft: 13,
    marginRight: theme.spacing(1),
    minHeight: 38,
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
}))

export default React.memo(CommentInputArea)
