import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import { Colors } from '@theme/colors'
import PurchasePoint from '@containers/PointManage/PurchasePoint'
import Step2 from '@containers/PointManage/PurchasePoint/Step2'
import usePurchasePointData from '@containers/PointManage/PurchasePoint/usePurchasePointData'
import usePointsManage from '@containers/PointManage/usePointsManage'
interface StepTwoProps {
  isBuyNewPoint: boolean
  lackedPoint?: number
  onChangeStage: (nextStage: number) => void
}

const StepTwo: React.FC<StepTwoProps> = ({ lackedPoint, isBuyNewPoint, onChangeStage }) => {
  const classes = useStyles()
  const [isFirstRender, setIsFirstRender] = React.useState(true)

  const { getSavedCards, purchasePointInfo } = usePurchasePointData()
  const { getMyPointData } = usePointsManage()
  const params = {
    page: 1,
    limit: 10,
  }

  useEffect(() => {
    // catch event purchase success, no count for first render
    if (!isFirstRender && purchasePointInfo.purchase_success) {
      getMyPointData(params)
      onChangeStage(3)
    }
    setIsFirstRender(false)
  }, [purchasePointInfo.purchase_success])

  useEffect(() => {
    // get list card when buy lacked point
    if (!isBuyNewPoint) {
      getSavedCards()
    }
  }, [])

  return (
    <Box className={classes.rootContainer}>
      {isBuyNewPoint ? (
        <PurchasePoint />
      ) : (
        <Box style={{ padding: '20px 0 110px 0' }}>
          <Step2 selectedPoint={lackedPoint} />
        </Box>
      )}
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  rootContainer: {},
}))
export default StepTwo
