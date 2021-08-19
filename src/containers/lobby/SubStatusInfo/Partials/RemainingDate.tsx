/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, makeStyles, Typography } from '@material-ui/core'
import { LobbyDetail } from '@services/lobby.service'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import moment from 'moment'
// import { TOURNAMENT_STATUS } from '@constants/tournament.constants'
import { LOBBY_STATUS } from '@constants/lobby.constants'

interface Props {
  lobby: LobbyDetail
}

const RemainingDate: React.FC<Props> = ({ lobby }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const status = lobby.attributes.status
  const beforeOnhold = status === LOBBY_STATUS.RECRUITING || status === LOBBY_STATUS.READY

  const accEndDate = moment(lobby.attributes.entry_start_datetime)
  const startDate = moment(lobby.attributes.start_datetime)
  const targetDate = beforeOnhold ? accEndDate : startDate
  const nowDate = moment()
  const days = targetDate.diff(nowDate, 'days')
  const hours = targetDate.diff(nowDate, 'hours')

  const untilDatePrefix = beforeOnhold ? t('common:tournament.until_deadline') : t('common:tournament.until_event')

  return (
    <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
      {days >= 1 ? (
        <>
          <Typography>{untilDatePrefix}</Typography>
          <Typography className={classes.highlightedNumber}>{days}</Typography>
          <Typography>{t('common:common.day')}</Typography>
        </>
      ) : hours >= 1 ? (
        <>
          <Typography>{untilDatePrefix}</Typography>
          <Typography className={classes.highlightedNumber}>{hours}</Typography>
          <Typography>{t('common:common.time')}</Typography>
        </>
      ) : (
        <>
          <Box mr={1}>
            <Typography className={classes.highlightedNumber}>{targetDate.format('YYYY/MM/DD')}</Typography>
          </Box>
          <Typography className={classes.highlightedNumber}>{targetDate.format('HH')}</Typography>
          <Typography>{t('common:common.hour')}</Typography>
          <Typography className={classes.highlightedNumber}>{targetDate.format('mm')}</Typography>
          <Typography>{beforeOnhold ? t('common:tournament.end_from_minutes') : t('common:tournament.start_from_minutes')}</Typography>
        </>
      )}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  highlightedNumber: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
}))

export default RemainingDate
