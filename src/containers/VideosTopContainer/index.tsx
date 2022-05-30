import ESTab from '@components/Tab'
import ESTabs from '@components/Tabs'
import i18n from '@locales/i18n'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ArchivedVideos from './ArchivedVideos'
import FavoriteVideos from './FavoriteVideos'
import LiveStreamVideos from './LiveStreamVideos'
import ScheduleVideos from './ScheduleVideos'
import VideosList from './VideosList'
import BannerCarousel from './BannerCarousel'
import useListVideoAll from './VideosList/useListVideoAll'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
// import { useAppSelector } from '@store/hooks'
// import { getIsAuthenticated } from '@store/auth/selectors'
// import LoginRequired from '@containers/LoginRequired'
import { useAppSelector } from '@store/hooks'
import { getIsAuthenticated } from '@store/auth/selectors'
import router, { useRouter } from 'next/router'
import { useContextualRouting } from 'next-use-contextual-routing'
import { ESRoutes } from '@constants/route.constants'
import { parseInt } from 'lodash'

enum TABS {
  VIDEOS_LIST = 0,
  LIVE_VIDEOS = 1,
  SCHEDULE_VIDEOS = 2,
  ARCHIVED_VIDEOS = 3,
  FAVORITE_VIDEOS = 4,
}

export const TabsVideo = {
  VIDEOS_LIST: 0,
  LIVE_VIDEOS: 1,
  SCHEDULE_VIDEOS: 2,
  ARCHIVED_VIDEOS: 3,
  FAVORITE_VIDEOS: 4,
}

const VideosTop: React.FC = () => {
  const _router = useRouter()
  const { t } = useTranslation('common')
  const classes = useStyles()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const [tab, setTab] = useState(_router?.query?.default_tab ? parseInt(_router?.query?.default_tab.toString()) : 0)
  const [follow, setFollow] = useState(0)
  const { bannerTop, listBanner } = useListVideoAll()
  const theme = useTheme()
  const isWideScreen = useMediaQuery(theme.breakpoints.up(1920))
  // const { width: listDisplayWidth } = useWindowDimensions(146)
  const { width: listDisplayWidth } = useWindowDimensions(98)
  const { makeContextualHref } = useContextualRouting()
  const defaultTab = _router?.query?.default_tab || '0'

  useEffect(() => {
    // setTab(parseInt(defaultTab.toString(), 10) ?? 0)
    bannerTop()
    setFollow(0)
    document.body.style.overflow = 'overlay'
  }, [])

  useEffect(() => {
    setTab(parseInt(defaultTab.toString()))
  }, [_router])

  const handleFocusTab = (_, tab) => {
    if (tab === TabsVideo.FAVORITE_VIDEOS) {
      // eslint-disable-next-line no-console
      console.log('backToTopVideo::direct::3')
      // eslint-disable-next-line no-console
      console.log('isAuthenticated', isAuthenticated)
      isAuthenticated
        ? _router.replace({ pathname: ESRoutes.VIDEO_TOP, query: { default_tab: tab } }, ESRoutes.VIDEO_TOP)
        : router.push(makeContextualHref({ pathName: ESRoutes.LOGIN, favoriteTabClick: true }), ESRoutes.LOGIN, {
            shallow: true,
          })
    } else {
      // setTab(tab)
      // eslint-disable-next-line no-console
      console.log('backToTopVideo::direct::3')
      _router.replace({ pathname: ESRoutes.VIDEO_TOP, query: { default_tab: tab } }, ESRoutes.VIDEO_TOP)
    }
  }

  const getTabs = () => {
    return (
      <Grid item xs={12} className={classes.tabsContainer}>
        <ESTabs value={tab} onChange={handleFocusTab} className={classes.tabs} scrollButtons="off" variant="scrollable">
          <ESTab className={classes.tabMin} label={t('videos_top_tab.video_list')} value={0} />
          <ESTab className={classes.tabMin} label={t('videos_top_tab.live_stream_video')} value={1} />
          <ESTab className={classes.tabMin} label={t('videos_top_tab.schedule_stream_video')} value={2} />
          <ESTab className={classes.tabMin} label={t('videos_top_tab.archived_stream_video')} value={3} />
          <ESTab className={classes.tabMin} label={t('videos_top_tab.favorite_video')} value={4} />
        </ESTabs>
      </Grid>
    )
  }

  const calculateVideoItemStyle = (): any => {
    if (!isWideScreen) {
      return {}
    }
    const numOfDisplayItem = Math.floor(listDisplayWidth / 350)
    const calcWidth = Math.floor(listDisplayWidth / numOfDisplayItem)

    return {
      maxWidth: calcWidth,
    }
  }

  const getContent = () => {
    switch (tab) {
      case TABS.VIDEOS_LIST:
        return <VideosList setTab={setTab} videoItemStyle={calculateVideoItemStyle()} />
      case TABS.LIVE_VIDEOS:
        return <LiveStreamVideos follow={follow} setFollow={setFollow} videoItemStyle={calculateVideoItemStyle()} />
      case TABS.SCHEDULE_VIDEOS:
        return <ScheduleVideos follow={follow} setFollow={setFollow} videoItemStyle={calculateVideoItemStyle()} />
      case TABS.ARCHIVED_VIDEOS:
        return <ArchivedVideos follow={follow} setFollow={setFollow} videoItemStyle={calculateVideoItemStyle()} />
      case TABS.FAVORITE_VIDEOS:
        return <FavoriteVideos setTab={setTab} setFollow={setFollow} videoItemStyle={calculateVideoItemStyle()} />
      default:
        break
    }
    return (
      <Box className={classes.forbiddenMessageContainer}>
        <Typography variant="h3">{i18n.t('common:common:private')}</Typography>
      </Box>
    )
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.bannerContainer}>{listBanner.length > 0 && <BannerCarousel data={listBanner} />}</Box>
      </Box>
      <Box className={classes.contents}>
        <Grid container direction="column" className={classes.contentContainer}>
          {getTabs()}
          <Box className={classes.tabContent}>{getContent()}</Box>
        </Grid>
      </Box>
    </Box>
  )
}
export default VideosTop

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#212121',
  },
  container: {
    display: 'flex',
    width: '100%',
    padding: '0 74px 0 74px',
    justifyContent: 'center',
  },
  contents: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  tabsContainer: {
    display: 'flex',
    width: '100%',
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  tabs: {
    display: 'flex',
    overflowY: 'hidden',
    paddingLeft: 24,
  },
  contentContainer: {
    // flexWrap: 'unset',
    flexWrap: 'wrap',
  },
  tabContent: {
    padding: '0 24px 8px 24px',
  },

  forbiddenMessageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: '#212121',
  },
  bannerContainer: {
    position: 'relative',
    width: 1100,
    // height: 366,
    marginTop: 37,
    marginBottom: 24,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  [theme.breakpoints.down(1401)]: {
    tabsContainer: {
      paddingRight: '24px',
      paddingLeft: '24px',
    },
    tabContent: {
      paddingRight: '24px',
    },
    container: {
      paddingRight: '24px',
      paddingLeft: '24px',
    },
    tabs: {
      overflowY: 'hidden',
    },
  },
  [theme.breakpoints.down(1281)]: {
    bannerContainer: {
      width: '100%',
    },
  },
  [theme.breakpoints.down(769)]: {
    tabContent: {
      // paddingRight: 0,
    },
    tabs: {
      display: 'flex',
      paddingLeft: 0,
    },
    tabMin: {
      display: 'flex',
      minWidth: 720 / 5,
    },
  },
  [theme.breakpoints.down(549)]: {
    tabsContainer: {
      display: 'flex',
      paddingLeft: 24,
      paddingRight: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabContent: {
      paddingRight: '0px',
    },
    tabs: {
      display: 'flex',
      paddingLeft: 0,
    },
    tabMin: {
      display: 'flex',
      minWidth: 'calc((100vw - 48px) / 5)',
    },
  },
  [theme.breakpoints.down(419)]: {
    tabsContainer: {
      display: 'flex',
      paddingLeft: 0,
      paddingRight: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabContent: {
      paddingRight: '0px',
    },
    tabs: {
      display: 'flex',
      paddingLeft: 0,
    },
    tabMin: {
      display: 'flex',
      minWidth: 56,
    },
    bannerContainer: {
      marginTop: 0,
    },
  },
  [theme.breakpoints.down(375)]: {
    tabsContainer: {
      display: 'flex',
      paddingLeft: 0,
      paddingRight: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabContent: {
      paddingRight: '0px',
    },
    tabs: {
      display: 'flex',
      paddingLeft: 0,
    },
    tabMin: {
      '& .MuiTab-wrapper': {
        fontSize: 12,
      },
    },
  },
}))
