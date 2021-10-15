import React, { Ref, useImperativeHandle, useState, forwardRef } from 'react'
import { Box, Icon, IconButton, makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import InputBase from '@material-ui/core/InputBase'

export interface ClearInputrRef {
  clearInput: () => void
}
const TEXT_INPUT_LIMIT = 5000

export interface MessageInputAreaProps {
  onPressSend?: (text: string) => void
  text?: string | null
  disabled?: boolean
  ref: Ref<ClearInputrRef>
}

const CommentInputArea: React.FC<MessageInputAreaProps> = forwardRef<ClearInputrRef, MessageInputAreaProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    clearInput: () => {
      setText('')
    },
  }))
  const { onPressSend, disabled } = props

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

  // const handleKeyPress = (_evt: React.KeyboardEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLInputElement>) => {
  //   //  if (evt.key === 'Enter' && evt.shiftKey === false) {
  //   //    onPressSend ? onPressSend(text.trim()) : undefined
  //   //    evt.preventDefault()
  //   //  }
  // }

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
          inputProps={{ maxLength: TEXT_INPUT_LIMIT, style: { overflow: 'visible' } }}
        />
      </Box>
      <Box className={classes.sendCont}>
        <Box display="flex" alignItems="center">
          <IconButton className={classes.iconButton} onClick={send} disabled={disabled || text.trim() == ''}>
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
    padding: 9,
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
