import { Grid, Box, makeStyles, Typography, IconButton, Icon, Theme, useMediaQuery } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { AutoSizer, WindowScroller, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'
import useReturnHref from '@utils/hooks/useReturnHref'
import LobbyCard from '@components/LobbyCard'
import i18n from '@locales/i18n'
import _ from 'lodash'
import useLobbyRecommendedData from '@containers/Home/useLobbyRecommendedData'

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 270,
})

const LobbyRecommendedContainer: React.FC = () => {
  const classes = useStyles()
  const { handleReturn } = useReturnHref()
  const { lobbies, meta, loadMore } = useLobbyRecommendedData()

  const listRef = useRef<any>(null)
  const [itemsPerRow, setPerRow] = useState<number>(4)
  const rowCount = Math.ceil(lobbies.length / itemsPerRow)
  const { hasUCRReturnHref } = useReturnHref()

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

  const rowRenderer = ({ index, key, style, parent }) => {
    const items = []
    const fromIndex = index * itemsPerRow
    const toIndex = Math.min(fromIndex + itemsPerRow, lobbies.length)

    for (let i = fromIndex; i < toIndex; i++) {
      const data = lobbies[i]

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

  return (
    <>
      <Box py={2} px={3} mb={6} display="flex" flexDirection="row" alignItems="center">
        <IconButton className={classes.iconButtonBg} onClick={handleReturn}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
        <Typography variant="h2" className={classes.title}>
          {i18n.t('common:lobby.home.recommended_lobbies_title')}
        </Typography>
      </Box>
      {meta.loaded && _.isEmpty(lobbies) && (
        <Box display="flex" py={3} justifyContent="center" alignItems="center">
          <Typography>{i18n.t('common:lobby.home.recommended_lobbies_empty')}</Typography>
        </Box>
      )}
      <div className={classes.container}>
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
  title: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
    marginRight: theme.spacing(2),
  },
}))

export default LobbyRecommendedContainer
