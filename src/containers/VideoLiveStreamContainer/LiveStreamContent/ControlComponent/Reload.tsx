/* eslint-disable no-console */
import { Box, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import PlayerTooltip from './PlayerTooltip'
import useDetailVideo from '../../useDetailVideo'
import { STATUS_VIDEO } from '@services/videoTop.services'
interface Props {
  videoRef?: any
  typeButton: 'reload' | 'previous' | 'next'
  currentTime?: number
  durationsPlayer?: number
  isLive?: boolean
  onPressCallback?: () => void
  videoStatus?: number
}

const ReloadButton: React.FC<Props> = ({ videoRef, typeButton, currentTime, isLive, onPressCallback, videoStatus, durationsPlayer }) => {
  const classes = useStyles({ isLive })
  const { t } = useTranslation('common')
  const { changeSeekCount } = useDetailVideo()

  console.log('reload component render.')
  const onChangeTime = () => {
    let newSecond = 0
    // if (!isLive) {
    switch (typeButton) {
      case 'reload':
        videoRef.current.currentTime = videoStatus === STATUS_VIDEO.LIVE_STREAM ? durationsPlayer : 0
        break
      case 'previous':
        videoRef.current.currentTime = currentTime - 10
        newSecond = currentTime - 10
        break
      case 'next':
        videoRef.current.currentTime = currentTime + 10
        newSecond = currentTime + 10
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
