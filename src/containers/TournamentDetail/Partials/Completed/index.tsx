/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { ArenaWinners, TournamentDetail } from '@services/tournament.service'
import { Box, makeStyles, Theme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import ActionComponent from '../ActionComponent'
import { UserProfile } from '@services/user.service'
import ArenaAvatar from '@containers/ArenaWinners/ArenaAvatar'

interface CompletedProps {
  tournament: TournamentDetail
  userProfile: UserProfile
  arenaWinners: ArenaWinners
}

const Completed: React.FC<CompletedProps> = (props) => {
  const classes = useStyles()
  const { arenaWinners } = props

  return (
    <ActionComponent {...props}>
      <Box className={classes.body}>
        <div className={classes.winnerAvatarWrapper} onClick={() => {}}>
          {arenaWinners && arenaWinners['1'] && arenaWinners['1'][0] && (
            <ArenaAvatar
              src={arenaWinners['1'][0].avatar}
              name={arenaWinners['1'][0].name}
              user_code={arenaWinners['1'][0].user?.user_code}
              win
              leaf
              nameWhite
            />
          )}
        </div>

        <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline"></Box>
      </Box>
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
    cursor: 'pointer',
  },
}))

export default Completed
