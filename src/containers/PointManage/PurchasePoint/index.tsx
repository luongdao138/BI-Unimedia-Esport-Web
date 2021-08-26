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
    // Multipayment.getToken(
    //   {
    //     cardno: '371449635398433',
    //     expire: '2112',
    //     securitycode: '1405',
    //     holdername: 'MONKEY',
    //     tokennumber: '1'
    //   },
    //   response => {
    //     //   if (response.resultCode == "000") {
    //     //   console.log(response);
    //     //   document.getElementById("token").value = response.tokenObject.token;
    //     // //document.getElementById("purchaseForm").submit();
    //     //   } else if (response.resultCode in tokenError) {
    //     //     alert(tokenError[response.resultCode]);
    //     //   } else {
    //     //     alert("エラー発生しました。");
    //     //   }
    //   }
    // );
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
