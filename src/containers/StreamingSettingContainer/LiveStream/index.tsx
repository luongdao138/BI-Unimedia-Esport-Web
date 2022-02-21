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
import { STATUS_VIDEO } from '@services/videoTop.services'
import { useAppDispatch } from '@store/hooks'
import { useTranslation } from 'react-i18next'
import * as commonActions from '@store/common/actions'

const { getChannelByArn, getVideoByUuid } = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/queries`)
const { onCreateVideo, onUpdateChannel, onUpdateVideo } = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/subscriptions`)
// import * as APIt from 'src/types/graphqlAPI'
import useGraphqlAPI from 'src/types/useGraphqlAPI'
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-ignore
const APIt: any = useGraphqlAPI()

// import abc from '@containers/VideoLiveStreamContainer/ChatContainer/abc'

interface Props {
  formik?: FormikProps<FormLiveType>
  validateField?: string
  handleUpdateValidateField?: (value: string) => void
}

const LiveStreamContainer: React.FC<Props> = ({ formik, validateField, handleUpdateValidateField }) => {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { t } = useTranslation(['common'])
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
  const [videoStatusDynamo, setVideoStatusDynamo] = useState(null)

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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

  const checkChannelState = async () => {
    try {
      const channelArn = formik?.values?.stepSettingOne?.arn
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
      if (
        obsStatusDynamo === 0 &&
        videoStatusDynamo == STATUS_VIDEO.OVER_LOAD &&
        (stateChannelMedia === EVENT_STATE_CHANNEL.STOPPED || stateChannelMedia === EVENT_STATE_CHANNEL.STOPPING)
      ) {
        //force stopped
        setLoading(false)
        setShowResultDialog(false)
      } else {
        setLoading(true)
        setShowResultDialog(false)
      }
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
    try {
      const videoId = formik.values?.stepSettingOne?.uuid_clone
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const listQV: APIt.GetVideoByUuidQueryVariables = {
        uuid: videoId,
        limit: 2000,
      }
      const videoRs: any = await API.graphql(graphqlOperation(getVideoByUuid, listQV))
      const videoData = videoRs.data.getVideoByUuid.items.find((item) => item.uuid === videoId)
      console.log('LIVE::queryVideoByUUID===>', videoData, videoRs)
      if (videoData) {
        setVideoStatusDynamo(videoData?.video_status)
        if (videoData?.process_status === EVENT_LIVE_STATUS.STREAM_OFF) {
          //Updated
          setObsStatusDynamo(0)
        }
        if (videoData?.process_status === EVENT_LIVE_STATUS.STREAM_START) {
          //live streaming
          setObsStatusDynamo(1)
        }
        if (
          videoData?.process_status === EVENT_LIVE_STATUS.STREAM_END &&
          videoData?.video_status === STATUS_VIDEO.ARCHIVE &&
          stateChannelMedia === EVENT_STATE_CHANNEL.STOPPED
        ) {
          //archived
          setObsStatusDynamo(-1)
        }
      } else {
        //!videoData => created
        setObsStatusDynamo(-1)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const subscribeUpdateVideoAction = () => {
    let updateVideoSubscription = API.graphql(graphqlOperation(onUpdateVideo))
    updateVideoSubscription = updateVideoSubscription.subscribe({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      next: (sub: GraphQLResult<APIt.OnUpdateVideoSubscription>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const subUpdatedVideo = sub?.value
        const updateVideoData = subUpdatedVideo.data.onUpdateVideo
        console.log('LIVE:=subUpdatedVideo + updateVideoData=')
        console.log(subUpdatedVideo)
        console.log(updateVideoData)
        if (updateVideoData) {
          if (updateVideoData?.uuid === formik.values?.stepSettingOne?.uuid_clone) {
            setVideoStatusDynamo(updateVideoData?.video_status)
            if (updateVideoData?.process_status === EVENT_LIVE_STATUS.STREAM_START) {
              //live
              setObsStatusDynamo(1)
            }
            if (
              updateVideoData?.process_status === EVENT_LIVE_STATUS.STREAM_END &&
              updateVideoData?.video_status == STATUS_VIDEO.ARCHIVE &&
              stateChannelMedia === EVENT_STATE_CHANNEL.STOPPED
            ) {
              //archived
              setObsStatusDynamo(-1)
            }
            if (updateVideoData?.process_status === EVENT_LIVE_STATUS.STREAM_OFF) {
              //updated
              setObsStatusDynamo(0)
            }
          }
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

  //sub created video
  const subscribeCreateVideoAction = () => {
    let createVideoSubscription = API.graphql(graphqlOperation(onCreateVideo))
    createVideoSubscription = createVideoSubscription.subscribe({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      next: (sub: GraphQLResult<APIt.OnCreateVideoSubscription>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const subVideo = sub?.value
        const createdVideo = subVideo.data.onCreateVideo
        console.log('LIVE:::createdVideo:', createdVideo, subVideo)
        if (createdVideo) {
          if (createdVideo?.uuid === formik.values?.stepSettingOne?.uuid_clone) {
            setVideoStatusDynamo(createdVideo?.video_status)
            if (createdVideo?.process_status === EVENT_LIVE_STATUS.STREAM_START) {
              //live
              setObsStatusDynamo(1)
            }
            if (
              createdVideo?.process_status === EVENT_LIVE_STATUS.STREAM_END &&
              createdVideo?.video_status == STATUS_VIDEO.ARCHIVE &&
              stateChannelMedia === EVENT_STATE_CHANNEL.STOPPED
            ) {
              //archived
              setObsStatusDynamo(-1)
            }
            if (createdVideo?.process_status === EVENT_LIVE_STATUS.STREAM_OFF) {
              //updated
              setObsStatusDynamo(0)
            }
          }
        }
      },
      error: (error) => console.warn(error),
    })
    return createVideoSubscription
  }

  useEffect(() => {
    const updateChannelSubscription = subscribeUpdateChannelAction()
    const updateVideoSubscription = subscribeUpdateVideoAction()
    const createdVideoSubscription = subscribeCreateVideoAction()
    return () => {
      if (updateChannelSubscription) {
        updateChannelSubscription.unsubscribe()
      }
      if (updateVideoSubscription) {
        updateVideoSubscription.unsubscribe()
      }
      if (createdVideoSubscription) {
        createdVideoSubscription.unsubscribe()
      }
    }
  })

  useEffect(() => {
    if (obsStatusDynamo === 0 && videoStatusDynamo == STATUS_VIDEO.OVER_LOAD) {
      if (step === 3) {
        dispatch(commonActions.addToast(t('common:common.deactivate_key_setting_error')))
      }
      setLoading(false)
      setShowResultDialog(false)
    }
  }, [obsStatusDynamo, videoStatusDynamo])

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
        videoStatusDynamo={videoStatusDynamo}
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
