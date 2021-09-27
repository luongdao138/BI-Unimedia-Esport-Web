import { useEffect, useState, useLayoutEffect, useRef } from 'react'
import { Grid, Box, makeStyles, Typography, IconButton, Icon, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import TopicCard from '@components/TopicCard'
import useFollower from './useFollower'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'
import { WindowScroller, List, CellMeasurer, AutoSizer, CellMeasurerCache } from 'react-virtualized'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 243,
})

const TopicFollowerContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { handleClick, followersTopicList, getFollowersTopicList, pages, meta, resetMeta } = useFollower()
  const [itemsPerRow, setPerRow] = useState<number>(4)
  const [hasMore, setHasMore] = useState(true)

  const rowCount = Math.ceil(followersTopicList.length / itemsPerRow)
  const matchesXL = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'))
  const matchesLG = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
  const listRef = useRef<any>(null)

  useEffect(() => {
    if (listRef && listRef.current) listRef.current.recomputeRowHeights()
    if (matchesXL === true) {
      setPerRow(4)
    } else if (matchesLG === true) {
      setPerRow(3)
    } else if (matchesSM === true) {
      setPerRow(1)
    }
  }, [matchesXL, matchesLG, matchesSM])

  useEffect(() => {
    getFollowersTopicList({ page: 1 })
    return () => resetMeta()
  }, [])

  useLayoutEffect(() => {
    const updateSize = () => {
      cache.clearAll()
      if (listRef && listRef.current)
        setTimeout(() => {
          listRef.current?.forceUpdateGrid()
        }, 100)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const fetchMoreData = () => {
    if (pages.current_page >= pages.total_pages) {
      setHasMore(false)
      return
    }
    getFollowersTopicList({
      page: pages.current_page + 1,
    })
  }

  const rowRenderer = ({ index, key, style, parent }) => {
    const items = []
    const fromIndex = index * itemsPerRow
    const toIndex = Math.min(fromIndex + itemsPerRow, followersTopicList.length)

    for (let i = fromIndex; i < toIndex; i++) {
      const data = followersTopicList[i]

      items.push(
        <Grid key={i} item sm={12} lg={4} xl={3} xs={12} className={classes.card}>
          <TopicCard topic={data} />
        </Grid>
      )
    }

    return (
      <CellMeasurer cache={cache} columnIndex={0} columnCount={1} key={key} parent={parent} rowIndex={index}>
        {({ registerChild }) => (
          <Grid key={key} style={style} ref={registerChild} container>
            {items}
          </Grid>
        )}
      </CellMeasurer>
    )
  }

  return (
    <>
      <Box py={2} px={3} mb={6} display="flex" flexDirection="row" alignItems="center">
        <IconButton className={classes.iconButtonBg} onClick={handleClick}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <Typography variant="h2" noWrap>
          {t('common:topic.topic_follower_list')}
        </Typography>
      </Box>
      <div>
        <div className={classes.container}>
          <InfiniteScroll
            dataLength={followersTopicList.length}
            next={!meta.pending && fetchMoreData}
            hasMore={hasMore}
            loader={null}
            scrollThreshold={'1px'}
            endMessage={
              <Box textAlign="center" width="100%" my={3}>
                <Typography>{t('common:infinite_scroll.message')}</Typography>
              </Box>
            }
          >
            <WindowScroller>
              {({ height, scrollTop }) => (
                <AutoSizer disableHeight>
                  {({ width }) => {
                    return (
                      <List
                        ref={listRef}
                        autoHeight
                        height={height}
                        width={width}
                        scrollTop={scrollTop}
                        rowHeight={cache.rowHeight}
                        deferredMeasurementCache={cache}
                        rowRenderer={rowRenderer}
                        rowCount={rowCount}
                        overscanRowCount={6}
                      />
                    )
                  }}
                </AutoSizer>
              )}
            </WindowScroller>
          </InfiniteScroll>
        </div>
      </div>
      {meta.pending && (
        <Grid item xs={12}>
          <Box my={4} display="flex" justifyContent="center" alignItems="center">
            <ESLoader />
          </Box>
        </Grid>
      )}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  loaderCenter: {
    width: '100%',
    textAlign: 'center',
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
    marginRight: theme.spacing(2),
  },
  card: {
    paddingTop: 0,
    paddingRight: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(1),
    },
  },
}))

export default TopicFollowerContainer
