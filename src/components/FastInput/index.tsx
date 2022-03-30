import { OutlinedInputProps } from '@material-ui/core'
import { memo, ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import ESInput from '@components/Input'
import _ from 'lodash'

export type InputProps = {
  helperText?: string
  labelPrimary?: string | ReactElement
  labelSecondary?: ReactElement
  required?: boolean
  nowrapHelperText?: boolean
  size?: 'big' | 'small'
  isSubmit: boolean
  submitFormUpdate: (message: string) => void
}

const ESFastInput: React.FC<OutlinedInputProps & InputProps> = (props) => {
  const { isSubmit, submitFormUpdate } = props
  const [tempMessage, setTempMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>()

  useEffect(() => {
    if (props.value !== null && props.value !== undefined) {
      setTempMessage(String(props.value))
    }
  }, [props.value])

  useEffect(() => {
    if (isSubmit) {
      submitFormUpdate(tempMessage)
    }
  }, [isSubmit])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [isSubmit])

  const debouncedChangeHandler = useCallback(
    _.debounce((e) => {
      props.onChange(e)
    }, 300),
    []
  )

  const handleChange = (e) => {
    e.persist()
    setTempMessage(e.target.value)
    debouncedChangeHandler(e)
  }

  return <ESInput {...props} ref={inputRef} value={tempMessage} onChange={handleChange} />
}

export default memo(ESFastInput)
