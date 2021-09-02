import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { ListUsedPointsData } from '@services/points.service'
import moment from 'moment'

interface UsagePointsItemProps {
  data: ListUsedPointsData
  serialNumber: number
  maxPage: number
  setShowDetail?: (value: boolean) => void
  setPurchasePointId?: (value: number) => void
}
const UsagePointsItem: FC<UsagePointsItemProps> = ({ data, serialNumber, setShowDetail, setPurchasePointId, maxPage }) => {
  const classes = useStyles()
  const getAddClass = (firstClass, secClass) => {
    if (maxPage.toString().length === 3) {
      return firstClass
    }
    if (maxPage.toString().length >= 4) {
      return secClass
    }
    return ''
  }

  const dataPurchasePointId = data?.purchased_point_id.split(' / ')
  const renderPurchasePointId = (item, index) => {
    const handleShowDetail = (): void => {
      setShowDetail(true)
      setPurchasePointId(item)
    }
    return (
      <Box onClick={handleShowDetail} key={index}>
        <Typography className={classes.purchasePointIdText}>
          {index >= 1 ? ` ${item}` : item}
          {dataPurchasePointId?.length > 1 && index < dataPurchasePointId?.length - 1 ? ' /' : ''}
        </Typography>
      </Box>
    )
  }
  return (
    <Box className={classes.container} key={serialNumber}>
      <Box className={`${classes.serialContainer} ${getAddClass(classes.letterSecSerial, classes.letterThirdSerial)}`}>
        <Typography className={classes.serialStyle}>{serialNumber}</Typography>
      </Box>
      <Box className={classes.wrapTitle}>
        <Box className={classes.wrapRow}>
          <Typography className={classes.titleCommon}>{i18n.t('common:point_management_tab.id')}</Typography>
          <Typography className={classes.textStyle}>{data?.uuid}</Typography>
        </Box>
        <Box className={classes.wrapRow}>
          <Typography className={classes.titleCommon}>{i18n.t('common:point_management_tab.points')}</Typography>
          <Typography className={classes.usagePointStyle}>
            {'-' + FormatHelper.currencyFormat(data?.point.toString())}
            {i18n.t('common:point_management_tab.eXe_point_text')}
          </Typography>
        </Box>
        <Box className={classes.wrapRow}>
          <Typography className={classes.titleCommon}>{i18n.t('common:point_management_tab.purchase_id')}</Typography>
          <Box className={classes.purchasePointsItem}>{dataPurchasePointId.map((item, index) => renderPurchasePointId(item, index))}</Box>
        </Box>
        <Box className={classes.wrapRow}>
          <Typography className={classes.titleCommon}>{i18n.t('common:point_management_tab.difference')}</Typography>
          <Typography className={classes.textStyle}>{data?.status}</Typography>
        </Box>
        <Box className={classes.wrapRow}>
          <Typography className={`${classes.titleCommon} ${classes.titleStyle}`}>
            {i18n.t('common:point_management_tab.date_time')}
          </Typography>
          <Typography className={`${classes.titleCommon} ${classes.titleStyle}`}>
            {moment(data?.created_at).format('YYYY年MM月DD日')}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  titleStyle: {
    marginBottom: 0,
  },
  purchasePointsItem: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
  },
  wrapRow: {
    display: 'flex',
  },
  wrapTitle: {
    flex: 1,
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
  titleCommon: {
    color: Colors.white_opacity['70'],
    marginBottom: 8,
    width: 126,
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
  purchasePointIdText: {
    color: Colors.primary,
    textDecoration: 'underline',
    marginBottom: 8,
    whiteSpace: 'pre',
  },
  textStyle: {
    color: Colors.white_opacity['70'],
    marginBottom: 8,
  },
  letterSecSerial: {
    width: 32,
  },
  letterThirdSerial: {
    width: 34,
  },
  [theme.breakpoints.down(414)]: {
    wrapTitle: {},
  },
  [theme.breakpoints.down(376)]: {
    container: {
      margin: 8,
    },
    titleCommon: {
      width: 124,
    },
    textStyle: {
      fontSize: 13,
    },
  },
  [theme.breakpoints.down(321)]: {
    titleCommon: {
      width: 90,
      fontSize: 12,
    },
    purchasePointIdText: {
      fontSize: 12,
    },
    textStyle: {
      fontSize: 12,
    },
  },
}))

export default UsagePointsItem
