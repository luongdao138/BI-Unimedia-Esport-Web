import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import useArenaHome from './useArenaHome'
import ESLoader from '@components/Loader'
import TournamentCard from '@components/TournamentCard'
import ButtonPrimary from '@components/ButtonPrimary'
import InfiniteScroll from 'react-infinite-scroll-component'
import { TournamentFilterOption } from '@services/arena.service'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import { AddRounded } from '@material-ui/icons'
import ESChip from '@components/Chip'
import useArenaHelper from '../hooks/useArenaHelper'
import LoginRequired from '@containers/LoginRequired'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'
import _ from 'lodash'

interface ArenaHomeProps {
  filter: TournamentFilterOption
}

const ArenaHome: React.FC<ArenaHomeProps> = ({ filter }) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const { arenas, meta, loadMore, onFilterChange } = useArenaHome()
  const router = useRouter()
  const { toCreate } = useArenaHelper()
  const { hasUCRReturnHref } = useReturnHref()

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

  const defaultFilterOptions = [
    {
      type: TournamentFilterOption.all,
      label: t('common:arenaSearchFilters.all'),
      loginRequired: false,
    },
    {
      type: TournamentFilterOption.ready,
      label: t('common:arenaSearchFilters.ready'),
      loginRequired: false,
    },
    {
      type: TournamentFilterOption.recruiting,
      label: t('common:arenaSearchFilters.recruiting'),
      loginRequired: false,
    },
    {
      type: TournamentFilterOption.beforeStart,
      label: t('common:arenaSearchFilters.beforeStart'),
      loginRequired: false,
    },
    {
      type: TournamentFilterOption.inProgress,
      label: t('common:arenaSearchFilters.inProgress'),
    },
    {
      type: TournamentFilterOption.completed,
      label: t('common:arenaSearchFilters.completed'),
      loginRequired: false,
    },
  ]

  const loginRequiredFilterOptions = [
    {
      type: TournamentFilterOption.joined,
      label: t('common:arenaSearchFilters.joined'),
      loginRequired: true,
    },
    {
      type: TournamentFilterOption.organized,
      label: t('common:arenaSearchFilters.organized'),
      loginRequired: true,
    },
  ]

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h2">アリーナ</Typography>

        <LoginRequired>
          <ButtonPrimary round gradient={false} onClick={toCreate} size="small">
            <AddRounded className={classes.addIcon} />
            {t('common:tournament_create.title')}
          </ButtonPrimary>
        </LoginRequired>
      </div>
      <Grid container className={classes.content}>
        <Box className={classes.filters}>
          {defaultFilterOptions.map((option) => (
            <ESChip
              key={option.type}
              color={option.type === filter ? 'primary' : undefined}
              className={classes.filterChip}
              label={option.label}
              onClick={() => onFilter(option.type)}
            />
          ))}
        </Box>
        <Box className={classes.filtersLoginRequired}>
          {loginRequiredFilterOptions.map((option) => (
            <LoginRequired key={option.type}>
              <ESChip
                key={option.type}
                color={option.type === filter ? 'primary' : undefined}
                className={classes.filterChip}
                label={option.label}
                onClick={() => onFilter(option.type)}
              />
            </LoginRequired>
          ))}
        </Box>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={arenas.length}
          next={loadMore}
          hasMore={!hasUCRReturnHref}
          loader={null}
          scrollThreshold={0.8}
        >
          {arenas.map((tournament, i) => (
            <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={3}>
              <TournamentCard tournament={tournament} />
            </Grid>
          ))}
        </InfiniteScroll>
        {meta.pending && (
          <Grid item xs={12}>
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: Colors.black,
    '& .MuiButtonBase-root.button-primary': {
      padding: '12px 16px',
    },
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  filtersLoginRequired: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  filterChip: {
    maxWidth: 'none',
    marginBottom: 16,
    marginRight: 16,
  },
  addIcon: {
    position: 'relative',
    left: -8,
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
