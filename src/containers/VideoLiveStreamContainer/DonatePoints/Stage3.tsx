import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import i18n from '@locales/i18n'
import PointCardItem from '@components/PointCardItem'
import usePointsManage from '@containers/PointManage/usePointsManage'
import ESLoader from '@components/FullScreenLoader'
import usePurchasePointData from '@containers/PointManage/PurchasePoint/usePurchasePointData'
interface StepThreeProps {
  lackedPoint?: number
}

const StepThree: React.FC<StepThreeProps> = () => {
  const classes = useStyles()
  const { meta_my_points, myPointsData } = usePointsManage()
  const { purchasePointInfo } = usePurchasePointData()
  const myPoint = myPointsData.total_point ? Number(myPointsData.total_point) : 0
  
  return (
    <Box className={classes.container}>
      {meta_my_points.pending && <ESLoader open={meta_my_points.pending} />}
      <Box width="100%">
        <PointCardItem titleText={i18n.t('common:donate_points.title_purchase_point_step_3')} points={purchasePointInfo.purchased_point} pointText={'eXePoint'} />
        {myPoint && (
          <PointCardItem
            titleText={i18n.t('common:donate_points.title_total_point_step_3')}
            points={myPoint}
            pointText={'eXePoint'}
          />
        )}
      </Box>
      <Box className={classes.messageContainer}>
        <Typography className={classes.messageStyle}>{i18n.t('common:donate_points.success_message_purchase')}</Typography>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    margin: '42px auto 0 auto',
  },
  messageContainer: {
    marginTop: 45,
  },
  messageStyle: {
    fontSize: 14,
    color: '#707070',
    whiteSpace: 'pre-line',
    textAlign: 'center',
  },
}))
export default StepThree
