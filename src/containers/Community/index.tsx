import ButtonPrimary from '@components/ButtonPrimary'
import ESChip from '@components/Chip'
import ESLoader from '@components/Loader'
import LoginRequired from '@containers/LoginRequired'
import { Box, Grid, Typography, useMediaQuery, makeStyles, Theme, useTheme } from '@material-ui/core'
import { AddRounded } from '@material-ui/icons'
import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { CommunityFilterOption } from '@services/community.service'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import CommunityCard from '@components/CommunityCard'
import useCommunityHelper from './hooks/useCommunityHelper'
import useCommunityData from '@containers/Community/useCommunityData'
import InfiniteScroll from 'react-infinite-scroll-component'
import _ from 'lodash'
import { WindowScroller, List, CellMeasurer, AutoSizer, CellMeasurerCache } from 'react-virtualized'
import { useLayoutEffect } from 'react'
import GoogleAd from '@components/GoogleAd'
import { GTMHelper } from '@utils/helpers/SendGTM'

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 255,
})
interface CommunityContainerProps {
  filter: CommunityFilterOption
}

const CommunityContainer: React.FC<CommunityContainerProps> = ({ filter }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { toCreate } = useCommunityHelper()
  const [selectedFilter, setSelectedFilter] = useState(CommunityFilterOption.all)
  const { communities, meta, pages, fetchCommunityData, clearCommunityData } = useCommunityData()
  const [itemsPerRow, setPerRow] = useState<number>(3)
  const rowCount = Math.ceil(communities.length / itemsPerRow)
  const matchesXL = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'))
  const matchesLG = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const matchesSM = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
  const listRef = useRef<any>(null)
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

  const defaultFilterOptions = [
    {
      type: CommunityFilterOption.all,
      label: t('common:arenaSearchFilters.all'),
      loginRequired: false,
    },
  ]

  const loginRequiredFilterOptions = [
    {
      type: CommunityFilterOption.joined,
      label: t('common:communitySearchFilters.joined'),
      loginRequired: false,
    },
    {
      type: CommunityFilterOption.organized,
      label: t('common:communitySearchFilters.organized'),
      loginRequired: false,
    },
  ]

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

  useEffect(() => {
    if (!router.isReady) return

    let filterVal = CommunityFilterOption.all

    if (_.has(router.query, 'filter')) {
      const queryFilterVal = _.get(router.query, 'filter') as CommunityFilterOption
      if (Object.values(CommunityFilterOption).includes(queryFilterVal)) filterVal = queryFilterVal
    }

    onFilterChange(filterVal)
  }, [router.query])

  const hasNextPage = pages && Number(pages.current_page) !== Number(pages.total_pages)

  const loadMore = () => {
    if (hasNextPage) {
      fetchCommunityData({ page: Number(pages.current_page) + 1, filter: selectedFilter })
    }
  }

  const onFilterChange = (filter: CommunityFilterOption) => {
    setSelectedFilter(filter)
    clearCommunityData()
    fetchCommunityData({ page: 1, filter: filter })
  }

  const onFilter = (filter: CommunityFilterOption) => {
    if (!meta.pending) {
      router.push(`${ESRoutes.COMMUNITY}?filter=${filter}`, undefined, { shallow: true })
    }
    return null
  }

  const rowRenderer = ({ index, key, style, parent }) => {
    const items = []
    const fromIndex = index * itemsPerRow
    const toIndex = Math.min(fromIndex + itemsPerRow, communities.length)

    for (let i = fromIndex; i < toIndex; i++) {
      const data = communities[i]

      // eslint-disable-next-line no-console
      // console.log('communities', communities)
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

  useEffect(() => {
    GTMHelper.getAdSlot()
    setSlotDataLayer(GTMHelper.getDataSlot(window?.dataLayer, GTMHelper.SCREEN_NAME_ADS.COMMUNITY, screenDownSP))
  }, [screenDownSP])

  return (
    <>
      <div
        id={!screenDownSP ? 'ad_community_top' : 'ad_community_bottom'}
        className={!screenDownSP ? 'google_ad_patten_1' : 'google_ad_patten_4'}
      />
      {/* GADS: home community 1-4*/}
      {/* <GoogleAd
        id={{ idPatten1: !screenDownSP && 'ad_community_t', idPatten4: screenDownSP && 'ad_community_b' }}
        idTag={!screenDownSP ? 'ad_community_t' : 'ad_community_b'}
        slot={slotDataLayer}
      /> */}
      <GoogleAd id={{ idPatten1: 'ad_community_t' }} idTag={'ad_community_t'} slot={slotDataLayer} />
      <Box className={classes.header}>
        <Typography variant="h2">{t('common:home.community')}</Typography>

        <LoginRequired>
          <ButtonPrimary round gradient={false} onClick={toCreate} size="small">
            <AddRounded className={classes.addIcon} />
            {t('common:community_create.title')}
          </ButtonPrimary>
        </LoginRequired>
      </Box>
      <Box className={`${classes.content} position_bottom`}>
        <Box className={classes.filters}>
          {defaultFilterOptions.map((option) => (
            <ESChip
              isGameList={true}
              key={option.type}
              color={option.type === filter ? 'primary' : undefined}
              className={classes.filterChip}
              label={option.label}
              onClick={() => onFilter(option.type)}
            />
          ))}
          {loginRequiredFilterOptions.map((option) => (
            <LoginRequired key={option.type}>
              <ESChip
                isGameList={true}
                key={option.type}
                color={option.type === filter ? 'primary' : undefined}
                className={classes.filterChip}
                label={option.label}
                onClick={() => onFilter(option.type)}
              />
            </LoginRequired>
          ))}
        </Box>

        {communities.length > 0 ? (
          <InfiniteScroll dataLength={communities.length} next={loadMore} hasMore={hasNextPage} loader={null} scrollThreshold="1px">
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
        ) : (
          meta.loaded && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box display="flex" justifyContent="center">
                <Typography variant="body1">{t('common:community.no_data')}</Typography>
              </Box>
            </Grid>
          )
        )}
        {!meta.loaded && meta.pending && (
          <Grid item xs={12}>
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          </Grid>
        )}
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    backgroundColor: Colors.black,
    '& .MuiButtonBase-root.button-primary': {
      padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
    },
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    width: '100%',
  },
  filterChip: {
    maxWidth: 'none',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  addIcon: {
    position: 'relative',
    left: theme.spacing(-1),
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  scrollContainer: {
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

export default CommunityContainer
