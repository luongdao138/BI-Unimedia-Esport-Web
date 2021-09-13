import { Box, Icon, makeStyles } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { memo, useEffect, useState } from 'react'
import PlayerTooltip from './PlayerTooltip'

interface Props {
  videoRef?: any
  PlayerTooltip?: () => void
}

const Play: React.FC<Props> = ({ videoRef }) => {
  const classes = useStyles()
  const [paused, setPaused] = useState<boolean>(true)
  useEffect(() => {
    const onTogglePlay = () => {
      setPaused(videoRef.current.paused)
    }
    videoRef.current.addEventListener('play', onTogglePlay)
    videoRef.current.addEventListener('pause', onTogglePlay)
    return () => {
      videoRef.current.removeEventListener('play', onTogglePlay)
      videoRef.current.removeEventListener('pause', onTogglePlay)
    }
  })
  const handlePlay = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      setPaused(false)
      videoRef.current.play()
    } else {
      setPaused(true)
      videoRef.current.pause()
    }
  }
  return (
    <Box pr={2} className={classes.buttonNormal} onClick={handlePlay} data-tip data-for="togglePlay">
      {paused ? <img src={'/images/ic_play_small.svg'} /> : <Icon fontSize={'small'} className={`fas fa-pause ${classes.pauseSmall}`} />}
      <PlayerTooltip id={'togglePlay'} title={paused ? '再生' : '一時停止'} />
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  buttonNormal: {
    alignItems: 'center',
    display: 'flex',
  },
  pauseSmall: {
    color: Colors.white,
    fontSize: 15,
  },
}))
export default memo(Play)
