import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import { UsagePointDataProps } from '../UsageHistory'
import { FormatHelper } from '@utils/helpers/FormatHelper'

interface UsagePointsItemProps {
  data: UsagePointDataProps
  letterCount: number
}
const UsagePointsItem: FC<UsagePointsItemProps> = ({ data, letterCount }) => {
  const classes = useStyles()
  const isUsedPoints = data?.type === 'used'
  const getAddClass = (firstClass, secClass) => {
    if (letterCount === 2) {
      return firstClass
    }
    if (letterCount >= 3) {
      return secClass
    }
    return ''
  }
  return (
    <Box className={classes.container} key={data?.serialNumber}>
      <Box className={classes.wrapTitle}>
        <Box className={`${classes.serialContainer} ${getAddClass(classes.letterSecSerial, classes.letterThirdSerial)}`}>
          <Typography className={classes.serialStyle}>{data?.serialNumber}</Typography>
        </Box>
        <Box className={`${classes.titleContainer} ${getAddClass(classes.letterSecTitle, classes.letterThirdTitle)}`}>
          <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.id')}</Typography>
          <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.points')}</Typography>
          <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.difference')}</Typography>
          {isUsedPoints ? (
            <Typography className={classes.dateStyle}>{i18n.t('common:point_management_tab.date_time')}</Typography>
          ) : (
            <>
              <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.purchase_date')}</Typography>
              <Typography className={classes.dateStyle}>{i18n.t('common:point_management_tab.expires_date')}</Typography>
            </>
          )}
        </Box>
      </Box>
      <Box className={classes.dataContainer}>
        <Typography className={classes.textStyle}>{data?.purchasedPointsId}</Typography>
        <Typography className={isUsedPoints ? classes.usagePointStyle : classes.pointStyle}>
          {isUsedPoints ? '-' : ''} {FormatHelper.currencyFormat(data?.points.toString())}{' '}
          {isUsedPoints ? i18n.t('common:point_management_tab.eXe_point_text') : i18n.t('common:point_management_tab.eXe_point')}
        </Typography>
        <Typography className={classes.textStyle}>
          {isUsedPoints
            ? i18n.t('common:point_management_tab.use_point_information')
            : i18n.t('common:point_management_tab.purchase_point')}
        </Typography>
        {isUsedPoints ? (
          <Typography className={classes.dateStyle}>{data?.expiresDatePurchased}</Typography>
        ) : (
          <>
            <Typography className={classes.textStyle}>{data?.expiresDatePurchased}</Typography>
            <Typography className={classes.dateStyle}>{data?.expiresDatePurchased}</Typography>
          </>
        )}
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  wrapTitle: {
    display: 'flex',
    width: '148px',
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.white_opacity['6'],
    alignContent: 'center',
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 4,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 18,
    marginTop: 16,
  },
  serialContainer: {
    alignItems: 'center',
    display: 'flex',
    width: 22,
    flexWrap: 'wrap',
    wordBreak: 'break-all',
  },
  serialStyle: {
    marginRight: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: 'calc(100% - 22px)',
  },
  letterSecTitle: {
    width: 'calc(100% - 25px)',
  },
  letterThirdTitle: {
    width: 'calc(100% - 34px)',
  },
  titleItemStyle: {
    color: Colors.white_opacity['70'],
    marginBottom: 8,
  },
  dataContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  idTextItem: {
    color: Colors.primary,
    marginBottom: 8,
  },
  pointStyle: {
    color: Colors.white_opacity['70'],
    marginBottom: 8,
  },
  usagePointStyle: {
    color: Colors.yellow,
    marginBottom: 8,
  },
  textStyle: {
    color: Colors.white_opacity['70'],
    marginBottom: 8,
  },
  dateStyle: {
    color: Colors.white_opacity['70'],
  },
  letterSecSerial: {
    width: 25,
  },
  letterThirdSerial: {
    width: 34,
  },
  [theme.breakpoints.down(414)]: {
    wrapTitle: {
      width: 135,
    },
  },
  [theme.breakpoints.down(375)]: {
    container: {
      margin: 8,
    },
    wrapTitle: {
      width: 110,
    },
    textStyle: {
      fontSize: 13,
    },
  },
}))

export default UsagePointsItem
