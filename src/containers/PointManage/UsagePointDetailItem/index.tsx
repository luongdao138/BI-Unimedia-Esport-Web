import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import { ListUsagePointHistoryData } from '@services/points.service'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import moment from 'moment'

interface UsagePointDetailItemProps {
  data: ListUsagePointHistoryData
  serialNumber: number
}
const UsagePointDetailItem: FC<UsagePointDetailItemProps> = ({ data, serialNumber }) => {
  const classes = useStyles()

  const getAddClass = (firstClass, secClass) => {
    if (serialNumber.toString().length === 2) {
      return firstClass
    }
    if (serialNumber.toString().length >= 3) {
      return secClass
    }
    return ''
  }
  return (
    <Box className={classes.container} key={serialNumber}>
      <Box className={classes.wrapTitle}>
        <Box className={`${classes.serialContainer} ${getAddClass(classes.letterSecSerial, classes.letterThirdSerial)}`}>
          <Typography className={classes.serialStyle}>{serialNumber}</Typography>
        </Box>
        <Box className={`${classes.titleContainer} ${getAddClass(classes.letterSecTitle, classes.letterThirdTitle)}`}>
          <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.id')}</Typography>
          <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.points')}</Typography>
          <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.difference')}</Typography>
          <Typography className={classes.dateStyle}>{i18n.t('common:point_management_tab.date_time')}</Typography>
        </Box>
      </Box>
      <Box className={classes.dataContainer}>
        <Typography className={classes.textStyle}>{data?.purchase_id}</Typography>
        <Typography className={classes.usagePointStyle}>
          {'-' + FormatHelper.currencyFormat(data?.point.toString())}
          {i18n.t('common:point_management_tab.eXe_point_text')}
        </Typography>
        <Typography className={classes.textStyle}>{data?.status}</Typography>
        <Typography className={classes.dateStyle}>{moment(data?.created_at).format('YYYY年MM月DD日')}</Typography>
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
    textAlign: 'center',
    // marginBottom: 8,
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

export default UsagePointDetailItem
