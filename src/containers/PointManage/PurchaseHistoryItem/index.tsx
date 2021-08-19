import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import { PointsPurchasedDataProps } from '../PointManagementTab'
import { FormatHelper } from '@utils/helpers/FormatHelper'

interface PointsPurchasedItemProps {
  data: PointsPurchasedDataProps
  letterCount: number
}
const PurchaseHistoryItem: FC<PointsPurchasedItemProps> = ({ data, letterCount }) => {
  const classes = useStyles()
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
          <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.purchase_date')}</Typography>
          <Typography className={classes.dateStyle}>{i18n.t('common:point_management_tab.expires_date')}</Typography>
        </Box>
      </Box>
      <Box className={classes.dataContainer}>
        <Typography className={classes.idTextItem}>{data?.purchasedPointsId}</Typography>
        <Typography className={classes.pointStyle}>
          {FormatHelper.currencyFormat(data?.points.toString())} {i18n.t('common:point_management_tab.eXe_point')}
        </Typography>
        <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.purchase_point')}</Typography>
        <Typography className={classes.titleItemStyle}>{data?.expiresDatePurchased}</Typography>
        <Typography className={classes.dateStyle}>{data?.expiresDatePurchased}</Typography>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
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
    marginTop: 21,
  },
  wrapTitle: {
    display: 'flex',
    width: '148px',
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
    textDecoration: 'underline',
    marginBottom: 8,
  },
  pointStyle: {
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
  [theme.breakpoints.down(375)]: {
    container: {
      margin: 8,
    },
    wrapTitle: {
      width: 110,
    },
  },
}))

export default PurchaseHistoryItem
