/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
import { Grid, Box, makeStyles, Theme } from '@material-ui/core'
import useArenaHome from './useArenaHome'
import TournamentCard from '@components/TournamentCard/HomeCard'
import { TournamentFilterOption } from '@services/arena.service'
import useArenaHelper from '../hooks/useArenaHelper'
import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import _ from 'lodash'
import { WindowScroller, List, CellMeasurer, AutoSizer, CellMeasurerCache } from 'react-virtualized'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useReturnHref from '@utils/hooks/useReturnHref'
import ESLoader from '@components/Loader'
import InfiniteScroll from 'react-infinite-scroll-component'
import HeaderArea from './HeaderArea'
// import GoogleAd from '@components/GoogleAd'
// import { GTMHelper } from '@utils/helpers/SendGTM'

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 270,
})

interface ArenaHomeProps {
  filter: TournamentFilterOption
}

const ArenaHome: React.FC<ArenaHomeProps> = ({ filter }) => {
  const { arenasFiltered, meta, loadMore, onFilterChange } = useArenaHome()
  const [itemsPerRow, setPerRow] = useState<number>(4)
  const rowCount = Math.ceil(arenasFiltered.length / itemsPerRow)
  const classes = useStyles()
  const router = useRouter()
  const { toCreate } = useArenaHelper()
  const matchesXL = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'))
  const matchesLG = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

  // const theme = useTheme()
  // const screenDownSP = useMediaQuery(theme.breakpoints.down(576))
  // const [slotDataLayer, setSlotDataLayer] = useState('')

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

  useLayoutEffect(() => {
    const updateSize = () => {
      cache.clearAll()
      if (listRef && listRef.current)
        setTimeout(() => {
          listRef.current.forceUpdateGrid()
        })
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  useEffect(() => {
    if (!hasUCRReturnHref && !_.isEmpty(arenasFiltered)) {
      if (document.documentElement.scrollHeight > document.documentElement.clientHeight) return
      loadMore()
    }
  }, [arenasFiltered])

  useEffect(() => {
    if (!router.isReady) return

    let filterVal = TournamentFilterOption.all

    if (_.has(router.query, 'filter')) {
      const queryFilterVal = _.get(router.query, 'filter') as TournamentFilterOption
      if (Object.values(TournamentFilterOption).includes(queryFilterVal)) filterVal = queryFilterVal
    }

    const promise = onFilterChange(filterVal)

    return () => {
      promise.abort()
    }
  }, [router.query])

  const onFilter = (filter: TournamentFilterOption) => {
    if (!meta.pending) {
      router.push(`${ESRoutes.ARENA}?filter=${filter}`, undefined, { shallow: true })
    }
    return null
  }

  const rowRenderer = ({ index, key, style, parent }) => {
    const items = []
    const fromIndex = index * itemsPerRow
    const toIndex = Math.min(fromIndex + itemsPerRow, arenasFiltered.length)
    for (let i = fromIndex; i < toIndex; i++) {
      const data = arenasFiltered[i]

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

  // useEffect(() => {
  //   GTMHelper.getAdSlot()
  //   console.log('window.dataLayer ====================>', window?.dataLayer, window.location.href, slotDataLayer)
  //   setSlotDataLayer(GTMHelper.getDataSlot(window?.dataLayer, GTMHelper.SCREEN_NAME_ADS.ARENA, screenDownSP))
  // }, [screenDownSP])
  return (
    <>
      {/* <div
        id={!screenDownSP ? 'ad_arena_top' : 'ad_arena_bottom'}
        className={!screenDownSP ? 'google_ad_patten_1' : 'google_ad_patten_4'}
      /> */}
      {/* GADS: home arena */}
      {/* <GoogleAd
        id={{ idPatten1: !screenDownSP && 'ad_arena_t', idPatten4: screenDownSP && 'ad_arena_b' }}
        //@ts-ignore
        slot={slotDataLayer}
        idTag={!screenDownSP ? 'ad_arena_t' : 'ad_arena_b'}
        currenPath={window.location.href}
      /> */}
      {/* {!screenDownSP &&
        <GoogleAd
          id={{ idPatten1: !screenDownSP && 'ad_arena_t' }}
          //@ts-ignore
          slot={slotDataLayer}
          idTag={'ad_arena_t'}
          currenPath={window.location.href}
        />} */}
      <HeaderArea onFilter={onFilter} toCreate={toCreate} filter={filter} />
      <div className="position_bottom">
        <div className={classes.container}>
          <InfiniteScroll
            dataLength={arenasFiltered.length}
            next={!meta.pending && loadMore}
            hasMore={!hasUCRReturnHref}
            loader={null}
            scrollThreshold={'1px'}
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
