import { useState, useEffect, ChangeEvent } from 'react'
import BRInput, { ErrorType } from './BRInput'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { OutlinedInputProps } from '@material-ui/core'

interface ScoreProps {
  value: string | number
}
const validateError = ({ value }: ScoreProps): ErrorType => {
  const error: ErrorType = {}
  if (value) {
    if (Number(value) > 99999999) {
      error['score_attack_max_exceeds'] = true
    }
    if (!(_.isNumber(Number(value)) && !isNaN(Number(value)))) {
      error['score_attack_format_invalid'] = true
    }
  }

  return error
}

const BRScoreInput: React.FC<
  OutlinedInputProps & {
    value: number | ''
    onAttackError: (error: ErrorType) => void
    onChange: ({ target: { value: string } }) => void
  }
> = ({ value, onChange, onAttackError, ...props }) => {
  const [score, setScore] = useState<ScoreProps>({ value })
  const [error, setError] = useState<ErrorType>({})

  useEffect(() => {
    setError(validateError(score))
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

  const hasError = Object.keys(error).length

  return (
    <BRInput
      value={score.value}
      inputProps={{ maxLength: 9 }}
      style={{ color: hasError ? Colors.secondary : Colors.white_opacity[70] }}
      onChange={handleChange}
      placeholder={i18n.t('common:arena.not_entered')}
      {...props}
    />
  )
}

export default BRScoreInput
