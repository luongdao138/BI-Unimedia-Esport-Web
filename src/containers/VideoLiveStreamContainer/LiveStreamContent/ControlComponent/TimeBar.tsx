import { VIDEO_TYPE } from '@containers/VideoLiveStreamContainer'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React, { memo, useEffect, useState } from 'react'

interface Props {
  videoRef: any
  statusVideo?: number
}

const TimeBar: React.FC<Props> = ({ videoRef, statusVideo }) => {
  const classes = useStyles()
  const [currentTimeVid, setCurrentTime] = useState(null)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const onTimeUpdate = (event) => {
      setCurrentTime(event.target.currentTime)
    }
    videoRef.current.addEventListener('timeupdate', onTimeUpdate)
    return () => {
      videoRef.current.removeEventListener('timeupdate', onTimeUpdate)
    }
  })

  useEffect(() => {
    const onDurationChange = () => {
      setDuration(videoRef.current.duration)
    }
    videoRef.current.addEventListener('durationchange', onDurationChange)
    return () => {
      videoRef.current.removeEventListener('durationchange', onDurationChange)
    }
  }, [])

  if (statusVideo !== VIDEO_TYPE.LIVE_STREAM) {
    return <Typography className={classes.textTime}>{FormatHelper.formatTime(currentTimeVid)}</Typography>
  }
  return (
    <Typography className={classes.textTime}>{`${FormatHelper.formatTime(currentTimeVid)} / ${FormatHelper.formatTime(
      duration
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
