import React, { useState, useEffect } from 'react'
import Step1 from '@containers/PointManage/PurchasePoint/Step1'
import Step2 from '@containers/PointManage/PurchasePoint/Step2'
import { Box, makeStyles } from '@material-ui/core'
import usePurchasePointData from '@containers/PointManage/PurchasePoint/usePurchasePointData'
import usePointsManage from '@containers/PointManage/usePointsManage'

declare global {
  interface Window {
    Multipayment: any
  }
}

const PurchasePoint: React.FC = () => {
  const [step, setStep] = useState(1)
  const [selectedPoint, setSelectedPoint] = useState(0)

  const { getSavedCards } = usePurchasePointData()
  const { getMyPointData } = usePointsManage()

  useEffect(() => {
    getSavedCards()
  }, [])

  useEffect(() => {
    addEventListener('storage', (event) => {
      if (event?.key === 'reload_point') {
        getMyPointData({ page: 1, limit: 10 })
      }
    })
    return () => {
      removeEventListener('storage', () => null)
    }
  }, [])

  const classes = useStyles()

  const onChangeStep = (new_step: number): void => {
    setStep(new_step)
  }

  return (
    <>
      <Box className={classes.container}>
        {step === 1 ? (
          <Step1 step={step} onNext={onChangeStep} setSelectedPoint={(point) => setSelectedPoint(point)} />
        ) : step === 2 ? (
          <Step2 selectedPoint={selectedPoint} />
        ) : (
          <></>
        )}
      </Box>
    </>
  )
}

export default PurchasePoint

const useStyles = makeStyles(() => ({
  container: {},
}))
