import { Box, ButtonBase, Icon, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ESChip from '@components/Chip'
import userProfileStore from '@store/userProfile'
import ESAvatar from '@components/Avatar'
import { useAppSelector } from '@store/hooks'
import { Colors } from '@theme/colors'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import React, { useEffect, useState } from 'react'
import ESMenuItem from '@components/Menu/MenuItem'
import { VIDEO_TYPE } from '@containers/VideoLiveStreamContainer'
import OverlayContent from '@containers/VideoLiveStreamContainer/LiveStreamContent/OverlayContent'
// import ESButton from '@components/Button'
import VideoPlayer from './VideoPlayer'
import useLiveStreamDetail from '../useLiveStreamDetail'
import ReactionButton from './ReactionButton'
import useDetailVideo from '../useDetailVideo'
import PreloadButtonReaction from '../PreloadContainer/PreloadButtonReaction'
import PreloadVideoInfo from '../PreloadContainer/PreloadVideoInfo'
import { STATUS_VIDEO } from '@services/videoTop.services'

interface LiveStreamContentProps {
  videoType?: VIDEO_TYPE
  freeToWatch?: boolean
  userHasViewingTicket?: boolean
  ticketAvailableForSale?: boolean
  softKeyboardIsShown?: boolean
  video_id?: string | string[]
  ticketPrice?: number
}

const LiveStreamContent: React.FC<LiveStreamContentProps> = (props) => {
  const [showReportMenu, setShowReportMenu] = useState<boolean>(false)

  const theme = useTheme()
  const { t } = useTranslation('common')
  const { selectors } = userProfileStore
  const userProfile = useAppSelector(selectors.getUserProfile)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const { detailVideoResult, meta, userResult } = useDetailVideo()
  const { meta_reaction_video_stream, userReactionVideoStream, userFollowChannel, meta_follow_channel } = useLiveStreamDetail()
  const isLoadingReaction = meta_reaction_video_stream?.pending
  const isLoadingVideoDetail = meta?.pending
  const [like, setLike] = useState(!isLoadingVideoDetail ? userResult.like : 0)
  const [unlike, setUnlike] = useState(!isLoadingVideoDetail ? userResult.unlike : 0)
  const [likeCount, setLikeCount] = useState(
    !isLoadingVideoDetail && detailVideoResult?.like_count !== undefined ? detailVideoResult?.like_count : 0
  )
  const [unlikeCount, setUnlikeCount] = useState(
    !isLoadingVideoDetail && detailVideoResult?.unlike_count !== undefined ? detailVideoResult?.unlike_count : 0
  )
  const [subscribe, setSubscribe] = useState(userResult?.follow !== null ? userResult.follow : 0)

  const isSubscribed = () => subscribe

  // eslint-disable-next-line no-console
  console.log(
    'detail video result - userResult - like count - unlike count >>>>>>>>>> ',
    detailVideoResult,
    userResult,
    likeCount,
    unlikeCount
  )

  const classes = useStyles({ isSubscribed: isSubscribed() })
  const followParams = {
    video_id: props?.video_id,
    channel_id: detailVideoResult?.channel_id,
    follow: subscribe,
  }
  const toggleSubscribeClick = () => {
    if (subscribe === 0) {
      setSubscribe(1)
    } else {
      setSubscribe(0)
    }
  }
  const handleSubscribe = () => {
    if (!meta_follow_channel?.pending) {
      userFollowChannel(followParams)
    }
  }
  const paramsReaction = {
    video_id: props?.video_id,
    like: like,
    unlike: unlike,
  }
  const toggleLikeVideo = () => {
    if (like === 0) {
      setLike(1)
      setLikeCount(likeCount + 1)
      if (unlike === 1) {
        setUnlike(0)
        setUnlikeCount(unlikeCount > 0 ? unlikeCount - 1 : 0)
      }
    } else {
      setLike(0)
      setLikeCount(likeCount > 0 ? likeCount - 1 : 0)
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
    } else {
      setUnlike(0)
      setUnlikeCount(unlikeCount > 0 ? unlikeCount - 1 : 0)
    }
  }
  const handleReactionVideo = () => {
    if (!isLoadingReaction) {
      userReactionVideoStream(paramsReaction)
    }
  }
  useEffect(() => {
    handleReactionVideo()
  }, [like, unlike])

  useEffect(() => {
    handleSubscribe()
  }, [subscribe])

  // useEffect(() => {
  //   setLike(userResult?.like)
  //   setUnlike(userResult?.unlike)
  //   setLikeCount(detailVideoResult?.like_count)
  //   setUnlikeCount(detailVideoResult?.unlike_count)
  //   setSubscribe(userResult?.follow)
  // }, [userResult, detailVideoResult])

  const registerChannelButton = () => (
    <ButtonBase onClick={toggleSubscribeClick} className={classes.register_channel_btn}>
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
      <ButtonBase
        onClick={() =>
          window
            .open(`https://twitter.com/intent/tweet?text=${detailVideoResult?.title}\n${detailVideoResult?.archived_url}`, '_blank')
            ?.focus()
        }
      >
        <Icon className={`fa fa-share-alt ${classes.icon}`} fontSize="small" />
        <Box pl={1}>{t('live_stream_screen.share_btn')}</Box>
      </ButtonBase>
    </Box>
  )

  const mobileRegisterChannelContainer = () => (
    <Box className={classes.mobileRegisterChannelContainer}>
      <ESAvatar className={classes.smallAvatar} src={'/images/avatar.png'} />
      <Typography className={classes.channelName}>{'配信者の名前がはいります'}</Typography>
      {registerChannelButton()}
    </Box>
  )

  const mediaPlayer = () => {
    return (
      // <VideoPlayer src={detailVideoResult?.archived_url} thumbnail={'/images/live_stream/exelab_thumb.png'} statusVideo={props.videoType} />
      <VideoPlayer
        src={'https://usher.ttvnw.net/api/lvs/hls/lvs.lvs-client-example.c6341be8-a3c7-42bc-b89a-8dabe040eae9.m3u8'}
        thumbnail={'/images/live_stream/exelab_thumb.png'}
        statusVideo={props.videoType}
      />
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
          buttonText={getOverlayButtonText()}
          buttonDescriptionText={getOverlayButtonDescriptionText()}
          message={getOverlayMessage()}
        />
      </Box>
    )
  }
  const renderPreloadButtonReaction = () => {
    return (
      <>
        {downMd ? (
          <Box className={classes.wrapPreLoadReactionButton}>
            <PreloadButtonReaction />
          </Box>
        ) : (
          <Box style={{ width: '100%', height: 100 }}>
            <PreloadButtonReaction />
          </Box>
        )}
      </>
    )
  }

  const renderPreloadVideoInfo = () => {
    return (
      <>
        {downMd ? (
          <Box className={classes.wrapPreLoadReactionButton}>
            <PreloadVideoInfo />
          </Box>
        ) : (
          <Box style={{ width: '100%', height: 100 }}>
            <PreloadVideoInfo />
          </Box>
        )}
      </>
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
    return !freeToWatch && !userHasViewingTicket
  }

  const liveBasicContentVisible = () => !isMobile || !props.softKeyboardIsShown
  const mobileRegisterChannelVisible = () => isMobile && !props.softKeyboardIsShown

  return (
    <Box className={classes.container}>
      <Box className={classes.mediaPlayerContainer}>
        {mediaPlayer()}
        {showOverlayOnMediaPlayer() && mediaOverlayPurchaseTicketView()}
      </Box>
      {mobileRegisterChannelVisible() && mobileRegisterChannelContainer()}
      {liveBasicContentVisible() && (
        <Box className={classes.wrap_info}>
          {!detailVideoResult ? (
            <>{renderPreloadVideoInfo()}</>
          ) : (
            <Box className={classes.wrap_movie_info}>
              <Box className={classes.wrap_title}>
                <Typography className={classes.movie_title}>{detailVideoResult?.title}</Typography>
                <Typography className={classes.device_name}>{detailVideoResult?.category_name}</Typography>
              </Box>
              {!isMobile ? (
                <Box className={classes.live_stream_status}>
                  <ESChip
                    color={'primary'}
                    className={classes.statusChip}
                    label={t('live_stream_screen.live_stream_status')}
                    onClick={() => ''}
                  />
                </Box>
              ) : (
                shareButton()
              )}
            </Box>
          )}

          <Box className={classes.wrap_interactive_info}>
            {!detailVideoResult && isLoadingVideoDetail ? (
              <>{renderPreloadButtonReaction()}</>
            ) : (
              detailVideoResult !== '' && (
                <>
                  <Box className={classes.interactive_info}>
                    <ReactionButton iconName={'fa fa-eye'} value={detailVideoResult?.view_count} status={1} />
                    <ReactionButton iconName={'fa fa-thumbs-up'} value={likeCount} onPress={toggleLikeVideo} status={like} />
                    <ReactionButton iconName={'fa fa-thumbs-down'} value={unlikeCount} onPress={toggleUnLikeVideo} status={unlike} />
                    {!isMobile && shareButton()}
                  </Box>
                  {!isMobile && (
                    <Box className={classes.dropDownMenu}>
                      <Typography
                        onClick={() => {
                          setShowReportMenu(true)
                        }}
                        className={classes.three_dot}
                      >
                        <Icon className={`fa fa-ellipsis-v ${classes.icon}`} fontSize="small" />
                      </Typography>
                      {showReportMenu && (
                        <Box className={`${classes.dropDownContent} MuiPaper-elevation8 MuiPaper-rounded`}>
                          <ESMenuItem
                            onClick={() => {
                              setShowReportMenu(false)
                            }}
                          >
                            {t('live_stream_screen.report')}
                          </ESMenuItem>
                        </Box>
                      )}
                    </Box>
                  )}
                </>
              )
            )}
          </Box>
        </Box>
      )}
      {!isMobile && (
        <Box className={classes.wrap_streamer_info}>
          <Box className={classes.streamer_info}>
            <ESAvatar
              className={classes.avatar}
              alt={userProfile?.attributes?.nickname}
              src={userProfile ? userProfile?.attributes?.avatar_url : '/images/avatar.png'}
            />
            <Box className={classes.streamer_data}>
              {userProfile?.attributes?.nickname && <Box className={classes.streamer_name}>{userProfile?.attributes?.nickname}</Box>}
              <Box className={classes.registration}>
                <Typography className={classes.register_person_label}>{t('live_stream_screen.register_person_label')}</Typography>
                <Typography className={classes.register_person_number}>
                  {FormatHelper.japaneseWanFormatter(detailVideoResult?.channel_follow_count && 0)}
                  {t('common.man')}
                </Typography>
              </Box>
            </Box>
          </Box>
          {registerChannelButton()}
        </Box>
      )}
    </Box>
  )
}
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    // justifyContent: 'center',
    // maxWidth: 1100,
    width: '100%',
    flexWrap: 'wrap',
    background: '#000000',
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
    justifyContent: 'flex-end',
    flexDirection: 'column',
    zIndex: 100,
  },
  wrap_info: {
    padding: '16px 0 16px 24px',
    width: '100%',
  },
  wrap_movie_info: {
    display: 'flex',
    width: '100%',
  },
  wrap_title: {
    paddingRight: '110px',
  },
  movie_title: {
    // maxWidth: '254px',
    whiteSpace: 'nowrap',
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
  live_stream_status: {},
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
      justifyContent: 'flex-start',
    },
  },
  statusChip: {
    width: '84px',
    height: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#FFFFFF',
    borderRadius: '2px',
    maxWidth: 'none',
    justifyContent: 'flex-start',
    '& .MuiChip-label': {
      paddingLeft: '6px',
      paddingRight: 0,
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
    ...(props?.isSubscribed === 0 && {
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
    movie_title: {
      fontSize: '12px',
      maxWidth: '200px',
    },
    device_name: {
      fontSize: '8px',
    },
    shareButton: {
      '& button': {
        marginRight: '8px',
        width: '100px',
      },
    },
    wrap_title: {
      paddingRight: 0,
      flex: 1,
    },
    mobileRegisterChannelContainer: {
      backgroundColor: 'black',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: '24px',
      paddingTop: '5px',
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
      width: '24px',
      height: '24px',
      borderRadius: '12px',
    },
    channelName: {
      fontSize: '12px',
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
}))
export default LiveStreamContent
