/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react'
import { LobbyDetail } from '@services/lobby.service'
import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ActionComponent from '../ActionComponent'
import { UserProfile } from '@services/user.service'
import useWinners from '@containers/arena/Winners/useArenaWinners'

interface CompletedProps {
  lobby: LobbyDetail
  userProfile: UserProfile
}

const Completed: React.FC<CompletedProps> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { fetchWinners } = useWinners(false)
  const { lobby } = props
  const isTeam = false //lobby.attributes.participant_type > 1
  const unit = isTeam ? t('common:common.team') : t('common:common.man')
  const entryMembersCount = lobby.attributes.entry_count + lobby.attributes.participants_count

  useEffect(() => {
    if (!!lobby && lobby.attributes.is_freezed) fetchWinners()
  }, [lobby])

  return (
    <ActionComponent {...props}>
      {lobby.attributes.is_freezed ? (
        <Box className={classes.body}>
          <Box display="flex" flexDirection="row">
            <Typography className={classes.roundInfoText}>{t('common:arenaSearchFilters.completed')}</Typography>
          </Box>

          <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
            <Typography className={classes.entryMembersInfoText}>{t('common:tournament.number_of_entries')}</Typography>
            <Box mr={2} />
            <Typography className={classes.highlightedNumber}>{entryMembersCount}</Typography>
            <Typography>{`${unit} /`}&nbsp;</Typography>
            <Typography className={classes.highlightedNumber}>{lobby.attributes.max_participants}</Typography>
            <Typography>{unit}</Typography>
          </Box>
        </Box>
      ) : (
        <Box className={classes.body}>
          <Box display="flex" flexDirection="row">
            <Typography className={`${classes.roundInfoText} ${classes.yellow}`}>{t('common:arena.not_held')}</Typography>
          </Box>
        </Box>
      )}
    </ActionComponent>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  highlightedNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  entryMembersInfoText: {
    fontSize: '1rem',
    fontWeight: 'normal',
  },
  roundInfoText: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  yellow: {
    color: Colors.yellow,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  winnerAvatarWrapper: {
    marginTop: theme.spacing(8),
    transform: 'translate(-0%, -0%)',
  },
}))

export default Completed
