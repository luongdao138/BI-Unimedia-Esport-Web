import { OutlinedInputProps } from '@material-ui/core'
import React, { memo, ReactElement, useCallback, useEffect, useState } from 'react'
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
  formatValue?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    isValid: boolean
    formattedValue: string
  }
}

const ESFastChatInput: React.FC<OutlinedInputProps & InputProps> = (props) => {
  const { resetErrorOnChange, valueRef, inputRef, formatValue } = props
  const [tempMessage, setTempMessage] = useState('')

  useEffect(() => {
    if (props.value !== null && props.value !== undefined) {
      setTempMessage(String(props.value))
    }
  }, [props.value])

  const debouncedChangeHandler = useCallback(
    _.debounce((e) => {
      props.onChange(e)
    }, 350),
    []
  )

  const handleChange = (e) => {
    e.persist()
    if (formatValue) {
      const { isValid, formattedValue } = formatValue(e)
      if (isValid) {
        setTempMessage(formattedValue)
        if (valueRef) {
          valueRef.current = formattedValue
        }
      }
    } else {
      setTempMessage(e.target.value)
      if (valueRef) {
        valueRef.current = e.target.value
      }
    }
    debouncedChangeHandler(e)
    resetErrorOnChange?.()
  }

  return <ESInput {...props} inputRef={inputRef} value={tempMessage} onChange={handleChange} />
}

export default memo(ESFastChatInput)
