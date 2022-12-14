/* eslint-disable no-console */
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
import { useVideoPlayerContext } from '@containers/VideoLiveStreamContainer/VideoContext/VideoPlayerContext'
import { Box, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { STATUS_VIDEO } from '@services/videoTop.services'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import PlayerTooltip from './PlayerTooltip'
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
  playedSeconds: number
  durationPlayer: number
}

const ReloadButton: React.FC<Props> = ({ videoRef, typeButton, isLive, onPressCallback, videoStatus, playedSeconds, durationPlayer }) => {
  const classes = useStyles({ isLive })
  const { t } = useTranslation('common')
  const { changeSeekCount } = useDetailVideo()
  const { handleSkipVideoTime } = useVideoPlayerContext()

  console.log('reload component render.')
  const onChangeTime = (e) => {
    e.stopPropagation()
    let newSecond = 0
    // if (!isLive) {
    switch (typeButton) {
      case 'reload':
        if (/iPhone/i.test(window.navigator.userAgent)) {
          //ios safari duration in video live stream is Infinity
          videoRef.current?.load()
        } else {
          videoRef.current.currentTime = videoStatus === STATUS_VIDEO.LIVE_STREAM ? durationPlayer : 0
        }
        break
      case 'previous':
        videoRef.current.currentTime = playedSeconds - 10
        newSecond = playedSeconds - 10
        handleSkipVideoTime('prev')
        break
      case 'next':
        videoRef.current.currentTime = playedSeconds + 10
        newSecond = playedSeconds + 10
        handleSkipVideoTime('next')
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
