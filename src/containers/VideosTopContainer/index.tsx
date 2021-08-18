import ESSlider from '@components/Slider'
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
import BannerItems from './BannerItems'

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
  const data = [
    {
      id: 1,
      image: '/images/dataVideoFake/banner_01.png',
    },
    {
      id: 2,
      image: '/images/dataVideoFake/banner_02.png',
    },
    {
      id: 3,
      image: '/images/dataVideoFake/banner_03.png',
    },
    {
      id: 4,
      image: '/images/dataVideoFake/banner_04.png',
    },
    {
      id: 5,
      image: '/images/dataVideoFake/banner_05.png',
    },
  ]
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  useEffect(() => {
    setTab(0)
  }, [])
  const getTabs = () => {
    return (
      <Grid item xs={12}>
        <ESTabs value={tab} onChange={(_, v) => setTab(v)} className={classes.tabs}>
          <ESTab label={t('videos_top_tab.video_list')} value={0} />
          <ESTab label={t('videos_top_tab.live_stream_video')} value={1} />
          <ESTab label={t('videos_top_tab.schedule_stream_video')} value={2} />
          <ESTab label={t('videos_top_tab.archived_stream_video')} value={3} />
          <ESTab label={t('videos_top_tab.favorite_video')} value={4} />
        </ESTabs>
      </Grid>
    )
  }
  const getContent = () => {
    switch (tab) {
      case TABS.VIDEOS_LIST:
        return <VideosList setTab={setTab} />
        break
      case TABS.LIVE_VIDEOS:
        return <LiveStreamVideos />
      case TABS.SCHEDULE_VIDEOS:
        return <ScheduleVideos />
      case TABS.ARCHIVED_VIDEOS:
        return <ArchivedVideos />
      case TABS.FAVORITE_VIDEOS:
        return <FavoriteVideos setTab={setTab} />
        break
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
      <Box>
        <ESSlider
          smallSliderButton
          navigation
          items={data.map((item, i) => (
            <BannerItems key={i} image={item.image} />
          ))}
        />
      </Box>
      <Grid container direction="column">
        {getTabs()}
        {getContent()}
      </Grid>
    </Box>
  )
}
export default VideosTop

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#212121',
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
}))
