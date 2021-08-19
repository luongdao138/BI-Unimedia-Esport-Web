import { Box, Theme, makeStyles, Grid, Typography } from '@material-ui/core'
import i18n from '@locales/i18n'
import VideoPreviewItem from '../VideoPreviewItem'
import TitleSeeMore from '../TitleSeeMore'
import { TabsVideo } from '../index'
import TitleFavorite from '../TitleFavorite'

export type VideoPreviewProps = {
  id: number
  type: string
  title: string
  iconStreamer: string
  thumbnailLive: string
  thumbnailStreamer: string
  thumbnailVideo: string
  nameStreamer: string
  waitingNumber?: number
  category: string
  scheduleTime?: string
}
type VideoListProps = {
  setTab: (value: number) => void
}
const VideosList: React.FC<VideoListProps> = ({ setTab }) => {
  const dataLiveVideo = Array(6)
    .fill('')
    .map((_, i) => ({
      id: i,
      type: 'live',
      title: `ムービータイトルムービータイトル ...`,
      iconStreamer: '/images/dataVideoFake/fake_avatar.png',
      thumbnailLive: '/images/dataVideoFake/thumbnailLive.png',
      thumbnailStreamer: '/images/dataVideoFake/banner_01.png',
      thumbnailVideo: '/images/dataVideoFake/banner_04.png',
      nameStreamer: 'だみだみだみだみ',
      waitingNumber: 1500,
      category: 'Valorant',
    }))
  const dataScheduleVideo = Array(6)
    .fill('')
    .map((_, i) => ({
      id: i,
      type: 'schedule',
      title: `ムービータイトルムービータイトル ...`,
      scheduleTime: '2021年8月24日19時～配信予定',
      iconStreamer: '/images/dataVideoFake/fake_avatar.png',
      thumbnailLive: '/images/dataVideoFake/thumbnailLive.png',
      thumbnailStreamer: '/images/dataVideoFake/banner_01.png',
      thumbnailVideo: '/images/dataVideoFake/banner_02.png',
      nameStreamer: 'だみだみだみだみ',
      waitingNumber: 1500,
      category: 'Apex Legends',
    }))
  const dataArchiveVideo = Array(6)
    .fill('')
    .map((_, i) => ({
      id: i,
      type: 'archive',
      title: `ムービータイトルムービータイトル ...`,
      scheduleTime: '2021年8月24日19時～配信予定',
      iconStreamer: '/images/dataVideoFake/fake_avatar.png',
      thumbnailLive: '/images/dataVideoFake/thumbnailLive.png',
      thumbnailStreamer: '/images/dataVideoFake/banner_01.png',
      thumbnailVideo: '/images/dataVideoFake/banner_04.png',
      nameStreamer: 'だみだみだみだみ',
      // waitingNumber: 1500,
      category: 'Valorant',
    }))
  const classes = useStyles()
  const renderLiveItem = (item: VideoPreviewProps, index: number) => {
    return (
      <Grid item xs={4} className={classes.itemContainer} key={index}>
        <VideoPreviewItem data={item} key={item.id} />
      </Grid>
    )
  }
  const onClickSeeMoreLiveStream = () => {
    setTab(TabsVideo.LIVE_VIDEOS)
  }
  const onClickSeeMoreSchedule = () => {
    setTab(TabsVideo.SCHEDULE_VIDEOS)
  }
  const onClickSeeMoreArchive = () => {
    setTab(TabsVideo.ARCHIVED_VIDEOS)
  }
  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_live_videos')}
            rightText={dataLiveVideo.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreLiveStream}
          />
        </Box>
        <Grid container spacing={3} className={classes.contentContainer}>
          {dataLiveVideo.length > 0 ? (
            dataLiveVideo.map(renderLiveItem)
          ) : (
            <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
              <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
            </Box>
          )}
        </Grid>
        <Box paddingTop={2} />
        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_schedule_videos')}
            rightText={dataScheduleVideo.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreSchedule}
          />
        </Box>
        <Grid container spacing={3} className={classes.contentContainer}>
          {dataScheduleVideo.length > 0 ? (
            dataScheduleVideo.map(renderLiveItem)
          ) : (
            <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
              <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
            </Box>
          )}
        </Grid>
        <Box paddingTop={2} />
        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_archived_videos')}
            rightText={dataArchiveVideo.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreArchive}
          />
        </Box>
        <Grid container spacing={3} className={classes.contentContainer}>
          {dataArchiveVideo.length > 0 ? (
            dataArchiveVideo.map(renderLiveItem)
          ) : (
            <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
              <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
            </Box>
          )}
        </Grid>
        <Box className={classes.popularCategoryTitle}>
          <Typography className={classes.popularText}> {i18n.t('common:videos_top_tab.popular_category')} </Typography>
        </Box>
        <Box className={classes.titleContainer}>
          <TitleFavorite titleText={'Apex Legends'} iconSource={'/images/big_logo.png'} />
        </Box>
        <Grid container spacing={3} className={classes.contentContainer}>
          {dataLiveVideo.length > 0 ? (
            dataLiveVideo.slice(0, 3).map(renderLiveItem)
          ) : (
            <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
              <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
            </Box>
          )}
        </Grid>
        <Box paddingTop={3} />
        <Box className={classes.titleContainer}>
          <TitleFavorite titleText={'Legend of League'} iconSource={'/images/big_logo.png'} />
        </Box>
        <Grid container spacing={3} className={classes.contentContainer}>
          {dataLiveVideo.length > 0 ? (
            dataLiveVideo.slice(0, 3).map(renderLiveItem)
          ) : (
            <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
              <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
            </Box>
          )}
        </Grid>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 45,
    paddingLeft: theme.spacing(3),
  },
  content: {
    width: '100%',
  },
  titleContainer: {
    paddingRight: theme.spacing(3),
  },
  contentContainer: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  itemContainer: {
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  viewMoreContainer: {
    display: 'flex',
    paddingLeft: 32,
    height: '100%',
  },
  viewMoreStyle: {
    color: '#707070',
  },
  popularCategoryTitle: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(7),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  popularText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
}))
export default VideosList
