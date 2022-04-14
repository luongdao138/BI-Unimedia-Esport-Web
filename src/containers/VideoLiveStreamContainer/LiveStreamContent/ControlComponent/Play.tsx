import { Box, Icon, makeStyles, Theme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import PlayerTooltip from './PlayerTooltip'

interface Props {
  onPlayPause?: () => void
  playing?: boolean
}

const Play: React.FC<Props> = ({ onPlayPause, playing = false }) => {
  const classes = useStyles()
  const { t } = useTranslation('common')

  return (
    <Box pr={2} className={classes.buttonNormal} onClick={onPlayPause} data-tip data-for="togglePlay">
      {!playing ? (
        <img src={'/images/ic_play_small.svg'} className={classes.sizeImagePlay} />
      ) : (
        <Icon fontSize={'small'} className={`fas fa-pause ${classes.pauseSmall}`} />
      )}
      <PlayerTooltip
        id={'togglePlay'}
        title={!playing ? t('videos_top_tab.play') : t('videos_top_tab.pause')}
        offset={{ top: -15, left: 0 }}
      />
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  buttonNormal: {
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    padding: '0px 8px',
  },
  pauseSmall: {
    color: Colors.white,
    fontSize: 15,
  },
  [theme.breakpoints.down('xs')]: {
    sizeImagePlay: {
      with: 11.91,
      height: 15.42,
    },
    pauseSmall: {
      fontSize: 12,
    },
  },
}))
export default memo(Play)
