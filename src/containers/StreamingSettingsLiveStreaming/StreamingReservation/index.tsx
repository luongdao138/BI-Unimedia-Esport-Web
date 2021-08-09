import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
import Step01 from './Step01'
import Step02 from './Step02'
import Step03 from './Step03'

const StreamingReservationContainer: React.FC = () => {
  const [step, setStep] = useState(1)

  const onChangeStep = (step: number): void => {
    setStep(step)
  }

  return step === 1 ? <Step01 onNext={onChangeStep} /> : step === 2 ? <Step02 onNext={onChangeStep} /> : <Step03 />
}
export default StreamingReservationContainer
