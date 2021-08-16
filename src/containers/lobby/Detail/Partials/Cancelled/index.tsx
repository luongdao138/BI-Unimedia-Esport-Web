import React from 'react'
import { LobbyDetail } from '@services/lobbydump.service'
import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ActionComponent from '../ActionComponent'
import { UserProfile } from '@services/user.service'

interface CancelledProps {
  lobby: LobbyDetail
  userProfile: UserProfile
}

const Cancelled: React.FC<CancelledProps> = (props) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  return (
    <ActionComponent {...props}>
      <Box className={classes.body}>
        <Box display="flex" flexDirection="row">
          <Typography className={classes.roundInfoText}>{t('common:arena.cancelled')}</Typography>
        </Box>
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
}))

export default Cancelled
