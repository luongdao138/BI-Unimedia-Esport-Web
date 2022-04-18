/* eslint-disable no-console */
import { Slider, SliderProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { memo, useCallback, useEffect, useState } from 'react'
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
import { DELAY_SECONDS } from '@constants/common.constants'
import { STATUS_VIDEO } from '@services/videoTop.services'
import _ from 'lodash'
interface Props {
  videoRef?: any
  changeStatusStreaming?: (status: boolean) => void
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
}

{
  /*currentTime: seconds
timePlayed: time by 100*/
}

const SeekBar: React.FC<Props & SliderProps> = ({
  videoRef,
  changeStatusStreaming,
  videoType,
  isStreaming,
  isStreamingEnd,
  onVideoEnd,
  state,
  ...rest
}) => {
  const classes = useStyles()
  // const [currentTimeState, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0)
  const [timePlayed, setTimePlayed] = useState(0)
  const { changeSeekCount, liveStreamInfo } = useDetailVideo()

  // duration and timeupdate state
  const [durationPlayer, setDurationPlayer] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)

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

  useEffect(() => {
    console.log(videoRef)

    videoRef.current.addEventListener('timeupdate', throttleUpdateTime)

    videoRef.current.addEventListener('durationchange', throttleUpdateDurationChange)
  }, [])

  useEffect(() => {
    setTimePlayed((playedSeconds / durationPlayer) * 100)
  }, [playedSeconds, durationPlayer])

  const handleChange = (_, value) => {
    const newSecond = (value * durationPlayer) / 100
    setTimePlayed(value)
    if (value === 100) {
      changeStatusStreaming(true)
    } else {
      changeStatusStreaming(false)
    }
    videoRef.current.currentTime = newSecond
  }

  const handleCommit = (_, value) => {
    console.log('~~~VALUE SEEK TO ~~~~~', value, (value * durationPlayer) / 100)
    setTimePlayed(value)
    const newSecond = (value * durationPlayer) / 100
    videoRef.current.currentTime = newSecond
    changeSeekCount(Math.floor(newSecond))
  }

  return (
    <div className={classes.sliderSeek}>
      <Slider
        min={0}
        max={100}
        step={0.1}
        value={timePlayed}
        className={classes.seekBar}
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        {...rest}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  sliderSeek: {
    // width: '100%',
    display: 'block',
    transition: 'width 0.4s ease-in',
    alignItems: 'flex-end',
    justifyContent: 'center',
    // backgroundColor: 'pink',
    // paddingBottom: 10,
    // height:20,
    margin: '0px 5px',
  },
  seekBar: {
    // width: 90,
    // marginLeft: 16,
    // marginRight: 8,
    borderRadius: 2,
    padding: '3px 0px',
    '&:hover .MuiSlider-thumb': {
      visibility: 'visible',
    },
    '& .MuiSlider-rail': {
      color: '#C3C3C3',
      height: 3,
      // borderRadius: 2,
    },
    '& .MuiSlider-track': {
      color: '#FF4786',
      height: 3,
      // borderRadius: 2,
    },
    '& .MuiSlider-thumb': {
      // color: '#fff', //circle
      // width: 8,
      // height: 8,
      // borderRadius: 4,
      visibility: 'hidden',
    },

    '& .MuiSlider-thumb.Mui-focusVisible, .MuiSlider-thumb:hover': {
      boxShadow: 'none',
    },
    // '& .MuiSlider-root': {
    //   // padding: 0,
    // },
  },
}))

export default memo(SeekBar)
