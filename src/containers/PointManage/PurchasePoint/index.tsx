import React, { useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import PointPurchaseConfirmModal from './PointPurchaseConfirmModal'
import CardDeleteConfirmModal from './CardDeleteConfirmModal'
// import { useRouter } from 'next/router'
// import { ESRoutes } from '@constants/route.constants'
import { Box, makeStyles } from '@material-ui/core'

const PurchasePoint: React.FC = () => {
  const [step, setStep] = useState(1)
  const [isShowPurchasePointModal, setIsShowPurchasePointModal] = useState(false)
  const [isShowDeleteCardModal, setIsShowDeleteCardModal] = useState(false)
  const [selectedPoint, setSelectedPoint] = useState(0)
  const cards = [
    {
      number: 'xxxx xxxx xxxx 4256',
    },
    {
      number: 'xxxx xxxx xxxx 4256',
    },
  ]

  // const router = useRouter()
  const classes = useStyles()

  const onChangeStep = (new_step: number): void => {
    if (new_step === 3) {
      setIsShowPurchasePointModal(true)
    } else {
      setStep(new_step)
    }
  }

  const deleteCard = (): void => {
    setIsShowDeleteCardModal(true)
  }

  // const onClose = (): void => {
  //   router.back()
  // }

  // const onComplete = (): void => {
  //   router.push(ESRoutes.DELIVERY_MANAGEMENT)
  // }

  return (
    <Box className={classes.wrap_container}>
      {step === 1 ? (
        <Step1 step={step} onNext={onChangeStep} setSelectedPoint={(point) => setSelectedPoint(point)} />
      ) : step === 2 ? (
        <Step2 deleteCard={deleteCard} cards={cards} step={step} onNext={onChangeStep} selectedPoint={selectedPoint} />
      ) : (
        <></>
      )}
      {isShowPurchasePointModal && (
        <PointPurchaseConfirmModal
          open={isShowPurchasePointModal}
          selectedPoint={selectedPoint}
          handleClose={() => {
            setIsShowPurchasePointModal(false)
          }}
        />
      )}
      {isShowDeleteCardModal && (
        <CardDeleteConfirmModal
          open={isShowDeleteCardModal}
          handleClose={() => {
            setIsShowDeleteCardModal(false)
          }}
        />
      )}
    </Box>
  )
}

export default PurchasePoint

const useStyles = makeStyles(() => ({
  wrap_container: {
    padding: '0 24px',
  },
}))
