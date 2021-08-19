import React from 'react'
import { LobbyDetail } from '@services/lobby.service'
import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { UserProfile } from '@services/user.service'
import RemainingDate from './Partials/RemainingDate'
import { LOBBY_STATUS } from '@constants/lobby.constants'

interface Props {
  lobby: LobbyDetail
  userProfile?: UserProfile
}

const StatusInfoComponent: React.FC<Props> = ({ lobby }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { status } = lobby.attributes

  const renderStatusInfo = () => {
    if (status < LOBBY_STATUS.IN_PROGRESS) {
      return <RemainingDate lobby={lobby} />
    } else {
      return (
        <Box display="flex" flexDirection="row">
          <Typography className={classes.roundInfoText}>{t('common:arenaSearchFilters.completed')}</Typography>
        </Box>
      )
    }

    return null
  }

  return <Box className={classes.body}>{renderStatusInfo()}</Box>
}

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  roundInfoText: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  yellow: {
    color: Colors.yellow,
  },
}))

export default StatusInfoComponent
