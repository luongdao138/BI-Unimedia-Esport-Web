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
import { CONFIRM_SETTING_DELAY, EVENT_LIVE_STATUS, EVENT_STATE_CHANNEL } from '@constants/common.constants'
import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'
import { onUpdateChannel, onUpdateVideo } from 'src/graphql/subscriptions'
import * as APIt from 'src/types/graphqlAPI'
import { getChannelByArn, getVideoByUuid } from 'src/graphql/queries'
import { STATUS_VIDEO } from '@services/videoTop.services'
interface Props {
  formik?: FormikProps<FormLiveType>
}

const LiveStreamContainer: React.FC<Props> = ({ formik }) => {
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
  const [obsStatusDynamo, setObsStatusDynamo] = useState(null)
  // const [flagStatusDynamo, setFlagStatusDynamo] = useState(false)

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
          //@ts-ignore
          // setObsStatusDynamo(sub?.value?.data?.onUpdateChannel?.obs_status)
        }
      },
      error: (error) => console.warn(error),
    })
    return updateChannelSubscription
  }

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

  //query video
  const checkVideoStatus = async () => {
    console.log('====>>>', formik.values?.stepSettingOne?.uuid_clone)
    try {
      const videoId = formik.values?.stepSettingOne?.uuid_clone
      const listQV: APIt.GetVideoByUuidQueryVariables = {
        uuid: videoId,
        limit: 2000,
      }
      const videoRs: any = await API.graphql(graphqlOperation(getVideoByUuid, listQV))
      const videoData = videoRs.data.getVideoByUuid.items.find((item) => item.uuid === videoId)
      console.log('LIVE::data===>', videoData, videoRs)
      if (videoData) {
        console.log('LIVE:==video data query::::', videoData)
        if (videoData?.process_status === EVENT_LIVE_STATUS.STREAM_OFF) {
          //Updated
        }
        if (videoData?.process_status === EVENT_LIVE_STATUS.STREAM_START) {
          //live streaming
        }
        if (videoData?.process_status === EVENT_LIVE_STATUS.STREAM_END && videoData?.video_status === STATUS_VIDEO.ARCHIVE) {
          //archived
        }
      } else {
        //!videoData || videoData (vid is archived) => created
        console.log('LIVE::else ::::')
        setObsStatusDynamo(null)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const subscribeUpdateVideoAction = () => {
    let updateVideoSubscription = API.graphql(graphqlOperation(onUpdateVideo))
    updateVideoSubscription = updateVideoSubscription.subscribe({
      next: (sub: GraphQLResult<APIt.OnUpdateVideoSubscription>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const subMessage = sub?.value
        const updateVideoData = subMessage.data.onUpdateVideo
        console.log('LIVE:=======onUpdateVideo + updateVideoData=======')
        console.log(subMessage)
        console.log(updateVideoData)
        console.log('LIVE:====================================')
        if (updateVideoData) {
          console.log('LIVE::subcription video ===>')
        }
      },
      error: (error) => console.warn(error),
    })
    return updateVideoSubscription
  }

  useEffect(() => {
    if (formik.values?.stepSettingOne?.uuid_clone) {
      checkVideoStatus()
    }
  }, [formik.values?.stepSettingOne?.uuid_clone])

  useEffect(() => {
    const updateChannelSubscription = subscribeUpdateChannelAction()
    const updateVideoSubscription = subscribeUpdateVideoAction()
    return () => {
      if (updateChannelSubscription) {
        updateChannelSubscription.unsubscribe()
      }
      if (updateVideoSubscription) {
        updateVideoSubscription.unsubscribe()
      }
    }
  })

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
        obsStatusDynamo={obsStatusDynamo}
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
