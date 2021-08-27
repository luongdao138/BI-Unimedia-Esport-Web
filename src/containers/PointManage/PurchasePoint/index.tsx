import React, { useState, useEffect } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import { Box, makeStyles } from '@material-ui/core'
import usePurchasePointData from './usePurchasePointData'

declare global {
  interface Window {
    Multipayment: any
  }
}

const PurchasePoint: React.FC = () => {
  const [step, setStep] = useState(1)
  const [selectedPoint, setSelectedPoint] = useState(0)

  const { getSavedCards } = usePurchasePointData()

  useEffect(() => {
    getSavedCards()
  }, [])

  const classes = useStyles()

  const onChangeStep = (new_step: number): void => {
    setStep(new_step)
  }

  return (
    <>
      <Box className={classes.wrap_container}>
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
  wrap_container: {
    padding: '0 24px',
  },
}))
