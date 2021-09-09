import { Box, Typography, Theme, makeStyles, Grid } from '@material-ui/core'
import TitleSeeMore from '../TitleSeeMore'
import VideoPreviewItem from '../VideoPreviewItem'
import i18n from '@locales/i18n'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import useLiveVideos from './useLiveVideos'
import { LIMIT_ITEM, TypeVideo, TYPE_VIDEO_TOP } from '@services/videoTop.services'
import ESLoader from '@components/Loader'
import PreLoadContainer from '../PreLoadContainer'

interface Props {
  follow?: number
  setFollow?: (value: number) => void
}

const LiveStreamVideos: React.FC<Props> = ({ follow, setFollow }) => {
  const page = 2
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const { loadMore, listLiveVideo, meta, getListVideoTop, resetLiveVideos } = useLiveVideos()

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
    if (listLiveVideo.length === 0) {
      getListVideoTop({ type: TYPE_VIDEO_TOP.LIVE, page: 1, limit: LIMIT_ITEM, follow: follow })
    }
    return () => {
      resetLiveVideos()
      setFollow(0)
    }
  }, [follow])

  useEffect(() => {
    loadMore(page + 1, follow)
  }, [])

  const renderPreLoad = () => {
    const arrayPreLoad = Array(9)
      .fill('')
      .map((_, i) => ({ i }))
    return arrayPreLoad.map(() => (
      <>
        {downMd ? (
          <Box className={classes.xsItemContainer}>
            <Box className={classes.wrapPreLoadContainer}>
              <PreLoadContainer />
            </Box>
          </Box>
        ) : (
          <Grid item xs={6} className={classes.itemContainer}>
            <PreLoadContainer />
          </Grid>
        )}
      </>
    ))
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.titleContainer}>
        <TitleSeeMore titleText={i18n.t('common:videos_top_tab.title_live_videos')} />
      </Box>
      <Box className={classes.wrapContentContainer}>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={listLiveVideo.length}
          next={() => {
            loadMore(page, follow)
          }}
          hasMore={true}
          loader={null}
          scrollThreshold={0.8}
          style={{ overflow: 'hidden' }}
          // scrollableTarget="scrollableDiv"
        >
          {listLiveVideo.length > 0 ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {listLiveVideo.map(renderLiveItem)}
            </Grid>
          ) : listLiveVideo.length === 0 && meta.pending ? (
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
  viewMoreStyle: {
    color: '#707070',
  },
  wrapVideos: {},
  wrapContentContainer: {
    overflow: 'hidden',
  },
  spViewMore: {
    display: 'none',
  },
  scrollContainer: {
    display: 'flex',
    // flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
  [theme.breakpoints.up(960)]: {
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
    wrapPreLoadContainer: {
      width: 290,
    },
    xsItemContainer: {
      paddingRight: '24px',
      '&:last-child': {
        paddingRight: 0,
      },
    },
    xsItemContainerBonus: {
      marginRight: '20.7px',
      '&:last-child': {
        marginRight: 0,
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
export default LiveStreamVideos
