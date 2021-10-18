import React from 'react'
import { TournamentDetail } from '@services/arena.service'
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ActionComponent from '../ActionComponent'
import { UserProfile } from '@services/user.service'
import useArenaHelper from '@containers/arena/hooks/useArenaHelper'

interface InProgressProps {
  tournament: TournamentDetail
  userProfile: UserProfile
}

const InProgress: React.FC<InProgressProps> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { tournament } = props
  const { isModerator, isParticipant, isInterested } = useArenaHelper(tournament)

  return (
    <ActionComponent {...props}>
      {tournament.attributes.is_freezed && (
        <Box className={classes.body}>
          <Box display="flex" flexDirection="row">
            <Typography className={classes.roundInfoText}>
              {isModerator
                ? t('arena.participate_status.ongoing')
                : isParticipant
                ? t('arena.participate_status.participating')
                : isInterested
                ? t('arena.participate_status.loss')
                : t('arena.participate_status.no_entry')}
            </Typography>
          </Box>
        </Box>
      )}
    </ActionComponent>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  roundInfoText: {
    fontSize: '1.5rem',
    color: theme.palette.common.white,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  logo: {
    marginTop: theme.spacing(4),
  },
}))

export default InProgress
