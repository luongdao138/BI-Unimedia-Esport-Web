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
import { useState } from 'react'

const ArenaHome: React.FC = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const { arenas, page, meta, loadMore, onFilterChange } = useArenaHome()
  const { toCreate } = useArenaHelper()
  const [selectedFilter, setSelectedFilter] = useState(TournamentFilterOption.all)

  const onFilter = (filter: TournamentFilterOption) => {
    if (selectedFilter !== filter) {
      onFilterChange(filter)
    }
    setSelectedFilter(filter)
  }

  const defaultFilterOptions = [
    {
      type: TournamentFilterOption.all,
      label: t('common:arenaSearchFilters.all'),
    },
    {
      type: TournamentFilterOption.beforeEvent,
      label: t('common:arenaSearchFilters.beforeEvent'),
    },
    {
      type: TournamentFilterOption.recruiting,
      label: t('common:arenaSearchFilters.recruiting'),
    },
    {
      type: TournamentFilterOption.inProgress,
      label: t('common:arenaSearchFilters.inProgress'),
    },
    {
      type: TournamentFilterOption.completed,
      label: t('common:arenaSearchFilters.completed'),
    },
    {
      type: TournamentFilterOption.joined,
      label: t('common:arenaSearchFilters.joined'),
    },
    {
      type: TournamentFilterOption.organized,
      label: t('common:arenaSearchFilters.organized'),
    },
  ]

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h2">アリーナ</Typography>
        <ButtonPrimary round gradient={false} onClick={toCreate} size="small">
          <AddRounded className={classes.addIcon} />
          {t('common:tournament_create.title')}
        </ButtonPrimary>
      </div>
      <Grid container className={classes.content}>
        <Box className={classes.filters}>
          {defaultFilterOptions.map((option) => (
            <ESChip
              key={option.type}
              color={option.type === selectedFilter ? 'primary' : undefined}
              className={classes.filterChip}
              label={option.label}
              onClick={() => onFilter(option.type)}
            />
          ))}
        </Box>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={arenas.length}
          next={loadMore}
          hasMore={page && page.current_page !== page.total_pages}
          loader={null}
          scrollThreshold="1px"
        >
          {arenas.map((tournament, i) => (
            <Grid key={i} item xs={6} md={4}>
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
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
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
