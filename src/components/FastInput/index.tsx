import { OutlinedInputProps } from '@material-ui/core'
import { ReactElement, useRef, useState } from 'react'
import ESInput from '@components/Input'
import { debounce } from 'lodash'

export type InputProps = {
  helperText?: string
  labelPrimary?: string | ReactElement
  labelSecondary?: ReactElement
  required?: boolean
  size?: 'big' | 'small'
}

const ESFastInput: React.FC<OutlinedInputProps & InputProps> = (props) => {
  const [value, setValue] = useState(props.value)

  const debouncedChangeHandler = useRef(debounce(props.onChange, 300))

  const handleChange = (e) => {
    e.persist()
    setValue(e.target.value)
    debouncedChangeHandler.current(e)
  }

  return <ESInput {...props} value={value} onChange={handleChange} />
}

export default ESFastInput
