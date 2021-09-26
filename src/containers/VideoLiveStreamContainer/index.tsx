/* eslint-disable no-console */
import ESTab from '@components/Tab'
import ESTabs from '@components/Tabs'
import i18n from '@locales/i18n'
import { Box, Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DistributorInfo from './DistributorInfo'
import ProgramInfo from './ProgramInfo'
import RelatedVideos from './RelatedVideos'
import ChatContainer from './ChatContainer'
import LiveStreamContent from './LiveStreamContent'
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
// import { listVideos } from 'src/graphql/queries'
import { onUpdateVideo } from 'src/graphql/subscriptions'
// import { createVideo } from 'src/graphql/mutations'
import * as APIt from 'src/types/graphqlAPI'
import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'

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

const VideosTop: React.FC = () => {
  const PURCHASE_TYPE = {
    PURCHASE_TICKET: 1,
    PURCHASE_SUPER_CHAT: 2,
  }
  const classes = useStyles()
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(769))
  const dispatch = useAppDispatch()
  const router = useRouter()
  const video_id = router.query?.vid // uuid video
  // const { selectors } = userProfileStore
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  // const userProfile = useAppSelector(selectors.getUserProfile)

  const { getMyPointData, myPointsData } = usePointsManage()
  const { purchaseTicketSuperChat, meta_purchase_ticket_super_chat } = usePurchaseTicketSuperChat()
  const myPoint = myPointsData?.total_point ? Number(myPointsData.total_point) : 0

  const [tab, setTab] = useState(TABS.PROGRAM_INFO)

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showModalPurchasePoint, setShowModalPurchasePoint] = useState(false)
  const [lackedPoint, setLackedPoint] = useState(0)
  const [purchaseComment, setPurchaseComment] = useState<string>('')
  const [showPurchaseTicketModal, setShowPurchaseTicketModal] = useState<boolean>(false)
  const [purchaseType, setPurchaseType] = useState<number>(null)
  const [donatedPoints, setDonatedPoints] = useState<number>(0)
  const [softKeyboardIsShown, setSoftKeyboardIsShown] = useState(false)
  const [errorPurchase, setErrorPurchase] = useState(false)

  const { getVideoDetail, detailVideoResult, userResult, videoDetailError, resetVideoDetailError } = useDetailVideo()

  const isPendingPurchaseTicket = meta_purchase_ticket_super_chat?.pending && purchaseType === PURCHASE_TYPE.PURCHASE_TICKET

  const isPendingPurchaseSuperChat = meta_purchase_ticket_super_chat.pending && purchaseType === PURCHASE_TYPE.PURCHASE_SUPER_CHAT

  const isLoadingData = isAuthenticated ? !detailVideoResult || !myPointsData || !userResult || !video_id : !detailVideoResult || !video_id

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
  //     const videoRs: any = await API.graphql(graphqlOperation(listVideos, listQV))
  //     console.log('🚀 ~ checkVideoExist ~ videoRs', videoRs)
  //     const videoData = videoRs.data.listVideos.items
  //     if (videoData.length === 0) {
  //       handleCreateVideo()
  //     } else {
  //       console.log('🚀 2222', videoRs)
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  useEffect(() => {
    // if (detailVideoResult.key_video_id && detailVideoResult.arn) {
    //   checkVideoExist()
    // }
  }, [detailVideoResult])

  const subscribeAction = () => {
    const pubSubClient = API.graphql(graphqlOperation(onUpdateVideo))
    pubSubClient.subscribe({
      next: (sub: GraphQLResult<APIt.OnCreateMessageSubscription>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const subMessage = sub?.value
        console.log('🚀  Data onUpdateVideo:' + JSON.stringify(subMessage.data))
      },
      error: (error) => console.warn(error),
    })
  }

  useEffect(() => {
    subscribeAction()
  }, [])

  useEffect(() => {
    if (isAuthenticated && !myPointsData) {
      getMyPointData({ page: 1, limit: 10 })
    }
  }, [isAuthenticated])

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
      video_id,
      handleSuccess: handleCloseConfirmModal,
    })
  }

  const handlePurchaseTicket = () => {
    if (isAuthenticated) {
      setPurchaseType(PURCHASE_TYPE.PURCHASE_TICKET)
      if (myPoint >= detailVideoResult?.ticket_price) {
        setShowPurchaseTicketModal(true)
      } else {
        dispatch(addToast(i18n.t('common:donate_points.lack_point_mess')))
        setShowModalPurchasePoint(true)
      }
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
      video_id,
      handleError: handleShowErrorPurchaseTicketModal,
      handleSuccess: handlePurchaseTicketSuccess,
    })
  }

  const getTabs = () => {
    return (
      <Grid item xs={12}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          {isMobile && <ESTab label={t('live_stream_screen.comment')} value={TABS.COMMENT} className={classes.singleTab} />}
          <ESTab label={t('live_stream_screen.program_info')} value={TABS.PROGRAM_INFO} className={classes.singleTab} />
          {!isScheduleAndNotHaveTicket() && (
            <ESTab label={t('live_stream_screen.distributor_info')} value={TABS.DISTRIBUTOR_INFO} className={classes.singleTab} />
          )}
          <ESTab label={t('live_stream_screen.related_videos')} value={TABS.RELATED_VIDEOS} className={classes.singleTab} />
        </ESTabs>
      </Grid>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.PROGRAM_INFO:
        return !isScheduleAndNotHaveTicket() ? (
          <ProgramInfo video_id={video_id} />
        ) : (
          <ProgramInfoNoViewingTicket videoInfo={detailVideoResult} />
        )
      case TABS.DISTRIBUTOR_INFO:
        return <DistributorInfo video_id={video_id} />
      case TABS.RELATED_VIDEOS:
        return <RelatedVideos video_id={video_id} />
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

  const sideChatContainer = () => (
    <Box className={classes.wrapChatContainer}>
      <ChatContainer
        myPoint={myPoint}
        key_video_id={detailVideoResult?.key_video_id}
        onPressDonate={confirmDonatePoint}
        userHasViewingTicket={userHasViewingTicket()}
        videoType={getVideoType()}
        freeToWatch={isVideoFreeToWatch()}
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

  const getVideoType = () => detailVideoResult?.status
  const isVideoFreeToWatch = () => (detailVideoResult?.use_ticket === 0 ? true : false)
  const isTicketAvailableForSale = () => {
    const current = moment().valueOf()
    if (detailVideoResult?.sell_ticket_start_time && detailVideoResult?.use_ticket === 1) {
      const available = moment(detailVideoResult?.sell_ticket_start_time).valueOf()
      return available <= current
    }
    return true
  }
  const userHasViewingTicket = () => (userResult ? userResult?.buy_ticket : 0)
  const isScheduleAndNotHaveTicket = () => getVideoType() === STATUS_VIDEO.SCHEDULE && userResult?.buy_ticket === 0
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
      getVideoDetail({ video_id: `${video_id}` })
    }
  }

  return (
    <Box className={classes.root}>
      {isPendingPurchaseTicket && <ESLoader />}
      {isPendingPurchaseSuperChat && <FullESLoader open={isPendingPurchaseSuperChat} />}
      <Box className={classes.container}>
        {isLoadingData ? (
          <Box
            style={{
              backgroundColor: '#6A6A6C',
              width: '100%',
              height: '100%',
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
              video_id={video_id}
              userHasViewingTicket={userHasViewingTicket()}
              videoType={getVideoType()}
              freeToWatch={isVideoFreeToWatch()}
              ticketAvailableForSale={isTicketAvailableForSale()}
              softKeyboardIsShown={softKeyboardIsShown}
              ticketPrice={detailVideoResult?.ticket_price}
              clickButtonPurchaseTicket={handlePurchaseTicket}
              onVideoEnd={onVideoEnd}
            />
            <Grid container direction="row" className={classes.tabContainer}>
              {getTabs()}
              {getContent()}
            </Grid>
          </>
        )}
        {showPurchaseTicketModal && (
          <PurchaseTicketSuperChat
            myPoints={myPoint}
            donatedPoints={detailVideoResult?.ticket_price}
            showModal={showPurchaseTicketModal}
            setShowModal={setShowPurchaseTicketModal}
            handlePurchaseTicket={doConfirmPurchaseTicket}
          />
        )}
      </Box>
      {isLoadingData ? (
        <Box
          style={{
            display: 'flex',
            marginLeft: 24,
            marginRight: 24,
            backgroundColor: 'transparent',
            height: '100%',
            width: 482,
            flexDirection: 'column',
            borderRadius: 8,
          }}
        >
          <PreloadChatContainer />
        </Box>
      ) : (
        !isMobile && sideChatContainer()
      )}
      <DonatePointsConfirmModal
        hasError={errorPurchase}
        showConfirmModal={showConfirmModal}
        handleClose={handleCloseConfirmModal}
        myPoint={myPoint}
        ticketPoint={detailVideoResult?.ticket_price}
        msgContent={purchaseComment}
        handleConfirm={handleConfirmPurchaseSuperChat}
      />
      {showModalPurchasePoint && (
        <DonatePoints
          myPoint={myPoint}
          lackedPoint={purchaseType === PURCHASE_TYPE.PURCHASE_SUPER_CHAT ? lackedPoint : detailVideoResult?.ticket_price}
          showModalPurchasePoint={showModalPurchasePoint}
          setShowModalPurchasePoint={(value) => setShowModalPurchasePoint(value)}
        />
      )}
    </Box>
  )
}
export default VideosTop

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#212121',
    display: 'flex',
    position: 'relative',
  },
  tabContainer: {
    display: 'flex',
  },
  tabs: {
    overflow: 'hidden',
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    paddingLeft: 24,
  },
  singleTab: {
    minWidth: 0,
  },
  forbiddenMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: '#212121',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
}))
