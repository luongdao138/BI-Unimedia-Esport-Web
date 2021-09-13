import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { memo } from 'react'
import PlayerTooltip from './PlayerTooltip'

interface Props {
  videoRef?: any
  typeButton: 'reload' | 'previous' | 'next'
}

const ReloadButton: React.FC<Props> = ({ videoRef, typeButton }) => {
  const classes = useStyles()
  const onChangeTime = () => {
    switch (typeButton) {
      case 'reload':
        videoRef.current.currentTime = 0
        break
      case 'previous':
        videoRef.current.currentTime = videoRef.current.currentTime - 10
        break
      case 'next':
        videoRef.current.currentTime = videoRef.current.currentTime + 10
        break
    }
  }
  if (typeButton === 'reload') {
    return (
      <Box pr={2} className={classes.buttonNormal} onClick={onChangeTime} data-tip data-for="reload">
        <img src={'/images/ic_reload.svg'} />
        <PlayerTooltip id={'reload'} title={'再読み込み'} />
      </Box>
    )
  } else if (typeButton === 'previous') {
    return (
      <Box pl={2} className={classes.buttonNormal} onClick={onChangeTime}>
        <img src={'/images/ic_previous.svg'} />
      </Box>
    )
  } else {
    return (
      <Box pl={2} className={classes.buttonNormal} onClick={onChangeTime}>
        <img src={'/images/ic_next.svg'} />
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
