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
// import ESLoader from '@components/FullScreenLoader'
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

  const { getMyPointData, myPointsData } = usePointsManage()
  const { purchaseTicketSuperChat, dataPurchaseTicketSuperChat } = usePurchaseTicketSuperChat()
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

  const { getVideoDetail, detailVideoResult, userResult } = useDetailVideo()

  // const isPending = (meta.pending || meta_my_points.pending) && detailVideoResult != null
  const isLoadingData = !detailVideoResult || !myPointsData || !userResult || !video_id

  const ticket_points = 100

  const super_chat_params = {
    point: donatedPoints,
    type: PURCHASE_TYPE.PURCHASE_SUPER_CHAT,
    video_id,
  }
  const ticket_params = {
    point: ticket_points,
    type: PURCHASE_TYPE.PURCHASE_SUPER_CHAT,
    video_id,
  }

  useEffect(() => {
    getMyPointData({ page: 1, limit: 10 })
  }, [])

  useEffect(() => {
    if (video_id) {
      getVideoDetail({ video_id: `${video_id}` })
    }
  }, [video_id])

  useEffect(() => {
    if (dataPurchaseTicketSuperChat?.code === 200) {
      handleClose()
      dispatch(addToast(i18n.t('common:donate_points.purchase_ticket_success')))
    }
  }, [dataPurchaseTicketSuperChat])

  useEffect(() => {
    setTab(isMobile ? TABS.COMMENT : TABS.PROGRAM_INFO)
  }, [isMobile])

  const confirmDonatePoint = (donated_point, comment) => {
    // reset donate point
    setDonatedPoints(0)
    setDonatedPoints(donated_point)
    // reset lack point
    setLackedPoint(0)
    setLackedPoint(donated_point - myPoint)
    setPurchaseComment(comment)
    if (myPoint >= donated_point) {
      setShowConfirmModal(true)
    } else {
      dispatch(addToast(i18n.t('common:donate_points.lack_point_mess')))
      setShowModalPurchasePoint(true)
    }
  }
  const handleClose = () => {
    setShowConfirmModal(false)
  }
  const handleConfirm = async () => {
    setPurchaseType(PURCHASE_TYPE.PURCHASE_SUPER_CHAT)
    // if (lackedPoint > 0) {
    //   dispatch(addToast(i18n.t('common:donate_points.lack_point_mess')))
    //   setShowModalPurchasePoint(true)
    //   setShowConfirmModal(false)
    // } else {
    // purchase super chat
    await purchaseTicketSuperChat(super_chat_params)
    // }
  }

  // const handlePurchaseTicket = () => {
  //   setPurchaseType(PURCHASE_TYPE.PURCHASE_TICKET)
  //   if (myPoint >= ticket_points) {
  //     setShowPurchaseTicketModal(true)
  //   } else {
  //     dispatch(addToast(i18n.t('common:donate_points.lack_point_mess')))
  //     setShowModalPurchasePoint(true)
  //   }
  // }
  // purchase ticket
  const doConfirmPurchaseTicket = async () => {
    await purchaseTicketSuperChat(ticket_params)
    if (dataPurchaseTicketSuperChat?.code === 200) {
      dispatch(addToast(i18n.t('common:donate_points.purchase_ticket_success')))
    }
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

  // const buttonPurchaseTicket = (onClick) => (
  //   <Box
  //     style={{
  //       backgroundColor: Colors.primary,
  //       display: 'flex',
  //       position: 'relative',
  //       borderRadius: 10,
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       height: 50,
  //       marginLeft: theme.spacing(5),
  //       marginRight: theme.spacing(5),
  //       marginTop: 150,
  //     }}
  //     onClick={onClick}
  //   >
  //     <Typography style={{ textAlign: 'center', fontSize: 20 }}>Purchase Ticket</Typography>
  //   </Box>
  // )

  const modalIsShown = () => {
    return showConfirmModal || showPurchaseTicketModal || showModalPurchasePoint
  }

  const sideChatContainer = () => (
    <Box className={classes.wrapChatContainer}>
      <ChatContainer
        myPoint={myPoint}
        key_video_id={detailVideoResult?.key_video_id}
        // VOjyj1m048y7sAjx -
        // key_video_id="2f1141b031696738c1eb72cc450afadb"
        // key_video_id="5eafa95943a1b5c118be607d42742a48"
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
      {/* {buttonPurchaseTicket(handlePurchaseTicket)} */}
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
  const userHasViewingTicket = () => (userResult?.buy_ticket === 0 ? false : true)
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

  return (
    <Box className={classes.root}>
      {/* {isPending && <ESLoader open={meta_my_points.pending} />} */}
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
            donatedPoints={ticket_points}
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
        showConfirmModal={showConfirmModal}
        handleClose={handleClose}
        myPoint={myPoint}
        msgContent={purchaseComment}
        handleConfirm={handleConfirm}
      />
      {showModalPurchasePoint && (
        <DonatePoints
          myPoint={myPoint}
          lackedPoint={purchaseType === PURCHASE_TYPE.PURCHASE_SUPER_CHAT ? lackedPoint : ticket_points}
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
