import { useEffect } from 'react'
import { Grid, Box, makeStyles } from '@material-ui/core'
import useTournamentHistory from './useTournamentHistory'
import TournamentCard from '@components/TournamentCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'
import { TournamentListItem } from '@services/tournament.service'

interface Props {
  userCode: string
}

const TournamentHistoryContainer: React.FC<Props> = ({ userCode }) => {
  const classes = useStyles()
  const { tournamentHistories, tournamentHistory, page, meta, resetMeta } = useTournamentHistory()
  const hasNextPage = page && page.current_page !== page.total_pages
  useEffect(() => {
    tournamentHistory({
      page: 1,
      user_code: userCode,
    })
  }, [userCode])

  useEffect(() => {
    return () => resetMeta()
  }, [])

  const loadMore = () => {
    if (hasNextPage) {
      tournamentHistory({ page: page.current_page + 1, user_code: userCode })
    }
  }

  return (
    <Grid container>
      <InfiniteScroll
        className={classes.container}
        dataLength={tournamentHistories.length}
        next={loadMore}
        hasMore={hasNextPage}
        loader={null}
      >
        {tournamentHistories.length > 0
          ? tournamentHistories.map((tournament: TournamentListItem, i: number) => (
              <Grid key={i} item xs={6} md={4}>
                <TournamentCard tournament={tournament} />
              </Grid>
            ))
          : null}
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
    padding: 24,
    paddingTop: 16,
    paddingBottom: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default TournamentHistoryContainer
