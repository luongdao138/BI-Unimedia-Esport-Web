import { useEffect } from 'react'
import { Grid, Box, makeStyles } from '@material-ui/core'
import useTournamentHistory from './useTournamentHistory'
import TournamentCard from '@components/TournamentCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'

interface Props {
  userId: any
}

const TournamentHistoryContainer: React.FC<Props> = ({ userId }) => {
  const classes = useStyles()
  const { tournamentHistories, tournamentHistory, page } = useTournamentHistory()

  useEffect(() => {
    tournamentHistory({ page: 1, user_id: userId })
  }, [])

  const loadMore = () => {
    if (page && page.current_page !== page.total_pages) {
      tournamentHistory({ page: page.current_page + 1, user_id: userId })
    }
  }

  return (
    <Grid container>
      <InfiniteScroll
        className={classes.container}
        dataLength={tournamentHistories.length}
        next={loadMore}
        hasMore={page && page.current_page !== page.total_pages}
        loader={
          <Grid item xs={12}>
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          </Grid>
        }
      >
        {tournamentHistories.map((tournament, i) => (
          <Grid key={i} item xs={6} md={4}>
            <TournamentCard tournament={tournament} />
          </Grid>
        ))}
      </InfiniteScroll>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    padding: 24,
    paddingTop: 16,
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default TournamentHistoryContainer
