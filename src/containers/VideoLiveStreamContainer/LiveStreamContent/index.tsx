/* eslint-disable @typescript-eslint/no-unused-vars */
import ESLoader from '@components/Loader'
import { VIDEO_TYPE } from '@containers/VideoLiveStreamContainer'
import OverlayContent from '@containers/VideoLiveStreamContainer/LiveStreamContent/OverlayContent'
import { Box, makeStyles } from '@material-ui/core'
import { STATUS_VIDEO } from '@services/videoTop.services'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useDetailVideo from '../useDetailVideo'
import VideoPlayerContextProvider from '@containers/VideoLiveStreamContainer/VideoContext/VideoPlayerContext'
import VideoPlayer from './VideoPlayer'

interface LiveStreamContentProps {
  videoType?: VIDEO_TYPE
  freeToWatch?: boolean | number
  componentsSize?: {
    chatWidth: number
    videoWidth: number
    videoHeight: number
  }
  isArchived?: boolean
  userHasViewingTicket?: boolean | number
  ticketAvailableForSale?: boolean
  softKeyboardIsShown?: boolean
  video_id?: string | string[]
  ticketPrice?: number
  clickButtonPurchaseTicket?: () => void
  onVideoEnd: () => void
}

const LiveStreamContent: React.FC<LiveStreamContentProps> = (props) => {
  const {
    userHasViewingTicket,
    freeToWatch,
    videoType,
    ticketAvailableForSale,
    ticketPrice,
    clickButtonPurchaseTicket,
    onVideoEnd,
    isArchived,
    componentsSize,
    video_id,
  } = props

  const { t } = useTranslation('common')

  // const downMd = useMediaQuery(theme.breakpoints.down(769))
  const { detailVideoResult } = useDetailVideo()

  const isVideoFreeToWatch = freeToWatch === 0

  const [keyVideoPlayer, setKeyVideoPlayer] = useState(0)

  const classes = useStyles()

  useEffect(() => {
    setKeyVideoPlayer((oldKey) => oldKey + 1)
  }, [videoType])

  const mediaPlayer = () => {
    return (
      <>
        {showOverlayOnMediaPlayer() ? (
          <img
            src={
              detailVideoResult?.thumbnail
                ? detailVideoResult?.thumbnail
                : !detailVideoResult?.thumbnail && detailVideoResult?.video_thumbnail
                ? detailVideoResult?.video_thumbnail
                : '/images/live_stream/thumbnail_default.png'
            }
            className={classes.thumb}
          />
        ) : (
          <VideoPlayerContextProvider>
            <VideoPlayer
              componentsSize={componentsSize}
              isArchived={isArchived}
              key={keyVideoPlayer}
              videoType={videoType}
              src={detailVideoResult?.archived_url}
              // src={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'}
              thumbnail={
                detailVideoResult?.thumbnail
                  ? detailVideoResult?.thumbnail
                  : !detailVideoResult?.thumbnail && detailVideoResult?.video_thumbnail
                  ? detailVideoResult?.video_thumbnail
                  : '/images/live_stream/thumbnail_default.png'
              }
              statusVideo={showOverlayOnMediaPlayer() ? true : null}
              mediaOverlayIsShown={showOverlayOnMediaPlayer()}
              onVideoEnd={onVideoEnd}
              startLive={Date.parse(detailVideoResult?.live_stream_start_time)}
              endLive={detailVideoResult?.live_stream_end_time}
              type={detailVideoResult?.status}
              qualities={detailVideoResult?.qualities}
              video_id={video_id}
            />
          </VideoPlayerContextProvider>
        )}
      </>
    )
  }

  const isShowedVideoOverlay = () => {
    return videoType !== STATUS_VIDEO.SCHEDULE
  }

  const getOverlayButtonText = () => {
    if (!isVideoFreeToWatch && !userHasViewingTicket && ticketAvailableForSale) {
      return t('live_stream_screen.buy_ticket')
    }
    if (videoType === STATUS_VIDEO.SCHEDULE && !isVideoFreeToWatch && !ticketAvailableForSale) {
      return null
    }

    return null
  }

  const getOverlayButtonDescriptionText = () => {
    const buyTicketPrice = ticketPrice ? ticketPrice : 0
    if (!isVideoFreeToWatch && !userHasViewingTicket && ticketAvailableForSale) {
      return `${FormatHelper.currencyFormat(buyTicketPrice.toString())} ${t('common.eXe_points')}`
    }
    if (videoType === STATUS_VIDEO.SCHEDULE && !isVideoFreeToWatch && !ticketAvailableForSale) {
      return null
    }

    return null
  }

  const getOverlayMessage = () => {
    if (videoType === STATUS_VIDEO.SCHEDULE && !isVideoFreeToWatch && !ticketAvailableForSale) {
      return t('live_stream_screen.not_begin_sell_ticket')
    }
    if (!isVideoFreeToWatch && !userHasViewingTicket) {
      return t('live_stream_screen.purchase_ticket_note')
    }
    if (videoType === STATUS_VIDEO.SCHEDULE && (isVideoFreeToWatch || (!isVideoFreeToWatch && userHasViewingTicket))) {
      return t('live_stream_screen.livestream_not_start')
    }

    return null
  }
  const mediaOverlayPurchaseTicketView = () => {
    return (
      <Box className={`${classes.overlayPurchaseContainer} ${isShowedVideoOverlay() ? classes.isShowedVideoOverlay : ''}`}>
        <OverlayContent
          onClickButton={clickButtonPurchaseTicket}
          buttonText={getOverlayButtonText()}
          buttonDescriptionText={getOverlayButtonDescriptionText()}
          message={getOverlayMessage()}
        />
      </Box>
    )
  }

  const showOverlayOnMediaPlayer = () => {
    if (videoType === STATUS_VIDEO.SCHEDULE && isVideoFreeToWatch) {
      return true
    }
    if (videoType === STATUS_VIDEO.SCHEDULE && !isVideoFreeToWatch && !ticketAvailableForSale) {
      return true
    }
    if (videoType === STATUS_VIDEO.SCHEDULE && !isVideoFreeToWatch && userHasViewingTicket) {
      return true
    }
    if (!isVideoFreeToWatch && !userHasViewingTicket) {
      return true
    }
    return null
  }

  const renderReloadPlayer = () => {
    return (
      <Box
        style={{
          backgroundColor: '#6A6A6C',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <ESLoader />
      </Box>
    )
  }

  return (
    <Box className={classes.videoPanel}>
      {_.isEmpty(detailVideoResult) ? (
        <Box className={classes.containerLoad} style={{ height: componentsSize.videoHeight }}>
          {renderReloadPlayer()}
        </Box>
      ) : (
        <Box
          className={classes.mediaPlayerContainer}
          // style={{ height: componentsSize.videoHeight }}
        >
          {mediaPlayer()}
          {showOverlayOnMediaPlayer() && mediaOverlayPurchaseTicketView()}
        </Box>
      )}
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  videoPanel: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    background: '#000000',
    height: '100%',
  },
  containerLoad: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: '#6A6A6C',
  },
  mediaPlayerContainer: {
    width: '100%',
    position: 'relative',
  },
  overlayPurchaseContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 100,
    '&$isShowedVideoOverlay': {
      background: 'rgba(4, 4, 4, 0.71)',
      backdropFilter: 'blur(5px)',
    },
  },
  isShowedVideoOverlay: {},
  thumb: {
    width: '100%',
    height: '100%',
  },
}))
export default LiveStreamContent
