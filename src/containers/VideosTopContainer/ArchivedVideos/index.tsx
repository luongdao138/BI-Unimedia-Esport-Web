import { Box, Typography, Theme, makeStyles, Grid } from '@material-ui/core'
import TitleSeeMore from '../TitleSeeMore'
import VideoPreviewItem from '../VideoPreviewItem'
import i18n from '@locales/i18n'
import { VideoPreviewProps } from '../VideosList'

const ArchivedVideos: React.FC = () => {
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
  const renderLiveItem = (item: VideoPreviewProps) => {
    return (
      <Grid item xs={4} className={classes.itemContainer}>
        <VideoPreviewItem data={item} key={item.id} />
      </Grid>
    )
  }
  return (
    <Box className={classes.container}>
      <Box className={classes.titleContainer}>
        <TitleSeeMore titleText={i18n.t('common:videos_top_tab.title_archived_videos')} />
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
export default ArchivedVideos
