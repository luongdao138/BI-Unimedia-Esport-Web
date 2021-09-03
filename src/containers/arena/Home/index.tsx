import { Grid, Box, makeStyles } from '@material-ui/core'
import useArenaHome from './useArenaHome'
import ESLoader from '@components/Loader'
import HomeCard from '@components/TournamentCard/HomeCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { TournamentFilterOption } from '@services/arena.service'
import { Colors } from '@theme/colors'
import useArenaHelper from '../hooks/useArenaHelper'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'
import _ from 'lodash'
import HeaderArea from './HeaderArea'

interface ArenaHomeProps {
  filter: TournamentFilterOption
}

const ArenaHome: React.FC<ArenaHomeProps> = ({ filter }) => {
  const classes = useStyles()
  const { arenasFiltered, meta, loadMore, onFilterChange } = useArenaHome()
  const router = useRouter()
  const { toCreate } = useArenaHelper()
  const { hasUCRReturnHref } = useReturnHref()

  useEffect(() => {
    if (!hasUCRReturnHref) {
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

    onFilterChange(filterVal)
  }, [router.query])

  const onFilter = (filter: TournamentFilterOption) => {
    router.push(`${ESRoutes.ARENA}?filter=${filter}`, undefined, { shallow: true })
    return null
  }

  return (
    <>
      <HeaderArea onFilter={onFilter} toCreate={toCreate} filter={filter} />
      <Grid container className={classes.content}>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={arenasFiltered.length}
          next={!meta.pending && loadMore}
          hasMore={!hasUCRReturnHref}
          loader={null}
          scrollThreshold={'1px'}
        >
          {arenasFiltered.map((tournament, i) => (
            <Grid key={i} item xs={12} sm={12} md={4} lg={4} xl={3}>
              <HomeCard tournament={tournament} />
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
