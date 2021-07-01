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
  const isRecruiting = status === TOURNAMENT_STATUS.RECRUITING
  const isOnHold = status === TOURNAMENT_STATUS.RECRUITMENT_CLOSED || status === TOURNAMENT_STATUS.READY_TO_START

  const date = tournament.attributes.acceptance_end_date
  const endDate = moment(date)
  const nowDate = moment()
  const days = endDate.diff(nowDate, 'days')
  const hours = endDate.diff(nowDate, 'hours')
  const minutes = endDate.diff(nowDate, 'minutes')

  const untilDatePrefix = isRecruiting ? t('common:tournament.until_deadline') : isOnHold ? t('common:tournament.until_event') : ''

  return (
    <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
      {days > 1 ? (
        <>
          <Typography>{untilDatePrefix}</Typography>
          <Typography className={classes.highlightedNumber}>{days}</Typography>
          <Typography>{t('common:common.day')}</Typography>
        </>
      ) : hours > 1 ? (
        <>
          <Typography>{untilDatePrefix}</Typography>
          <Typography className={classes.highlightedNumber}>{hours}</Typography>
          <Typography>{t('common:common.time')}</Typography>
        </>
      ) : (
        minutes > 0 && (
          <>
            <Typography className={classes.highlightedNumber}>{endDate.hours()}</Typography>
            <Typography>{t('common:common.hour')}</Typography>
            <Typography className={classes.highlightedNumber}>{endDate.minutes()}</Typography>
            <Typography>{t('common:tournament.start_from_minutes')}</Typography>
          </>
        )
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
