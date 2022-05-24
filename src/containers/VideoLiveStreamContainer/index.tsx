/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ESTab from '@components/Tab'
import ESTabs from '@components/Tabs'
import i18n from '@locales/i18n'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ChatContainer from './ChatContainer'
import DistributorInfo from './DistributorInfo'
// import LiveStreamContent from './LiveStreamContent'
import DonatePoints from './DonatePoints'
// import DonatePointsConfirmModal from './DonatePointsConfirmModal/DonatePointsConfirmModal'
import ProgramInfoNoViewingTicket from '@containers/VideoLiveStreamContainer/ProgramInfoNoViewingTicket'
import usePointsManage from '@containers/PointManage/usePointsManage'
import FullESLoader from '@components/FullScreenLoader'
import { addToast } from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'
import PurchaseTicketSuperChat from './PurchaseTicketSuperChat'
import { useRouter } from 'next/router'
import usePurchaseTicketSuperChat from './usePurchaseTicket'
import useDetailVideo from './useDetailVideo'
import moment from 'moment'
import ESLoader from '@components/Loader'
import PreloadChatContainer from './PreloadContainer/PreloadChatContainer'
import { RankingsItem, STATUS_VIDEO } from '@services/videoTop.services'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { ESRoutes } from '@constants/route.constants'

const { getVideoByUuid } = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/queries`)
const { onUpdateVideo, onUpdateChannel } = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/subscriptions`)
import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'
import { EVENT_LIVE_STATUS, LIVE_VIDEO_TYPE, VIDEO_INFO_TABS } from '@constants/common.constants'
import DialogLoginContainer from '@containers/DialogLogin'
import _ from 'lodash'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
import LiveStreamContent from './LiveStreamContent'
import { PurchaseTicketParams } from '@services/points.service'
import useGraphqlAPI from 'src/types/useGraphqlAPI'
import TabSelectContainer from './TabSelectContainer'
import { VideoContext } from '@containers/VideoLiveStreamContainer/VideoContext'
// import { CommonHelper } from '@utils/helpers/CommonHelper'

import { useResizeScreen } from '@utils/hooks/useResizeScreen'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const APIt: any = useGraphqlAPI()
import ProgramInfo from './ProgramInfo'
import RelatedVideos from './RelatedVideos'
import VideoSubInfo from './VideoSubInfo'
import { use100vh } from 'react-div-100vh'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'
import * as commonActions from '@store/common/actions'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import GoogleAd from '@components/GoogleAds'
import VideoTabContextProvider from '@containers/VideoLiveStreamContainer/VideoContext/VideTabContext'
import ControlBarContextProvider from '@containers/VideoLiveStreamContainer/VideoContext/ControlBarContext'

export interface videoStyleProps {
  availHeight: number
  availWidth: number
  isLandscape: boolean
  isIphone: boolean
}

export enum VIDEO_TYPE {
  LIVE_STREAM = 0,
  SCHEDULE = 1,
  ARCHIVED = 2,
}

type VIDEO_INFO = {
  video_status: string | number
  process_status: string
}

const VideoDetail: React.FC = () => {
  const PURCHASE_TYPE = {
    PURCHASE_TICKET: 1,
    PURCHASE_SUPER_CHAT: 2,
    GIVE_GIFT_TO_MASTER: 4,
  }
  // console.log('🚀 ~ height', height)
  const height = use100vh()
  console.log('🚀 ~ heighta', height)
  console.log('🚀 ~ innerHeight', window.innerHeight)
  const { isLandscape } = useRotateScreen()
  // const classes = useStyles({ availHeight: height, availWidth: window.innerWidth, isLandscape })
  const { t } = useTranslation('common')
  const { isResizedScreen, setIsResizedScreen } = useResizeScreen()
  const { width: pageWidth } = useWindowDimensions(0)

  const isMobile = pageWidth <= 768 || isLandscape
  console.log('🚀 ~ isMobile', isMobile)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const video_id = Array.isArray(router.query?.vid) ? router.query.vid[0] : router.query.vid // uuid video
  // const { selectors } = userProfileStore
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  // const userProfile = useAppSelector(selectors.getUserProfile)
  const [videoRefInfo, setVideoRefInfo] = useState(null)
  const [giverRankInfo, setGiverRankInfo] = useState<Array<RankingsItem>>([])
  const [receiverRankInfo, setReceiverRankInfo] = useState<Array<RankingsItem>>([])

  const { getMyPointData, myPointsData } = usePointsManage()
  const { purchaseTicketSuperChat, meta_purchase_ticket_super_chat } = usePurchaseTicketSuperChat()
  const myPoint = myPointsData?.total_point ? Number(myPointsData.total_point) : 0

  const [tab, setTab] = useState(VIDEO_INFO_TABS.PROGRAM_INFO)
  const [showDialogLogin, setShowDialogLogin] = useState<boolean>(false)
  const [firstRender, setFirstRender] = useState(true)

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showModalPurchasePoint, setShowModalPurchasePoint] = useState(false)
  const [lackedPoint, setLackedPoint] = useState(0)
  const [purchaseComment, setPurchaseComment] = useState<string>('')
  const [showPurchaseTicketModal, setShowPurchaseTicketModal] = useState<boolean>(false)
  const [purchaseType, setPurchaseType] = useState<number>(null)
  const [softKeyboardIsShown, setSoftKeyboardIsShown] = useState(false)
  const [errorPurchase, setErrorPurchase] = useState(false)
  const [videoInfo, setVideoInfo] = useState<VIDEO_INFO>({ video_status: STATUS_VIDEO.SCHEDULE, process_status: '' })
  const [videoStatus, setVideoStatus] = useState(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isArchived, setIsArchived] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [errorMsgDonatePoint, setErrorMsgDonatePoint] = useState('')

  // const [loadingPurchasePoint, setLoadingPurchasePoint] = useState<boolean>(false)

  console.log('DonatePointsConfirmModal', disabled, errorPurchase, purchaseComment)

  const confirmDonatePointRef = useRef<any>(null)

  const {
    getVideoDetail,
    detailVideoResult,
    userResult,
    videoDetailError,
    resetVideoDetailError,
    resetVideoDetailData,
    changeIsStreamingEnd,
    liveStreamInfo,
    changeIsHoveredVideoStatus,
    fetchDonateRanking,
    rankingListMeta,
    giverRankings,
    receiverRankings,
    updateUseGiftFlag,
  } = useDetailVideo()
  console.log('🚀 ~ rankingListMeta', rankingListMeta)

  const { is_normal_view_mode, isHoveredVideo } = liveStreamInfo

  const isPendingPurchaseTicket = meta_purchase_ticket_super_chat?.pending && purchaseType === PURCHASE_TYPE.PURCHASE_TICKET

  const isPendingPurchaseSuperChat = meta_purchase_ticket_super_chat.pending && purchaseType === PURCHASE_TYPE.PURCHASE_SUPER_CHAT

  const [isVideoFreeToWatch, setIsVideoFreeToWatch] = useState(detailVideoResult?.use_ticket ? detailVideoResult?.use_ticket : -1)

  console.log('🚀 ~ isLandscape', isLandscape)
  // const theme = useTheme()
  // const screenDownSP = useMediaQuery(theme.breakpoints.down(576))
  const androidPl = /Android/i.test(window.navigator.userAgent)
  const iPhonePl = /iPhone/i.test(window.navigator.userAgent)

  // const handleDonatePointRef = useRef<any>(null)
  const classes = useStyles({ availHeight: height, availWidth: window.innerWidth, isLandscape, isIphone: iPhonePl })

  const handleShowDialogLogin = () => {
    setShowDialogLogin(true)
  }

  const handleCloseDialogLogin = () => {
    setShowDialogLogin(false)
  }

  const getVideoId = () => {
    return detailVideoResult && detailVideoResult.uuid ? detailVideoResult.uuid : ''
  }

  const checkVideoStatus = async () => {
    try {
      const videoId = detailVideoResult.uuid
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const listQV: APIt.GetVideoByUuidQueryVariables = {
        uuid: videoId,
        limit: 2000,
      }
      const videoRs: any = await API.graphql(graphqlOperation(getVideoByUuid, listQV))
      const videoData = videoRs.data.getVideoByUuid.items.find((item) => item.uuid === videoId)
      if (videoData) {
        setVideoInfo(videoData)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleRedirectToArchiveUrl = () => {
    if (refChatContainer && refChatContainer.current) {
      refChatContainer.current.resetStates()
    }
    // eslint-disable-next-line no-console
    console.log('backToTopVideo::direct::3')
    router.replace(
      {
        pathname: ESRoutes.TOP,
        query: { vid: detailVideoResult.uuid },
      },
      `${ESRoutes.TOP}?vid=${detailVideoResult.uuid}`
    )
  }

  const refChatContainer = useRef<any>(null)
  const navigateToArchiveUrl = () => {
    // reload page if schedule video is living
    if (+videoStatus === STATUS_VIDEO.LIVE_STREAM && detailVideoResult.scheduled_flag === LIVE_VIDEO_TYPE.SCHEDULE) {
      window.location.reload()
    }
    // redirect to archive url if live video is living
    if (video_id === detailVideoResult.user_id.toString() && detailVideoResult.scheduled_flag === LIVE_VIDEO_TYPE.LIVE) {
      handleRedirectToArchiveUrl()
    }
  }

  useEffect(() => {
    if (!detailVideoResult.key_video_id || videoStatus === STATUS_VIDEO.ARCHIVE) return

    const { video_status, process_status } = videoInfo
    // redirect to archive url if admin de_active key
    // if (+video_status === STATUS_VIDEO.STREAM_OFF && process_status === EVENT_LIVE_STATUS.STREAM_OFF) {
    //   navigateToArchiveUrl()
    // }
    const isNotStreamingVideo =
      (video_status === EVENT_LIVE_STATUS.RECORDING_ARCHIVED && process_status === EVENT_LIVE_STATUS.RECORDING_END) ||
      (+video_status === STATUS_VIDEO.ARCHIVE && process_status === EVENT_LIVE_STATUS.STREAM_END) ||
      (+video_status === STATUS_VIDEO.OVER_LOAD && process_status === EVENT_LIVE_STATUS.STREAM_OFF)

    const isScheduleVideo = +video_status === STATUS_VIDEO.SCHEDULE && +videoStatus !== STATUS_VIDEO.LIVE_STREAM
    const isLiveStreamVideo = +video_status === STATUS_VIDEO.LIVE_STREAM && process_status === EVENT_LIVE_STATUS.STREAM_START

    if (isNotStreamingVideo) {
      changeIsStreamingEnd(true)
      onVideoEnd()
    }
    if (isScheduleVideo) {
      setVideoStatus(STATUS_VIDEO.SCHEDULE)
    } else if (isLiveStreamVideo) {
      setVideoStatus(STATUS_VIDEO.LIVE_STREAM)
    }
  }, [JSON.stringify(videoInfo)])

  useEffect(() => {
    if (rankingListMeta.loaded) {
      console.log('🚀 ~ useEffect ~ rankingListMeta.loaded', rankingListMeta.loaded)
      // const newData = CommonHelper.getRankInfo(
      //   giverRankings,
      //   [
      //     {
      //       video_id: 2014,
      //       user_nickname: 'aitx7270_8',
      //       user_avatar: 'https://s3-ap-northeast-1.amazonaws.com/cowell-dev-avatar-media/users/cover/420/1640752240-420.jpg',
      //       user_id: 420,
      //       master_id: 60,
      //       master_name: 'Thanh Binh',
      //       master_avatar: '',
      //       master_uuid: '123',
      //       type: 0,
      //       total: '20000',
      //     },
      //   ],
      //   GIVER_RANK_TYPE
      // )
      // console.log('🚀 ~ useEffect ~ newData--000', newData)
      setGiverRankInfo(giverRankings)
      setReceiverRankInfo(receiverRankings)
      // setGiverRankInfo((newInfo) => CommonHelper.getRankInfo(giverRankings, newInfo, GIVER_RANK_TYPE))
      // setReceiverRankInfo((newInfo) => CommonHelper.getRankInfo(receiverRankings, newInfo))
    }
  }, [rankingListMeta])

  useEffect(() => {
    // update IsVideoFreeToWatch
    setIsVideoFreeToWatch(detailVideoResult?.use_ticket)

    if (!detailVideoResult.key_video_id) return
    checkVideoStatus()
    let statusDetailVideo = detailVideoResult.status
    // if have not arrive live stream start time => set video status is schedule
    const isBeforeLiveStreamTime =
      statusDetailVideo === STATUS_VIDEO.LIVE_STREAM &&
      (!detailVideoResult.live_stream_start_time || moment().isBefore(detailVideoResult.live_stream_start_time, 'second'))

    if (isBeforeLiveStreamTime) {
      statusDetailVideo = STATUS_VIDEO.SCHEDULE
    }
    setVideoStatus(statusDetailVideo)
    // redirect to archive url if first time user access vid = user_id (scheduled_flag = LIVE_VIDEO_TYPE.LIVE) and video archived
    if (detailVideoResult.status === STATUS_VIDEO.ARCHIVE && detailVideoResult.scheduled_flag === LIVE_VIDEO_TYPE.LIVE) {
      navigateToArchiveUrl()
    }
  }, [JSON.stringify(detailVideoResult)])

  useEffect(() => {
    const key_video_id = detailVideoResult?.key_video_id
    if (firstRender) {
      if (key_video_id) setFirstRender(false)
    } else {
      if (key_video_id) {
        setIsResizedScreen(false)
        setVideoStatus(null)
      }
    }
  }, [detailVideoResult?.key_video_id])

  const refOnUpdateVideo = useRef(null)
  const onUpdateVideoData = (updateVideoData) => {
    if (updateVideoData.uuid === detailVideoResult.uuid) {
      setVideoInfo(updateVideoData)
    }
  }
  refOnUpdateVideo.current = onUpdateVideoData

  const subscribeUpdateVideoAction = () => {
    let updateVideoSubscription = API.graphql(graphqlOperation(onUpdateVideo))
    updateVideoSubscription = updateVideoSubscription.subscribe({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      next: (sub: GraphQLResult<APIt.OnUpdateVideoSubscription>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const subMessage = sub?.value
        const updateVideoData = subMessage.data.onUpdateVideo
        console.log('=======onUpdateVideo + updateVideoData=======')
        console.log(subMessage)
        console.log(updateVideoData)
        console.log('====================================')
        if (updateVideoData) {
          refOnUpdateVideo.current(updateVideoData)
        }
      },
      error: (error) => console.warn(error),
    })
    return updateVideoSubscription
  }

  const handleOnUpdateChannel = useRef(null)
  const handleWhenChangeChannel = () => {
    // if (
    //   videoStatus !== STATUS_VIDEO.ARCHIVE &&
    //   detailVideoResult.arn &&
    //   updatedChannel?.arn === detailVideoResult.arn &&
    //   updatedChannel?.state === EVENT_STATE_CHANNEL.STOPPING
    // ) {
    //   console.log('🚀 ~ updatedChannel--000', updatedChannel)
    //   setTimeout(() => {
    //     console.log('🚀 ~ 2121', videoInfo)
    //     setVideoStatus(STATUS_VIDEO.ARCHIVE)
    //     setIsArchived(true)
    //     changeIsStreamingEnd(false)
    //     navigateToArchiveUrl()
    //   }, 3000)
    // }
  }
  handleOnUpdateChannel.current = handleWhenChangeChannel

  //update channel
  const subscribeUpdateChannelAction = () => {
    let updateChannelSubscription = API.graphql(graphqlOperation(onUpdateChannel))
    updateChannelSubscription = updateChannelSubscription.subscribe({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      next: (sub: GraphQLResult<APIt.OnUpdateChannelSubscription>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const updatedChannel = sub?.value?.data?.onUpdateChannel
        handleOnUpdateChannel.current(updatedChannel)
      },
      error: (error) => console.warn(error),
    })
    return updateChannelSubscription
  }

  useEffect(() => {
    document.body.style.overflow = 'overlay' //Fix bug not show chat um
    const updateVideoSubscription = subscribeUpdateVideoAction()
    const updateChannelSubscription = subscribeUpdateChannelAction()
    return () => {
      if (updateVideoSubscription) {
        updateVideoSubscription.unsubscribe()
      }
      if (updateChannelSubscription) {
        updateChannelSubscription.unsubscribe()
      }
      resetVideoDetailData()
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated && !myPointsData) {
      getMyPointData({ page: 1, limit: 10 })
    }
  }, [isAuthenticated])
  // Show Dialog Login: unAuthentication and video not not free
  useEffect(() => {
    if (!isAuthenticated && isVideoFreeToWatch === 1) {
      handleShowDialogLogin()
    }
  }, [isAuthenticated, detailVideoResult, isVideoFreeToWatch])

  useEffect(() => {
    if (video_id) {
      getVideoDetail({ video_id: `${video_id}` }, true)
    }
  }, [video_id, isAuthenticated])

  useEffect(() => {
    if (detailVideoResult.uuid) {
      fetchDonateRanking({ video_id: detailVideoResult.uuid })
    }
  }, [detailVideoResult.uuid])

  useEffect(() => {
    // setTab(isMobile ? VIDEO_INFO_TABS.COMMENT : VIDEO_INFO_TABS.PROGRAM_INFO)
  }, [isMobile])

  useEffect(() => {
    if (videoDetailError) {
      router.push(ESRoutes.NOT_FOUND)
      resetVideoDetailError()
    }
  }, [videoDetailError])

  const confirmDonatePoint = (donated_point, comment, master_id = '', cb) => {
    console.log('master_id', master_id)

    console.log('============= On donate point ==============')

    // reset donate point
    // reset lack point
    setLackedPoint(0)
    setLackedPoint(donated_point - myPoint)
    setPurchaseComment(comment)
    setPurchaseType(PURCHASE_TYPE.PURCHASE_SUPER_CHAT)
    if (myPoint >= donated_point) {
      // setShowConfirmModal(true)
      const type = master_id === '' ? PURCHASE_TYPE.PURCHASE_SUPER_CHAT : PURCHASE_TYPE.GIVE_GIFT_TO_MASTER
      purchaseTicketSuperChat(
        {
          point: donated_point,
          type,
          video_id: getVideoId(),
          handleSuccess: handleCloseConfirmModal,
          ...(type === PURCHASE_TYPE.GIVE_GIFT_TO_MASTER && { master_id }),
        },
        (isSuccess) => {
          if (isSuccess) {
            setShowConfirmModal(false)
            setErrorPurchase(false)
            setDisabled(false)
            setErrorMsgDonatePoint('')
            dispatch(commonActions.addToast(i18n.t('common:live_stream_screen.send_gift_success')))
          } else {
            // setShowConfirmModal(false)
            setDisabled(false)
          }
        },
        (error) => {
          console.log('error==>', error)
          setShowConfirmModal(false)
          setErrorPurchase(true)
          if (error.code === 420) {
            updateUseGiftFlag(0)
            setErrorMsgDonatePoint(i18n.t('common:live_stream_screen.error_tip_function_turn_off'))
          } else if (error.code === 422) {
            setErrorMsgDonatePoint(i18n.t('common:live_stream_screen.error_address_updated'))
          }
        },
        cb
      )
    } else {
      dispatch(addToast(i18n.t('common:donate_points.lack_point_mess')))
      setShowModalPurchasePoint(true)
    }
  }

  confirmDonatePointRef.current = confirmDonatePoint

  const handleCloseConfirmModal = () => {
    getMyPointData({ page: 1, limit: 10 })
    setShowConfirmModal(false)
    setErrorPurchase(false)
  }

  const handlePurchaseTicket = () => {
    if (isAuthenticated) {
      setPurchaseType(PURCHASE_TYPE.PURCHASE_TICKET)
      if (myPoint >= detailVideoResult?.ticket_price) {
        setShowPurchaseTicketModal(true)
      } else {
        setLackedPoint(detailVideoResult?.ticket_price - myPoint)
        dispatch(addToast(i18n.t('common:donate_points.lack_point_mess')))
        setShowModalPurchasePoint(true)
      }
    } else {
      handleShowDialogLogin()
    }
  }
  // show modal error purchase ticket
  const handleShowErrorPurchaseTicketModal = () => {
    setShowPurchaseTicketModal(false)
    setErrorPurchase(true)
    setShowConfirmModal(true)
  }
  // handle purchase ticket success
  const handlePurchaseTicketSuccess = () => {
    getMyPointData({ page: 1, limit: 10 })
    setShowPurchaseTicketModal(false)
  }
  // purchase ticket
  const debouncedHandleConfirmPurchaseTicket = useCallback(
    _.debounce((params: PurchaseTicketParams) => {
      purchaseTicketSuperChat(params)
    }, 700),
    []
  )
  const doConfirmPurchaseTicket = () => {
    debouncedHandleConfirmPurchaseTicket({
      point: detailVideoResult?.ticket_price,
      type: PURCHASE_TYPE.PURCHASE_TICKET,
      video_id: detailVideoResult && detailVideoResult.uuid ? detailVideoResult.uuid : '',
      handleError: handleShowErrorPurchaseTicketModal,
      handleSuccess: handlePurchaseTicketSuccess,
    })
  }
  // const doConfirmPurchaseTicket = async () => {
  //   await purchaseTicketSuperChat({
  //     point: detailVideoResult?.ticket_price,
  //     type: PURCHASE_TYPE.PURCHASE_TICKET,
  //     video_id: getVideoId(),
  //     handleError: handleShowErrorPurchaseTicketModal,
  //     handleSuccess: handlePurchaseTicketSuccess,
  //   })
  // }

  const getTabs = () => {
    return (
      <Grid item xs={12} className={classes.tabsContainer}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs} scrollButtons="off" variant="scrollable">
          {/* {isMobile && <ESTab label={t('live_stream_screen.comment')} value={VIDEO_INFO_TABS.COMMENT} className={classes.singleTab} />} */}
          <ESTab label={t('live_stream_screen.program_info')} value={VIDEO_INFO_TABS.PROGRAM_INFO} className={classes.singleTab} />
          <ESTab label={t('live_stream_screen.distributor_info')} value={VIDEO_INFO_TABS.DISTRIBUTOR_INFO} className={classes.singleTab} />
          <ESTab label={t('live_stream_screen.related_videos')} value={VIDEO_INFO_TABS.RELATED_VIDEOS} className={classes.singleTab} />
        </ESTabs>
      </Grid>
    )
  }

  const getContent = (currentTab) => {
    switch (currentTab) {
      case VIDEO_INFO_TABS.PROGRAM_INFO:
        return !isScheduleAndNotHaveTicket() ? (
          <ProgramInfo video_id={getVideoId()} />
        ) : (
          <ProgramInfoNoViewingTicket videoInfo={detailVideoResult} />
        )
      case VIDEO_INFO_TABS.DISTRIBUTOR_INFO:
        return <DistributorInfo video_id={getVideoId()} />
      case VIDEO_INFO_TABS.RELATED_VIDEOS:
        return <RelatedVideos video_id={getVideoId()} />
      // case VIDEO_INFO_TABS.COMMENT:
      //   return sideChatContainer()
      default:
        break
    }
    return (
      <Box className={classes.forbiddenMessageContainer}>
        <Typography variant="h3">{i18n.t('common:common:private')}</Typography>
      </Box>
    )
  }

  const modalIsShown = () => {
    return showConfirmModal || showPurchaseTicketModal || showModalPurchasePoint
  }

  const isDown960 = pageWidth <= 960
  const sizeMenuWidth = () => {
    if (!isDown960) return 60
    return 0
  }

  const componentsSize = useMemo(() => {
    const factor = isLandscape ? 0.42 : 0.3
    const chatMaxWidth = 482
    const chatMinWidth = isLandscape ? 0 : 380

    const isSafari = CommonHelper.checkIsSafariBrowser()
    let pageWidthWithoutMenu = pageWidth - sizeMenuWidth()
    // subtract screen width on safari (PC) with width of scroll (16px)
    pageWidthWithoutMenu = isSafari && !isMobile ? pageWidthWithoutMenu - 16 : pageWidthWithoutMenu
    // render chat component is 30% of page width without menu
    let chatWidth = Math.round(pageWidthWithoutMenu * factor)
    // limit width of chat component
    chatWidth = chatWidth > chatMaxWidth ? chatMaxWidth : chatWidth < chatMinWidth ? chatMinWidth : chatWidth
    const videoWidth = isMobile ? pageWidthWithoutMenu : pageWidthWithoutMenu - chatWidth
    const videoHeight = (videoWidth * 9) / 16
    return {
      chatWidth,
      videoWidth,
      videoHeight,
    }
  }, [pageWidth])

  const resetErrorDonateMessage = useCallback(() => {
    setErrorMsgDonatePoint('')
  }, [])

  const openPurchasePointModal = useCallback(
    (donate_point) => {
      // reset donate point
      // no lack point if my point larger than donate point
      if (+donate_point < +myPoint) {
        setLackedPoint(0)
      } else {
        setLackedPoint(donate_point - myPoint)
      }
      setPurchaseType(PURCHASE_TYPE.PURCHASE_SUPER_CHAT)
      setShowModalPurchasePoint(true)
    },
    [myPoint]
  )

  const sideChatContainer = () => {
    return (
      <Box
        className={`${classes.wrapChatContainer} ${is_normal_view_mode ? '' : classes.wrapTheatreChatContainer}`}
        style={{
          width: isMobile ? '100%' : componentsSize.chatWidth,
          // width: componentsSize.chatWidth,
        }}
      >
        <ChatContainer
          ref={refChatContainer}
          isResizedScreen={isResizedScreen} // no over rerender
          myPoint={myPoint} // no over rerender
          chatWidth={componentsSize.chatWidth}
          key_video_id={detailVideoResult?.key_video_id} // no rerender
          // onPressDonate={confirmDonatePoint}
          userHasViewingTicket={userHasViewingTicket()}
          videoType={videoStatus}
          freeToWatch={isVideoFreeToWatch}
          handleKeyboardVisibleState={setSoftKeyboardIsShown}
          donateConfirmModalIsShown={modalIsShown}
          openPurchasePointModal={openPurchasePointModal}
          errorMsgDonatePoint={errorMsgDonatePoint}
          clearMessageDonatePoint={resetErrorDonateMessage}
        />
      </Box>
    )
  }

  const isTicketAvailableForSale = () => {
    const current = moment().valueOf()
    if (detailVideoResult?.sell_ticket_start_time && detailVideoResult?.use_ticket === 1) {
      const available = moment(detailVideoResult?.sell_ticket_start_time).valueOf()
      return available <= current
    }
    return true
  }
  const userHasViewingTicket = () => (userResult ? userResult?.buy_ticket : 0)
  const isScheduleAndNotHaveTicket = () => videoStatus === STATUS_VIDEO.SCHEDULE && userResult?.buy_ticket === 0

  const onVideoEnd = () => {
    if (videoStatus !== STATUS_VIDEO.ARCHIVE) {
      console.log('🚀 ~ onVideoEnd ~ videoStatus--11', videoStatus)
      setVideoStatus(STATUS_VIDEO.ARCHIVE)
      setIsArchived(true)
      changeIsStreamingEnd(false)
      navigateToArchiveUrl()
    }
  }

  const isLoadingVideo = _.isEmpty(detailVideoResult) && isVideoFreeToWatch === -1

  const renderVideoSubInfo = () => {
    return (
      <VideoSubInfo
        componentsSize={componentsSize}
        isArchived={isArchived}
        video_id={getVideoId()}
        userHasViewingTicket={userHasViewingTicket()}
        videoType={videoStatus}
        freeToWatch={isVideoFreeToWatch}
        ticketAvailableForSale={isTicketAvailableForSale()}
        softKeyboardIsShown={softKeyboardIsShown}
        ticketPrice={detailVideoResult?.ticket_price}
        clickButtonPurchaseTicket={handlePurchaseTicket}
        onVideoEnd={onVideoEnd}
      />
    )
  }

  const renderGoogleAds = () => {
    if (!iPhonePl && !androidPl && !isMobile) {
      return (
        <>
          {/* <div id={'ad_video_detail_top_p3'} className={'google_ad_patten_1'} /> */}
          {/* GADS: video detail */}
          <GoogleAd id={{ idPatten1: 'ad_video_d' }} idTag={'ad_video_d_p3'} currenPath={window.location.href} />
        </>
      )
    }
    return null
  }

  return (
    <VideoContext.Provider
      value={{
        videoRefInfo,
        setVideoRefInfo,
        giverRankInfo,
        setGiverRankInfo,
        receiverRankInfo,
        setReceiverRankInfo,
        isMobile,
        confirmDonatePointRef,
        videoStatus,
      }}
    >
      <VideoTabContextProvider>
        <ControlBarContextProvider>
          <Box className={classes.root}>
            {' '}
            {isPendingPurchaseTicket && <ESLoader />}
            {isPendingPurchaseSuperChat && <FullESLoader open={isPendingPurchaseSuperChat} />}
            {/* render video */}
            <Box
              className={classes.videoContainer}
              style={{
                width: !is_normal_view_mode || isMobile ? '100%' : componentsSize.videoWidth,
                marginRight: !is_normal_view_mode && !isMobile ? '16px' : '0',
              }}
              onClick={() => {
                changeIsHoveredVideoStatus(!isHoveredVideo)
                console.log('🚀 ~ isHoveredVideo', isHoveredVideo)
              }}
            >
              {isLoadingVideo ? (
                <Box
                  style={{
                    backgroundColor: '#6A6A6C',
                    width: '100%',
                    height: componentsSize.videoHeight,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 8,
                  }}
                >
                  <ESLoader />
                </Box>
              ) : (
                <>
                  <LiveStreamContent
                    componentsSize={componentsSize}
                    isArchived={isArchived}
                    video_id={getVideoId()}
                    userHasViewingTicket={userHasViewingTicket()}
                    videoType={videoStatus}
                    freeToWatch={isVideoFreeToWatch}
                    ticketAvailableForSale={isTicketAvailableForSale()}
                    softKeyboardIsShown={softKeyboardIsShown}
                    ticketPrice={detailVideoResult?.ticket_price}
                    clickButtonPurchaseTicket={handlePurchaseTicket}
                    onVideoEnd={onVideoEnd}
                  />
                  {/* <GoogleAd
                id={{ idPatten1: !screenDownSP && 'ad_video_detail_t', idPatten4: screenDownSP && 'ad_video_detail_b' }}
                // idTag={!screenDownSP ? 'ad_video_detail_top1' : 'ad_video_detail_bottom1'}
              /> */}
                  {renderGoogleAds()}
                </>
              )}
            </Box>
            {/* render tabs and content tabs */}
            {!isLoadingVideo && (
              <Box
                className={classes.allTabsContainer}
                style={{ width: isLandscape ? componentsSize.chatWidth : isMobile ? '100%' : componentsSize.videoWidth }}
                onClick={() => {
                  changeIsHoveredVideoStatus(false)
                }}
              >
                {!isMobile && renderVideoSubInfo()}
                <Grid container direction="row" className={classes.contentContainer}>
                  {/* {getTabs()}
              {getContent()} */}
                  {isMobile ? (
                    <>
                      <TabSelectContainer
                        sideChatContainer={sideChatContainer}
                        renderVideoSubInfo={renderVideoSubInfo}
                        infoTabsContent={(currentTab) => getContent(currentTab)}
                        isLandscape={isLandscape}
                      ></TabSelectContainer>
                    </>
                  ) : (
                    <>
                      {getTabs()}
                      {getContent(tab)}
                    </>
                  )}
                </Grid>
              </Box>
            )}
            {/* render chat loading and chat container on PC */}
            {!isMobile &&
              (_.isEmpty(detailVideoResult) ? (
                <Box
                  style={{
                    display: 'flex',
                    // marginLeft: 16,
                    // marginRight: 16,
                    backgroundColor: 'transparent',
                    height: '100%',
                    flexDirection: 'column',
                    borderRadius: 8,
                    right: 0,
                    flex: 1,
                    position: is_normal_view_mode ? 'absolute' : 'relative',
                  }}
                >
                  <PreloadChatContainer />
                </Box>
              ) : (
                sideChatContainer()
              ))}
          </Box>

          {/* all modal */}
          <PurchaseTicketSuperChat
            myPoints={myPoint}
            donatedPoints={detailVideoResult?.ticket_price}
            showModal={showPurchaseTicketModal}
            setShowModal={setShowPurchaseTicketModal}
            handlePurchaseTicket={doConfirmPurchaseTicket}
          />
          <DialogLoginContainer showDialogLogin={showDialogLogin} onCloseDialogLogin={handleCloseDialogLogin} />
          <DonatePoints
            myPoint={myPoint}
            lackedPoint={lackedPoint}
            showModalPurchasePoint={showModalPurchasePoint}
            setShowModalPurchasePoint={(value) => setShowModalPurchasePoint(value)}
          />
        </ControlBarContextProvider>
      </VideoTabContextProvider>
    </VideoContext.Provider>
  )
}
export default VideoDetail

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#212121',
    display: 'flex',
    position: 'relative',
    width: '100%',
    flexWrap: 'wrap',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  videoContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  allTabsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  tabsContainer: {
    display: 'flex',
    width: '100%',
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  tabs: {
    display: 'flex',
    overflow: 'hidden',
    paddingLeft: 24,
  },
  forbiddenMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: '#212121',
  },

  contentContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  headerIcon: {
    width: 16,
    height: 12,
    position: 'absolute',
    top: 19,
    right: 113,
    transform: 'rotate(180deg)',
  },
  mobileChatContainer: {
    width: '100%',
  },
  wrapChatContainer: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    right: '0',
    top: '61px',
    bottom: '0px',
    height: 'calc(100vh - 61px)',
    background: Colors.white_opacity[10],
  },
  wrapTheatreChatContainer: {
    position: 'relative',
    top: 0,
  },
  [theme.breakpoints.down(769)]: {
    root: {
      // minHeight: '100vh',
      flexDirection: 'column',
    },
    wrapChatContainer: {
      width: '100%',
      position: 'relative',
      top: 'auto',
      height: 'auto',
      bottom: 'auto',
    },
    contentContainer: {
      flexDirection: 'column',
    },
  },
  [theme.breakpoints.down(419)]: {
    tabsContainer: {
      display: 'flex',
      width: '100%',
      paddingRight: 0,
      paddingLeft: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabs: {
      display: 'flex',
      width: '100%',
      paddingLeft: 0,
    },
    singleTab: {
      width: '25%',
      minWidth: 'unset',
    },
  },
  [theme.breakpoints.down(376)]: {
    tabsContainer: {
      display: 'flex',
      width: '100%',
      paddingLeft: 0,
      paddingRight: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabs: {
      display: 'flex',
      width: '100%',
      paddingLeft: 0,
      paddingRight: 0,
    },
    singleTab: {
      width: 'unset',
      minWidth: '25%',
      // '& .MuiTab-wrapper': {
      //   fontSize: 12,
      // },
    },
  },

  [`@media (orientation: landscape)`]: {
    root: (props: videoStyleProps) => {
      if (props.isLandscape)
        return {
          flexWrap: 'nowrap',
          flexDirection: 'row',
        }
    },
    allTabsContainer: (props: videoStyleProps) => {
      if (props.isLandscape)
        return {
          flexShrink: 0,
        }
    },
    wrapChatContainer: (props: videoStyleProps) => {
      if (props.isLandscape)
        return {
          flex: 1,
          width: '100%',
          position: 'relative',
          top: 'auto',
          height: 'auto',
          bottom: 'auto',
          overflow: 'auto',
        }
    },
    contentContainer: (props: videoStyleProps) => {
      if (props.isLandscape)
        return {
          height: props.availHeight,
          flexWrap: 'nowrap',
          flexDirection: 'column',
        }
    },
    [`@media (orientation: landscape)`]: {
      [theme.breakpoints.down(769)]: {
        wrapChatContainer: (props: videoStyleProps) => {
          if (props.isLandscape)
            return {
              overflow: 'auto',
            }
        },
      },
    },
  },
}))
