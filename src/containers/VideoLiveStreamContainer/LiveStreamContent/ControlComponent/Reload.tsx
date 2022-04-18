/* eslint-disable no-console */
import { Box, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { memo, useEffect, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import PlayerTooltip from './PlayerTooltip'
import useDetailVideo from '../../useDetailVideo'
import { STATUS_VIDEO } from '@services/videoTop.services'
import { DELAY_SECONDS } from '@constants/common.constants'
import _ from 'lodash'
interface Props {
  videoRef?: any
  typeButton: 'reload' | 'previous' | 'next'
  isLive?: boolean
  onPressCallback?: () => void
  videoStatus?: number
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

const ReloadButton: React.FC<Props> = ({
  videoRef,
  typeButton,
  isLive,
  onPressCallback,
  videoStatus,
  videoType,
  isStreaming,
  isStreamingEnd,
  onVideoEnd,
  state,
}) => {
  const classes = useStyles({ isLive })
  const { t } = useTranslation('common')
  const { changeSeekCount } = useDetailVideo()

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

  useEffect(() => {
    videoRef.current.addEventListener('timeupdate', throttleUpdateTime)

    videoRef.current.addEventListener('durationchange', throttleUpdateDurationChange)
  }, [])

  console.log('reload component render.')
  const onChangeTime = () => {
    let newSecond = 0
    // if (!isLive) {
    switch (typeButton) {
      case 'reload':
        videoRef.current.currentTime = videoStatus === STATUS_VIDEO.LIVE_STREAM ? durationPlayer : 0
        break
      case 'previous':
        videoRef.current.currentTime = playedSeconds - 10
        newSecond = playedSeconds - 10
        break
      case 'next':
        videoRef.current.currentTime = playedSeconds + 10
        newSecond = playedSeconds + 10
        break
    }
    // eslint-disable-next-line no-console
    changeSeekCount(Math.floor(newSecond))
    // }
    if (onPressCallback && typeof onPressCallback === 'function') {
      onPressCallback()
    }
  }
  if (typeButton === 'reload') {
    return (
      <Box className={classes.buttonNormalReload} onClick={onChangeTime} data-tip data-for="reload">
        <img src={'/images/ic_reload.svg'} className={classes.imageReload} />
        <PlayerTooltip id={'reload'} title={t('videos_top_tab.reload')} offset={{ top: -15, left: 0 }} />
      </Box>
    )
  } else if (typeButton === 'previous') {
    return (
      <Box className={classes.buttonNormal} onClick={onChangeTime} data-tip data-for="previous">
        <img src={'/images/ic_previous.svg'} className={classes.image} />
        <PlayerTooltip id={'previous'} title={t('videos_top_tab.previous')} offset={{ top: -15, left: 0 }} />
      </Box>
    )
  } else {
    return (
      <Box className={classes.buttonNormal} onClick={onChangeTime} data-tip data-for="next">
        <img src={'/images/ic_next.svg'} className={classes.image} />
        <PlayerTooltip id={'next'} title={t('videos_top_tab.next')} offset={{ top: -15, left: 0 }} />
      </Box>
    )
  }
}
const useStyles = makeStyles((theme: Theme) => ({
  buttonNormal: (props: { isLive: boolean }) => {
    return {
      alignItems: 'center',
      display: 'flex',
      cursor: props.isLive ? 'not-allowed' : 'pointer',
      padding: '0px 8px',
    }
  },
  image: (props: { isLive: boolean }) => {
    return {
      filter: props.isLive ? 'opacity(0.5)' : 'none',
    }
  },
  buttonNormalReload: {
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    padding: '0px 8px',
  },
  imageReload: {
    filter: 'none',
  },
  [theme.breakpoints.down('xs')]: {
    imageReload: {
      width: 11.39,
      height: 11.85,
    },
  },
}))

export default memo(ReloadButton)
