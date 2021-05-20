import React from 'react'
import { TournamentDetail } from '@services/tournament.service'
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ActionComponent from '../ActionComponent'
import { UserProfile } from '@services/user.service'

interface InProgressProps {
  tournament: TournamentDetail
  userProfile: UserProfile
}

const InProgress: React.FC<InProgressProps> = (props) => {
  const classes = useStyles()
  // const { t } = useTranslation(['common'])
  // const { tournament } = props
  const currentRoundNumber = 2 // TODO

  return (
    <ActionComponent {...props}>
      <Box className={classes.body}>
        <Box display="flex" flexDirection="row">
          <Typography className={classes.roundInfoText}>{`${currentRoundNumber}回戦目 対戦中`}</Typography>
        </Box>
        <img className={classes.logo} src={`/images/round${currentRoundNumber}.svg`} />
        <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline"></Box>
      </Box>
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
