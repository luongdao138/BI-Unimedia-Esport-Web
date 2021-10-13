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
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'

type ProgramInfoProps = {
  video_id?: string | string[]
  videoItemStyle?: any
}
const ProgramInfo: React.FC<ProgramInfoProps> = ({ video_id, videoItemStyle }) => {
  const classes = useStyles()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769), { noSsr: true })

  const { meta_archived_video_stream, archivedVideoStreamData, getArchivedVideoStream, resetArchivedVideoStream } = useLiveStreamDetail()
  const { detailVideoResult } = useDetailVideo()
  const isLoadingData = meta_archived_video_stream?.pending
  const getDescription = CommonHelper.linkifyString(detailVideoResult?.description)

  const [descriptionCollapse, setDescriptionCollapse] = useState(true)
  const [descriptionCanTruncated, setDescriptionCanTruncated] = useState(false)

  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState(true)
  const { width: itemWidthDownMdScreen } = useWindowDimensions(48)

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
    if (getDescription) {
      setDescriptionCanTruncated(isTruncated())
    }
  }, [getDescription])
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
    if (page > 1) {
      getArchivedVideoStream({ video_id: video_id, page: page, limit: LIMIT_ITEM })
    }
  }, [page])

  const renderArchiveVideoItem = (item: TypeVideoArchived, index: number) => {
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
  const renderPreLoadArchiveVideoItem = () => {
    const arrayPreLoad = Array(6)
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
        <Grid item xs={6} className={classes.itemContainer} style={videoItemStyle} key={index}>
          <PreloadPreviewItem />
        </Grid>
      )
    )
  }

  const toggleDescriptionCollapse = () => {
    setDescriptionCollapse(!descriptionCollapse)
  }

  const isTruncated = () => {
    const descriptionDiv = document.getElementById('program-info-description')
    if (!descriptionDiv) {
      return false
    }
    return descriptionDiv.offsetHeight < descriptionDiv.scrollHeight
  }

  const renderDescription = () => {
    return (
      <>
        <div
          id="program-info-description"
          className={classes.label + ' ' + (descriptionCollapse ? classes.labelCollapse : '')}
          dangerouslySetInnerHTML={{ __html: getDescription }}
        />
        {descriptionCanTruncated && (
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
            isLoadingData &&
            !downMd && (
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
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    flexDirection: 'column',
    width: '100%',
  },

  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
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
  labelCollapse: {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 5,
    '-webkit-box-orient': 'vertical',
  },
  seeMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 36,
    cursor: 'pointer',
    justifyContent: 'flex-start',
    margin: '10px 0 0 10px',
    // justifyContent: 'center',
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
    padding: '0 24px 8px 24px',
  },
  itemContainer: {
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  [theme.breakpoints.up(1920)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '465px',
      flexBasis: '25%',
    },
  },
  [theme.breakpoints.up(1680)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '25%',
      flexBasis: '25%',
    },
  },
  [theme.breakpoints.up(1401)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '33.333333%',
      flexBasis: '33.333333%',
    },
  },
  [theme.breakpoints.up(1167)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '50%',
      flexBasis: '50%',
    },
  },
  [theme.breakpoints.down(769)]: {
    wrapContentContainer: {
      width: 'calc(100vw)',
      overflow: 'auto',
    },
    contentContainer: {
      flexWrap: 'nowrap',
      margin: '0px',
      paddingBottom: '0px',
      flexDirection: 'column',
    },
    wrapPreLoadContainer: {
      width: 290,
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
    xsItemContainerBonus: {
      marginRight: '20.7px',
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  loaderCenter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    textAlign: 'center',
  },
}))
export default ProgramInfo
