/* eslint-disable no-console */
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import PlayerTooltip from './PlayerTooltip'
import useDetailVideo from '../../useDetailVideo'
interface Props {
  videoRef?: any
  typeButton: 'reload' | 'previous' | 'next'
  currentTime?: number
  durationsPlayer?: number
}

const ReloadButton: React.FC<Props> = ({ videoRef, typeButton, currentTime }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { changeSeekCount } = useDetailVideo()

  const onChangeTime = () => {
    let newSecond = 0
    switch (typeButton) {
      case 'reload':
        videoRef.current.seekTo(0, 'seconds')
        break
      case 'previous':
        videoRef.current.seekTo(currentTime - 10, 'seconds')
        newSecond = currentTime - 10
        break
      case 'next':
        videoRef.current.seekTo(currentTime + 10, 'seconds')
        newSecond = currentTime + 10
        break
    }
    console.log('🚀 ~ onChangeTime ~ newSecond-0909', newSecond)
    changeSeekCount(Math.floor(newSecond))
  }
  if (typeButton === 'reload') {
    return (
      <Box pr={2} className={classes.buttonNormal} onClick={onChangeTime} data-tip data-for="reload">
        <img src={'/images/ic_reload.svg'} />
        <PlayerTooltip id={'reload'} title={t('videos_top_tab.reload')} />
      </Box>
    )
  } else if (typeButton === 'previous') {
    return (
      <Box pl={2} className={classes.buttonNormal} onClick={onChangeTime} data-tip data-for="previous">
        <img src={'/images/ic_previous.svg'} />
        <PlayerTooltip id={'previous'} title={t('videos_top_tab.previous')} offset={{ top: -10, left: -10 }} />
      </Box>
    )
  } else {
    return (
      <Box pl={2} className={classes.buttonNormal} onClick={onChangeTime} data-tip data-for="next">
        <img src={'/images/ic_next.svg'} />
        <PlayerTooltip id={'next'} title={t('videos_top_tab.next')} offset={{ top: -10, left: -10 }} />
      </Box>
    )
  }
}
const useStyles = makeStyles(() => ({
  buttonNormal: {
    alignItems: 'center',
    display: 'flex',
  },
}))

export default memo(ReloadButton)
