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
import ESLoader from '@components/FullScreenLoader'
import { addToast } from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'
import PurchaseTicketSuperChat from './PurchaseTicketSuperChat'
import { useRouter } from 'next/router'
import usePurchaseTicketSuperChat from './usePurchaseTicket'
import useDetailVideo from './useDetailVideo'

enum TABS {
  PROGRAM_INFO = 0,
  DISTRIBUTOR_INFO = 1,
  RELATED_VIDEOS = 2,
  COMMENT = 3,
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
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch = useAppDispatch()
  const router = useRouter()
  const video_id = router.query?.vid // uuid video

  const { getMyPointData, meta_my_points, myPointsData } = usePointsManage()
  const { purchaseTicketSuperChat, dataPurchaseTicketSuperChat } = usePurchaseTicketSuperChat()
  const myPoint = myPointsData?.total_point ? Number(myPointsData.total_point) : 0

  const [tab, setTab] = useState(0)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showModalPurchasePoint, setShowModalPurchasePoint] = useState(false)
  const [lackedPoint, setLackedPoint] = useState(0)
  const [purchaseComment, setPurchaseComment] = useState<string>('')
  const [showPurchaseTicketModal, setShowPurchaseTicketModal] = useState<boolean>(false)
  const [purchaseType, setPurchaseType] = useState<number>(null)
  const [donatedPoints, setDonatedPoints] = useState<number>(0)
  const [softKeyboardIsShown, setSoftKeyboardIsShown] = useState(false)
  const { getVideoDetail, meta, detailVideoResult } = useDetailVideo()

  const isPending = meta.pending || meta_my_points.pending

  const ticket_points = 100

  const params = {
    page: 1,
    limit: 10,
  }
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
    getMyPointData(params)
    getVideoDetail({ video_id: `${video_id}` })
  }, [video_id])
  const classes = useStyles()

  const confirmDonatePoint = (donated_point, comment) => {
    // reset donate point
    setDonatedPoints(0)
    setDonatedPoints(donated_point)
    // reset lack point
    setLackedPoint(0)
    setLackedPoint(donated_point - myPoint)
    setPurchaseComment(comment)
    setShowConfirmModal(true)
  }
  const handleClose = () => {
    setShowConfirmModal(false)
  }
  const handleConfirm = async () => {
    setPurchaseType(PURCHASE_TYPE.PURCHASE_SUPER_CHAT)
    if (lackedPoint > 0) {
      dispatch(addToast(i18n.t('common:donate_points.lack_point_mess')))
      setShowModalPurchasePoint(true)
      setShowConfirmModal(false)
    } else {
      // purchase super chat
      await purchaseTicketSuperChat(super_chat_params)
    }
  }

  useEffect(() => {
    if (dataPurchaseTicketSuperChat?.code === 200) {
      handleClose()
      dispatch(addToast(i18n.t('common:donate_points.purchase_ticket_success')))
    }
  }, [dataPurchaseTicketSuperChat])

  const handlePurchaseTicket = () => {
    setPurchaseType(PURCHASE_TYPE.PURCHASE_TICKET)
    if (myPoint >= ticket_points) {
      setShowPurchaseTicketModal(true)
    } else {
      dispatch(addToast(i18n.t('common:donate_points.lack_point_mess')))
      setShowModalPurchasePoint(true)
    }
  }
  // purchase ticket
  const doConfirmPurchaseTicket = async () => {
    await purchaseTicketSuperChat(ticket_params)
    if (dataPurchaseTicketSuperChat?.code === 200) {
      dispatch(addToast(i18n.t('common:donate_points.purchase_ticket_success')))
    }
  }

  useEffect(() => {
    setTab(0)
  }, [])
  const getTabs = () => {
    return (
      <Grid item xs={12}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          {isMobile && <ESTab label={t('live_stream_screen.comment')} value={TABS.COMMENT} className={classes.singleTab} />}
          <ESTab label={t('live_stream_screen.program_info')} value={TABS.PROGRAM_INFO} className={classes.singleTab} />
          {userHasViewingTicket() && (
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
        return userHasViewingTicket() ? <ProgramInfo /> : <ProgramInfoNoViewingTicket />
      case TABS.DISTRIBUTOR_INFO:
        return <DistributorInfo />
      case TABS.RELATED_VIDEOS:
        return <RelatedVideos />
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

  const buttonPurchaseTicket = (onClick) => (
    <Box
      style={{
        backgroundColor: Colors.primary,
        display: 'flex',
        position: 'relative',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(5),
      }}
      onClick={onClick}
    >
      <Typography style={{ textAlign: 'center', fontSize: 20 }}>Purchase Ticket</Typography>
    </Box>
  )

  const sideChatContainer = () => (
    <Box style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ChatContainer
        myPoint={myPoint}
        key_video_id={detailVideoResult?.key_video_id}
        onPressDonate={confirmDonatePoint}
        userHasViewingTicket={userHasViewingTicket()}
        handleKeyboardVisibleState={changeSoftKeyboardVisibleState}
      />
      {buttonPurchaseTicket(handlePurchaseTicket)}
    </Box>
  )

  const getVideoType = () => VIDEO_TYPE.LIVE_STREAM
  const isVideoFreeToWatch = () => true
  const isTicketAvailableForSale = () => true
  const userHasViewingTicket = () => true

  const changeSoftKeyboardVisibleState = (visible: boolean) => {
    setSoftKeyboardIsShown(visible)
  }

  //video detail
  // useEffect(() => {
  //   getVideoDetail({video_id:`${video_id}`})
  // }, [video_id])

  return (
    <Box className={classes.root}>
      {isPending && <ESLoader open={meta_my_points.pending} />}
      <Box className={classes.container}>
        <LiveStreamContent
          userHasViewingTicket={userHasViewingTicket()}
          videoType={getVideoType()}
          freeToWatch={isVideoFreeToWatch()}
          ticketAvailableForSale={isTicketAvailableForSale()}
          softKeyboardIsShown={softKeyboardIsShown}
        />
        <Grid container direction="row" className={classes.tabContainer}>
          {getTabs()}
          {getContent()}
        </Grid>
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
      {!isMobile && sideChatContainer()}
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
          setShowModalPurchasePoint={setShowModalPurchasePoint}
        />
      )}
    </Box>
  )
}
export default VideosTop

const useStyles = makeStyles(() => ({
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
}))
