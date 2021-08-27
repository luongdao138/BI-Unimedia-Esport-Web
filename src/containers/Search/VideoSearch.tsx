import React, { useEffect, useState } from 'react'
import { Grid, Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useSearch from '@containers/Search/useSearch'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import useSearchVideoResult from './useSearchVideoResult'
import ESLoader from '@components/Loader'
import { TypeVideo } from '@services/videoTop.services'
import InfiniteScroll from 'react-infinite-scroll-component'

const LIMIT = 15
const VideoSearchContainer: React.FC = () => {
  const page = 1
  const classes = useStyles()
  const { searchKeyword } = useSearch()
  const { t } = useTranslation(['common'])
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const [keyword, setKeyword] = useState<string>('')
  const { searchVideosSelector, videoSearch, resetMeta, resetSearchVideo, meta, totalResult } = useSearchVideoResult()

  useEffect(() => {
    setKeyword(searchKeyword)
    videoSearch({ page: 1, keyword: searchKeyword, limit: LIMIT })

    return () => {
      resetSearchVideo()
      resetMeta()
    }
  }, [searchKeyword])

  const loadMore = () => {
    if (searchVideosSelector?.length > 0 && searchVideosSelector?.length <= LIMIT) {
      videoSearch({ page: page + 1, limit: LIMIT, keyword: keyword })
    }
  }

  const renderItem = (item: TypeVideo, index: number) => {
    return (
      <>
        {downMd ? (
          <Box className={classes.xsItemContainer} key={index}>
            <VideoPreviewItem data={item} key={index} />
          </Box>
        ) : (
          <Grid item xs={6} lg={6} xl={4} className={classes.itemContainer} key={index}>
            <VideoPreviewItem data={item} key={index} />
          </Grid>
        )}
      </>
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
          next={loadMore}
          hasMore={true}
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
      width: 'calc(100vw - 24px)',
      overflow: 'auto',
    },
    contentContainer: {
      flexWrap: 'nowrap',
      margin: '0px',
      paddingBottom: '0px',
    },
    xsItemContainer: {
      paddingRight: '24px',
      '&:last-child': {
        paddingRight: 0,
      },
    },
  },
}))
export default VideoSearchContainer
