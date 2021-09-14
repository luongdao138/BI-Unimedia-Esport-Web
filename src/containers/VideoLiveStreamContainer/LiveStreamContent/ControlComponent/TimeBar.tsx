import { VIDEO_TYPE } from '@containers/VideoLiveStreamContainer'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React, { memo } from 'react'

interface Props {
  statusVideo?: number
  currentTime?: number
  durationsPlayer?: number
}

const TimeBar: React.FC<Props> = ({ statusVideo, currentTime, durationsPlayer }) => {
  const classes = useStyles()

  if (statusVideo !== VIDEO_TYPE.LIVE_STREAM) {
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
