import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import { PointsPurchasedDataProps } from '../PointManagementTab'
import { FormatHelper } from '@utils/helpers/FormatHelper'

interface PointsPurchasedItemProps {
  data: PointsPurchasedDataProps
}
const PointsPurchasedItem: FC<PointsPurchasedItemProps> = ({ data }) => {
  const classes = useStyles()
  return (
    <Box className={classes.container} key={data?.serialNumber}>
      <Box className={classes.wrapTitle}>
        <Box className={classes.serialContainer}>
          <Typography className={classes.serialStyle}>{data?.serialNumber}</Typography>
        </Box>
        <Box className={classes.titleContainer}>
          <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.id')}</Typography>
          <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.points')}</Typography>
          <Typography className={classes.dateStyle}>{i18n.t('common:point_management_tab.expires_date')}</Typography>
        </Box>
      </Box>
      <Box className={classes.dataContainer}>
        <Typography className={classes.idTextItem}>{data?.purchasedPointsId}</Typography>
        <Typography className={classes.pointStyle}>
          {FormatHelper.currencyFormat(data?.points.toString())} {i18n.t('common:point_management_tab.eXe_point_text')}
        </Typography>
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
    marginLeft: 24,
    marginRight: 24,
    borderRadius: 4,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 18,
    marginTop: 24,
  },
  wrapTitle: {
    display: 'flex',
    width: '148px',
  },
  serialContainer: {
    alignItems: 'center',
    display: 'flex',
    width: 28,
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
    width: 'calc(100% - 28px)',
    paddingLeft: '8px',
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
  [theme.breakpoints.down(375)]: {
    container: {
      margin: 8,
    },
    wrapTitle: {
      width: 110,
    },
  },
}))

export default PointsPurchasedItem
