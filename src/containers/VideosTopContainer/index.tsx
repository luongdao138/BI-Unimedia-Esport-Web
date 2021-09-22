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
  const { t } = useTranslation('common')
  const classes = useStyles()
  const [tab, setTab] = useState(0)
  const [follow, setFollow] = useState(0)
  const { bannerTop, listBanner } = useListVideoAll()
  const theme = useTheme()
  const isWideScreen = useMediaQuery(theme.breakpoints.up(1920))
  const { width: listDisplayWidth } = useWindowDimensions(244)

  useEffect(() => {
    setTab(0)
    bannerTop()
    setFollow(0)
  }, [])
  const getTabs = () => {
    return (
      <Grid item xs={12} className={classes.tabsContainer}>
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

  const calculateVideoItemStyle = (): any => {
    if (!isWideScreen) {
      return {}
    }
    const numOfDisplayItem = Math.floor(listDisplayWidth / 465)
    const calcWidth = Math.floor(listDisplayWidth / numOfDisplayItem)
    return {
      maxWidth: Math.max(450, calcWidth),
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
  //   const dt = [{ "id": 1, "title": "banner 1", "image": "https://3.bp.blogspot.com/-VbzRbUQEvLw/VsaD4AS4O9I/AAAAAAAAACA/mGU1pPx3BAI/s1600/giai-ma-cac-con-so-trong-chiem-tinh-phuong-tay%2B%25281%2529.jpg", "url": "https://exelab.jp/", "target": "_blank" },
  //   { "id": 4, "title": "banner 4", "image": "https://png.pngtree.com/png-clipart/20200309/ourlarge/pngtree-gold-number-2-png-image_2158838.jpg", "url": "https://exelab.jp/", "target": "_blank" },
  //   { "id": 5, "title": "banner 5", "image": "https://tarotvnnews.com/wp-content/uploads/2019/03/than-so-hoc-so-3-va-y-nghia.jpg", "url": "https://exelab.jp/", "target": "_blank" },
  //   { "id": 6, "title": "banner 6", "image": "https://tarotvnnews.com/wp-content/uploads/2019/03/than-so-hoc-so-4-va-y-nghia.jpg", "url": "https://exelab.jp/", "target": "_blank" },
  //   { "id": 17, "title": "banner 7", "image": "https://gombattrangdoanquang.com/wp-content/uploads/2021/01/so-5-la-bieu-tuong-cho-quyen-luc.jpg", "url": "https://exelab.jp/", "target": "_blank" },
  //   { "id": 3, "title": "banner 3", "image": "https://alokiddy.com.vn/Uploads/images/BAI%20TEST%20DINH%20KY/FLYERS/tranh-06.jpg", "url": "https://exelab.jp/", "target": "_blank" },
  // ]
  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        {/* //listBanner */}
        <Box className={classes.bannerContainer}>{listBanner.length > 0 && <BannerCarousel data={listBanner} />}</Box>
        {/* <Box className={classes.bannerContainer}>{dt.length > 0 && <BannerCarousel data={dt} />}</Box> */}
      </Box>
      <Grid container direction="column">
        {getTabs()}
        <Box className={classes.tabContent}>{getContent()}</Box>
      </Grid>
    </Box>
  )
}
export default VideosTop

const useStyles = makeStyles((theme) => ({
  tabsContainer: {
    paddingRight: 122,
  },
  tabContent: {
    padding: '0 122px 0 24px',
  },
  container: {
    width: '100%',
    padding: '0 122px 0 24px',
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#212121',
    paddingBottom: 100,
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
    },
    tabContent: {
      paddingRight: '24px',
    },
    container: {
      paddingRight: '24px',
    },
  },
  [theme.breakpoints.down(1281)]: {
    bannerContainer: {
      width: '100%',
    },
  },
  [theme.breakpoints.down(769)]: {
    tabContent: {
      paddingRight: 0,
    },
  },
  [theme.breakpoints.down(415)]: {
    tabMin: {
      minWidth: 56,
      marginRight: '12px',
    },
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
