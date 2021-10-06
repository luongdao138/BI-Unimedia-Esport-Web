import { useState, useEffect, ChangeEvent } from 'react'
import BRInput from './BRInput'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { OutlinedInputProps } from '@material-ui/core'

const validateNumber = (value: string | number): boolean => {
  let res = false
  if ((_.isNumber(Number(value)) && !isNaN(Number(value))) || _.isEmpty(value)) {
    res = true
  }

  return res
}

interface ScoreProps {
  value: string | number
}

const BRScoreInput: React.FC<
  OutlinedInputProps & {
    value: number | null
    onAttackError: (error: boolean) => void
    onChange: ({ target: { value: string } }) => void
  }
> = ({ value, onChange, onAttackError, ...props }) => {
  const [score, setScore] = useState<ScoreProps>({ value: value })
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    if (!validateNumber(score.value)) {
      setError(true)
    } else {
      setError(false)
    }

    onChange({ target: { value: String(score.value) } })
  }, [score])

  useEffect(() => {
    onAttackError(error)
  }, [error])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setScore((prevState) => ({
      ...prevState,
      value: event.target.value,
    }))
  }

  return (
    <BRInput
      value={score.value}
      inputProps={{ maxLength: 8 }}
      style={{ color: validateNumber(score.value) ? Colors.white_opacity[70] : Colors.secondary }}
      onChange={handleChange}
      placeholder={i18n.t('common:arena.not_entered')}
      {...props}
    />
  )
}

export default BRScoreInput
