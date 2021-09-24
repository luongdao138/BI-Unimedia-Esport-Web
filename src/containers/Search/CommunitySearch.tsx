import { useEffect, useState, useRef } from 'react'
import { Grid, Box, Typography, makeStyles, useMediaQuery, Theme } from '@material-ui/core'
import useCommunitySearch from './useCommunitySearch'
import ESLoader from '@components/Loader'
import CommunityCard from '@components/CommunityCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTranslation } from 'react-i18next'
import useSearch from '@containers/Search/useSearch'
import { WindowScroller, List, CellMeasurer, AutoSizer, CellMeasurerCache } from 'react-virtualized'
import { useLayoutEffect } from 'react'

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 255,
})

const CommunitySearchContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { searchKeyword } = useSearch()
  const { communityResult, searchCommunity, resetMeta, resetSearchCommunity, meta, page } = useCommunitySearch()
  const [keyword, setKeyword] = useState<string>('')

  const [itemsPerRow, setPerRow] = useState<number>(3)
  const rowCount = Math.ceil(communityResult.length / itemsPerRow)
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
    setKeyword(searchKeyword)
    searchCommunity({ page: 1, keyword: searchKeyword })

    return () => {
      resetSearchCommunity()
      resetMeta()
    }
  }, [searchKeyword])

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

  const hasNextPage = page && Number(page.current_page) !== Number(page.total_pages)

  const loadMore = () => {
    if (page && page.current_page !== page.total_pages) {
      searchCommunity({ page: page.current_page + 1, keyword: keyword })
    }
  }

  const rowRenderer = ({ index, key, style, parent }) => {
    const items = []
    const fromIndex = index * itemsPerRow
    const toIndex = Math.min(fromIndex + itemsPerRow, communityResult.length)

    for (let i = fromIndex; i < toIndex; i++) {
      const data = communityResult[i]

      items.push(
        <Grid key={i} item xs={12} lg={4} xl={3} sm={12} className={classes.card}>
          <CommunityCard community={data} />
        </Grid>
      )
    }

    return (
      <CellMeasurer cache={cache} columnIndex={0} columnCount={1} key={key} parent={parent} rowIndex={index}>
        {({ registerChild, measure }) => (
          <Grid key={key} style={style} ref={registerChild} container onLoad={measure}>
            {items}
          </Grid>
        )}
      </CellMeasurer>
    )
  }

  return (
    <Grid container>
      {!!page && (
        <Grid item xs={12}>
          <Box pt={1} pb={2}>
            <Typography variant="caption" gutterBottom>
              {`${t('common:common.search_results')} ${page?.total_count}${t('common:common.total')}`}
            </Typography>
          </Box>
        </Grid>
      )}
      <InfiniteScroll dataLength={communityResult.length} next={loadMore} hasMore={hasNextPage} loader={null} scrollThreshold="1px">
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
      {meta.pending && (
        <Grid item xs={12}>
          <Box my={4} display="flex" justifyContent="center" alignItems="center">
            <ESLoader />
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    paddingTop: 0,
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(1),
    },
  },
}))

export default CommunitySearchContainer
