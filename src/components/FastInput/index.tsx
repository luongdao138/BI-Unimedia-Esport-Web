import { OutlinedInputProps } from '@material-ui/core'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import ESInput from '@components/Input'
import _ from 'lodash'

export type InputProps = {
  helperText?: string
  labelPrimary?: string | ReactElement
  labelSecondary?: ReactElement
  required?: boolean
  size?: 'big' | 'small'
}

const ESFastInput: React.FC<OutlinedInputProps & InputProps> = (props) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(String(props.value))
  }, [props.value])

  const debouncedChangeHandler = useCallback(
    _.debounce((e) => {
      props.onChange(e)
    }, 300),
    []
  )

  const handleChange = (e) => {
    e.persist()
    setValue(e.target.value)
    debouncedChangeHandler(e)
  }

  return <ESInput {...props} value={value} onChange={handleChange} />
}

export default ESFastInput
