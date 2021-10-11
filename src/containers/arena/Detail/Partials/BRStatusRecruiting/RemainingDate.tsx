/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import moment from 'moment'

interface Props {
  acceptanceEndDate: string
  startDate: string
}

const RemainingDate: React.FC<Props> = ({ acceptanceEndDate, startDate }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const now = moment()
  const remainDays = moment(acceptanceEndDate).diff(now, 'days')
  const remainHours = moment(acceptanceEndDate).diff(now, 'hours')
  const arenaStart = moment(startDate)

  return (
    <Box display="flex" flexDirection="row" color={Colors.grey[300]} alignItems="baseline">
      {remainDays >= 1 ? (
        <>
          <Typography>{t('common:tournament.until_deadline')}</Typography>
          <Typography className={classes.highlightedNumber}>{remainDays}</Typography>
          <Typography>{t('common:common.day')}</Typography>
        </>
      ) : remainHours >= 1 ? (
        <>
          <Typography>{t('common:tournament.until_deadline')}</Typography>
          <Typography className={classes.highlightedNumber}>{remainHours}</Typography>
          <Typography>{t('common:common.time')}</Typography>
        </>
      ) : (
        <>
          <Box mr={1}>
            <Typography className={classes.highlightedNumber}>{arenaStart.format('YYYY/MM/DD')}</Typography>
          </Box>
          <Typography className={classes.highlightedNumber}>{arenaStart.format('HH')}</Typography>
          <Typography>{t('common:common.hour')}</Typography>
          <Typography className={classes.highlightedNumber}>{arenaStart.format('mm')}</Typography>
          <Typography>{t('common:tournament.start_from_minutes')}</Typography>
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

export default React.memo(RemainingDate)
