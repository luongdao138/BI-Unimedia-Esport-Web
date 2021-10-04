import SettingsCompleted from '@components/SettingsCompleted'
import React, { useState } from 'react'
import Steps from './Steps'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useLiveSetting from '../useLiveSetting'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'

interface Props {
  hasChannel?: boolean
  formik?: FormikProps<FormLiveType>
}

const DistributorInformationContainer: React.FC<Props> = ({ formik }) => {
  // const [step, setStep] = useState(1)
  const router = useRouter()
  const { channelInfo } = useLiveSetting()
  const [modal, setModal] = useState(false)
  const { t } = useTranslation(['common'])
  const hasChannel = formik?.values?.stepSettingThree?.id === 0 ? false : true

  const onChangeStep = (step: number): void => {
    // setStep(step)
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
      <Steps
        step={formik?.values?.stepSettingThree?.step_setting}
        onNext={onChangeStep}
        channel={channelInfo}
        hasChannel={hasChannel}
        formik={formik}
      />
      <ESModal open={modal} handleClose={() => setModal(false)}>
        <BlankLayout>
          <SettingsCompleted
            titleNotification={t('common:streaming_setting_screen.tab3_notification_title')}
            messageNotification={t('common:streaming_setting_screen.tab3_notification_mess')}
            onClose={onClose}
            onComplete={onComplete}
          />
        </BlankLayout>
      </ESModal>
    </>
  )
}
export default DistributorInformationContainer
