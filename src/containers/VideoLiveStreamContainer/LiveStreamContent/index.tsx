/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, ButtonBase, Icon, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ESAvatar from '@components/Avatar'
import { useAppSelector } from '@store/hooks'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React, { useCallback, useEffect, useState } from 'react'
import ESMenuItem from '@components/Menu/MenuItem'
import { VIDEO_TYPE } from '@containers/VideoLiveStreamContainer'
import OverlayContent from '@containers/VideoLiveStreamContainer/LiveStreamContent/OverlayContent'
import useLiveStreamDetail from '../useLiveStreamDetail'
import ReactionButton from './ReactionButton'
import useDetailVideo from '../useDetailVideo'
import { STATUS_VIDEO } from '@services/videoTop.services'
import _ from 'lodash'
import ESReport from '@containers/Report'
import { REPORT_TYPE } from '@constants/common.constants'
import ESMenu from '@components/Menu'
import { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'
import { ESRoutes } from '@constants/route.constants'
import { getIsAuthenticated } from '@store/auth/selectors'
import { debounceTime } from '@constants/common.constants'
import ESLoader from '@components/Loader'
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
    video_id,
    softKeyboardIsShown,
    clickButtonPurchaseTicket,
    onVideoEnd,
    isArchived,
    componentsSize,
  } = props
  const [showReportMenu, setShowReportMenu] = useState<boolean>(false)
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const theme = useTheme()
  const { t } = useTranslation('common')
  const isAuthenticated = useAppSelector(getIsAuthenticated)

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  // const downMd = useMediaQuery(theme.breakpoints.down(769))
  const { detailVideoResult, userResult } = useDetailVideo()
  const { userReactionVideoStream, userFollowChannel } = useLiveStreamDetail()
  // const isLoadingReaction = meta_reaction_video_stream?.pending
  // const isLoadingVideoDetail = meta?.pending
  const [like, setLike] = useState(userResult?.like ? userResult.like : 0)
  const [unlike, setUnlike] = useState(userResult?.unlike ? userResult.unlike : 0)
  const [likeCount, setLikeCount] = useState(detailVideoResult?.like_count ? detailVideoResult?.like_count : 0)
  const [unlikeCount, setUnlikeCount] = useState(detailVideoResult?.unlike_count ? detailVideoResult?.unlike_count : 0)
  const [subscribe, setSubscribe] = useState(userResult?.follow ? userResult?.follow : 0)
  const [subscribeCount, setSubscribeCount] = useState(
    detailVideoResult?.channel_follow_count ? detailVideoResult?.channel_follow_count : 0
  )

  const isVideoFreeToWatch = freeToWatch === 0

  const [keyVideoPlayer, setKeyVideoPlayer] = useState(0)
  // get url browser video live stream
  const urlVideoLiveStream = window.location.href

  const isSubscribed = () => subscribe

  const classes = useStyles({ isSubscribed: isSubscribed() })

  const toggleSubscribeClick = () => {
    const newSubscribe = subscribe === 0 ? 1 : 0
    const newSubscribeCount = subscribe === 0 ? subscribeCount + 1 : subscribeCount - 1

    setSubscribe(newSubscribe)
    setSubscribeCount(newSubscribeCount)
    if (detailVideoResult?.channel_id) {
      debouncedHandleSubscribe(newSubscribe, detailVideoResult?.channel_id, video_id)
    }
  }

  const debouncedHandleSubscribe = useCallback(
    _.debounce((followValue: number, channelIdValue: number, videoIdValue: string | string[]) => {
      userFollowChannel({
        video_id: videoIdValue,
        channel_id: channelIdValue,
        follow: followValue,
      })
    }, debounceTime),
    []
  )

  const debouncedHandleReactionVideo = useCallback(
    _.debounce((likeValue: number, unlikeValue: number, videoIdValue: string | string[]) => {
      userReactionVideoStream({
        video_id: videoIdValue,
        like: likeValue,
        unlike: unlikeValue,
      })
    }, debounceTime),
    []
  )

  const toggleLikeVideo = () => {
    // console.log('toggleLikeVideo like:', like, '- likecount:', likeCount,
    //   '\n-unlike: ', unlike, '- unlikecount:', unlikeCount);

    if (!like) {
      setLike(1)
      setLikeCount(likeCount + 1)
      if (unlike === 1) {
        setUnlike(0)
        setUnlikeCount(unlikeCount > 0 ? unlikeCount - 1 : 0)
      }
      debouncedHandleReactionVideo(1, 0, video_id)
    } else {
      setLike(0)
      setLikeCount(likeCount > 0 ? likeCount - 1 : 0)
      debouncedHandleReactionVideo(0, unlike, video_id)
    }
  }

  const toggleUnLikeVideo = () => {
    // console.log('toggleUnLikeVideo like:', like, '- likecount:', likeCount,
    //   '\n-unlike: ', unlike, '- unlikecount:', unlikeCount);
    if (!unlike) {
      setUnlike(1)
      setUnlikeCount(unlikeCount + 1)
      if (like === 1) {
        setLike(0)
        setLikeCount(likeCount > 0 ? likeCount - 1 : 0)
      }
      debouncedHandleReactionVideo(0, 1, video_id)
    } else {
      setUnlike(0)
      setUnlikeCount(unlikeCount > 0 ? unlikeCount - 1 : 0)
      debouncedHandleReactionVideo(like, 0, video_id)
    }
  }

  const handleShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${detailVideoResult?.title}%0a${urlVideoLiveStream}`, '_blank')?.focus()
  }

  useEffect(() => {
    if (userResult) {
      setLike(userResult?.like !== like ? userResult?.like : like)
      setUnlike(userResult?.unlike !== unlike ? userResult?.unlike : unlike)
      setSubscribe(userResult?.follow !== subscribe ? userResult?.follow : subscribe)
    }
    if (detailVideoResult) {
      setLikeCount(detailVideoResult?.like_count !== likeCount ? detailVideoResult?.like_count : likeCount)
      setUnlikeCount(detailVideoResult?.unlike_count !== unlikeCount ? detailVideoResult?.unlike_count : unlikeCount)
      setSubscribeCount(
        detailVideoResult?.channel_follow_count !== subscribeCount ? detailVideoResult?.channel_follow_count : subscribeCount
      )
    }
  }, [userResult, detailVideoResult])

  const registerChannelButton = () => (
    <ButtonBase onClick={isAuthenticated ? toggleSubscribeClick : goToLogin} className={classes.register_channel_btn}>
      <Box>
        <Icon className={`far fa-heart ${classes.heartIcon}`} fontSize="small" />
      </Box>
      <Box pl={1} className={classes.subscribeLabel}>
        {isSubscribed() ? t('live_stream_screen.channel_registered') : t('live_stream_screen.channel_register')}
      </Box>
    </ButtonBase>
  )

  const shareButton = () => (
    <Box className={classes.shareButton}>
      <ButtonBase onClick={handleShare}>
        <Icon className={`fa fa-share-alt ${classes.icon}`} fontSize="small" />
        <Box pl={1}>{t('live_stream_screen.share_btn')}</Box>
      </ButtonBase>
    </Box>
  )

  const streamerInfoContainer = () => (
    <Box className={classes.wrap_streamer_info}>
      <Box className={classes.streamer_info}>
        <ESAvatar
          size={mobileRegisterChannelVisible ? 36 : 72}
          className={classes.avatar}
          alt={detailVideoResult?.user_nickname}
          src={detailVideoResult?.user_avatar}
        />
        <Box className={classes.streamer_data}>
          {detailVideoResult?.channel_name && <Box className={classes.streamer_name}>{detailVideoResult?.channel_name}</Box>}
          <Box className={classes.registration}>
            <Typography className={classes.register_person_label}>{t('live_stream_screen.register_person_label')}</Typography>
            <Typography className={classes.register_person_number}>
              {FormatHelper.japaneseWanFormatter(subscribeCount)}
              {t('common.man')}
            </Typography>
          </Box>
        </Box>
      </Box>
      {registerChannelButton()}
    </Box>
  )

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
          <VideoPlayer
            isArchived={isArchived}
            key={keyVideoPlayer}
            videoType={videoType}
            src={detailVideoResult?.archived_url}
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
          />
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

  const liveBasicContentVisible = !isMobile || !softKeyboardIsShown
  const mobileRegisterChannelVisible = isMobile && !softKeyboardIsShown
  const goToLogin = () => {
    router.push(makeContextualHref({ pathName: ESRoutes.LOGIN }), ESRoutes.LOGIN, { shallow: true })
  }
  const handleReportOpen = () => {
    setShowReportMenu(true)
    //get profile streamer
    // dispatch(actions.getMemberProfile(detailVideoResult?.user_code))
  }
  const handleCloseReport = () => {
    setShowReportMenu(false)
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
    <Box className={classes.container}>
      {_.isEmpty(detailVideoResult) ? (
        <Box className={classes.containerLoad} style={{ height: componentsSize.videoHeight }}>
          {renderReloadPlayer()}
        </Box>
      ) : (
        <Box className={classes.mediaPlayerContainer} style={{ height: componentsSize.videoHeight }}>
          {mediaPlayer()}
          {showOverlayOnMediaPlayer() && mediaOverlayPurchaseTicketView()}
        </Box>
      )}
      {mobileRegisterChannelVisible && streamerInfoContainer()}
      {liveBasicContentVisible && (
        <Box className={classes.wrap_info}>
          <Box className={classes.wrap_movie_info}>
            <Box className={classes.wrap_title}>
              <Typography className={classes.movie_title}>{detailVideoResult?.title}</Typography>
              {!isMobile && detailVideoResult?.status === 1 && videoType === STATUS_VIDEO.LIVE_STREAM ? (
                <Box className={classes.live_stream_status}>
                  <Typography className={classes.txtVideoStatus}>{t('live_stream_screen.live_stream_status')}</Typography>
                </Box>
              ) : (
                isMobile && shareButton()
              )}
            </Box>
            <Typography className={classes.device_name}>{detailVideoResult?.category_name}</Typography>
          </Box>

          <Box className={classes.wrap_interactive_info}>
            <Box className={classes.interactive_info}>
              <ReactionButton iconName={'fa fa-eye'} value={detailVideoResult?.view_count} status={1} showPointer={false} />
              <ReactionButton
                onPress={isAuthenticated ? toggleLikeVideo : goToLogin}
                iconName={'fa fa-thumbs-up'}
                value={likeCount}
                status={like}
                showPointer={true}
              />
              <ReactionButton
                onPress={isAuthenticated ? toggleUnLikeVideo : goToLogin}
                iconName={'fa fa-thumbs-down'}
                value={unlikeCount}
                status={unlike}
                showPointer={true}
              />
              {!isMobile && shareButton()}
            </Box>

            {/* report icon */}
            <Box ml={1} pr={!isMobile ? 3 : 0} display="flex" flexDirection="row" flexShrink={0}>
              <ESMenu>
                <ESMenuItem onClick={isAuthenticated ? handleReportOpen : goToLogin}>{t('tournament.report')}</ESMenuItem>
              </ESMenu>
            </Box>
          </Box>
        </Box>
      )}
      {!isMobile && streamerInfoContainer()}
      {/* Show Report Modal */}
      {isAuthenticated && (
        <ESReport
          reportType={REPORT_TYPE.VIDEO_STREAM}
          target_id={detailVideoResult?.id}
          data={detailVideoResult}
          open={showReportMenu}
          handleClose={handleCloseReport}
        />
      )}
    </Box>
  )
}
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    background: '#000000',
    // height: '100%',
  },
  containerLoad: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: '#6A6A6C',
  },
  dropDownMenu: {
    position: 'relative',
    display: 'inline-block',
    paddingRight: 30,
  },
  dropDownContent: {
    overflow: 'hidden',
    position: 'absolute',
    background: 'white',
    right: 0,
    willChange: 'all',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: 'auto',
    visibility: 'visible',
    opacity: 1,
    transition: 'all 0.5s ease',
    height: 'auto',
    display: 'block',
  },
  mediaPlayerContainer: {
    width: '100%',
    position: 'relative',
  },
  buyTicketAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: '16px',
  },
  buyTicketNote: {
    marginTop: '35px',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F7F735',
    marginBottom: '91px',
  },
  buyTicketButton: {
    '&.MuiButtonBase-root.button-primary': {
      paddingLeft: '62px',
      paddingRight: '62px',
      height: '50px',
    },
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
  wrap_info: {
    padding: '16px 16px 16px 24px',
    width: '100%',
  },
  wrap_movie_info: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  wrap_title: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  movie_title: {
    paddingRight: '64px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  device_name: {
    fontSize: '15px',
    color: '#F7F735',
  },
  live_stream_status: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 2,
    minWidth: '84px',
  },
  txtVideoStatus: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
  },
  wrap_interactive_info: {
    display: 'flex',
    color: '#FFFFFF',
    alignItems: 'center',
    paddingTop: '16px',
    justifyContent: 'space-between',
    width: '100%',
    // paddingRight: '30px',
  },
  interactive_info: {
    display: 'flex',
    alignItems: 'center',
    '& > p': {
      paddingRight: '24px',
    },
  },
  view: {},
  three_dot: {
    cursor: 'pointer',
  },
  like: {
    cursor: 'pointer',
  },
  dislike: {
    cursor: 'pointer',
  },
  shareButton: {
    '& button': {
      background: '#323234',
      color: '#FFFFFF',
      fontSize: '14px',
      fontWeight: 'bold',
      borderRadius: '4px',
      padding: '6px',
      width: '80px',
      height: '30px',
    },
  },
  icon: {},
  heartIcon: (props: { isSubscribed?: number }) => ({
    color: props?.isSubscribed === 1 ? Colors.white : Colors.primary,
  }),
  subscribeLabel: (props: { isSubscribed?: number }) => ({
    color: props?.isSubscribed === 1 ? Colors.white : Colors.primary,
  }),
  wrap_streamer_info: {
    height: '112px',
    display: 'flex',
    borderTop: '1px solid #212121',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streamer_info: {
    display: 'flex',
    paddingLeft: '24px',
    alignItems: 'center',
  },
  avatar: {
    marginRight: '14px',
    width: '72px',
    height: '72px',
  },
  streamer_data: {
    color: '#FFFFFF',
  },
  streamer_name: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  registration: {
    display: 'flex',
  },
  register_person_label: {
    paddingRight: '34px',
  },
  register_person_number: {},
  register_channel_btn: (props: { isSubscribed?: number }) => ({
    background: props?.isSubscribed === 1 ? Colors.primary : Colors.transparent,
    ...(props?.isSubscribed !== 1 && {
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: Colors.primary,
    }),
    padding: '6px 10px',
    borderRadius: '5px',
    fontSize: '14px',
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: '16px',
    alignItems: 'center',
    display: 'flex',
  }),
  [theme.breakpoints.down(768)]: {
    wrap_movie_info: {},
    wrapPreLoadReactionButton: {
      width: 'calc(100vw)',
    },
    live_stream_status: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    movie_title: {
      fontSize: '16px',
      maxWidth: '200px',
    },
    device_name: {
      fontSize: '14px',
    },
    shareButton: {
      '& button': {
        width: '100px',
      },
    },
    wrap_title: {
      marginRight: 0,
      paddingRight: 0,
      flex: 1,
      justifyContent: 'space-between',
    },
    mobileRegisterChannelContainer: {
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: '24px',
      paddingTop: '16px',
      paddingBottom: '5px',
      width: '100%',
    },
    icon: {
      marginRight: '11px',
    },
    smallAvatar: {
      width: '36px',
      height: '36px',
      borderRadius: '18px',
    },
    channelName: {
      fontSize: '14px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flex: 1,
      marginLeft: '20px',
      marginRight: '20px',
    },
    buyTicketNote: {
      marginBottom: '52px',
    },
    wrap_streamer_info: {
      backgroundColor: 'black',
      flexDirection: 'row',
      paddingTop: '16px',
      paddingBottom: '5px',
      height: 'auto',
    },
    avatar: {
      width: '36px',
      height: '36px',
      borderRadius: '18px',
    },
    streamer_name: {
      fontSize: '14px',
      fontWeight: 'bold',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flex: 1,
    },
    subscribeLabel: {
      fontSize: 12,
    },
    heartIcon: {
      fontSize: 12,
    },
    register_channel_btn: () => ({
      padding: '4px 10px',
    }),
  },
  [theme.breakpoints.down(321)]: {
    subscribeLabel: {
      fontSize: 10,
    },
    heartIcon: {
      fontSize: 10,
    },
    avatar: {
      marginRight: 8,
    },
    register_person_label: {
      paddingRight: 13,
    },
    register_channel_btn: () => ({
      padding: '2x 10px',
    }),
  },
  process: {
    zIndex: 1,
    '& .video-react-slider-bar': {},
    '& .video-react-play-progress': {
      backgroundColor: '#FF4786',
      height: 7,
      '& :before': {
        position: 'absolute',
        content: 'o',
        display: 'block',
        color: 'red',
        fontSize: '3.9em',
        bottom: '0',
        left: '0',
        width: 6.5,
        height: 6.5,
        borderWidth: '2px 0 0 2px',
      },
    },
    '& .video-react-progress-holder': {
      backgroundColor: '#4D4D4D',
      position: 'absolute',
      bottom: 40,
      width: '100%',
      height: 7,
    },
    '& .video-react-control-text': {
      display: 'none',
    },
    '& .video-react-load-progress': {},
  },
  bigPlayButton: {
    display: 'none',
    '& .video-react-big-play-button': {},
    '& .video-react-big-play-button-left': {},
    '& .video-react-control-text': {
      display: 'none',
    },
  },
  playOverView: {
    backgroundColor: 'rgba(0,100,0,0.4)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb: {
    width: '100%',
    height: '100%',
  },
}))
export default LiveStreamContent