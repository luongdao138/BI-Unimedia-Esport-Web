/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import SettingsCompleted from '@components/SettingsCompleted'
import React, { useEffect, useState } from 'react'
import Steps from './Steps'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useLiveSetting from '../useLiveSetting'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'
import { onUpdateChannel } from 'src/graphql/subscriptions'
import * as APIt from 'src/types/graphqlAPI'
import { getChannelByArn } from 'src/graphql/queries'

interface Props {
  formik?: FormikProps<FormLiveType>
  flagUpdateFieldDate?: (flag: boolean) => void
  handleUpdateValidateField?: (value: string) => void
  validateFieldProps?: string
}

const StreamingReservationContainer: React.FC<Props> = ({ formik, flagUpdateFieldDate, handleUpdateValidateField, validateFieldProps }) => {
  // const [step, setStep] = useState(1)
  const router = useRouter()
  const { categoryData } = useLiveSetting()

  const [modal, setModal] = useState(false)
  const { t } = useTranslation(['common'])
  const [isShare, setShare] = useState(false)
  const [post, setPost] = useState({
    title: '',
    content: '',
  })
  const [stateChannelMedia, setStateChannelMedia] = useState(null)

  const onChangeStep = (step: number, isShare?: boolean, post?: { title: string; content: string }): void => {
    // console.log('SCHEDULE: click next step', step, stateChannelMedia)
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

  const onComplete = (): void => {
    router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)
  }

  const handleClose = () => {
    setModal(false)
  }

  //update channel
  const subscribeUpdateChannelAction = () => {
    let updateChannelSubscription = API.graphql(graphqlOperation(onUpdateChannel))
    updateChannelSubscription = updateChannelSubscription.subscribe({
      next: (sub: GraphQLResult<APIt.OnUpdateChannelSubscription>) => {
        //@ts-ignore
        console.log('====>>SUB SCHEDULE<<===', sub?.value?.data?.onUpdateChannel, formik?.values?.stepSettingTwo?.arn)
        //@ts-ignore
        if (sub?.value?.data?.onUpdateChannel?.arn === formik?.values?.stepSettingTwo?.arn) {
          //@ts-ignore
          console.log('=== ONLY MY ARN SCHEDULE ===', sub?.value?.data?.onUpdateChannel?.state)
          //@ts-ignore
          setStateChannelMedia(sub?.value?.data?.onUpdateChannel?.state)
        }
      },
      error: (error) => console.warn(error),
    })
    return updateChannelSubscription
  }
  useEffect(() => {
    const updateChannelSubscription = subscribeUpdateChannelAction()
    return () => {
      if (updateChannelSubscription) {
        updateChannelSubscription.unsubscribe()
      }
    }
  })
  const checkChannelState = async () => {
    try {
      const channelArn = formik?.values?.stepSettingTwo?.arn
      const listQC: APIt.GetChannelByArnQueryVariables = {
        arn: channelArn,
        limit: 2000,
      }
      if (channelArn) {
        const channelRs: any = await API.graphql(graphqlOperation(getChannelByArn, listQC))
        console.log('===>>SCHEDULE:channelRs<<<===', channelRs)
        const channelData = channelRs?.data?.getChannelByArn?.items?.find((i) => i?.arn === channelArn)
        console.log('====>>SCHEDULE: data channel find<<====', channelData)
        if (channelData) {
          setStateChannelMedia(channelData.state)
        } else {
          setStateChannelMedia(null)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    checkChannelState()
  }, [formik?.values?.stepSettingTwo?.arn])

  return (
    <>
      <Steps
        step={formik?.values?.stepSettingTwo?.step_setting}
        onNext={onChangeStep}
        category={categoryData}
        formik={formik}
        isShare={isShare}
        titlePost={post.title}
        contentPost={post.content}
        flagUpdateFieldDate={flagUpdateFieldDate}
        handleUpdateValidateField={handleUpdateValidateField}
        validateFieldProps={validateFieldProps}
        stateChannelArn={stateChannelMedia}
      />
      <ESModal open={modal} handleClose={handleClose}>
        <BlankLayout>
          <SettingsCompleted
            titleNotification={t('common:streaming_setting_screen.tab2_notification_title')}
            messageNotification={t('common:streaming_setting_screen.tab2_notification_mess')}
            onClose={onClose}
            onComplete={onComplete}
          />
        </BlankLayout>
      </ESModal>
    </>
  )
}
export default StreamingReservationContainer
