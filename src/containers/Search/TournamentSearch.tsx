import { useEffect, useState } from 'react'
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import useTournamentSearch from './useTournamentSearch'
import ESLoader from '@components/Loader'
import TournamentCard from '@components/TournamentCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTranslation } from 'react-i18next'
import useSearch from '@containers/Search/useSearch'
import useLogout from '@containers/Logout/useLogout'

const TournamentSearchContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { searchKeyword } = useSearch()
  const { meta: logoutMeta } = useLogout()
  const { searchTournaments, tournamentSearch, page, meta, resetMeta, resetSearchTournaments } = useTournamentSearch()
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    if (!logoutMeta.pending) {
      setKeyword(searchKeyword)
      tournamentSearch({ page: 1, keyword: searchKeyword })
    }

    return () => {
      resetSearchTournaments()
      resetMeta()
    }
  }, [searchKeyword])

  useEffect(() => {
    return () => {
      resetSearchTournaments()
      resetMeta()
    }
  }, [])

  const loadMore = () => {
    if (page && page.current_page !== page.total_pages) {
      tournamentSearch({ page: page.current_page + 1, keyword: keyword })
    }
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
      <InfiniteScroll
        className={classes.container}
        dataLength={searchTournaments.length}
        next={loadMore}
        hasMore={page && page.current_page !== page.total_pages}
        loader={null}
        scrollThreshold="1px"
      >
        {searchTournaments.map((tournament, i) => (
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
  )
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default TournamentSearchContainer
