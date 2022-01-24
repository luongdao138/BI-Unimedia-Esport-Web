/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ESTab from '@components/Tab'
import ESTabs from '@components/Tabs'
import i18n from '@locales/i18n'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import DistributorInfo from './DistributorInfo'
import ProgramInfo from './ProgramInfo'
import RelatedVideos from './RelatedVideos'
import ChatContainer from './ChatContainer'
// import LiveStreamContent from './LiveStreamContent'
import DonatePoints from './DonatePoints'
import DonatePointsConfirmModal from './DonatePointsConfirmModal/DonatePointsConfirmModal'
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
import { STATUS_VIDEO } from '@services/videoTop.services'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import { ESRoutes } from '@constants/route.constants'
const { getVideoByUuid } = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/queries`)
const { onUpdateVideo, onUpdateChannel } = require(`src/graphql.${process.env.NEXT_PUBLIC_AWS_ENV}/subscriptions`)
// import * as APIt from 'src/types/graphqlAPI'
import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'
import { EVENT_LIVE_STATUS, LIVE_VIDEO_TYPE } from '@constants/common.constants'
import DialogLoginContainer from '@containers/DialogLogin'
import _ from 'lodash'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
import LiveStreamContent from './LiveStreamContent'
import { PurchaseTicketParams } from '@services/points.service'
import useGraphqlAPI from 'src/types/useGraphqlAPI'
import TabSelectContainer from './TabSelectContainer'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const APIt: any = useGraphqlAPI()

enum TABS {
  PROGRAM_INFO = 1,
  DISTRIBUTOR_INFO = 2,
  RELATED_VIDEOS = 3,
  COMMENT = 0,
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
  }
  const classes = useStyles()
  const { t } = useTranslation('common')
  const { width: pageWidth } = useWindowDimensions(0)
  const isMobile = pageWidth <= 768
  const dispatch = useAppDispatch()
  const router = useRouter()
  const video_id = Array.isArray(router.query?.vid) ? router.query.vid[0] : router.query.vid // uuid video
  // const { selectors } = userProfileStore
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  // const userProfile = useAppSelector(selectors.getUserProfile)

  const { getMyPointData, myPointsData } = usePointsManage()
  const { purchaseTicketSuperChat, meta_purchase_ticket_super_chat } = usePurchaseTicketSuperChat()
  const myPoint = myPointsData?.total_point ? Number(myPointsData.total_point) : 0

  const [tab, setTab] = useState(TABS.PROGRAM_INFO)
  const [showDialogLogin, setShowDialogLogin] = useState<boolean>(false)

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showModalPurchasePoint, setShowModalPurchasePoint] = useState(false)
  const [lackedPoint, setLackedPoint] = useState(0)
  const [purchaseComment, setPurchaseComment] = useState<string>('')
  const [showPurchaseTicketModal, setShowPurchaseTicketModal] = useState<boolean>(false)
  const [purchaseType, setPurchaseType] = useState<number>(null)
  const [donatedPoints, setDonatedPoints] = useState<number>(0)
  const [softKeyboardIsShown, setSoftKeyboardIsShown] = useState(false)
  const [errorPurchase, setErrorPurchase] = useState(false)
  const [videoInfo, setVideoInfo] = useState<VIDEO_INFO>({ video_status: STATUS_VIDEO.SCHEDULE, process_status: '' })
  const [videoStatus, setVideoStatus] = useState(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isArchived, setIsArchived] = useState(false)

  const {
    getVideoDetail,
    detailVideoResult,
    userResult,
    videoDetailError,
    resetVideoDetailError,
    resetVideoDetailData,
    changeIsStreamingEnd,
  } = useDetailVideo()

  const isPendingPurchaseTicket = meta_purchase_ticket_super_chat?.pending && purchaseType === PURCHASE_TYPE.PURCHASE_TICKET

  const isPendingPurchaseSuperChat = meta_purchase_ticket_super_chat.pending && purchaseType === PURCHASE_TYPE.PURCHASE_SUPER_CHAT

  const [isVideoFreeToWatch, setIsVideoFreeToWatch] = useState(detailVideoResult?.use_ticket ? detailVideoResult?.use_ticket : -1)

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
      (+video_status === STATUS_VIDEO.ARCHIVE && process_status === EVENT_LIVE_STATUS.STREAM_END)

    const isScheduleVideo = +video_status === STATUS_VIDEO.SCHEDULE && +videoStatus !== STATUS_VIDEO.LIVE_STREAM
    const isLiveStreamVideo = +video_status === STATUS_VIDEO.LIVE_STREAM && process_status === EVENT_LIVE_STATUS.STREAM_START

    if (isNotStreamingVideo) {
      changeIsStreamingEnd(true)
    }
    if (isScheduleVideo) {
      setVideoStatus(STATUS_VIDEO.SCHEDULE)
    } else if (isLiveStreamVideo) {
      setVideoStatus(STATUS_VIDEO.LIVE_STREAM)
    }
  }, [JSON.stringify(videoInfo)])

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
      getVideoDetail({ video_id: `${video_id}` })
    }
  }, [video_id, isAuthenticated])

  useEffect(() => {
    setTab(isMobile ? TABS.COMMENT : TABS.PROGRAM_INFO)
  }, [isMobile])

  useEffect(() => {
    if (videoDetailError) {
      router.push(ESRoutes.NOT_FOUND)
      resetVideoDetailError()
    }
  }, [videoDetailError])

  const confirmDonatePoint = (donated_point, comment) => {
    // reset donate point
    setDonatedPoints(0)
    setDonatedPoints(donated_point)
    // reset lack point
    setLackedPoint(0)
    setLackedPoint(donated_point - myPoint)
    setPurchaseComment(comment)
    setPurchaseType(PURCHASE_TYPE.PURCHASE_SUPER_CHAT)
    if (myPoint >= donated_point) {
      setShowConfirmModal(true)
    } else {
      dispatch(addToast(i18n.t('common:donate_points.lack_point_mess')))
      setShowModalPurchasePoint(true)
    }
  }
  const handleCloseConfirmModal = () => {
    getMyPointData({ page: 1, limit: 10 })
    setShowConfirmModal(false)
    setErrorPurchase(false)
  }
  const handleConfirmPurchaseSuperChat = async () => {
    setPurchaseType(PURCHASE_TYPE.PURCHASE_SUPER_CHAT)
    await purchaseTicketSuperChat({
      point: donatedPoints,
      type: PURCHASE_TYPE.PURCHASE_SUPER_CHAT,
      video_id: getVideoId(),
      handleSuccess: handleCloseConfirmModal,
    })
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
          {isMobile && <ESTab label={t('live_stream_screen.comment')} value={TABS.COMMENT} className={classes.singleTab} />}
          <ESTab label={t('live_stream_screen.program_info')} value={TABS.PROGRAM_INFO} className={classes.singleTab} />
          <ESTab label={t('live_stream_screen.distributor_info')} value={TABS.DISTRIBUTOR_INFO} className={classes.singleTab} />
          <ESTab label={t('live_stream_screen.related_videos')} value={TABS.RELATED_VIDEOS} className={classes.singleTab} />
        </ESTabs>
      </Grid>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.PROGRAM_INFO:
        return !isScheduleAndNotHaveTicket() ? (
          <ProgramInfo video_id={getVideoId()} />
        ) : (
          <ProgramInfoNoViewingTicket videoInfo={detailVideoResult} />
        )
      case TABS.DISTRIBUTOR_INFO:
        return <DistributorInfo video_id={getVideoId()} />
      case TABS.RELATED_VIDEOS:
        return <RelatedVideos video_id={getVideoId()} />
      case TABS.COMMENT:
        return sideChatContainer()
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

  const componentsSize = (() => {
    const chatMaxWidth = 482
    const chatMinWidth = 380
    const pageWidthWithoutMenu = pageWidth - sizeMenuWidth()
    // render chat component is 30% of page width without menu
    let chatWidth = Math.round(pageWidthWithoutMenu * 0.3)
    // limit width of chat component
    chatWidth = chatWidth > chatMaxWidth ? chatMaxWidth : chatWidth < chatMinWidth ? chatMinWidth : chatWidth
    const videoWidth = isMobile ? pageWidthWithoutMenu : pageWidthWithoutMenu - chatWidth
    const videoHeight = (videoWidth * 9) / 16
    return {
      chatWidth,
      videoWidth,
      videoHeight,
    }
  })()

  const sideChatContainer = () => {
    return (
      <Box className={classes.wrapChatContainer} style={{ width: isMobile ? '100%' : componentsSize.chatWidth }}>
        <ChatContainer
          ref={refChatContainer}
          myPoint={myPoint}
          chatWidth={componentsSize.chatWidth}
          key_video_id={detailVideoResult?.key_video_id}
          onPressDonate={confirmDonatePoint}
          userHasViewingTicket={userHasViewingTicket()}
          videoType={+videoStatus}
          freeToWatch={isVideoFreeToWatch}
          handleKeyboardVisibleState={changeSoftKeyboardVisibleState}
          donateConfirmModalIsShown={modalIsShown}
          openPurchasePointModal={(donate_point) => {
            // reset donate point
            setDonatedPoints(0)
            setDonatedPoints(donate_point)
            // no lack point if my point larger than donate point
            if (+donate_point < +myPoint) {
              setLackedPoint(0)
            } else {
              setLackedPoint(donate_point - myPoint)
            }
            setPurchaseType(PURCHASE_TYPE.PURCHASE_SUPER_CHAT)
            setShowModalPurchasePoint(true)
          }}
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

  const changeSoftKeyboardVisibleState = (visible: boolean) => {
    setSoftKeyboardIsShown(visible)
  }

  const onVideoEnd = () => {
    if (videoStatus !== STATUS_VIDEO.ARCHIVE) {
      setVideoStatus(STATUS_VIDEO.ARCHIVE)
      setIsArchived(true)
      changeIsStreamingEnd(false)
      navigateToArchiveUrl()
    }
  }

  return (
    <React.Fragment>
      <Box className={classes.root}>
        {isPendingPurchaseTicket && <ESLoader />}
        {isPendingPurchaseSuperChat && <FullESLoader open={isPendingPurchaseSuperChat} />}
        <Box className={classes.container} style={{ width: isMobile ? '100%' : componentsSize.videoWidth }}>
          {_.isEmpty(detailVideoResult) && isVideoFreeToWatch === -1 ? (
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
              <Grid container direction="row" className={classes.contentContainer}>
                {/* {getTabs()}
                {getContent()} */}
                {!isMobile ? (
                  <>
                    {getTabs()}
                    {getContent()}
                  </>
                ) : (
                  <>
                    <TabSelectContainer />
                  </>
                )}
              </Grid>
            </>
          )}
          {/* <PurchaseTicketSuperChat
          myPoints={myPoint}
          donatedPoints={detailVideoResult?.ticket_price}
          showModal={showPurchaseTicketModal}
          setShowModal={setShowPurchaseTicketModal}
          handlePurchaseTicket={doConfirmPurchaseTicket}
        />
        <DialogLoginContainer showDialogLogin={showDialogLogin} onCloseDialogLogin={handleCloseDialogLogin} />
        <DonatePointsConfirmModal
          hasError={errorPurchase}
          showConfirmModal={showConfirmModal}
          handleClose={handleCloseConfirmModal}
          myPoint={myPoint}
          ticketPoint={detailVideoResult?.ticket_price}
          msgContent={purchaseComment}
          handleConfirm={handleConfirmPurchaseSuperChat}
        />
        <DonatePoints
          myPoint={myPoint}
          lackedPoint={lackedPoint}
          showModalPurchasePoint={showModalPurchasePoint}
          setShowModalPurchasePoint={(value) => setShowModalPurchasePoint(value)}
        /> */}
        </Box>
        {!isMobile &&
          (_.isEmpty(detailVideoResult) ? (
            <Box
              style={{
                display: 'flex',
                // marginLeft: 16,
                // marginRight: 16,
                backgroundColor: 'transparent',
                height: '100%',
                width: componentsSize.chatWidth,
                flexDirection: 'column',
                borderRadius: 8,
              }}
            >
              <PreloadChatContainer />
            </Box>
          ) : (
            sideChatContainer()
          ))}
      </Box>
      <PurchaseTicketSuperChat
        myPoints={myPoint}
        donatedPoints={detailVideoResult?.ticket_price}
        showModal={showPurchaseTicketModal}
        setShowModal={setShowPurchaseTicketModal}
        handlePurchaseTicket={doConfirmPurchaseTicket}
      />
      <DialogLoginContainer showDialogLogin={showDialogLogin} onCloseDialogLogin={handleCloseDialogLogin} />
      <DonatePointsConfirmModal
        hasError={errorPurchase}
        showConfirmModal={showConfirmModal}
        handleClose={handleCloseConfirmModal}
        myPoint={myPoint}
        ticketPoint={detailVideoResult?.ticket_price}
        msgContent={purchaseComment}
        handleConfirm={handleConfirmPurchaseSuperChat}
      />
      <DonatePoints
        myPoint={myPoint}
        lackedPoint={lackedPoint}
        showModalPurchasePoint={showModalPurchasePoint}
        setShowModalPurchasePoint={(value) => setShowModalPurchasePoint(value)}
      />
    </React.Fragment>
  )
}
export default VideoDetail

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#212121',
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  container: {
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
  [theme.breakpoints.down(769)]: {
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
}))
