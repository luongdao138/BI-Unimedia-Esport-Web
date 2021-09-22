import { Box, Typography, Theme, makeStyles, Grid } from '@material-ui/core'
import TitleSeeMore from '../TitleSeeMore'
import VideoPreviewItem from '../VideoPreviewItem'
import i18n from '@locales/i18n'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import useScheduleVideos from './useScheduleVideos'
import { LIMIT_ITEM, TypeVideo, TYPE_VIDEO_TOP } from '@services/videoTop.services'
import React, { useEffect, useState } from 'react'
import ESLoader from '@components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import PreLoadContainer from '../PreLoadContainer'

interface Props {
  follow?: number
  setFollow?: (value: number) => void
  videoItemStyle?: any
}

const ScheduleVideos: React.FC<Props> = ({ follow, setFollow, videoItemStyle }) => {
  const classes = useStyles()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const { listScheduleVideo, meta, resetScheduleVideos, getListVideoTop } = useScheduleVideos()
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState(true)

  const renderLiveItem = (item: TypeVideo, index: number) => {
    return (
      <React.Fragment key={item?.id || index}>
        {downMd ? (
          <Box className={classes.xsItemContainer}>
            <VideoPreviewItem data={item} />
          </Box>
        ) : (
          <Grid item xs={6} className={classes.itemContainer} style={videoItemStyle}>
            <VideoPreviewItem data={item} />
          </Grid>
        )}
      </React.Fragment>
    )
  }
  useEffect(() => {
    if (listScheduleVideo.length === 0) {
      getListVideoTop({ type: TYPE_VIDEO_TOP.SCHEDULE, page: page, limit: LIMIT_ITEM, follow: follow })
    }
    return () => {
      setPage(1)
      resetScheduleVideos()
      setFollow(0)
    }
  }, [follow])

  useEffect(() => {
    if (page > 1) getListVideoTop({ type: TYPE_VIDEO_TOP.SCHEDULE, page: page, limit: LIMIT_ITEM, follow: follow })
  }, [page])

  const handleLoadMore = async () => {
    if (listScheduleVideo.length > 0 && listScheduleVideo.length < LIMIT_ITEM * page) {
      setHasMore(false)
      return
    }
    if (listScheduleVideo.length > 0 && listScheduleVideo.length == LIMIT_ITEM * page) {
      await setPage(page + 1)
    }
  }

  const renderPreLoad = () => {
    const arrayPreLoad = Array(9)
      .fill('')
      .map((_, i) => ({ i }))
    return arrayPreLoad.map((_item: any, index: number) =>
      downMd ? (
        <Box className={classes.xsItemContainer} key={index}>
          <Box className={classes.wrapPreLoadContainer}>
            <PreLoadContainer />
          </Box>
        </Box>
      ) : (
        <Grid item xs={6} className={classes.itemContainer} style={videoItemStyle} key={index}>
          <PreLoadContainer />
        </Grid>
      )
    )
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.titleContainer}>
        <TitleSeeMore titleText={i18n.t('common:videos_top_tab.title_schedule_videos')} />
      </Box>
      <Box className={classes.wrapContentContainer}>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={listScheduleVideo.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={null}
          scrollThreshold={0.8}
          style={{ overflow: 'hidden' }}
        >
          {listScheduleVideo.length > 0 ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {listScheduleVideo.map(renderLiveItem)}
            </Grid>
          ) : listScheduleVideo.length === 0 && meta.pending ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {renderPreLoad()}
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
    overflow: 'hidden',
  },
  spViewMore: {
    display: 'none',
  },
  [theme.breakpoints.up(960)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '33.333333%',
      flexBasis: '33.333333%',
    },
  },
  [theme.breakpoints.up(1920)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '465px',
      flexBasis: '25%',
    },
  },
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
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
      overflow: 'auto',
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
