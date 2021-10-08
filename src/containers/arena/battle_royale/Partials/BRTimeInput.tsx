import { useState, useEffect, ChangeEvent } from 'react'
import BRInput, { ErrorType } from './BRInput'
import { OutlinedInputProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import i18n from '@locales/i18n'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'

type TimeInputError = {
  hours: ErrorType
  minutes: ErrorType
  seconds: ErrorType
  millis: ErrorType
}

const checkNumber = (v: any) => !(_.isNumber(Number(v)) && !isNaN(Number(v)))
const errorDefault = {
  hours: {},
  minutes: {},
  seconds: {},
  millis: {},
}
interface TimeProps {
  hours: string | number
  minutes: string | number
  seconds: string | number
  millis: string | number
}

const validateError = (value: TimeProps): TimeInputError => {
  let errors: TimeInputError = errorDefault

  if (value.hours) {
    if (checkNumber(value.hours)) {
      errors = { ...errors, hours: { ...errors.hours, time_attack_format_invalid: true } }
    }
  }
  if (value.minutes) {
    if (checkNumber(value.minutes)) {
      errors = { ...errors, minutes: { ...errors.minutes, time_attack_format_invalid: true } }
    }
    if (Number(value.minutes) > 59) {
      errors = { ...errors, minutes: { ...errors.minutes, time_attack_max_exceeds: true } }
    }
  }
  if (value.seconds) {
    if (checkNumber(value.seconds)) {
      errors = { ...errors, seconds: { ...errors.seconds, time_attack_format_invalid: true } }
    }
    if (Number(value.seconds) > 59) {
      errors = { ...errors, seconds: { ...errors.seconds, time_attack_max_exceeds: true } }
    }
  }
  if (value.millis) {
    if (checkNumber(value.millis)) {
      errors = { ...errors, millis: { ...errors.millis, time_attack_format_invalid: true } }
    }
  }

  return errors
}

const BRTimeInput: React.FC<
  OutlinedInputProps & {
    value: number | ''
    onAttackError?: (error: ErrorType) => void
    onChange: ({ target: { value: string } }) => void
  }
> = ({ value, onChange, onAttackError, ...props }) => {
  const classes = useStyles()
  const [time, setTime] = useState<TimeProps>(() => TournamentHelper.millisToTime(Number(value)))
  const [error, setError] = useState<TimeInputError>(errorDefault)

  useEffect(() => {
    setError(validateError(time))
    onChange({ target: { value: TournamentHelper.timeToMillis(time) } })
  }, [time])

  useEffect(() => {
    onAttackError(mergeErrors(error))
  }, [error])

  const handleHourChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime((prevState) => ({
      ...prevState,
      hours: event.target.value,
    }))
  }

  const handleMinuteChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime((prevState) => ({
      ...prevState,
      minutes: event.target.value,
    }))
  }

  const handleSecondChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime((prevState) => ({
      ...prevState,
      seconds: event.target.value,
    }))
  }

  const handleMillisChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime((prevState) => ({
      ...prevState,
      millis: event.target.value,
    }))
  }

  const hasError = {
    hours: !_.isEmpty(error.hours),
    minutes: !_.isEmpty(error.minutes),
    seconds: !_.isEmpty(error.seconds),
    millis: !_.isEmpty(error.millis),
  }

  return (
    <>
      <BRInput
        inputProps={{ maxLength: 2 }}
        value={time.hours}
        style={{ color: hasError.hours ? Colors.secondary : Colors.white_opacity[70] }}
        onChange={handleHourChange}
        placeholder={i18n.t('common:common.hour')}
        {...props}
      />
      <span className={classes.colon}>:</span>
      <BRInput
        inputProps={{ maxLength: 2 }}
        value={time.minutes}
        style={{ color: hasError.minutes ? Colors.secondary : Colors.white_opacity[70] }}
        onChange={handleMinuteChange}
        placeholder={i18n.t('common:common.minute')}
        {...props}
      />
      <span className={classes.colon}>:</span>
      <BRInput
        inputProps={{ maxLength: 2 }}
        value={time.seconds}
        style={{ color: hasError.seconds ? Colors.secondary : Colors.white_opacity[70] }}
        onChange={handleSecondChange}
        placeholder={i18n.t('common:common.second')}
        {...props}
      />
      <span className={classes.colon}>:</span>
      <BRInput
        inputProps={{ maxLength: 3 }}
        value={time.millis}
        style={{ color: hasError.millis ? Colors.secondary : Colors.white_opacity[70] }}
        onChange={handleMillisChange}
        placeholder={i18n.t('common:common.millis')}
        {...props}
      />
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  colon: {
    fontSize: 15,
    marginLeft: theme.spacing(1 / 6),
    marginRight: theme.spacing(1 / 6),
  },
}))

export default BRTimeInput

const mergeErrors = (errors: Record<string, ErrorType>): ErrorType => {
  const errorArray = Object.values(errors)
  if (errorArray.length) return errorArray.reduce((prev, curr) => ({ ...prev, ...curr }))
  return {}
}
