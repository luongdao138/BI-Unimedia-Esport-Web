import { Box, Icon, makeStyles } from '@material-ui/core'
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
      {!playing ? <img src={'/images/ic_play_small.svg'} /> : <Icon fontSize={'small'} className={`fas fa-pause ${classes.pauseSmall}`} />}
      <PlayerTooltip
        id={'togglePlay'}
        title={!playing ? t('videos_top_tab.play') : t('videos_top_tab.pause')}
        offset={{ top: -10, left: 0 }}
      />
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  buttonNormal: {
    alignItems: 'center',
    display: 'flex',
    paddingLeft: 16,
  },
  pauseSmall: {
    color: Colors.white,
    fontSize: 15,
  },
}))
export default memo(Play)
