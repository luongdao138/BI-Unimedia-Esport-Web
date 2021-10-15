import React from 'react'
import { LobbyDetail } from '@services/lobby.service'
import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { DateHelper } from '@utils/helpers/DateHelper'
import { LOBBY_STATUS } from '@constants/lobby.constants'

interface Props {
  lobby: LobbyDetail
}

const MainDatePeriod: React.FC<Props> = ({ lobby }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const { status } = lobby.attributes
  const isEntryPeriod = status === LOBBY_STATUS.READY || status === LOBBY_STATUS.RECRUITING
  const dateTitle = isEntryPeriod ? t('common:lobby.detail.entry_period') : t('common:lobby.detail.start_date')

  const buildLobbyPeriodValue = () => {
    if (isEntryPeriod) {
      const entryStartDate = DateHelper.formatDateTime(lobby.attributes.entry_start_datetime)
      const entryEndDate = DateHelper.formatDateTime(lobby.attributes.entry_end_datetime)
      return `${entryStartDate} - ${entryEndDate}`
    } else {
      return `${DateHelper.formatDateTime(lobby.attributes.start_datetime)}`
    }
  }

  return (
    <Box className={classes.header}>
      <Box display="flex" className={classes.headerDesc}>
        <Typography variant="body1" className={classes.headerTitle}>
          {dateTitle}
        </Typography>
        <Typography variant="body1">{buildLobbyPeriodValue()}</Typography>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: theme.palette.common.black,
    borderRadius: 4,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: Colors.grey[300],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  headerTitle: {
    paddingRight: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    headerDesc: {
      flexDirection: 'column',
    },
    headerTitle: {
      paddingRight: 0,
    },
  },
}))

export default MainDatePeriod
