import { Box, Typography, Theme, makeStyles, Icon, Grid } from '@material-ui/core'
import i18n from '@locales/i18n'
import React, { useState, useEffect } from 'react'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { PreloadPreviewItem } from '../PreloadContainer'
import InfiniteScroll from 'react-infinite-scroll-component'
import useLiveStreamDetail from '../useLiveStreamDetail'
import { LIMIT_ITEM, TypeVideoArchived } from '@services/liveStreamDetail.service'
import useDetailVideo from '../useDetailVideo'
import ESLoader from '@components/Loader'
import { CommonHelper } from '@utils/helpers/CommonHelper'

type ProgramInfoProps = {
  video_id?: string | string[]
}
const ProgramInfo: React.FC<ProgramInfoProps> = ({ video_id }) => {
  const classes = useStyles()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))

  const { meta_archived_video_stream, archivedVideoStreamData, getArchivedVideoStream, resetArchivedVideoStream } = useLiveStreamDetail()
  const { detailVideoResult } = useDetailVideo()
  const isLoadingData = meta_archived_video_stream?.pending
  const getDescription = CommonHelper.linkifyString(detailVideoResult?.description)

  const [descriptionCollapse, setDescriptionCollapse] = useState(true)
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState(true)

  const handleLoadMore = async () => {
    if (archivedVideoStreamData.length > 0 && archivedVideoStreamData.length < LIMIT_ITEM * page) {
      setHasMore(false)
      return
    }
    if (archivedVideoStreamData.length > 0 && archivedVideoStreamData.length == LIMIT_ITEM * page) {
      await setPage(page + 1)
    }
  }

  useEffect(() => {
    if (video_id) {
      getArchivedVideoStream({ video_id: video_id, page: page, limit: LIMIT_ITEM })
    }
    return () => {
      setPage(1)
      resetArchivedVideoStream()
    }
  }, [video_id])

  useEffect(() => {
    if (page > 1) getArchivedVideoStream({ video_id: video_id, page: page, limit: LIMIT_ITEM })
  }, [page])

  const renderArchiveVideoItem = (item: TypeVideoArchived, index: number) => {
    return (
      <React.Fragment key={item?.id || index}>
        {downMd ? (
          <Box className={classes.xsItemContainer} key={item?.id || index}>
            <VideoPreviewItem data={item} />
          </Box>
        ) : (
          <Grid item xs={6} lg={6} xl={4} className={classes.itemContainer} key={item?.id || index}>
            <VideoPreviewItem data={item} />
          </Grid>
        )}
      </React.Fragment>
    )
  }
  const renderPreLoadArchiveVideoItem = () => {
    const arrayPreLoad = Array(6)
      .fill('')
      .map((_, i) => ({ i }))
    return arrayPreLoad.map((_item: any, index: number) =>
      downMd ? (
        <Box className={classes.xsItemContainer} key={index}>
          <Box className={classes.wrapPreLoadContainer}>
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
  const getDescriptionTruncated = () => {
    return descriptionCollapse ? `${getDescription.substring(0, downMd ? 70 : 200)}...` : getDescription
  }
  const toggleDescriptionCollapse = () => {
    setDescriptionCollapse(!descriptionCollapse)
  }
  const renderDescription = () => {
    return (
      <>
        <div
          className={classes.label}
          dangerouslySetInnerHTML={{ __html: getDescription?.length < 200 ? getDescription : getDescriptionTruncated() }}
        />
        {getDescription?.length > 200 && (
          <Box onClick={toggleDescriptionCollapse} className={classes.seeMoreContainer}>
            <Typography className={classes.seeMoreTitle}>
              {descriptionCollapse ? i18n.t('common:live_stream_screen.view_more') : i18n.t('common:live_stream_screen.view_less')}
            </Typography>
            <Icon className={`fa ${descriptionCollapse ? 'fa-angle-down' : 'fa-angle-up'} ${classes.angleDownIcon}`} fontSize="small" />
          </Box>
        )}
      </>
    )
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.descriptionContainer}>{getDescription?.length > 0 && renderDescription()}</Box>
      <Box className={classes.archiveVideoTitleContainer}>
        <Typography className={classes.archiveVideoTitle}>{i18n.t('common:live_stream_screen.archived_stream_video')}</Typography>
      </Box>
      <Box className={classes.wrapContentContainer}>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={archivedVideoStreamData.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={
            isLoadingData && (
              <div className={classes.loaderCenter}>
                <ESLoader />
              </div>
            )
          }
          scrollThreshold={0.8}
          style={{ overflow: 'hidden' }}
        >
          {archivedVideoStreamData?.length > 0 ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {archivedVideoStreamData.map(renderArchiveVideoItem)}
            </Grid>
          ) : archivedVideoStreamData?.length === 0 && isLoadingData ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {renderPreLoadArchiveVideoItem()}
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
    marginTop: theme.spacing(2),
    flexDirection: 'column',
    width: '100%',
  },
  descriptionContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  label: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 8,
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
    whiteSpace: 'pre-wrap',
  },
  seeMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 36,
    cursor: 'pointer',
    justifyContent: 'center',
  },
  contentContainer: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    height: '100%',
  },
  seeMoreTitle: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 14,
    marginRight: 8,
  },
  angleDownIcon: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 12,
  },
  archiveVideoTitleContainer: {
    paddingLeft: 10,
    marginTop: 34,
    marginBottom: 34,
  },
  archiveVideoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  wrapContentContainer: {
    overflow: 'hidden',
    paddingBottom: 24,
    paddingLeft: 10,
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
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  [theme.breakpoints.down(769)]: {
    wrapContentContainer: {
      paddingLeft: 10,
      paddingRight: 10,
      width: 'calc(100vw)',
      overflow: 'auto',
    },
    wrapPreLoadContainer: {
      width: 290,
    },
    wrapPreLoadDescription: {
      width: 'calc(100vw)',
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
    seeMoreContainer: {
      marginTop: 0,
    },
  },
}))
export default ProgramInfo
