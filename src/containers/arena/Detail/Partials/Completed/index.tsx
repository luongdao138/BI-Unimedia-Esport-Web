/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react'
import { TournamentDetail } from '@services/arena.service'
import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
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

  useEffect(() => fetchWinners(), [])

  return (
    <ActionComponent {...props}>
      <Box className={classes.body}>
        {tournament.attributes.is_freezed ? (
          <div className={classes.winnerAvatarWrapper} onClick={() => {}}>
            {arenaWinners && arenaWinners['1'] && arenaWinners['1'][0] && (
              <ArenaAvatar
                src={arenaWinners['1'][0].avatar}
                name={arenaWinners['1'][0].name}
                user_code={arenaWinners['1'][0].user?.user_code}
                win
                leaf
                nameWhite
                size="small"
              />
            )}
          </div>
        ) : (
          <Box display="flex" flexDirection="row">
            <Typography className={classes.roundInfoText}>{t('common:arena.not_held')}</Typography>
          </Box>
        )}

        <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline"></Box>
      </Box>
    </ActionComponent>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  roundInfoText: {
    fontSize: 24,
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
