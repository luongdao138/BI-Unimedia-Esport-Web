import { OutlinedInputProps } from '@material-ui/core'
import { memo, ReactElement, useCallback, useEffect, useState } from 'react'
import ESInput from '@components/Input'
import _ from 'lodash'

export type InputProps = {
  helperText?: string
  labelPrimary?: string | ReactElement
  labelSecondary?: ReactElement
  required?: boolean
  nowrapHelperText?: boolean
  size?: 'big' | 'small'
  isSubmit?: boolean
  resetErrorOnChange?: () => void
  valueRef?: React.MutableRefObject<string>
  inputRef?: React.MutableRefObject<HTMLInputElement>
}

const ESFastChatInput: React.FC<OutlinedInputProps & InputProps> = (props) => {
  const { resetErrorOnChange, valueRef, inputRef } = props
  const [tempMessage, setTempMessage] = useState('')

  useEffect(() => {
    if (props.value !== null && props.value !== undefined) {
      setTempMessage(String(props.value))
    }
  }, [props.value])

  const debouncedChangeHandler = useCallback(
    _.debounce((e) => {
      props.onChange(e)
    }, 300),
    []
  )

  const handleChange = (e) => {
    e.persist()
    setTempMessage(e.target.value)
    valueRef.current = e.target.value
    debouncedChangeHandler(e)
    resetErrorOnChange?.()
  }

  return <ESInput {...props} inputRef={inputRef} value={tempMessage} onChange={handleChange} />
}

export default memo(ESFastChatInput)
