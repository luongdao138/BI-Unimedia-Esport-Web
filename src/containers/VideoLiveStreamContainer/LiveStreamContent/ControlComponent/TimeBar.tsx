import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { DELAY_SECONDS } from '@constants/common.constants'
import { STATUS_VIDEO } from '@services/videoTop.services'
import _ from 'lodash'
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
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
}

const TimeBar: React.FC<Props> = ({ statusVideo, videoType, isStreaming, isStreamingEnd, onVideoEnd, state, videoRef }) => {
  const classes = useStyles()

  // duration and timeupdate state
  const [durationPlayer, setDurationPlayer] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const { liveStreamInfo } = useDetailVideo()

  const throttleUpdateTime = useCallback(
    _.throttle((event) => {
      const videoInfo = event.target
      const newPlayedSecondTime = videoInfo.currentTime
      let durationTime = videoType === STATUS_VIDEO.LIVE_STREAM ? videoInfo.duration - DELAY_SECONDS : videoInfo.duration
      // handle delayed time when is living
      if (isStreaming && videoType === STATUS_VIDEO.LIVE_STREAM) {
        const isDelayedTime = newPlayedSecondTime < durationTime || newPlayedSecondTime > durationTime
        // reset duration time to equal played time when live is delayed
        if (isDelayedTime) {
          durationTime = newPlayedSecondTime
        }
      }
      // if(!isStreaming && durationTime < newPlayedSecondTime && videoType === STATUS_VIDEO.LIVE_STREAM){
      if (!isStreaming && videoType === STATUS_VIDEO.LIVE_STREAM) {
        durationTime = videoInfo.duration
      }
      const newDurationTime = durationTime
      // const newDurationTime = videoInfo.duration
      setPlayedSeconds(newPlayedSecondTime)
      setDurationPlayer(newDurationTime)
      if (
        Math.floor(newPlayedSecondTime) !== liveStreamInfo.played_second ||
        Math.floor(newDurationTime) !== liveStreamInfo.streaming_second
      ) {
        // changeVideoTime(Math.floor(newDurationTime), Math.floor(newPlayedSecondTime))
      }
    }, 1000),
    []
  )

  const throttleUpdateDurationChange = useCallback(
    _.throttle((event) => {
      if (isStreamingEnd.current) {
        onVideoEnd()
      }
      const duration = event.target.duration

      if (!state.playing) {
        if (Math.floor(duration) !== liveStreamInfo.played_second) {
          // changeVideoTime(Math.floor(duration), Math.floor(duration))
        }
        setDurationPlayer(duration)
      }
    }, 1000),
    []
  )

  // console.log('time bar render.')

  useEffect(() => {
    videoRef.current.addEventListener('timeupdate', throttleUpdateTime)

    videoRef.current.addEventListener('durationchange', throttleUpdateDurationChange)
  }, [])

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
