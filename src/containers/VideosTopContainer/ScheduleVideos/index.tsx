import { Box, Typography, Theme, makeStyles, Grid } from '@material-ui/core'
import TitleSeeMore from '../TitleSeeMore'
import VideoPreviewItem from '../VideoPreviewItem'
import i18n from '@locales/i18n'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import useScheduleVideos from './useScheduleVideos'
import { TypeVideo } from '@services/videoTop.services'
import React, { useEffect } from 'react'
import ESLoader from '@components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'

const ScheduleVideos: React.FC = () => {
  const page = 2
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const { loadMore, listScheduleVideo, meta } = useScheduleVideos()

  const classes = useStyles()
  const renderLiveItem = (item: TypeVideo, index: number) => {
    return (
      <>
        {downMd ? (
          <Box className={classes.xsItemContainer} key={index}>
            <VideoPreviewItem data={item} key={item.id} />
          </Box>
        ) : (
          <Grid item xs={6} className={classes.itemContainer} key={index}>
            <VideoPreviewItem data={item} key={item.id} />
          </Grid>
        )}
      </>
    )
  }

  useEffect(() => {
    loadMore(page)
  }, [])

  return (
    <Box className={classes.container}>
      <Box className={classes.titleContainer}>
        <TitleSeeMore titleText={i18n.t('common:videos_top_tab.title_schedule_videos')} />
      </Box>
      <Box className={classes.wrapContentContainer}>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={listScheduleVideo.length}
          next={() => {
            loadMore(page + 1)
          }}
          hasMore={true}
          loader={null}
          scrollThreshold={0.8}
          style={{ overflow: 'hidden' }}
        >
          {listScheduleVideo.length > 0 ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {listScheduleVideo.map(renderLiveItem)}
            </Grid>
          ) : (
            <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
              <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
            </Box>
          )}
        </InfiniteScroll>
      </Box>
      {meta.pending && (
        <Grid item xs={12}>
          <Box my={4} display="flex" justifyContent="center" alignItems="center">
            <ESLoader />
          </Box>
        </Grid>
      )}
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
  titleContainer: {},
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
  wrapVideos: {},
  wrapContentContainer: {
    overflow: 'hidden'
  },
  spViewMore: {
    display: 'none',
  },
  [theme.breakpoints.up(960)]: {
    itemContainer: {
      flexGrow: "0", 
      maxWidth: "33.333333%", 
      flexBasis: "33.333333%"
    },
  },
  [theme.breakpoints.up(1680)]: {
    itemContainer: {
      flexGrow: "0", 
      maxWidth: "25%", 
      flexBasis: "25%", 
    },
  },
  [theme.breakpoints.up(1920)]: {
    itemContainer: {
      flexGrow: "0", 
      maxWidth: "25%", 
      flexBasis: "25%", 
    },
  },
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden'
  },
  [theme.breakpoints.down(769)]: {
    wrapContentContainer: {
      width: 'calc(100vw - 24px)',
      overflow: 'auto',
    },
    contentContainer: {
      flexWrap: 'nowrap',
      margin: '0px',
      paddingBottom: '0px',
      overflow: 'auto'
    },
    xsItemContainer: {
      paddingRight: '24px',
      '&:last-child': {
        paddingRight: 0,
      },
    },
    titleContainer: {
      paddingBottom: 12,
    },
    spViewMore: {
      display: 'block',
      padding: '15px 0 26px 0',
      textAlign: 'center',
    },
  },
}))
export default ScheduleVideos
