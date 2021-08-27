import { Box, useMediaQuery, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TopicRowItem from '@components/TopicRowItem'
import Pagination from '@material-ui/lab/Pagination'
import { Colors } from '@theme/colors'
import { useState, useEffect } from 'react'
import { TopicDetail } from '@services/community.service'
import moment from 'moment'
import PaginationMobile from '../../../Partials/PaginationMobile'

type Props = {
  topicList: TopicDetail[]
  communityHashKey?: string
}

const TopicListContainer: React.FC<Props> = ({ topicList, communityHashKey }) => {
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const chunkSize = 10
  const classes = useStyles()
  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))

  useEffect(() => {
    if (topicList) {
      setCount(Math.ceil(topicList.length / 10))
    }
  }, [])

  const handleChange = (event, value) => {
    setPage(value)
    return event
  }

  const chunks = (arr, index) => {
    const chunk_array = []
    for (let i = 0; i < arr.length; i += chunkSize) chunk_array.push(arr.slice(i, i + chunkSize))
    return chunk_array[index - 1]
  }

  return (
    <>
      <Box mt={2} />
      {!!topicList &&
        topicList.length > 0 &&
        chunks(topicList, page).map((d, i) => {
          const attr = d.attributes
          const latestDate = moment(attr.created_at).isSameOrAfter(attr.last_comment_date) ? attr.created_at : attr.last_comment_date
          return (
            <TopicRowItem
              key={i}
              title={attr.topic_title}
              last_comment={attr.last_comment.data}
              latest_date={latestDate}
              comment_count={attr.comment_count}
              hash_key={attr.hash_key}
              communityHashKey={communityHashKey}
            />
          )
        })}
      <Box display="flex" justifyContent="center" mt={4}>
        {isMobile ? (
          <PaginationMobile page={page} pageNumber={count} setPage={setPage} />
        ) : (
          <Pagination
            className={classes.pagination}
            count={count}
            page={page}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            hideNextButton
            hidePrevButton
            showFirstButton
            showLastButton
          />
        )}
      </Box>
    </>
  )
}
const useStyles = makeStyles(() => ({
  pagination: {
    zIndex: 1,
    '& .MuiPaginationItem-root': {
      color: Colors.white,
      borderRadius: 4,
    },
    '& .MuiPaginationItem-outlined': {
      borderColor: Colors.primary,
    },
    '& .Mui-selected': {
      backgroundColor: Colors.primary,
      color: Colors.white,
    },
    '& .MuiPaginationItem-ellipsis': {
      height: 32,
      border: '1px solid',
      borderColor: Colors.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}))
export default TopicListContainer
