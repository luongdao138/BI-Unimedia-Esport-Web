/* eslint-disable no-console */
import { DELAY_SECONDS } from '@constants/common.constants'
import { VideoContext } from '@containers/VideoLiveStreamContainer/VideoContext'
import { useVideoPlayerContext } from '@containers/VideoLiveStreamContainer/VideoContext/VideoPlayerContext'
import { STATUS_VIDEO } from '@services/videoTop.services'
import _ from 'lodash'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

export const useVideoPlayer = (): {
  durationPlayer: number
  playedSeconds: number
} => {
  // duration and timeupdate state
  const [durationPlayer, setDurationPlayer] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)

  const { videoStatus, videoRefInfo } = useContext(VideoContext)
  const { isStreaming, state } = useVideoPlayerContext()

  const handleUpdateDurationTime = (event) => {
    const duration = Math.floor(event.target.duration)
    console.log('==========🚀 ~ usePlayer--11', duration)

    if (!state.playing) {
      // if (Math.floor(duration) !== liveStreamInfo.played_second) {
      //   // changeVideoTime(Math.floor(duration), Math.floor(duration))
      // }
      setDurationPlayer(duration)
    }
  }

  const handleUpdateVideoTime = useRef(null)
  const onUpdateVideoTime = (videoInfo) => {
    // console.log('🚀 ~ seekbar-33', 44)

    const newPlayedSecondTime = videoInfo?.currentTime
    // console.log('🚀 ~ usePlayer--22', newPlayedSecondTime)
    let durationTime = videoStatus === STATUS_VIDEO.LIVE_STREAM ? videoInfo.duration - DELAY_SECONDS : videoInfo.duration
    // handle delayed time when is living
    if (isStreaming && videoStatus === STATUS_VIDEO.LIVE_STREAM) {
      const isDelayedTime = newPlayedSecondTime < durationTime || newPlayedSecondTime > durationTime
      // reset duration time to equal played time when live is delayed
      if (isDelayedTime) {
        durationTime = newPlayedSecondTime
      }
    }
    // if(!isStreaming && durationTime < newPlayedSecondTime && videoStatus === STATUS_VIDEO.LIVE_STREAM){
    if (!isStreaming && videoStatus === STATUS_VIDEO.LIVE_STREAM) {
      durationTime = videoInfo?.duration
    }
    const newDurationTime = durationTime
    // const newDurationTime = videoInfo.duration
    const newPlayedSecond = Math.floor(newPlayedSecondTime)
    const newDurationPlayer = Math.floor(newDurationTime)
    if (newPlayedSecond !== Math.floor(playedSeconds)) {
      setPlayedSeconds(newPlayedSecond)
    }
    if (newDurationPlayer !== Math.floor(durationPlayer)) setDurationPlayer(newDurationPlayer)
  }
  handleUpdateVideoTime.current = onUpdateVideoTime

  const throttleUpdateTime = useCallback(
    _.throttle((videoInfo) => {
      handleUpdateVideoTime.current(videoInfo)
    }, 1000),
    []
  )

  const throttleUpdateDurationTime = useCallback(
    _.throttle((event) => {
      // console.log('🚀 ~ seekbar-44', duration)
      handleUpdateDurationTime(event)
    }, 1000),
    []
  )

  useEffect(() => {
    videoRefInfo.current.addEventListener('timeupdate', (event) => {
      const videoInfo = event.target
      // handleUpdateVideoTime.current(videoInfo)
      throttleUpdateTime(videoInfo)
    })

    videoRefInfo.current.addEventListener('durationchange', (event) => {
      // const duration = event.target.duration
      // console.log('🚀 ~ seekbar-22', duration)
      throttleUpdateDurationTime(event)
    })
    // videoRefInfo.current.addEventListener('durationchange', handleUpdateDurationTime)
  }, [])

  return { durationPlayer, playedSeconds }
}
