import { Box, makeStyles } from '@material-ui/core'
import React from 'react'
// import { useTranslation } from 'react-i18next'
// import { Colors } from '@theme/colors'
import PurchasePoint from '@containers/PointManage/PurchasePoint'
import Step2 from '@containers/PointManage/PurchasePoint/Step2'

interface StepTwoProps {
  isBuyNewPoint: boolean
  missingPoints?: number
}

const StepTwo: React.FC<StepTwoProps> = ({ missingPoints, isBuyNewPoint }) => {
  const classes = useStyles()
  // const { t } = useTranslation('common')
  
  return (
    <Box className={classes.rootContainer}>
      {isBuyNewPoint ? (
        <PurchasePoint/>
      ) : (
        <Step2 selectedPoint={missingPoints} />
      )}
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  rootContainer: {},
}))
export default StepTwo
