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
  const { activityLogs, getActivityLogs, pages, meta, resetMeta } = useActivityLogs()

  useEffect(() => {
    getActivityLogs({
      page: 1,
      user_code: userCode,
    })
  }, [userCode])

  useEffect(() => {
    return () => resetMeta()
  }, [])

  const loadMore = () => {
    if (pages && pages.current_page !== pages.total_pages) {
      getActivityLogs({
        page: pages.current_page + 1,
        user_code: userCode,
      })
    }
  }

  return (
    <Grid container>
      <InfiniteScroll
        className={classes.container}
        dataLength={activityLogs.length}
        next={loadMore}
        hasMore={pages && pages.current_page !== pages.total_pages}
        loader={null}
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
    paddingBottom: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default ActivityLogsContainer
