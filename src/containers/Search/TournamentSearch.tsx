import { useEffect, useState } from 'react'
import { Grid, Box, Typography, makeStyles } from '@material-ui/core'
import useTournamentSearch from './useTournamentSearch'
import ESLoader from '@components/Loader'
import TournamentCard from '@components/TournamentCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTranslation } from 'react-i18next'
import useSearch from '@containers/Search/useSearch'

const TournamentSearchContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { searchKeyword } = useSearch()
  const { searchTournaments, tournamentSearch, page, meta, resetMeta } = useTournamentSearch()
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    setKeyword(searchKeyword)
    tournamentSearch({ page: 1, keyword: searchKeyword })

    return () => resetMeta()
  }, [searchKeyword])

  const loadMore = () => {
    if (page && page.current_page !== page.total_pages) {
      tournamentSearch({ page: page.current_page + 1, keyword: keyword })
    }
  }

  return (
    <Grid container>
      {!!page && (
        <Grid item xs={12}>
          <Typography variant="caption" gutterBottom>
            {`${t('common:common.search_results')} ${page?.total_count}${t('common:common.total')}`}
          </Typography>
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
  )
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default TournamentSearchContainer
