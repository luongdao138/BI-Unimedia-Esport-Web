import { Grid, Box, makeStyles, Theme } from '@material-ui/core'
import useArenaHome from './useArenaHome'
import TournamentCard from '@components/TournamentCard'
import { TournamentFilterOption } from '@services/arena.service'
import useArenaHelper from '../hooks/useArenaHelper'
import { useEffect, useRef, useState, createRef } from 'react'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import _ from 'lodash'
import { WindowScroller, List, CellMeasurer, AutoSizer, CellMeasurerCache } from 'react-virtualized'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useRect } from '@utils/hooks/useRect'
import useReturnHref from '@utils/hooks/useReturnHref'
import ESLoader from '@components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import HeaderArea from './HeaderArea'

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 270,
})

interface ArenaHomeProps {
  filter: TournamentFilterOption
}

const contentRef = createRef<HTMLDivElement>()

const ArenaHome: React.FC<ArenaHomeProps> = ({ filter }) => {
  const { arenas, meta, loadMore, onFilterChange } = useArenaHome()
  const [itemsPerRow, setPerRow] = useState<number>(4)
  const rowCount = Math.ceil(arenas.length / itemsPerRow)
  const classes = useStyles()
  const router = useRouter()
  const contentRect = useRect(contentRef)
  const { toCreate } = useArenaHelper()
  const matchesXL = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'))
  const matchesLG = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

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

  const { hasUCRReturnHref } = useReturnHref()

  const listRef = useRef<any>(null)

  useEffect(() => {
    cache.clearAll()
    if (listRef && listRef.current)
      setTimeout(() => {
        listRef.current.forceUpdateGrid()
      })
  }, [contentRect?.width, rowCount])

  useEffect(() => {
    if (!hasUCRReturnHref) {
      if (document.documentElement.scrollHeight > document.documentElement.clientHeight) return
      loadMore()
    }
  }, [arenas])

  useEffect(() => {
    if (!router.isReady) return

    let filterVal = TournamentFilterOption.all

    if (_.has(router.query, 'filter')) {
      const queryFilterVal = _.get(router.query, 'filter') as TournamentFilterOption
      if (Object.values(TournamentFilterOption).includes(queryFilterVal)) filterVal = queryFilterVal
    }

    onFilterChange(filterVal)
  }, [router.query])

  const onFilter = (filter: TournamentFilterOption) => {
    router.push(`${ESRoutes.ARENA}?filter=${filter}`, undefined, { shallow: true })
    return null
  }

  const rowRenderer = ({ index, key, style, parent }) => {
    const items = []
    const fromIndex = index * itemsPerRow
    const toIndex = Math.min(fromIndex + itemsPerRow, arenas.length)

    for (let i = fromIndex; i < toIndex; i++) {
      const data = arenas[i]

      items.push(
        <Grid key={i} item sm={12} lg={4} xl={3} xs={12}>
          <TournamentCard tournament={data} />
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
      <HeaderArea onFilter={onFilter} toCreate={toCreate} filter={filter} />
      <div ref={contentRef}>
        <div className={classes.container}>
          <InfiniteScroll dataLength={arenas.length} next={loadMore} hasMore={!hasUCRReturnHref} loader={null} scrollThreshold={0.8}>
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
                        overscanRowCount={5}
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

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default ArenaHome
