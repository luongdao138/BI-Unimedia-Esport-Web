import React, { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
// import { useRouter } from 'next/router'
// import { ESRoutes } from '@constants/route.constants'
import { Box, makeStyles } from '@material-ui/core'

const PurchasePoint: React.FC = () => {
  const [step, setStep] = useState(1)
  // const router = useRouter()
  const classes = useStyles()

  const onChangeStep = (step: number): void => {
    setStep(step)
  }

  // const onClose = (): void => {
  //   router.back()
  // }

  // const onComplete = (): void => {
  //   router.push(ESRoutes.DELIVERY_MANAGEMENT)
  // }

  return (
    <Box className={classes.wrap_container}>
      {step === 1 ? <Step1 step={step} onNext={onChangeStep} /> : step === 2 ? <Step2 step={step} onNext={onChangeStep} /> : <></>}
    </Box>
  )
}

export default PurchasePoint

const useStyles = makeStyles(() => ({
  wrap_container: {
    padding: '0 24px',
  },
}))
