/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, makeStyles, Typography } from '@material-ui/core'
import { TournamentDetail } from '@services/arena.service'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import moment from 'moment'
import { TOURNAMENT_STATUS } from '@constants/tournament.constants'

interface Props {
  tournament: TournamentDetail
}

const RemainingDate: React.FC<Props> = ({ tournament }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

  const status = tournament.attributes.status
  const beforeOnhold = status === TOURNAMENT_STATUS.RECRUITING || status === TOURNAMENT_STATUS.READY

  const accEndDate = moment(tournament.attributes.acceptance_end_date)
  const startDate = moment(tournament.attributes.start_date)
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
          <Typography>{t('common:tournament.end_from_minutes')}</Typography>
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
