import { OutlinedInputProps } from '@material-ui/core'
import { ReactElement, useEffect, useState } from 'react'
import ESInput from './Input'

import { FormType } from '@containers/arena/UpsertForm/FormModel/FormType'
import { FormikProps } from 'formik'

export type InputProps = {
  helperText?: string
  labelPrimary?: string | ReactElement
  labelSecondary?: ReactElement
  required?: boolean
  size?: 'big' | 'small'
  isNumber?: boolean
  formik?: FormikProps<FormType>
  nowrapHelperText?: boolean
}

const ESNumberInput: React.FC<OutlinedInputProps & InputProps> = (props) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (props.value !== null && props.value !== undefined) {
      setValue(String(props.value))
    }
  }, [props.value])

  const handleChange = (e) => {
    e.persist()
    setValue(e.target.value)
    if (props.formik) props.formik.setFieldValue('stepTwo.max_participants', e.target.value)
  }

  return <ESInput {...props} value={value} onChange={handleChange} />
}

export default ESNumberInput
