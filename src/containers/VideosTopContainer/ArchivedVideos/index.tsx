import { Box, Typography, Theme, makeStyles, Grid } from '@material-ui/core'
import TitleSeeMore from '../TitleSeeMore'
import VideoPreviewItem from '../VideoPreviewItem'
import i18n from '@locales/i18n'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import useArchivedVideos from './useArchivedVideos'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
// import ESLoader from '@components/Loader'
import { TypeVideo, TYPE_VIDEO_TOP } from '@services/videoTop.services'
import PreLoadContainer from '../PreLoadContainer'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'

interface Props {
  follow?: number
  setFollow?: (value: number) => void
  videoItemStyle: any
}

const LIMIT_ITEM = 14
const ArchivedVideos: React.FC<Props> = ({ follow, setFollow, videoItemStyle }) => {
  const classes = useStyles()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(650))
  const { listArchivedVideo, meta, getListVideoTop, resetArchiveVideos } = useArchivedVideos()
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState(true)
  const { width: itemWidthDownMdScreen } = useWindowDimensions(48)

  useEffect(() => {
    if (listArchivedVideo.length === 0) {
      getListVideoTop({ type: TYPE_VIDEO_TOP.ARCHIVE, page: page, limit: LIMIT_ITEM, follow: follow })
    }
    return () => {
      setPage(1)
      resetArchiveVideos()
      setFollow(0)
    }
  }, [follow])

  useEffect(() => {
    if (page > 1) {
      getListVideoTop({ type: TYPE_VIDEO_TOP.ARCHIVE, page: page, limit: LIMIT_ITEM, follow: follow })
    }
  }, [page])

  const handleLoadMore = async () => {
    if (listArchivedVideo.length > 0 && listArchivedVideo.length < LIMIT_ITEM * page) {
      setHasMore(false)
      return
    }
    if (listArchivedVideo.length > 0 && listArchivedVideo.length == LIMIT_ITEM * page) {
      await setPage(page + 1)
    }
  }

  const renderLiveItem = (item: TypeVideo, index: number) => {
    return (
      <React.Fragment key={item?.id || index}>
        {downMd ? (
          <Box className={classes.xsItemContainer}>
            <VideoPreviewItem data={item} containerStyle={{ width: itemWidthDownMdScreen }} />
          </Box>
        ) : (
          <Grid item xs={6} lg={6} xl={4} className={classes.itemContainer} style={videoItemStyle}>
            <VideoPreviewItem data={item} />
          </Grid>
        )}
      </React.Fragment>
    )
  }

  const listLimitData = () => {
    const screenWidth = itemWidthDownMdScreen + 48
    if (screenWidth > 2548) return 21
    if (screenWidth > 2198) return 18
    if (screenWidth > 1599) return 15
    if (screenWidth > 1299) return 12
    return 9
  }

  const renderPreLoad = () => {
    const arrayPreLoad = Array(listLimitData())
      .fill('')
      .map((_, i) => ({ i }))
    return arrayPreLoad.map((_item: any, index: number) =>
      downMd ? (
        <Box className={classes.xsItemContainer} key={index}>
          <Box className={classes.wrapPreLoadContainer} style={{ width: itemWidthDownMdScreen }}>
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
        <TitleSeeMore titleText={i18n.t('common:videos_top_tab.title_archived_videos')} />
      </Box>
      <Box className={classes.wrapContentContainer}>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={listArchivedVideo.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={null}
          scrollThreshold={0.8}
          style={{ overflow: 'hidden' }}
        >
          {listArchivedVideo.length > 0 ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {listArchivedVideo.map(renderLiveItem)}
            </Grid>
          ) : listArchivedVideo.length === 0 && meta.pending ? (
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
      {/* {meta.pending && (
        <Grid item xs={12}>
          <Box my={4} display="flex" justifyContent="center" alignItems="center">
            <ESLoader />
          </Box>
        </Grid>
      )} */}
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
    marginLeft: '-16px',
  },
  wrapContentContainer: {
    overflow: 'hidden',
  },
  spViewMore: {
    display: 'none',
  },
  [theme.breakpoints.up(650)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '50%',
      flexBasis: '50%',
    },
  },
  [theme.breakpoints.up(960)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '33.3333%',
      flexBasis: '33.3333%',
    },
  },
  [theme.breakpoints.up(1300)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '25%',
      flexBasis: '25%',
    },
  },
  [theme.breakpoints.up(1600)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '20%',
      flexBasis: '20%',
    },
  },
  [theme.breakpoints.up(1920)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '465px',
    },
  },
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  [theme.breakpoints.down(769)]: {
    wrapContentContainer: {
      // width: 'calc(100vw - 24px)',
      overflow: 'auto',
    },
    wrapPreLoadContainer: {
      width: 290,
    },
    contentContainer: {
      marginTop: theme.spacing(0),
      paddingBottom: theme.spacing(2),
      display: 'flex',
      height: '100%',
      margin: 0,
      // overflow: 'auto',
    },
    xsItemContainer: {
      paddingRight: '24px',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'center',
      // '&:last-child': {
      //   paddingRight: 0,
      // },
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
export default ArchivedVideos
