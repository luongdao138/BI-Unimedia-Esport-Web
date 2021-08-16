import SettingsCompleted from '@components/SettingsCompleted'
import React, { useState } from 'react'
import Steps from './Steps'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'

const StreamingReservationContainer: React.FC = () => {
  const [step, setStep] = useState(1)
  const router = useRouter()

  const onChangeStep = (step: number): void => {
    setStep(step)
  }

  const onClose = (): void => {
    router.back()
  }

  const onComplete = (): void => {
    router.push(ESRoutes.DELIVERY_MANAGEMENT)
    // router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)
  }

  return step === 3 ? <SettingsCompleted onClose={onClose} onComplete={onComplete} /> : <Steps step={step} onNext={onChangeStep} />
}
export default StreamingReservationContainer
