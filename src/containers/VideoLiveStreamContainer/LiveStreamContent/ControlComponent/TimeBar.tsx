import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { STATUS_VIDEO } from '@services/videoTop.services'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React, { memo } from 'react'

interface Props {
  statusVideo?: number | boolean
  currentTime?: number
  durationsPlayer?: number
}

const TimeBar: React.FC<Props> = ({ statusVideo, currentTime, durationsPlayer }) => {
  const classes = useStyles()

  if (statusVideo === STATUS_VIDEO.LIVE_STREAM) {
    return <Typography className={classes.textTime}>{FormatHelper.formatTime(currentTime)}</Typography>
  }
  return (
    <Typography className={classes.textTime}>{`${FormatHelper.formatTime(currentTime)} / ${FormatHelper.formatTime(
      durationsPlayer
    )}`}</Typography>
  )
}

const useStyles = makeStyles(() => ({
  textTime: {
    fontSize: 15,
    color: Colors.white,
  },
}))

export default memo(TimeBar)
