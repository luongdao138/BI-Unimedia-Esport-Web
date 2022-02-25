import { Box, Button, makeStyles, Icon } from '@material-ui/core'
import i18n from '@locales/i18n'
import React, { useEffect, memo } from 'react'
import { sanitizeMess } from './index'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ESFastInput from '@components/FastInput'
import LoginRequired from '@containers/LoginRequired'

type MessageValidationType = {
  message: string
}

type ChatInputProps = {
  isResetMess: boolean
  handleChatInputOnFocus?: () => void
  handleChatInputOnBlur?: () => void
  setErrorMess: (errorMess: string) => void
  sendNormalMess: (mess: string) => void
}

const validationSchema = Yup.object().shape({
  message: Yup.string()
    .required(i18n.t('common:live_stream_screen.chat_input_text_validate_msg_empty'))
    .max(50, i18n.t('common:live_stream_screen.chat_input_text_validate_msg_50_char_exceed'))
    .trim(),
})

const ChatInput: React.FC<ChatInputProps> = ({
  isResetMess,
  handleChatInputOnFocus,
  handleChatInputOnBlur,
  setErrorMess,
  sendNormalMess,
}) => {
  const { handleChange, values, handleSubmit, errors, resetForm } = useFormik<MessageValidationType>({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: (values) => {
      sendNormalMess(sanitizeMess(values.message))
    },
  })

  const classes = useStyles()

  useEffect(() => {
    values.message = ''
    resetForm()
  }, [isResetMess])

  useEffect(() => {
    if (errors.message) {
      setErrorMess(errors.message)
    } else {
      setErrorMess('')
    }
  }, [errors.message])

  const handlePressEnter = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }
  return (
    <Box className={classes.chatBox}>
      <ESFastInput
        id={'message'}
        name="message"
        onChange={handleChange}
        placeholder={i18n.t('common:live_stream_screen.message_placeholder')}
        value={values.message}
        classes={{ root: classes.input, input: classes.chatTextInput }}
        margin="dense"
        onFocus={handleChatInputOnFocus}
        onBlur={handleChatInputOnBlur}
        helperText={errors?.message}
        error={!!errors?.message}
        onKeyPress={handlePressEnter}
      />
      <LoginRequired>
        <Button
          onClick={() => {
            handleSubmit()
          }}
          className={classes.iconButtonBg}
        >
          <Icon className={`fa fa-paper-plane ${classes.sendIcon}`} fontSize="small" />
        </Button>
      </LoginRequired>
    </Box>
  )
}

export default memo(ChatInput, (prevProps, nextProps) => {
  if (prevProps.isResetMess !== nextProps.isResetMess) {
    return false
  }
  return true
})

const useStyles = makeStyles(() => ({
  chatBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    '& .MuiFormControl-root': {
      flex: 1,
    },
  },
  input: () => ({
    height: 42,
    borderBottomRightRadius: 'unset',
    zIndex: 11,
    width: '100%',
    borderTopRightRadius: 'unset',
    backgroundColor: '#4D4D4D',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 1,
      borderColor: '#FFFFFF',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(247, 247, 53, 0.1)',
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #4d4d4d inset',
    },
  }),
  chatTextInput: {
    fontSize: 14,
    color: 'white',
    '&::placeholder': {
      color: '#FFFFFF',
      opacity: 1,
    },
  },
  iconButtonBg: {
    height: 42,
    backgroundColor: '#FF4786',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 4,
  },
  sendIcon: {
    width: 30,
  },
}))
