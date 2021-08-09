import SettingsCompleted from '@components/SettingsCompleted'
import React, { useState } from 'react'
import Step01 from './Step01'
import Step02 from './Step02'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

const LiveStreamContainer: React.FC = () => {
  const [step, setStep] = useState(1)
  const router = useRouter()

  const onChangeStep = (step: number): void => {
    setStep(step)
  }

  const onClose = (): void => {
    // router.push(ESRoutes.DELIVERY_MANAGEMENT)
    router.back()
  }

  const onComplete = (): void => {
    router.push(ESRoutes.DELIVERY_MANAGEMENT)
  }

  return step === 1 ? (
    <Step01 onNext={onChangeStep} />
  ) : step === 2 ? (
    <Step02 onNext={onChangeStep} />
  ) : (
    <SettingsCompleted onClose={onClose} onComplete={onComplete} />
  )
}

export default LiveStreamContainer
