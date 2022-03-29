import { Grid, Box, makeStyles, useMediaQuery, Theme, Typography, useTheme } from '@material-ui/core'
import { LobbyFilterOption } from '@services/lobby.service'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useLobbyHelper from '../hooks/useLobbyHelper'
import LobbyCard from '@components/LobbyCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'
import useLobbyHome from './useLobbyHome'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Header from './Header'
import { AutoSizer, WindowScroller, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import useReturnHref from '@utils/hooks/useReturnHref'
import _ from 'lodash'
import i18n from '@locales/i18n'
import GoogleAd from '@components/GoogleAd'
import { GTMHelper } from '@utils/helpers/SendGTM'

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 270,
})

interface LobbyHomeProps {
  filter: LobbyFilterOption
}

const LobbyHome: React.FC<LobbyHomeProps> = ({ filter }) => {
  const classes = useStyles()
  const listRef = useRef<any>(null)
  const router = useRouter()
  const { lobbies, meta, loadMore, onFilterChange } = useLobbyHome()
  const { toCreate } = useLobbyHelper()
  const { hasUCRReturnHref } = useReturnHref()
  const [itemsPerRow, setPerRow] = useState<number>(4)
  const [isFilterSuggested, setIsSuggested] = useState<boolean>(false)

  const rowCount = Math.ceil(lobbies.length / itemsPerRow)
  const matchesXL = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'))
  const matchesLG = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

  const theme = useTheme()
  const screenDownSP = useMediaQuery(theme.breakpoints.down(576))
  const [slotDataLayer, setSlotDataLayer] = useState('')

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
    if (!hasUCRReturnHref && !_.isEmpty(lobbies)) {
      if (document.documentElement.scrollHeight > document.documentElement.clientHeight) return
      loadMore()
    }
  }, [lobbies])

  useEffect(() => {
    if (!router.isReady) return

    let filterVal = LobbyFilterOption.all

    if (_.has(router.query, 'filter')) {
      const queryFilterVal = _.get(router.query, 'filter') as LobbyFilterOption
      if (Object.values(LobbyFilterOption).includes(queryFilterVal)) {
        filterVal = queryFilterVal

        setIsSuggested(queryFilterVal === LobbyFilterOption.suggested)
      }
    }

    onFilterChange(filterVal)
  }, [router.query])

  const onFilter = (filter: LobbyFilterOption) => {
    if (!meta.pending) router.push(`${ESRoutes.LOBBY}?filter=${filter}`, undefined, { shallow: true })
    return null
  }

  const rowRenderer = ({ index, key, style, parent }) => {
    const items = []
    const fromIndex = index * itemsPerRow
    const toIndex = Math.min(fromIndex + itemsPerRow, lobbies.length)

    for (let i = fromIndex; i < toIndex; i++) {
      const data = lobbies[i]
      // eslint-disable-next-line no-console
      // console.log('lobbies', lobbies)

      items.push(
        <Grid key={i} item sm={12} lg={4} xl={3} xs={12}>
          <LobbyCard lobby={data} />
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
  useEffect(() => {
    GTMHelper.getAdSlot()
    setSlotDataLayer(GTMHelper.getDataSlot(window?.dataLayer, GTMHelper.SCREEN_NAME_ADS.LOBBY))
  }, [screenDownSP])

  return (
    <>
      <div
        id={!screenDownSP ? 'ad_lobby_top' : 'ad_lobby_bottom'}
        className={!screenDownSP ? 'google_ad_patten_1' : 'google_ad_patten_4'}
      />
      {/* GADS: home lobby 1-4*/}
      <GoogleAd
        id={{ idPatten1: !screenDownSP && 'ad_lobby_t', idPatten4: screenDownSP && 'ad_lobby_b' }}
        idTag={!screenDownSP ? 'ad_lobby_t' : 'ad_lobby_b'}
        slot={slotDataLayer}
      />
      <Header onFilter={onFilter} toCreate={toCreate} filter={filter} />
      <div className={`${classes.container} position_bottom`}>
        <InfiniteScroll
          dataLength={lobbies.length}
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
      {meta && meta.loaded && !lobbies.length && (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" py={3} px={2}>
          <Typography style={{ textAlign: 'center' }}>{i18n.t('common:lobby.search.empty')}</Typography>
          {isFilterSuggested && <Typography style={{ textAlign: 'center' }}>{i18n.t('common:lobby.search.empty_suggested')}</Typography>}
        </Box>
      )}
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
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}))

export default LobbyHome
