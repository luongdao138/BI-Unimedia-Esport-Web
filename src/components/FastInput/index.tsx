import { OutlinedInputProps } from '@material-ui/core'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import ESInput from '@components/Input'
import _ from 'lodash'

export type InputProps = {
  helperText?: string
  labelPrimary?: string | ReactElement
  labelSecondary?: ReactElement
  required?: boolean
  nowrapHelperText?: boolean
  size?: 'big' | 'small'
}

const ESFastInput: React.FC<OutlinedInputProps & InputProps> = (props) => {
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
    debouncedChangeHandler(e)
  }

  return <ESInput {...props} value={tempMessage} onChange={handleChange} />
}

export default ESFastInput
