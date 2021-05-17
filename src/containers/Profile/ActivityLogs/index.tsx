import { useEffect } from 'react'
import { Grid, Box, makeStyles } from '@material-ui/core'
import useActivityLogs from './useActivityLogs'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'
import ActivityItem from '../Partials/ActivityItem'

interface Props {
  userCode: string
}

const ActivityLogsContainer: React.FC<Props> = ({ userCode }) => {
  const classes = useStyles()
  const { activityLogs, getActivityLogs, meta, resetMeta } = useActivityLogs()

  useEffect(() => {
    getActivityLogs({
      // page: 1,
      user_code: userCode,
    })
    return () => resetMeta()
  }, [])

  const loadMore = () => {
    // if (page && page.current_page !== page.total_pages) {
    getActivityLogs({
      // page: page.current_page + 1,
      user_code: userCode,
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
          null
          // <Grid item xs={12}>
          //   <Box my={4} display="flex" justifyContent="center" alignItems="center">
          //     <ESLoader />
          //   </Box>
          // </Grid>
        }
      >
        {activityLogs.map((log, i) => (
          <ActivityItem activity={log} key={i} />
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
    padding: 24,
    paddingTop: 16,
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default ActivityLogsContainer
