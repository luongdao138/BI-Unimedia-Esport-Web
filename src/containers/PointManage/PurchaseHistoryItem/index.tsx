import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import { PointsPurchasedDataProps } from '../PointManagementTab'

interface PointsPurchasedItemProps {
  data: PointsPurchasedDataProps
}
const PurchaseHistoryItem: FC<PointsPurchasedItemProps> = ({ data }) => {
  const classes = useStyles()
  return (
    <Box className={classes.contentContainer} key={data?.serialNumber}>
      <Box className={classes.serialContainer}>
        <Typography className={classes.serialStyle}>{data?.serialNumber}</Typography>
      </Box>
      <Box className={classes.titleContainer}>
        <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.id')}</Typography>
        <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.points')}</Typography>
        <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.difference')}</Typography>
        <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.purchase_date')}</Typography>
        <Typography className={classes.titleItemStyle}>{i18n.t('common:point_management_tab.expires_date')}</Typography>
      </Box>
      <Box className={classes.dataContainer}>
        <Typography className={classes.idTextItem}>{data?.purchasedPointsId}</Typography>
        <Typography className={classes.pointStyle}>
          {data?.points} {i18n.t('common:point_management_tab.eXe_point')}
        </Typography>
        <Typography className={classes.dateStyle}>{i18n.t('common:point_management_tab.purchase_point')}</Typography>
        <Typography className={classes.dateStyle}>{data?.expiresDatePurchased}</Typography>
        <Typography className={classes.dateStyle}>{data?.expiresDatePurchased}</Typography>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: Colors.black,
    display: 'flex',
    flex: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.grey['200'],
    borderStyle: 'solid',
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.white_opacity['6'],
    alignContent: 'center',
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 4,
    padding: 16,
    marginTop: 16,
  },
  serialContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
  },
  serialStyle: {
    marginRight: 16,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  titleContainer: {
    marginRight: 56,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  titleItemStyle: {
    color: Colors.white_opacity['70'],
    marginTop: 4,
    marginBottom: 4,
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
    marginTop: 4,
    marginBottom: 4,
  },
  pointStyle: {
    color: Colors.white_opacity['70'],
    marginTop: 4,
    marginBottom: 4,
  },
  dateStyle: {
    color: Colors.white_opacity['70'],
    marginTop: 4,
    marginBottom: 4,
  },
}))

export default PurchaseHistoryItem
