/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import BRInput from './BRInput'
import { OutlinedInputProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'

const BRTimeInput: React.FC<OutlinedInputProps> = () => {
  const classes = useStyles()

  const [time] = useState({ hour: '', minute: '', second: '', millis: '' })

  const handleHourChange = () => {}
  const handleMinuteChange = () => {}
  const handleSecondChange = () => {}
  const handleMillisChange = () => {}

  return (
    <>
      <BRInput value={time.hour} onChange={handleHourChange} placeholder="時" />
      <span className={classes.colon}>:</span>
      <BRInput value={time.minute} onChange={handleMinuteChange} placeholder="分" />
      <span className={classes.colon}>:</span>
      <BRInput value={time.second} onChange={handleSecondChange} placeholder="秒" />
      <span className={classes.colon}>:</span>
      <BRInput value={time.second} onChange={handleMillisChange} placeholder="ミリ秒" />
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
