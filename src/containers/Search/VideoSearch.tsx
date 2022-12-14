import React, { useEffect, useState } from 'react'
import { Grid, Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import useSearchVideoResult from './useSearchVideoResult'
import ESLoader from '@components/Loader'
import { TypeVideo } from '@services/videoTop.services'
import InfiniteScroll from 'react-infinite-scroll-component'
import useVideoSearch from './useVideoSearch'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'

const LIMIT = 12
const VideoSearchContainer: React.FC = () => {
  const classes = useStyles()
  const { searchKeyword, searchCategoryID } = useVideoSearch()
  const { t } = useTranslation(['common'])
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const [keyword, setKeyword] = useState<string>('')
  const { searchVideosSelector, videoSearch, resetMeta, resetSearchVideo, meta, totalResult } = useSearchVideoResult()
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState(true)
  const isWideScreen = useMediaQuery(theme.breakpoints.up(1920))
  const { width: listDisplayWidth } = useWindowDimensions(182)
  const { width: itemWidthDownMdScreen } = useWindowDimensions(48)

  useEffect(() => {
    document.body.style.overflow = 'overlay'
  }, [])

  useEffect(() => {
    setKeyword(searchKeyword)
    videoSearch({ page: 1, keyword: searchKeyword, limit: LIMIT, category_id: searchCategoryID })

    return () => {
      setPage(1)
      resetSearchVideo()
      resetMeta()
    }
  }, [searchKeyword])

  useEffect(() => {
    if (page > 1) {
      videoSearch({ page: page, limit: LIMIT, keyword: keyword, category_id: searchCategoryID })
    }
  }, [page])

  const handleLoadMore = async () => {
    if (searchVideosSelector.length > 0 && searchVideosSelector.length < LIMIT * page) {
      setHasMore(false)
      return
    }
    if (searchVideosSelector.length > 0 && searchVideosSelector.length == LIMIT * page) {
      await setPage(page + 1)
    }
  }

  const calculateVideoItemStyle = (): any => {
    if (!isWideScreen) {
      return {}
    }
    const numOfDisplayItem = Math.floor(listDisplayWidth / 330)
    const calcWidth = Math.floor(listDisplayWidth / numOfDisplayItem)
    return {
      maxWidth: calcWidth,
    }
  }

  const renderItem = (item: TypeVideo, index: number) => {
    return (
      <React.Fragment key={item?.uuid || index}>
        {downMd ? (
          <Box className={classes.xsItemContainer} key={index}>
            <VideoPreviewItem data={item} key={index} containerStyle={{ width: itemWidthDownMdScreen }} />
          </Box>
        ) : (
          <Grid item xs={6} lg={6} xl={4} className={classes.itemContainer} key={index} style={calculateVideoItemStyle()}>
            <VideoPreviewItem data={item} key={index} />
          </Grid>
        )}
      </React.Fragment>
    )
  }
  return (
    <Box className={classes.container}>
      <Grid item xs={12}>
        <Box pt={3} pb={3}>
          <Typography variant="caption" gutterBottom className={classes.title}>
            {`${t('common:common.search_results')} ${totalResult}${t('common:common.total')}`}
          </Typography>
        </Box>
      </Grid>
      <Box className={classes.wrapContentContainer}>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={searchVideosSelector?.length}
          next={handleLoadMore}
          hasMore={hasMore}
          loader={null}
          scrollThreshold={0.8}
          style={{ overflow: 'hidden' }}
        >
          {searchVideosSelector?.length > 0 && (
            <Grid container spacing={3} className={classes.contentContainer}>
              {searchVideosSelector?.map(renderItem)}
            </Grid>
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
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  contentContainer: {
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
  title: {
    color: '#ADABAB',
  },
  [theme.breakpoints.down(769)]: {
    wrapContentContainer: {
      width: 'calc(100vw - 48px)',
      overflow: 'auto',
    },
    contentContainer: {
      flexWrap: 'nowrap',
      margin: '0px',
      paddingBottom: '0px',
      flexDirection: 'column',
    },
    xsItemContainer: {
      paddingRight: '24px',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'center',
    },
  },
  [theme.breakpoints.up(960)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '33.333333%',
      flexBasis: '33.333333%',
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
}))
export default VideoSearchContainer
