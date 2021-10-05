import { useState, useEffect, ChangeEvent } from 'react'
import BRInput from './BRInput'
import { OutlinedInputProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { DATE_TIME } from '@constants/battleroyale.constants'
import i18n from '@locales/i18n'

const validateNumber = (value: string | number, type: string): boolean => {
  let res = false
  if ((_.isNumber(Number(value)) && !isNaN(Number(value)) && Number(value) > -1) || _.isEmpty(value)) {
    res = true
  }

  if (type === DATE_TIME.MINUTES || type === DATE_TIME.SECONDS) {
    res = _.isNumber(Number(value)) && !isNaN(Number(value)) && Number(value) <= 59 ? true : false
  }

  return res
}

interface timeProps {
  hours: string | number
  minutes: string | number
  seconds: string | number
  millis: string | number
}

const millisToTime = (duration: number | null) => {
  if (duration === null) {
    return { hours: '', minutes: '', seconds: '', millis: '' }
  }

  const millis: string | number = Math.floor(duration % 1000)
  const seconds: string | number = Math.floor((duration / 1000) % 60)
  const minutes: string | number = Math.floor((duration / (1000 * 60)) % 60)
  const hours: string | number = Math.floor(duration / (1000 * 60 * 60))

  return { hours: Number(hours), minutes: minutes, seconds: seconds, millis: millis }
}

const timeToMillis = (time: timeProps) => {
  const { hours, minutes, seconds, millis } = time
  const result = Number(hours) * 60 * 60 * 1000 + Number(minutes) * 60 * 1000 + Number(seconds) * 1000 + Number(millis) * 1
  return result
}

const BRTimeInput: React.FC<
  OutlinedInputProps & { value: number | null; onAttackError: (error: boolean) => void; onChange: ({ target: { value: string } }) => void }
> = ({ value, onChange, onAttackError }) => {
  const classes = useStyles()
  const [time, setTime] = useState<timeProps>(() => millisToTime(value))
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const result = timeToMillis(time)

    if (isNaN(Number(result)) || !validateNumber(time.minutes, DATE_TIME.MINUTES) || !validateNumber(time.seconds, DATE_TIME.SECONDS)) {
      setError(true)
    } else {
      setError(false)
    }

    onChange({ target: { value: String(result) } })
  }, [time])

  useEffect(() => {
    onAttackError(error)
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

  return (
    <>
      <BRInput
        inputProps={{ maxLength: 2 }}
        value={time.hours}
        style={{ color: validateNumber(time.hours, DATE_TIME.HOURS) ? Colors.white_opacity[70] : Colors.secondary }}
        onChange={handleHourChange}
        placeholder={i18n.t('common:common.hour')}
      />
      <span className={classes.colon}>:</span>
      <BRInput
        inputProps={{ maxLength: 2 }}
        value={time.minutes}
        style={{ color: validateNumber(time.minutes, DATE_TIME.MINUTES) ? Colors.white_opacity[70] : Colors.secondary }}
        onChange={handleMinuteChange}
        placeholder={i18n.t('common:common.minute')}
      />
      <span className={classes.colon}>:</span>
      <BRInput
        inputProps={{ maxLength: 2 }}
        value={time.seconds}
        style={{ color: validateNumber(time.seconds, DATE_TIME.SECONDS) ? Colors.white_opacity[70] : Colors.secondary }}
        onChange={handleSecondChange}
        placeholder={i18n.t('common:common.second')}
      />
      <span className={classes.colon}>:</span>
      <BRInput
        inputProps={{ maxLength: 3 }}
        value={time.millis}
        style={{ color: validateNumber(time.millis, DATE_TIME.MILLIS) ? Colors.white_opacity[70] : Colors.secondary }}
        onChange={handleMillisChange}
        placeholder={i18n.t('common:common.millis')}
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
