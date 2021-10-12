/* eslint-disable no-console */
import ESTab from '@components/Tab'
import ESTabs from '@components/Tabs'
import i18n from '@locales/i18n'
import { Box, Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { useEffect, useState, useRef } from 'react'
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
import { getVideoByUuid } from 'src/graphql/queries'
import { onUpdateVideo } from 'src/graphql/subscriptions'
// import { createVideo } from 'src/graphql/mutations'
import * as APIt from 'src/types/graphqlAPI'
import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'
import { EVENT_LIVE_STATUS, LIVE_VIDEO_TYPE } from '@constants/common.constants'
import DialogLoginContainer from '@containers/DialogLogin'
import _ from 'lodash'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
import LiveStreamContent from './LiveStreamContentDemo'

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
  const theme = useTheme()
  const isWideScreen = useMediaQuery(theme.breakpoints.up(1920))
  // const { width: listDisplayWidth } = useWindowDimensions(146)
  const { width: listDisplayWidth } = useWindowDimensions(98)

  console.log('🚀 ~ videoStatus', videoStatus)

  const { getVideoDetail, detailVideoResult, userResult, videoDetailError, resetVideoDetailError, resetVideoDetailData } = useDetailVideo()

  const isPendingPurchaseTicket = meta_purchase_ticket_super_chat?.pending && purchaseType === PURCHASE_TYPE.PURCHASE_TICKET

  const isPendingPurchaseSuperChat = meta_purchase_ticket_super_chat.pending && purchaseType === PURCHASE_TYPE.PURCHASE_SUPER_CHAT

  // const isLoadingData = isAuthenticated ? !detailVideoResult || !myPointsData || !userResult || !video_id : !detailVideoResult || !video_id

  const [isVideoFreeToWatch, setIsVideoFreeToWatch] = useState(detailVideoResult?.use_ticket ? detailVideoResult?.use_ticket : -1)
  console.log('isVideoFreeToWatch VideoDetail >>>>>>>>', isVideoFreeToWatch)

  const handleShowDialogLogin = () => {
    setShowDialogLogin(true)
  }

  const handleCloseDialogLogin = () => {
    setShowDialogLogin(false)
  }

  // const handleCreateVideo = async () => {
  //   const input = {
  //     uuid: detailVideoResult.key_video_id,
  //     arn: detailVideoResult.arn,
  //   }
  //   console.log('input', input)
  //   await API.graphql(graphqlOperation(createVideo, { input }))
  // }

  // const checkVideoExist = async () => {
  //   try {
  //     const listQV: APIt.ListMessagesQueryVariables = {
  //       filter: {
  //         uuid: { eq: detailVideoResult.key_video_id },
  //       },
  //     }
  //     const videoRs: any = await API.graphql(graphqlOperation(getVideoByUuid, listQV))
  //     console.log('🚀 ~ checkVideoExist ~ videoRs', videoRs)
  //     const videoData = videoRs.data.getVideoByUuid.items
  //     if (videoData.length === 0) {
  //       handleCreateVideo()
  //     } else {
  //       console.log('🚀 2222', videoRs)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  const getVideoId = () => {
    return detailVideoResult && detailVideoResult.uuid ? detailVideoResult.uuid : ''
  }

  const checkVideoStatus = async () => {
    try {
      const videoId = detailVideoResult.uuid
      const listQV: APIt.GetVideoByUuidQueryVariables = {
        uuid: videoId,
        limit: 2000,
      }
      const videoRs: any = await API.graphql(graphqlOperation(getVideoByUuid, listQV))
      console.log('🚀 ~ checkVideoExist ~ videoRs', videoRs)
      const videoData = videoRs.data.getVideoByUuid.items.find((item) => item.uuid === videoId)
      if (videoData) {
        setVideoInfo(videoData)
      } else {
        console.log('🚀 2222', videoRs)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const refChatContainer = useRef<any>(null)
  const navigateToArchiveUrl = () => {
    // reload page if schedule video is living
    if (+videoStatus === STATUS_VIDEO.LIVE_STREAM && detailVideoResult.scheduled_flag === LIVE_VIDEO_TYPE.SCHEDULE) {
      window.location.reload()
    }
    if (video_id === detailVideoResult.user_id.toString() && detailVideoResult.scheduled_flag === LIVE_VIDEO_TYPE.LIVE) {
      if (refChatContainer && refChatContainer.current) {
        refChatContainer.current.resetStates()
      }
      router.replace({
        pathname: ESRoutes.TOP,
        query: { vid: detailVideoResult.uuid },
      })
    }
  }

  useEffect(() => {
    if (detailVideoResult.key_video_id) {
      console.log('🚀 ~ useEffect ~ videoInfo', videoInfo)
      const { video_status, process_status } = videoInfo

      if (
        videoStatus !== STATUS_VIDEO.ARCHIVE &&
        video_status === EVENT_LIVE_STATUS.RECORDING_ARCHIVED &&
        process_status === EVENT_LIVE_STATUS.RECORDING_END
      ) {
        setVideoStatus(STATUS_VIDEO.ARCHIVE)
        navigateToArchiveUrl()
      }
      if (+video_status === STATUS_VIDEO.SCHEDULE) {
        if (+videoStatus !== STATUS_VIDEO.LIVE_STREAM) {
          setVideoStatus(STATUS_VIDEO.SCHEDULE)
        }
      } else if (+video_status === STATUS_VIDEO.LIVE_STREAM) {
        if (process_status === EVENT_LIVE_STATUS.STREAM_START) {
          setVideoStatus(STATUS_VIDEO.LIVE_STREAM)
          // window.location.reload()
        } else if (process_status === EVENT_LIVE_STATUS.STREAM_END) {
          // setVideoStatus(STATUS_VIDEO.ARCHIVE)
          // navigateToArchiveUrl()
        }
      }
    }
  }, [JSON.stringify(videoInfo)])

  useEffect(() => {
    if (detailVideoResult.key_video_id) {
      checkVideoStatus()
      let statusDetailVideo = detailVideoResult.status
      console.log('🚀 ~ useEffect ~ detailVideoResult', detailVideoResult)
      console.log('🚀 ~ is Start Live)', moment().isBefore(detailVideoResult.live_stream_start_time, 'second'))
      // if have not arrive live stream start time => set video status is schedule
      if (
        statusDetailVideo === STATUS_VIDEO.LIVE_STREAM &&
        (!detailVideoResult.live_stream_start_time || moment().isBefore(detailVideoResult.live_stream_start_time, 'second'))
      ) {
        statusDetailVideo = STATUS_VIDEO.SCHEDULE
      }
      setVideoStatus(statusDetailVideo)
      if (detailVideoResult.status === STATUS_VIDEO.ARCHIVE && detailVideoResult.scheduled_flag === LIVE_VIDEO_TYPE.LIVE) {
        navigateToArchiveUrl()
      }
    }
    // update IsVideoFreeToWatch
    setIsVideoFreeToWatch(detailVideoResult?.use_ticket)
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
      next: (sub: GraphQLResult<APIt.OnUpdateVideoSubscription>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const subMessage = sub?.value
        const updateVideoData = subMessage.data.onUpdateVideo
        console.log('🚀 ~ subscribeAction ~ updateVideoData', updateVideoData)
        if (updateVideoData) {
          refOnUpdateVideo.current(updateVideoData)
        }
      },
      error: (error) => console.warn(error),
    })
    return updateVideoSubscription
  }

  useEffect(() => {
    const updateVideoSubscription = subscribeUpdateVideoAction()
    return () => {
      if (updateVideoSubscription) {
        updateVideoSubscription.unsubscribe()
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
  // console.log('Is Authenticated >>>>>>>>', userProfile)
  // console.log('Video detail data >>>>>>>>', detailVideoResult, userResult)

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
  const doConfirmPurchaseTicket = async () => {
    await purchaseTicketSuperChat({
      point: detailVideoResult?.ticket_price,
      type: PURCHASE_TYPE.PURCHASE_TICKET,
      video_id: getVideoId(),
      handleError: handleShowErrorPurchaseTicketModal,
      handleSuccess: handlePurchaseTicketSuccess,
    })
  }

  const calculateVideoItemStyle = (): any => {
    if (!isWideScreen) {
      return {}
    }
    const numOfDisplayItem = Math.floor(listDisplayWidth / 433.5)
    const calcWidth = listDisplayWidth / numOfDisplayItem

    return {
      maxWidth: calcWidth,
    }
  }

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
          <ProgramInfo video_id={getVideoId()} videoItemStyle={calculateVideoItemStyle()} />
        ) : (
          <ProgramInfoNoViewingTicket videoInfo={detailVideoResult} videoItemStyle={calculateVideoItemStyle()} />
        )
      case TABS.DISTRIBUTOR_INFO:
        return <DistributorInfo video_id={getVideoId()} videoItemStyle={calculateVideoItemStyle()} />
      case TABS.RELATED_VIDEOS:
        return <RelatedVideos video_id={getVideoId()} videoItemStyle={calculateVideoItemStyle()} />
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
    if (!isDown960) return 50
    return 0
  }

  const componentsSize = (() => {
    const chatMaxWidth = 482
    const chatMinWidth = 330
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

  // const getVideoType = () => detailVideoResult?.status

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
  // const getVideoType = () => 1
  // const isVideoFreeToWatch = () => false
  // const isTicketAvailableForSale = () => {
  //   const current = moment().valueOf()
  //   const available = moment(detailVideoResult?.sell_ticket_start_time).valueOf()
  //   return true
  // }
  // const userHasViewingTicket = () => false

  const changeSoftKeyboardVisibleState = (visible: boolean) => {
    setSoftKeyboardIsShown(visible)
  }

  const onVideoEnd = () => {
    if (video_id) {
      // getVideoDetail({ video_id: `${video_id}` })
    }
  }

  return (
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
              // componentsSize={componentsSize} //GHÉP THẬT THÌ PHẢI BỎ COMMENT RA NHÉ
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
              {getTabs()}
              {getContent()}
            </Grid>
          </>
        )}
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
      </Box>
      {!isMobile ? (
        _.isEmpty(detailVideoResult) ? (
          <Box
            style={{
              display: 'flex',
              marginLeft: 24,
              marginRight: 24,
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
        )
      ) : (
        ''
      )}
    </Box>
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
    position: 'relative',
  },
  [theme.breakpoints.down(769)]: {
    wrapChatContainer: {
      width: '100%',
    },
  },
  [theme.breakpoints.down(415)]: {
    tabsContainer: {
      display: 'flex',
      paddingRight: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabs: {
      display: 'flex',
      paddingLeft: 0,
    },
    singleTab: {
      minWidth: 56,
    },
  },
  [theme.breakpoints.down(375)]: {
    tabsContainer: {
      display: 'flex',
      paddingRight: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabs: {
      display: 'flex',
      paddingLeft: 0,
    },
    singleTab: {
      '& .MuiTab-wrapper': {
        fontSize: 12,
      },
    },
  },
}))
