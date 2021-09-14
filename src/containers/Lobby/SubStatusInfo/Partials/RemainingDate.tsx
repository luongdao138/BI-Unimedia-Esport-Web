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
  const { status, is_freezed, is_owner } = lobby.attributes

  const entryStartDate = moment(lobby.attributes.entry_start_datetime)
  const entryEndDate = moment(lobby.attributes.entry_end_datetime)
  const startDate = moment(lobby.attributes.start_datetime)
  const targetDate = status === LOBBY_STATUS.READY ? entryStartDate : status === LOBBY_STATUS.RECRUITING ? entryEndDate : startDate

  const nowDate = moment()
  const days = targetDate.diff(nowDate, 'days')
  const hours = targetDate.diff(nowDate, 'hours')

  const entry = t('common:lobby.remaining_date.entry')
  const start = t('common:lobby.remaining_date.start')
  const until = t('common:lobby.remaining_date.until')
  const end = t('common:lobby.status.ended')
  const inProgress = t('common:lobby.remaining_date.in_progress')
  const freeze = t('common:lobby.remaining_date.freeze')

  let prefix
  if (status === LOBBY_STATUS.READY) prefix = `${entry + start + until}`
  if (status === LOBBY_STATUS.RECRUITING) prefix = `${entry + end + until}`
  if (status === LOBBY_STATUS.ENTRY_CLOSED) prefix = !is_freezed && is_owner ? `${freeze + until}` : `${inProgress + until}`

  const renderDays = () => {
    return (
      <>
        <Typography>{prefix}</Typography>
        <Typography className={classes.highlightedNumber}>{days}</Typography>
        <Typography>{t('common:common.day')}</Typography>
      </>
    )
  }

  const renderHours = () => {
    return (
      <>
        <Typography>{prefix}</Typography>
        <Typography className={classes.highlightedNumber}>{hours}</Typography>
        <Typography>{t('common:common.time')}</Typography>
      </>
    )
  }

  const renderDueDate = () => {
    return (
      <>
        <Typography className={classes.highlightedNumberSmall}>{targetDate.format('YYYY/MM/DD HH')}</Typography>
        <Typography className={classes.text}>{t('common:common.hour')}</Typography>
        <Typography className={classes.highlightedNumberSmall}>{targetDate.format('mm')}</Typography>
        <Typography className={classes.text}>{t('common:lobby.remaining_date.from_minutes')}</Typography>
        <Typography className={classes.text}>{status === LOBBY_STATUS.READY ? entry + start : start}</Typography>
      </>
    )
  }

  const renderRemainingDate = () => {
    if (days >= 1) return renderDays()
    else if (hours >= 1) return renderHours()
    else return renderDueDate()
  }

  return <Box className={classes.remainingDate}>{renderRemainingDate()}</Box>
}

const useStyles = makeStyles((theme) => ({
  remainingDate: {
    display: 'flex',
    flexDirection: 'row',
    color: Colors.grey[300],
    alignItems: 'baseline',
  },
  highlightedNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  highlightedNumberSmall: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
  [theme.breakpoints.down('sm')]: {
    highlightedNumberSmall: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 10,
    },
  },
}))

export default RemainingDate
