import { Box, Typography, Theme, makeStyles, Grid } from '@material-ui/core'
import TitleSeeMore from '../TitleSeeMore'
import VideoPreviewItem from '../VideoPreviewItem'
import i18n from '@locales/i18n'
import { VideoPreviewProps } from '../VideosList'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

const ScheduleVideos: React.FC = () => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
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
  const classes = useStyles()
  const renderLiveItem = (item: VideoPreviewProps, index: number) => {
    return (
      <>
        {downMd ? (
          <Box className={classes.xsItemContainer} key={index}>
            <VideoPreviewItem data={item} key={item.id} />
          </Box>
        ) : (
          <Grid item xs={6} lg={6} xl={4} className={classes.itemContainer} key={index}>
            <VideoPreviewItem data={item} key={item.id} />
          </Grid>
        )
      }
      </>
    )
  }
  return (
    <Box className={classes.container}>
      <Box className={classes.titleContainer}>
        <TitleSeeMore titleText={i18n.t('common:videos_top_tab.title_schedule_videos')} />
      </Box>
      <Box className={classes.wrapContentContainer}>
        <Grid container spacing={3} className={classes.contentContainer}>
          {dataScheduleVideo.length > 0 ? (
            dataScheduleVideo.map(renderLiveItem)
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
  },
  content: {
    width: '100%',
  },
  titleContainer: {
  },
  contentContainer: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
    display: 'flex',
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
  wrapVideos: {
  },
  wrapContentContainer: {
  },
  spViewMore: {
    display: 'none',
  },
  [theme.breakpoints.down(769)]: {
    wrapContentContainer: {
      width: "calc(100vw - 24px)", 
      overflow: "auto"
    },
    contentContainer: {
      flexWrap: "nowrap",
      margin: "0px",
      paddingBottom: "0px"
    },
    xsItemContainer: {
      paddingRight: "24px",
      '&:last-child': {
        paddingRight: 0,
      },
    },
    titleContainer: {
      paddingBottom: 12,
    },
    spViewMore: {
      display: 'block',
      padding: "15px 0 26px 0", 
      textAlign: "center"
    },
  },
}))
export default ScheduleVideos
