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

enum TABS {
  PROGRAM_INFO = 0,
  DISTRIBUTOR_INFO = 1,
  RELATED_VIDEOS = 2,
}

const VideosTop: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [tab, setTab] = useState(0)
  const [confirmModal, setConfirmModal] = useState(false)
  const [stepsModal, setStepsModal] = useState(false)
  const [chatVisible, setChatVisible] = useState(true)

  const showConfirmModal = () => {
    setConfirmModal(true)
  }
  const handleCloseModal = () => {
    setConfirmModal(false)
  }
  const handleConfirmModal = () => {
    setStepsModal(true)
    setConfirmModal(false)
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
      <ChatContainer onCloseChatPanel={onCloseChatPanel} onPressDonate={showConfirmModal} userHasViewingTicket={userHasViewingTicket()} />
    ) : (
      <IconButton onClick={handleChatPanelOpen} className={classes.headerIcon}>
        <img src="/images/ic_collapse_right.svg" />
      </IconButton>
    )
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <LiveStreamContent userHasViewingTicket={userHasViewingTicket()} />
        {isMobile ? (
          <Box className={classes.mobileChatContainer}>
            <ChatContainer onCloseChatPanel={onCloseChatPanel} onPressDonate={showConfirmModal} userHasViewingTicket={true} />
          </Box>
        ) : (
          <Grid container direction="row">
            {getTabs()}
            {getContent()}
          </Grid>
        )}
      </Box>
      {!isMobile && sideChatContainer()}
      <DonatePointsConfirmModal
        open={confirmModal}
        handleClose={handleCloseModal}
        selectedPoint={700}
        msgContent={'abc'}
        handleConfirm={handleConfirmModal}
      />
      {stepsModal && <DonatePoints modal={stepsModal} setShowModal={setStepsModal} />}
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
