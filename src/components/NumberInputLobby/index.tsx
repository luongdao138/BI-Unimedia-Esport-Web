import { OutlinedInputProps } from '@material-ui/core'
import { ReactElement } from 'react'
import ESInput from './Input'

import { FormType } from '@containers/Lobby/UpsertForm/FormModel/FormType'
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
  const handleChange = (e) => {
    e.persist()
    const value = e.target.value.replace(/[^0-9]/g, '')
    if (props.formik) props.formik.setFieldValue('stepOne.max_participants', value)
  }

  return <ESInput {...props} value={props.value} onChange={handleChange} />
}

export default ESNumberInput
