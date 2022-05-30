import { OutlinedInputProps } from '@material-ui/core'
import React, { memo, ReactElement, useEffect, useRef, useState } from 'react'
import ESInput from '@components/Input'
import useSearch from '@containers/Search/useSearch'

export type InputProps = {
  helperText?: string
  labelPrimary?: string | ReactElement
  labelSecondary?: ReactElement
  required?: boolean
  nowrapHelperText?: boolean
  size?: 'big' | 'small'
  isSubmit?: boolean
  valueRef?: React.MutableRefObject<string>
  inputRef?: React.MutableRefObject<HTMLInputElement>
  checkHaveValue: (value: string) => void
  clearFlag: boolean
}

const FastSearchInput: React.FC<OutlinedInputProps & InputProps> = (props) => {
  const { valueRef, inputRef } = props
  const { searchKeyword } = useSearch()
  const [tempMessage, setTempMessage] = useState(searchKeyword)
  const firstRenderRef = useRef<boolean>(true)

  // console.log('Submit chat rerender')
  useEffect(() => {
    props.checkHaveValue(tempMessage)
  }, [tempMessage])

  useEffect(() => {
    // [CW] set default option of search area is video when current route is video detail screen
    setTempMessage(searchKeyword)
    valueRef.current = searchKeyword
  }, [searchKeyword])

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    setTempMessage('')
    valueRef.current = ''
  }, [props.clearFlag])

  const handleChange = (e) => {
    e.persist()
    setTempMessage(e.target.value)
    if (valueRef) {
      valueRef.current = e.target.value
    }
  }

  return <ESInput {...props} inputRef={inputRef} value={tempMessage} onChange={handleChange} />
}

export default memo(FastSearchInput)
