import ESTab from '@components/Tab'
import ESTabs from '@components/Tabs'
import i18n from '@locales/i18n'
import { Box, Grid, IconButton, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
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

enum TABS {
  PROGRAM_INFO = 0,
  DISTRIBUTOR_INFO = 1,
  RELATED_VIDEOS = 2,
}

const VideosTop: React.FC = () => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const dispatch = useAppDispatch()

  const { getMyPointData, meta_my_points, myPointsData } = usePointsManage()
  const myPoint = myPointsData?.total_point ? Number(myPointsData.total_point) : 0
  // const myPoint = 400

  const [tab, setTab] = useState(0)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showModalPurchasePoint, setShowModalPurchasePoint] = useState(false)
  const [chatVisible, setChatVisible] = useState(true)
  const [lackedPoint, setLackedPoint] = useState(0)
  const [purchaseComment, setPurchaseComment] = useState<string>('')

  const params = {
    page: 1,
    limit: 10,
  }

  useEffect(() => {
    getMyPointData(params)
  }, [])
  const classes = useStyles({ padded: !isMobile && !chatVisible })

  const confirmDonatePoint = (donated_point, comment) => {
    // reset lack point
    setLackedPoint(0)
    setLackedPoint(donated_point - myPoint)
    setPurchaseComment(comment)
    setShowConfirmModal(true)
  }
  const handleClose = () => {
    setShowConfirmModal(false)
  }
  const handleConfirm = () => {
    if (lackedPoint > 0) {
      dispatch(addToast(i18n.t('common:donate_points.lack_point_mess')))
      setShowModalPurchasePoint(true)
      setShowConfirmModal(false)
    }
  }

  const userHasViewingTicket = () => true

  useEffect(() => {
    setTab(0)
  }, [])
  const getTabs = () => {
    return (
      <Grid item xs={12}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          <ESTab label={t('live_stream_screen.program_info')} value={0} />
          {userHasViewingTicket() && <ESTab label={t('live_stream_screen.distributor_info')} value={1} />}
          <ESTab label={t('live_stream_screen.related_videos')} value={2} />
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
      default:
        break
    }
    return (
      <Box className={classes.forbiddenMessageContainer}>
        <Typography variant="h3">{i18n.t('common:common:private')}</Typography>
      </Box>
    )
  }

  const onCloseChatPanel = () => {
    setChatVisible(false)
  }

  const handleChatPanelOpen = () => {
    setChatVisible(true)
  }

  const sideChatContainer = () => {
    return chatVisible ? (
      <ChatContainer
        myPoint={myPoint}
        onCloseChatPanel={onCloseChatPanel}
        onPressDonate={confirmDonatePoint}
        userHasViewingTicket={userHasViewingTicket()}
      />
    ) : (
      <IconButton onClick={handleChatPanelOpen} className={classes.headerIcon}>
        <img src="/images/ic_collapse_right.svg" />
      </IconButton>
    )
  }

  return (
    <Box className={classes.root}>
      {meta_my_points.pending && <ESLoader open={meta_my_points.pending} />}
      <Box className={classes.container}>
        <LiveStreamContent userHasViewingTicket={userHasViewingTicket()} />
        {isMobile ? (
          <Box className={classes.mobileChatContainer}>
            <ChatContainer
              myPoint={myPoint}
              onCloseChatPanel={onCloseChatPanel}
              onPressDonate={confirmDonatePoint}
              userHasViewingTicket={true}
            />
          </Box>
        ) : (
          <Grid container direction="row" className={classes.tabContainer}>
            {getTabs()}
            {getContent()}
          </Grid>
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
          lackedPoint={lackedPoint}
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
  tabContainer: (props: { padded?: boolean }) => ({
    display: 'flex',
    paddingRight: props?.padded ? 120 : 0,
  }),
  tabs: {
    overflow: 'hidden',
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
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
