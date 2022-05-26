import { Box, Theme, makeStyles, Grid, Typography } from '@material-ui/core'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'
import { PreloadPreviewItem } from '../PreloadContainer'
import InfiniteScroll from 'react-infinite-scroll-component'
import i18n from '@locales/i18n'
import { TypeVideoArchived } from '@services/liveStreamDetail.service'
import ESLoader from '@components/Loader'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
import { useRotateScreen } from '@utils/hooks/useRotateScreen'
import { useRelatedVideoContext } from '@containers/VideoLiveStreamContainer/VideoContext/RelatedVideoContext'

type RelatedVideosProps = {
  video_id?: string | string[]
}
const RelatedVideos: React.FC<RelatedVideosProps> = () => {
  const { isLandscape } = useRotateScreen()
  const classes = useStyles({ isLandscape })

  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769), { noSsr: true })
  const { width: itemWidthDownMdScreen } = useWindowDimensions(16)
  const { hasMore, handleLoadMore, relatedVideoStreamData, isLoading } = useRelatedVideoContext()

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
  [`@media (orientation: landscape)`]: {
    wrapContentContainer: (props: { isLandscape: boolean }) => {
      if (props.isLandscape)
        return {
          width: '100%',
        }
    },
  },
}))

export default RelatedVideos
