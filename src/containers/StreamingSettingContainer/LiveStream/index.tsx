import SettingsCompleted from '@components/SettingsCompleted'
import React, { useState } from 'react'
import Steps from './Steps'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useLiveSetting from '../useLiveSetting'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'

const LiveStreamContainer: React.FC = () => {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { categoryData } = useLiveSetting()
  const [modal, setModal] = useState(false)

  const onChangeStep = (step: number): void => {
    setStep(step)
    if(step === 3) {
      setModal(true)
    }
  }

  const onClose = (): void => {
    router.back()
  }

  const onComplete = (): void => {
    router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)
  }

  return (
    <>
      <Steps step={step} onNext={onChangeStep} category={categoryData} />
      <ESModal open={modal} handleClose={() => setModal(false)}>
        <BlankLayout>
          <SettingsCompleted 
            onClose={onClose} onComplete={onComplete} 
          />
        </BlankLayout>
      </ESModal>
    </>
  )
}

export default LiveStreamContainer
