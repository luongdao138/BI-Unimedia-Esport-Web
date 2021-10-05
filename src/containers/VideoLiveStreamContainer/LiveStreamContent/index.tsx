/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, ButtonBase, Icon, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import userProfileStore from '@store/userProfile'
import ESAvatar from '@components/Avatar'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React, { useCallback, useEffect, useState } from 'react'
import ESMenuItem from '@components/Menu/MenuItem'
import { VIDEO_TYPE } from '@containers/VideoLiveStreamContainer'
import OverlayContent from '@containers/VideoLiveStreamContainer/LiveStreamContent/OverlayContent'
import VideoPlayer from './VideoPlayer'
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
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'

interface LiveStreamContentProps {
  videoType?: VIDEO_TYPE
  freeToWatch?: boolean
  userHasViewingTicket?: boolean | number
  ticketAvailableForSale?: boolean
  softKeyboardIsShown?: boolean
  video_id?: string | string[]
  ticketPrice?: number
  clickButtonPurchaseTicket?: () => void
  onVideoEnd: () => void
}

const LiveStreamContent: React.FC<LiveStreamContentProps> = (props) => {
  const [showReportMenu, setShowReportMenu] = useState<boolean>(false)
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const theme = useTheme()
  const { t } = useTranslation('common')
  const { actions, selectors } = userProfileStore
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const userProfile = useAppSelector(selectors.getUserProfile)
  const streamerProfile = useAppSelector(selectors.getLastSeenUserData)

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  // const downMd = useMediaQuery(theme.breakpoints.down(769))
  const { detailVideoResult, userResult } = useDetailVideo()
  const { userReactionVideoStream, userFollowChannel } = useLiveStreamDetail()
  // const isLoadingReaction = meta_reaction_video_stream?.pending
  // const isLoadingVideoDetail = meta?.pending
  const [like, setLike] = useState(userResult?.like !== null ? userResult.like : 0)
  const [unlike, setUnlike] = useState(userResult?.unlike !== null ? userResult.unlike : 0)
  const [likeCount, setLikeCount] = useState(detailVideoResult?.like_count !== null ? detailVideoResult?.like_count : 0)
  const [unlikeCount, setUnlikeCount] = useState(detailVideoResult?.unlike_count !== null ? detailVideoResult?.unlike_count : 0)
  const [subscribe, setSubscribe] = useState(userResult?.follow !== null ? userResult?.follow : 0)
  const [subscribeCount, setSubscribeCount] = useState(
    detailVideoResult?.channel_follow_count !== null ? detailVideoResult?.channel_follow_count : 0
  )

  const [keyVideoPlayer, setKeyVideoPlayer] = useState(0)
  // get url browser video live stream
  const urlVideoLiveStream = window.location.href

  const isSubscribed = () => subscribe

  const classes = useStyles({ isSubscribed: isSubscribed() })

  const toggleSubscribeClick = () => {
    if (subscribe === 0) {
      setSubscribe(1)
      setSubscribeCount(subscribeCount + 1)
      // console.log('enter Subscribe')
      if (detailVideoResult?.channel_id) {
        debouncedHandleSubscribe(1, detailVideoResult?.channel_id, props?.video_id)
      }
    } else {
      setSubscribe(0)
      setSubscribeCount(subscribeCount - 1)
      // console.log('enter unSubscribe')
      if (detailVideoResult?.channel_id) {
        debouncedHandleSubscribe(0, detailVideoResult?.channel_id, props?.video_id)
      }
    }
  }

  const debouncedHandleSubscribe = useCallback(
    _.debounce((followValue: number, channelIdValue: number, videoIdValue: string | string[]) => {
      // console.log('debounced HandleSubscribeVideo')
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
      // console.log('debounced HandleReactionVideo')
      userReactionVideoStream({
        video_id: videoIdValue,
        like: likeValue,
        unlike: unlikeValue,
      })
    }, debounceTime),
    []
  )

  const toggleLikeVideo = () => {
    if (like === 0) {
      setLike(1)
      setLikeCount(likeCount + 1)
      if (unlike === 1) {
        setUnlike(0)
        setUnlikeCount(unlikeCount > 0 ? unlikeCount - 1 : 0)
      }
      // console.log('enter like')
      debouncedHandleReactionVideo(1, 0, props?.video_id)
    } else {
      setLike(0)
      setLikeCount(likeCount > 0 ? likeCount - 1 : 0)
      // console.log('enter like')
      debouncedHandleReactionVideo(0, unlike, props?.video_id)
    }
  }

  const toggleUnLikeVideo = () => {
    if (unlike === 0) {
      setUnlike(1)
      setUnlikeCount(unlikeCount + 1)
      if (like === 1) {
        setLike(0)
        setLikeCount(likeCount > 0 ? likeCount - 1 : 0)
      }
      // console.log('enter unlike')
      debouncedHandleReactionVideo(0, 1, props?.video_id)
    } else {
      setUnlike(0)
      setUnlikeCount(unlikeCount > 0 ? unlikeCount - 1 : 0)

      // console.log('enter unlike')
      debouncedHandleReactionVideo(like, 0, props?.video_id)
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
        {t('live_stream_screen.channel_register')}
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

  const mobileRegisterChannelContainer = () => (
    <Box className={classes.mobileRegisterChannelContainer}>
      <ESAvatar className={classes.smallAvatar} alt={detailVideoResult?.user_nickname} src={detailVideoResult?.user_avatar} size={36} />
      <Typography className={classes.channelName}>{detailVideoResult?.user_nickname}</Typography>
      {registerChannelButton()}
    </Box>
  )

  useEffect(() => {
    setKeyVideoPlayer((oldKey) => oldKey + 1)
  }, [props.videoType])

  const mediaPlayer = () => {
    return (
      // <VideoPlayer
      //   src={'https://usher.ttvnw.net/api/lvs/hls/lvs.lvs-client-example.c6341be8-a3c7-42bc-b89a-8dabe040eae9.m3u8'}
      //   thumbnail={'/images/live_stream/exelab_thumb.png'}
      //   statusVideo={true}
      // />
      <>
        {showOverlayOnMediaPlayer() ? (
          <img
            src={detailVideoResult?.thumbnail ? detailVideoResult?.thumbnail : '/images/live_stream/thumbnail_default.png'}
            className={classes.thumb}
          />
        ) : (
          <VideoPlayer
            key={keyVideoPlayer}
            src={detailVideoResult?.archived_url}
            thumbnail={detailVideoResult?.thumbnail}
            statusVideo={showOverlayOnMediaPlayer() ? true : null}
            mediaOverlayIsShown={showOverlayOnMediaPlayer()}
            onVideoEnd={props.onVideoEnd}
            startLive={Date.parse(detailVideoResult?.live_stream_start_time)}
            endLive={detailVideoResult?.live_stream_end_time}
            type={detailVideoResult?.status}
          />
        )}
      </>
    )
  }

  const getOverlayButtonText = () => {
    const { userHasViewingTicket, freeToWatch, videoType, ticketAvailableForSale } = props
    if (!freeToWatch && !userHasViewingTicket && ticketAvailableForSale) {
      return t('live_stream_screen.buy_ticket')
    }
    if (videoType === STATUS_VIDEO.SCHEDULE && !freeToWatch && !ticketAvailableForSale) {
      return null
    }

    return null
  }

  const getOverlayButtonDescriptionText = () => {
    const { userHasViewingTicket, freeToWatch, videoType, ticketAvailableForSale, ticketPrice } = props
    const buyTicketPrice = ticketPrice ? ticketPrice : 0
    if (!freeToWatch && !userHasViewingTicket && ticketAvailableForSale) {
      return `${FormatHelper.currencyFormat(buyTicketPrice.toString())} ${t('common.eXe_points')}`
    }
    if (videoType === STATUS_VIDEO.SCHEDULE && !freeToWatch && !ticketAvailableForSale) {
      return null
    }

    return null
  }

  const getOverlayMessage = () => {
    const { videoType, freeToWatch, userHasViewingTicket, ticketAvailableForSale } = props
    if (videoType === STATUS_VIDEO.SCHEDULE && !freeToWatch && !ticketAvailableForSale) {
      return t('live_stream_screen.not_begin_sell_ticket')
    }
    if (!freeToWatch && !userHasViewingTicket) {
      return t('live_stream_screen.purchase_ticket_note')
    }
    if (videoType === STATUS_VIDEO.SCHEDULE && (freeToWatch || (!freeToWatch && userHasViewingTicket))) {
      return t('live_stream_screen.livestream_not_start')
    }

    return null
  }
  const mediaOverlayPurchaseTicketView = () => {
    return (
      <Box className={classes.overlayPurchaseContainer}>
        <OverlayContent
          onClickButton={props?.clickButtonPurchaseTicket}
          buttonText={getOverlayButtonText()}
          buttonDescriptionText={getOverlayButtonDescriptionText()}
          message={getOverlayMessage()}
        />
      </Box>
    )
  }

  const showOverlayOnMediaPlayer = () => {
    const { userHasViewingTicket, videoType, freeToWatch, ticketAvailableForSale } = props
    if (videoType === STATUS_VIDEO.SCHEDULE && freeToWatch) {
      return true
    }
    if (videoType === STATUS_VIDEO.SCHEDULE && !freeToWatch && !ticketAvailableForSale) {
      return true
    }
    if (videoType === STATUS_VIDEO.SCHEDULE && !freeToWatch && userHasViewingTicket) {
      return true
    }
    if (!freeToWatch && !userHasViewingTicket) {
      return true
    }
    // return !freeToWatch && !userHasViewingTicket
    return null
  }

  const liveBasicContentVisible = () => !isMobile || !props.softKeyboardIsShown
  const mobileRegisterChannelVisible = () => isMobile && !props.softKeyboardIsShown
  const goToLogin = () => {
    router.push(makeContextualHref({ pathName: ESRoutes.LOGIN }), ESRoutes.LOGIN, { shallow: true })
  }
  const handleReportOpen = () => {
    setShowReportMenu(true)
    //get profile streamer
    dispatch(actions.getMemberProfile(detailVideoResult?.user_code))
  }

  //calc height load video
  const isDownMd = useMediaQuery(theme.breakpoints.down(769))
  const isDown1100 = useMediaQuery(theme.breakpoints.down(1100))
  const isDown960 = useMediaQuery(theme.breakpoints.down(960))
  const { width: videoDisplayWidth } = useWindowDimensions(0)
  const chatBoardWidth = () => {
    if (!isDown1100) return 482
    if (!isDownMd) return 350
    return 0
  }
  const sizeMenuWidth = () => {
    if (!isDown960) return 98
    return 0
  }

  const calculateVideoHeight = () => {
    const videoWidth = videoDisplayWidth - (chatBoardWidth() + sizeMenuWidth())
    return (videoWidth * 9) / 16
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
      {!detailVideoResult?.archived_url ? (
        <Box className={classes.containerLoad} style={{ height: calculateVideoHeight() }}>
          {renderReloadPlayer()}
        </Box>
      ) : (
        <Box className={classes.mediaPlayerContainer}>
          {mediaPlayer()}
          {showOverlayOnMediaPlayer() && mediaOverlayPurchaseTicketView()}
        </Box>
      )}
      {mobileRegisterChannelVisible() && mobileRegisterChannelContainer()}
      {liveBasicContentVisible() && (
        <Box className={classes.wrap_info}>
          <Box className={classes.wrap_movie_info}>
            <Box className={classes.wrap_title}>
              <Typography className={classes.movie_title}>{detailVideoResult?.title}</Typography>
              {!isMobile && detailVideoResult?.status === 1 ? (
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
      {!isMobile && (
        <Box className={classes.wrap_streamer_info}>
          <Box className={classes.streamer_info}>
            <ESAvatar className={classes.avatar} alt={detailVideoResult?.user_nickname} src={detailVideoResult?.user_avatar} />
            <Box className={classes.streamer_data}>
              {detailVideoResult?.user_nickname && <Box className={classes.streamer_name}>{detailVideoResult?.user_nickname}</Box>}
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
      )}
      {/* Show Report Modal */}
      {isAuthenticated && (
        <ESReport
          reportType={REPORT_TYPE.USER_LIST}
          target_id={userProfile?.attributes?.user_code}
          data={streamerProfile}
          open={showReportMenu}
          handleClose={() => setShowReportMenu(false)}
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
    height: '100%',
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
    background: 'rgba(4, 4, 4, 0.71)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 100,
    backdropFilter: 'blur(5px)',
  },
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
    // justifyContent: 'space-between',
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
    register_channel_btn: {
      padding: '1px 8px',
      marginRight: '8px',
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
