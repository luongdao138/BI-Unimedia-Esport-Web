import { Box, Theme, makeStyles, Grid, Typography } from '@material-ui/core'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import { PreloadPreviewItem } from '../PreloadContainer'
import InfiniteScroll from 'react-infinite-scroll-component'
import i18n from '@locales/i18n'
import useLiveStreamDetail from '../useLiveStreamDetail'
import { TypeVideoArchived } from '@services/liveStreamDetail.service'
import ESLoader from '@components/Loader'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'

type RelatedVideosProps = {
  video_id?: string | string[]
}
const LIMIT_ITEM = 12
const RelatedVideos: React.FC<RelatedVideosProps> = ({ video_id }) => {
  const classes = useStyles()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769), { noSsr: true })
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState(true)
  const limit = LIMIT_ITEM
  const { meta_related_video_stream, relatedVideoStreamData, getRelatedVideoStream, resetRelatedVideoStream } = useLiveStreamDetail()
  const isLoading = meta_related_video_stream?.pending
  const { width: itemWidthDownMdScreen } = useWindowDimensions(16)

  useEffect(() => {
    if (video_id) {
      getRelatedVideoStream({ video_id: video_id, page: 1, limit: limit })
    }
    return () => {
      setPage(1)
      setHasMore(true)
      resetRelatedVideoStream()
    }
  }, [video_id])

  useEffect(() => {
    if (page > 1) getRelatedVideoStream({ video_id: video_id, page: page, limit: LIMIT_ITEM })
  }, [page])

  const handleLoadMore = async () => {
    if (relatedVideoStreamData.length > 0 && relatedVideoStreamData.length < LIMIT_ITEM * page) {
      setHasMore(false)
      return
    }
    if (relatedVideoStreamData.length > 0 && relatedVideoStreamData.length == LIMIT_ITEM * page) {
      await setPage(page + 1)
    }
  }

  const renderRelatedVideoItem = (item: TypeVideoArchived, index: number) => {
    return (
      <React.Fragment key={item?.id || index}>
        {downMd ? (
          <Box className={classes.xsItemContainer}>
            <VideoPreviewItem data={item} containerStyle={{ width: itemWidthDownMdScreen }} />
          </Box>
        ) : (
          <Grid item xs={6} lg={6} xl={4} className={classes.itemContainer}>
            <VideoPreviewItem data={item} />
          </Grid>
        )}
      </React.Fragment>
    )
  }

  const renderPreLoadRelatedVideoItem = () => {
    const arrayPreLoad = Array(12)
      .fill('')
      .map((_, i) => ({ i }))
    return arrayPreLoad.map((_item: any, index: number) =>
      downMd ? (
        <Box className={classes.xsItemContainer} key={index}>
          <Box className={classes.wrapPreLoadContainer} style={{ width: itemWidthDownMdScreen }}>
            <PreloadPreviewItem />
          </Box>
        </Box>
      ) : (
        <Grid item xs={6} className={classes.itemContainer} key={index}>
          <PreloadPreviewItem />
        </Grid>
      )
    )
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapContentContainer}>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={relatedVideoStreamData.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={
            isLoading && (
              <div className={classes.loaderCenter}>
                <ESLoader />
              </div>
            )
          }
          scrollThreshold={0.8}
          style={{ overflow: 'hidden' }}
        >
          {relatedVideoStreamData?.length > 0 ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {relatedVideoStreamData.map(renderRelatedVideoItem)}
            </Grid>
          ) : relatedVideoStreamData?.length === 0 && isLoading ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {renderPreLoadRelatedVideoItem()}
            </Grid>
          ) : (
            <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
              <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
            </Box>
          )}
        </InfiniteScroll>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  loaderCenter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(3),
    width: '100%',
  },
  wrapContentContainer: {
    width: '100%',
    overflow: 'hidden',
    padding: '0 24px 8px 24px',
  },
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  contentContainer: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
    display: 'flex',
  },
  itemContainer: {
    width: '100%',
  },
  [theme.breakpoints.up(1167)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '50%',
      flexBasis: '50%',
    },
  },
  [theme.breakpoints.up(1401)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '33.333333%',
      flexBasis: '33.333333%',
    },
  },
  [theme.breakpoints.up(1680)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '25%',
      flexBasis: '25%',
    },
  },
  [theme.breakpoints.up(1920)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '25%',
      flexBasis: '25%',
    },
  },
  [theme.breakpoints.down(769)]: {
    container: { marginTop: 16 },
    wrapContentContainer: {
      width: 'calc(100vw)',
      overflow: 'auto',
      padding: '0 8px 8px 8px',
    },
    wrapPreLoadContainer: {
      width: 290,
    },
    contentContainer: {
      flexWrap: 'nowrap',
      margin: '0px',
      paddingBottom: '0px',
      flexDirection: 'column',
    },
    xsItemContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '24px',
    },
  },
}))

export default RelatedVideos
