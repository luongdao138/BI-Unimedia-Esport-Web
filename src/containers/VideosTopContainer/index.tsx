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
  const dataBanner = [
    // { id: 0, url: '/images/banners/banner_01.png', target: 'image_01' },
    // { id: 1, url: '/images/banners/banner_02.png', target: 'image_02' },
    { id: 2, url: '/images/banners/banner_03.png', target: 'image_03' },
    { id: 3, url: '/images/banners/banner_04.png', target: 'image_04' },
    { id: 4, url: '/images/banners/banner_05.png', target: 'image_05' },
    { id: 5, url: 'https://i.pinimg.com/564x/16/c7/44/16c744a2c5187694bfb9f2d220dc4f16.jpg', target: 'image_06' },
    { id: 6, url: 'https://i.pinimg.com/236x/c4/7e/52/c47e523f07996bd610f1e1ecfa842ebb.jpg', target: 'image_07' },
    { id: 7, url: 'https://i.pinimg.com/564x/09/b5/27/09b52762cc9d8aee221ebb6a062dee98.jpg', target: 'image_08' },
    { id: 8, url: 'https://i.pinimg.com/564x/b1/1e/0c/b11e0cbe33201bac50a28b214bb459bf.jpg', target: 'image_09' },
  ]
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const { bannerTop } = useListVideoAll()
  useEffect(() => {
    setTab(0)
    bannerTop()
  }, [])
  const getTabs = () => {
    return (
      <Grid item xs={12}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          <ESTab className={classes.tabMin} label={t('videos_top_tab.video_list')} value={0} />
          <ESTab className={classes.tabMin} label={t('videos_top_tab.live_stream_video')} value={1} />
          <ESTab className={classes.tabMin} label={t('videos_top_tab.schedule_stream_video')} value={2} />
          <ESTab className={classes.tabMin} label={t('videos_top_tab.archived_stream_video')} value={3} />
          <ESTab className={classes.tabMin} label={t('videos_top_tab.favorite_video')} value={4} />
        </ESTabs>
      </Grid>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.VIDEOS_LIST:
        return <VideosList setTab={setTab} />
      case TABS.LIVE_VIDEOS:
        return <LiveStreamVideos />
      case TABS.SCHEDULE_VIDEOS:
        return <ScheduleVideos />
      case TABS.ARCHIVED_VIDEOS:
        return <ArchivedVideos />
      case TABS.FAVORITE_VIDEOS:
        return <FavoriteVideos setTab={setTab} />
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
      <Box className={classes.bannerContainer}>
        <BannerCarousel data={dataBanner} />
      </Box>
      <Grid container direction="column">
        {getTabs()}
        {getContent()}
      </Grid>
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
    padding: '0 122px 100px 24px',
  },
  tabs: {
    overflow: 'hidden',
    borderBottomColor: Colors.text[300],
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  tabMin: {
    minWidth: 56,
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
    root: {
      paddingRight: '24px',
    },
  },
  [theme.breakpoints.down(1281)]: {
    bannerContainer: {
      width: '100%',
    },
  },
  [theme.breakpoints.down(415)]: {
    bannerContainer: {
      marginTop: 0,
    },
  },
  [theme.breakpoints.down(375)]: {
    tabs: {
      paddingLeft: 0,
    },
    tabMin: {
      '& .MuiTab-wrapper': {
        fontSize: 12,
      },
    },
  },
}))
