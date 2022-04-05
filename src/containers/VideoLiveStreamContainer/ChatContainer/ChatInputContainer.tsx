import LoginRequired from '@containers/LoginRequired'
import i18n from '@locales/i18n'
import { Box, Button, InputAdornment, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useFormik } from 'formik'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import { sanitizeMess } from './index'
import EsFastChatInput from './FastChatInput'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'

type MessageValidationType = {
  message: string
}

type ChatInputProps = {
  isResetMess: boolean
  handleChatInputOnFocus?: () => void
  handleChatInputOnBlur?: () => void
  purchaseButton: any
  setErrorMess: (errorMess: string) => void
  sendNormalMess: (mess: string) => void
}

const validationSchema = Yup.object().shape({
  message: Yup.string()
    .required(i18n.t('common:live_stream_screen.chat_input_text_validate_msg_empty'))
    .max(50, i18n.t('common:live_stream_screen.chat_input_text_validate_msg_50_char_exceed'))
    .trim(),
})

const ChatInputContainer: React.FC<ChatInputProps> = ({
  isResetMess,
  handleChatInputOnFocus,
  handleChatInputOnBlur,
  setErrorMess,
  sendNormalMess,
  purchaseButton,
}) => {
  const [isFocusedInput, setIsFocusedInput] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const valueRef = useRef<string>('')
  const isMountRef = useRef<boolean>(false)
  const { isLandscape } = useRotateScreen()

  const { handleChange, values, handleSubmit, errors, resetForm, setFieldValue, setFieldError } = useFormik<MessageValidationType>({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: (values) => {
      sendNormalMess(sanitizeMess(values.message))
    },
    validateOnChange: false,
  })

  const submitForm = useCallback(async () => {
    // if (!valueRef.current) {
    //   await setFieldValue('message', '')
    //   return
    // }
    if (valueRef.current) {
      await setFieldValue('message', valueRef.current)
      handleSubmit()
    } else {
      await setFieldValue('message', '')
      handleSubmit()
    }
  }, [])

  const resetErrorOnChange = useCallback(() => {
    if (errors.message) {
      setFieldError('message', undefined)
    }
  }, [errors.message])

  const classes = useStyles({ isLandscape })

  useEffect(() => {
    resetForm()
    valueRef.current = ''

    if (!isMountRef.current) {
      isMountRef.current = true
      return
    }
    inputRef.current.focus()
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
      submitForm()
    }
  }
  return (
    <Box className={classes.chatBox}>
      <Box className={classes.spPurchaseButton}>{purchaseButton()}</Box>
      <EsFastChatInput
        id={'message'}
        name="message"
        valueRef={valueRef}
        inputRef={inputRef}
        onChange={handleChange}
        placeholder={i18n.t('common:live_stream_screen.message_placeholder')}
        value={values.message}
        classes={{ root: classes.input, input: classes.chatTextInput }}
        margin="dense"
        onFocus={() => {
          handleChatInputOnFocus()
          setIsFocusedInput(true)
        }}
        onBlur={() => {
          handleChatInputOnBlur()
          setIsFocusedInput(false)
        }}
        helperText={errors?.message}
        error={Boolean(errors.message)}
        onKeyPress={handlePressEnter}
        resetErrorOnChange={resetErrorOnChange}
        endAdornment={
          <LoginRequired>
            <InputAdornment position="end" className={classes.button_send_sp} onClick={submitForm}>
              {isFocusedInput ? <img src="/images/send_icon_pink_sp.svg" /> : <img src="/images/send_icon_white_sp.svg" />}
            </InputAdornment>
          </LoginRequired>
        }
      />
      <LoginRequired>
        <Button onClick={submitForm} className={classes.iconButtonBg}>
          <img src="/images/send_icon.svg" />
          {/* <Icon className={`fa fa-paper-plane ${classes.sendIcon}`} fontSize="small" /> */}
        </Button>
      </LoginRequired>
    </Box>
  )
}

export default memo(ChatInputContainer, (prevProps, nextProps) => {
  if (prevProps.isResetMess !== nextProps.isResetMess) {
    return false
  }
  return true
})

interface StyleProps {
  isLandscape: boolean
}

const useStyles = makeStyles((theme) => ({
  button_send_sp: {
    display: 'none',
  },
  spPurchaseButton: { display: 'none' },

  // chat box container
  chatBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    '& .MuiFormControl-root': {
      flex: 1,
    },
    '& .MuiInputBase-root': {
      background: '#0A0A0A',
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
    color: Colors.white_opacity[87],
    background: '#0A0A0A',
    '&::placeholder': {
      color: Colors.white_opacity[30],
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
  [theme.breakpoints.down(769)]: {
    spPurchaseButton: {
      display: 'block',
    },
    input: () => ({
      borderRadius: 12,
      height: 'auto',
    }),
    chatTextInput: {
      padding: '3.5px 14px',
      fontSize: '12px',
      height: '17px',
      lineHeight: '17px',
    },
    iconButtonBg: {
      display: 'none',
    },
    chatBox: {
      alignItems: 'center',
    },
    button_send_sp: {
      display: 'inline-flex',
    },
  },
  [`@media (orientation: landscape)`]: {
    chatTextInput: (props: StyleProps) => {
      if (props.isLandscape) {
        return {
          height: '17px',
          padding: '3.5px 14px',
          fontSize: '12px',
          lineHeight: '17px',
        }
      }
    },
    iconButtonBg: (props: StyleProps) => {
      if (props.isLandscape)
        return {
          display: 'none',
        }
    },
    input: (props: StyleProps) => {
      if (props.isLandscape)
        return {
          height: 'auto',
          borderRadius: '12px',
        }
    },
    chatBox: (props: StyleProps) => {
      if (props.isLandscape)
        return {
          alignItems: 'center',
        }
    },
    spPurchaseButton: (props: StyleProps) => {
      if (props.isLandscape)
        return {
          display: 'block',
        }
    },
    button_send_sp: (props: StyleProps) => {
      if (props.isLandscape)
        return {
          display: 'inline-flex',
        }
    },
  },
}))
