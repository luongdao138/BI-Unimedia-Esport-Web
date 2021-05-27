import { useEffect } from 'react'
import { Grid, Box, makeStyles } from '@material-ui/core'
import useActivityLogs from './useActivityLogs'
import ESLoader from '@components/Loader'
import ActivityItem from '../Partials/ActivityItem'

import { FixedSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'

interface Props {
  userCode: string
}

const ActivityLogsContainer: React.FC<Props> = ({ userCode }) => {
  const classes = useStyles()
  const { activityLogs, getActivityLogs, pages, meta, resetMeta } = useActivityLogs()
  useEffect(() => {
    return () => resetMeta()
  }, [])

  useEffect(() => {
    getActivityLogs({
      page: 1,
      user_code: userCode,
    })
  }, [userCode])

  const hasNextPage = pages && pages.current_page !== pages.total_pages

  const loadMore = () => {
    if (hasNextPage) {
      getActivityLogs({
        page: pages.current_page + 1,
        user_code: userCode,
      })
    }
  }

  const Row = (props: { index: number; style: React.CSSProperties; data: any }) => {
    const { index, style, data } = props
    const log = data[index]
    return (
      <div style={style} key={index}>
        <ActivityItem activity={log} />
      </div>
    )
  }

  const itemCount = hasNextPage ? activityLogs.length + 1 : activityLogs.length
  return (
    <Box className={(classes.container, 'scroll-bar')}>
      <InfiniteLoader isItemLoaded={(index: number) => index < activityLogs.length} itemCount={itemCount} loadMoreItems={loadMore}>
        {({ onItemsRendered, ref }) => (
          <List
            height={800}
            width={'100%'}
            itemCount={activityLogs.length}
            itemData={activityLogs}
            itemSize={66}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
      {meta.pending && (
        <Grid item xs={12}>
          <Box my={4} display="flex" justifyContent="center" alignItems="center">
            <ESLoader />
          </Box>
        </Grid>
      )}
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    height: 800,
    padding: 24,
    paddingTop: 16,
    paddingBottom: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

export default ActivityLogsContainer
