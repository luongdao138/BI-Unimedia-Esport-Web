import SettingsCompleted from '@components/SettingsCompleted'
import React, { useState } from 'react'
import Steps from './Steps'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useLiveSetting from '../useLiveSetting'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { useTranslation } from 'react-i18next'

const StreamingReservationContainer: React.FC = () => {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { categoryData } = useLiveSetting()

  const [modal, setModal] = useState(false)
  const { t } = useTranslation(['common'])
  const [isShare, setShare] = useState(false)
  const [post, setPost] = useState({
    title: '',
    content: '',
  })

  const onChangeStep = (step: number, isShare?: boolean, post?: { title: string; content: string }): void => {
    setStep(step)
    setShare(isShare)
    setPost(post)
    if (step === 3) {
      setModal(true)
    }
  }

  const onClose = (): void => {
    router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)
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
            titleNotification={t('common:streaming_setting_screen.tab2_notification_title')}
            messageNotification={t('common:streaming_setting_screen.tab2_notification_mess')}
            onClose={onClose}
            onComplete={onComplete}
            isShare={isShare}
            titlePost={post.title}
            contentPost={post.content}
          />
        </BlankLayout>
      </ESModal>
    </>
  )
}
export default StreamingReservationContainer
