/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box } from '@material-ui/core'
import SettingsCompleted from '@components/SettingsCompleted'
import React, { useEffect, useState } from 'react'
import Steps from './Steps'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useLiveSetting from '../useLiveSetting'
import ESModal from '@components/Modal'
import BlankLayout from '@layouts/BlankLayout'
import { FormLiveType } from '@containers/arena/UpsertForm/FormLiveSettingsModel/FormLiveSettingsType'
import { FormikProps } from 'formik'
import ESLoader from '@components/FullScreenLoaderNote'
import { CONFIRM_SETTING_DELAY, EVENT_STATE_CHANNEL } from '@constants/common.constants'
import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'
import { onUpdateChannel } from 'src/graphql/subscriptions'
import * as APIt from 'src/types/graphqlAPI'
import { getChannelByArn } from 'src/graphql/queries'

interface Props {
  formik?: FormikProps<FormLiveType>
  validateField?: string
  handleUpdateValidateField?: (value: string) => void
}

const LiveStreamContainer: React.FC<Props> = ({ formik, validateField, handleUpdateValidateField }) => {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { categoryData } = useLiveSetting()
  const [modal, setModal] = useState(false)
  const [isShare, setShare] = useState(false)
  const [post, setPost] = useState({
    title: '',
    content: '',
  })
  const [stateChannelMedia, setStateChannelMedia] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showResultDialog, setShowResultDialog] = useState(false)

  const onChangeStep = (step: number, isShare?: boolean, post?: { title: string; content: string }): void => {
    console.log('click next step', step, stateChannelMedia)
    setStep(step)
    setShare(isShare)
    setPost(post)
    if (step === 3) {
      setModal(true)
    }
  }

  const handleClose = () => {
    setModal(false)
  }

  const onClose = (): void => {
    router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)
  }

  const onComplete = () => {
    router.push(ESRoutes.VIDEO_STREAMING_MANAGEMENT)
  }

  //update channel
  const subscribeUpdateChannelAction = () => {
    let updateChannelSubscription = API.graphql(graphqlOperation(onUpdateChannel))
    updateChannelSubscription = updateChannelSubscription.subscribe({
      next: (sub: GraphQLResult<APIt.OnUpdateChannelSubscription>) => {
        //@ts-ignore
        console.log('====>>SUB<<===', sub?.value?.data?.onUpdateChannel, formik?.values?.stepSettingOne?.arn)
        //@ts-ignore
        if (sub?.value?.data?.onUpdateChannel?.arn === formik?.values?.stepSettingOne?.arn) {
          //@ts-ignore
          console.log('=== ONLY MY ARN ===', sub?.value?.data?.onUpdateChannel?.state)
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
      const channelArn = formik?.values?.stepSettingOne?.arn
      const listQC: APIt.GetChannelByArnQueryVariables = {
        arn: channelArn,
        limit: 2000,
      }
      if (channelArn) {
        const channelRs: any = await API.graphql(graphqlOperation(getChannelByArn, listQC))
        console.log('===>>channelRs<<<===', channelRs)
        const channelData = channelRs?.data?.getChannelByArn?.items?.find((i) => i?.arn === channelArn)
        console.log('====>>data channel find<<====', channelData)
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
  }, [formik?.values?.stepSettingOne?.arn])

  useEffect(() => {
    let unSub
    if (step === 3 && stateChannelMedia && stateChannelMedia !== EVENT_STATE_CHANNEL.RUNNING) {
      setLoading(true)
      setShowResultDialog(false)
    } else {
      if (!loading) {
        setLoading(false)
        setShowResultDialog(true)
        return
      }
      unSub = setTimeout(() => {
        setLoading(false)
        setShowResultDialog(true)
      }, CONFIRM_SETTING_DELAY)
    }
    return () => {
      clearTimeout(unSub)
    }
  }, [step, stateChannelMedia])

  return (
    <>
      <Steps
        step={formik?.values?.stepSettingOne?.step_setting}
        onNext={onChangeStep}
        category={categoryData}
        formik={formik}
        isShare={isShare}
        titlePost={post.title}
        contentPost={post.content}
        stateChannelArn={stateChannelMedia}
        visibleLoading={step === 3 && stateChannelMedia && stateChannelMedia !== EVENT_STATE_CHANNEL.RUNNING}
        disableLoader={modal && (stateChannelMedia === EVENT_STATE_CHANNEL.RUNNING || !stateChannelMedia)}
        validateField={validateField}
        handleUpdateValidateField={handleUpdateValidateField}
      />
      <ESModal open={modal && showResultDialog} handleClose={handleClose}>
        <BlankLayout>
          <SettingsCompleted onClose={onClose} onComplete={onComplete} />
        </BlankLayout>
      </ESModal>
      <Box style={{ display: loading ? 'flex' : 'none' }}>
        <ESLoader open={true} />
      </Box>
    </>
  )
}

export default LiveStreamContainer
