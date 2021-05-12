import { useEffect } from 'react'
import { Grid, Box, makeStyles } from '@material-ui/core'
import useActivityLogs from './useActivityLogs'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'
import ActivityItem from '../Partials/ActivityItem'

interface Props {
  userId: any
}

const ActivityLogsContainer: React.FC<Props> = ({ userId }) => {
  const classes = useStyles()
  const { activityLogs, getActivityLogs } = useActivityLogs()

  useEffect(() => {
    getActivityLogs({
      //page: 1,
      user_id: userId,
    })
  }, [])

  const loadMore = () => {
    // if (page && page.current_page !== page.total_pages) {
    getActivityLogs({
      // page: page.current_page + 1,
      user_id: userId,
    })
    // }
  }

  return (
    <Grid container>
      <InfiniteScroll
        className={classes.container}
        dataLength={activityLogs.length}
        next={loadMore}
        // hasMore={page && page.current_page !== page.total_pages}
        hasMore={false}
        loader={
          <Grid item xs={12}>
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          </Grid>
        }
      >
        {activityLogs.map((log, i) => (
          <ActivityItem activity={log} key={i} />
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

export default ActivityLogsContainer
