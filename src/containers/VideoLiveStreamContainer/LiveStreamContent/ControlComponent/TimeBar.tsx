import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { STATUS_VIDEO } from '@services/videoTop.services'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React, { memo } from 'react'
interface Props {
  statusVideo?: number | boolean
  // currentTime?: number
  // durationsPlayer?: number
  videoType?: any
  isStreaming: boolean
  isStreamingEnd: React.MutableRefObject<boolean>
  onVideoEnd?: () => void
  state: {
    playing: boolean
    muted: boolean
    volume: number
    ended: boolean
  }
  videoRef?: any
  playedSeconds: number
  durationPlayer: number
}

const TimeBar: React.FC<Props> = ({ statusVideo, playedSeconds, durationPlayer }) => {
  const classes = useStyles()

  if (statusVideo === STATUS_VIDEO.LIVE_STREAM) {
    return <Typography className={classes.textTime}>{FormatHelper.formatTime(playedSeconds)}</Typography>
  }
  return (
    <Typography className={classes.textTime}>{`${FormatHelper.formatTime(playedSeconds)} / ${FormatHelper.formatTime(
      durationPlayer
    )}`}</Typography>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  textTime: {
    fontSize: 15,
    color: Colors.white,
  },
  [theme.breakpoints.down(576)]: {
    textTime: {
      fontSize: 10,
    },
  },
}))

export default memo(TimeBar)
