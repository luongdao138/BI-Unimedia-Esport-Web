import SettingsCompleted from '@components/SettingsCompleted'
import React, { useState } from 'react'
import Steps from './Steps'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useLiveSetting from '../useLiveSetting'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { FormikProps } from 'formik'

interface Props {
  formik?: FormikProps<FormLiveType>
}

const LiveStreamContainer: React.FC<Props> = ({ formik }) => {
  // const [step, setStep] = useState(1)
  const router = useRouter()
  const { categoryData } = useLiveSetting()
  const [modal, setModal] = useState(false)
  const [isShare, setShare] = useState(false)
  const [post, setPost] = useState({
    title: '',
    content: '',
  })

  const onChangeStep = (step: number, isShare?: boolean, post?: { title: string; content: string }): void => {
    // setStep(step)
    setShare(isShare)
    setPost(post)
    if (step === 3) {
      setModal(true)
    }
  }

  const onClose = (): void => {
    router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)
  }

  const onComplete = () => {
    router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)
  }

  return (
    <>
      <Steps step={formik?.values?.stepSettingOne?.step_setting} onNext={onChangeStep} category={categoryData} formik={formik} />
      <ESModal open={modal} handleClose={() => setModal(false)}>
        <BlankLayout>
          <SettingsCompleted
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

export default LiveStreamContainer
