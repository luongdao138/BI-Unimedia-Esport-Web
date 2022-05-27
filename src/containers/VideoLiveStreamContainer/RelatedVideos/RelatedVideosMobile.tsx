import React, { useCallback, useRef, useState, useEffect } from 'react'
import { Box, IconButton, makeStyles, Typography, ButtonBase, Icon } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import RelatedVideoItem from '@components/RelatedVideoItem'
import { useRelatedVideoContext } from '@containers/VideoLiveStreamContainer/VideoContext/RelatedVideoContext'
import ESAvatar from '@components/Avatar'
import useDetailVideo from '../useDetailVideo'
import { getIsAuthenticated } from '@store/auth/selectors'
import { debounceTime } from '@constants/common.constants'
import { useAppSelector } from '@store/hooks'
import { useRouter } from 'next/router'
import useLiveStreamDetail from '../useLiveStreamDetail'
import { useContextualRouting } from 'next-use-contextual-routing'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { ESRoutes } from '@constants/route.constants'
interface StyleProps {
  showRelatedVideos: boolean
  isSubscribed?: number
}

const useStyles = makeStyles(() => ({
  relatedVideosModal: {
    position: 'fixed',
    zIndex: 150,
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    transition: 'all 0.25s ease-in-out',
    opacity: (props: StyleProps) => (props.showRelatedVideos ? 1 : 0),
    visibility: (props: StyleProps) => (props.showRelatedVideos ? 'visible' : 'hidden'),
  },
  header: {
    position: 'fixed',
    zIndex: 200,
    left: 0,
    right: 0,
    top: 0,
    padding: '0.5rem 0.75rem',
    transition: 'all 0.25s ease-in-out',
    opacity: (props: StyleProps) => (props.showRelatedVideos ? 1 : 0),
    visibility: (props: StyleProps) => (props.showRelatedVideos ? 'visible' : 'hidden'),
    '& h5': {
      fontSize: '16px',
      color: '#fff',
      // textTransform: 'uppercase',
    },
  },
  headerTop: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBottom: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.35rem',
    border: '1px solid #ffffff75',
    borderRadius: '2px',
    marginTop: '0.5rem',
  },
  videosContent: {
    position: 'fixed',
    zIndex: 200,
    left: 0,
    right: 0,
    bottom: 0,
    transition: 'all 0.25s ease-in-out',
    opacity: (props: StyleProps) => (props.showRelatedVideos ? 1 : 0),
    visibility: (props: StyleProps) => (props.showRelatedVideos ? 'visible' : 'hidden'),
    transform: (props: StyleProps) => (props.showRelatedVideos ? 'translateY(0)' : 'translateY(100%)'),
    width: '100%',
    overflowX: 'auto',
    display: 'flex',
    gap: '0.75rem',
    // maxHeight: '160px',
    padding: '0.5rem 0.75rem',
    '&::-webkit-scrollbar': {
      height: 0,
      width: 0,
    },
  },
  streamer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  streamerName: {
    fontSize: '12px',
    color: '#fff',
  },
  streamerAvatar: {},
  register_channel_btn: (props: StyleProps) => ({
    background: props?.isSubscribed === 1 ? Colors.primary : Colors.transparent,
    ...(props?.isSubscribed !== 1 && {
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: Colors.primary,
    }),
    padding: '4px 8px',
    borderRadius: '5px',
    fontSize: '10px',
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    marginLeft: 30,
  }),
  heartIcon: (props: StyleProps) => ({
    color: props?.isSubscribed === 1 ? Colors.white : Colors.primary,
  }),
  subscribeLabel: (props: StyleProps) => ({
    color: props?.isSubscribed === 1 ? Colors.white : Colors.primary,
  }),
}))

interface Props {
  showRelatedVideos: boolean
  handleCloseRelatedVideos: () => void
  video_id?: string | string[]
}

const RelatedVideosMobile: React.FC<Props> = ({ showRelatedVideos, handleCloseRelatedVideos, video_id }) => {
  const { detailVideoResult, userResult } = useDetailVideo()
  const [subscribe, setSubscribe] = useState(userResult?.follow ? userResult?.follow : 0)
  const isSubscribed = () => subscribe
  const classes = useStyles({ showRelatedVideos, isSubscribed: isSubscribed() })
  const observer = useRef(null)
  const { hasMore, handleLoadMore, relatedVideoStreamData, isLoading } = useRelatedVideoContext()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const router = useRouter()
  const { makeContextualHref } = useContextualRouting()
  const { userFollowChannel } = useLiveStreamDetail()
  const { t } = useTranslation('common')

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

  const toggleSubscribeClick = () => {
    const newSubscribe = subscribe === 0 ? 1 : 0

    setSubscribe(newSubscribe)
    if (detailVideoResult?.channel_id) {
      debouncedHandleSubscribe(newSubscribe, detailVideoResult?.channel_id, video_id)
    }
  }

  const goToLogin = () => {
    router.push(makeContextualHref({ pathName: ESRoutes.LOGIN }), ESRoutes.LOGIN, { shallow: true })
  }

  useEffect(() => {
    if (userResult) {
      setSubscribe(userResult?.follow !== subscribe ? userResult?.follow : subscribe)
    }
  }, [userResult])

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return
      if (observer.current) {
        observer.current.disconnect()
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore()
        }
      })

      if (node) {
        observer.current.observe(node)
      }
    },
    [relatedVideoStreamData, isLoading, hasMore]
  )
  return (
    <>
      <Box className={classes.relatedVideosModal}></Box>
      {/* <Box className={classes.relatedVideosContainer}> */}
      <Box className={classes.header}>
        <Box className={classes.headerTop}>
          <Typography variant="h5">{detailVideoResult?.title}</Typography>
          <IconButton onClick={handleCloseRelatedVideos}>
            <Close />
          </IconButton>
        </Box>
        <Box className={classes.headerBottom}>
          <Box className={classes.streamer}>
            <ESAvatar className={classes.streamerAvatar} src={detailVideoResult?.user_avatar} size={30} />
            <Typography variant="body1" className={classes.streamerName}>
              {detailVideoResult?.channel_name}
            </Typography>
          </Box>
          <ButtonBase onClick={isAuthenticated ? toggleSubscribeClick : goToLogin} className={classes.register_channel_btn}>
            <Box display={'flex'} alignItems={'center'}>
              <Icon className={`far fa-heart ${classes.heartIcon}`} fontSize="small" />
            </Box>
            <Box pl={1} className={classes.subscribeLabel}>
              {isSubscribed() ? t('live_stream_screen.channel_registered') : t('live_stream_screen.channel_register')}
            </Box>
          </ButtonBase>
        </Box>
      </Box>
      <Box className={classes.videosContent}>
        {relatedVideoStreamData.map((item, index) =>
          index + 1 === relatedVideoStreamData.length ? (
            <div ref={lastElementRef}>
              <RelatedVideoItem key={item?.id || index} data={item} handleCloseRelatedVideos={handleCloseRelatedVideos} />
            </div>
          ) : (
            <RelatedVideoItem key={item?.id || index} data={item} handleCloseRelatedVideos={handleCloseRelatedVideos} />
          )
        )}
      </Box>
    </>
  )
}

export default RelatedVideosMobile
