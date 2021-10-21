import { OutlinedInputProps } from '@material-ui/core'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'

import { FormikProps } from 'formik'
import ESInputStream from './Input'
import _ from 'lodash'

export type InputProps = {
  helperText?: string
  labelPrimary?: string | ReactElement
  labelSecondary?: ReactElement
  required?: boolean
  size?: 'big' | 'small'
  isNumber?: boolean
  formik?: FormikProps<any>
  nowrapHelperText?: boolean
  nameValue?: string
}

const ESNumberInputStream: React.FC<OutlinedInputProps & InputProps> = (props) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (props.value !== null && props.value !== undefined) {
      setValue(String(props.value))
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
    setValue(e.target.value)
    debouncedChangeHandler(e)
    if (props.formik) props.formik.setFieldValue(props.nameValue, e.target.value)
  }

  return <ESInputStream {...props} value={value} onChange={handleChange} />
}

export default ESNumberInputStream
