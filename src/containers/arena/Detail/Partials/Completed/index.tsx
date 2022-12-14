/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ActionComponent from '../ActionComponent'
import { UserProfile } from '@services/user.service'
import ArenaAvatar from '@containers/arena/Winners/ArenaAvatar'
import useWinners from '@containers/arena/Winners/useArenaWinners'

interface CompletedProps {
  tournament: TournamentDetail
  userProfile: UserProfile
}

const Completed: React.FC<CompletedProps> = (props) => {
  const classes = useStyles()
  const { arenaWinners, fetchWinners } = useWinners(false)
  const { tournament } = props
  const { t } = useTranslation(['common'])

  useEffect(() => {
    if (!!tournament && tournament.attributes.is_freezed) fetchWinners()
  }, [tournament])

  return (
    <ActionComponent {...props}>
      {tournament.attributes.is_freezed && tournament.attributes.participant_count > 1 ? (
        arenaWinners &&
        arenaWinners['1'] &&
        arenaWinners['1'][0] && (
          <Box className={classes.body}>
            <div className={classes.winnerAvatarWrapper} onClick={() => {}}>
              <ArenaAvatar
                src={arenaWinners['1'][0].avatar}
                name={arenaWinners['1'][0].name}
                user_code={arenaWinners['1'][0].user?.user_code}
                win
                leaf
                nameWhite
                size="small"
              />
            </div>
          </Box>
        )
      ) : (
        <Box className={classes.body}>
          <Box display="flex" flexDirection="row">
            <Typography color="secondary" variant="body1">
              {t('common:arena.not_held')}
            </Typography>
          </Box>
        </Box>
      )}
    </ActionComponent>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
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
