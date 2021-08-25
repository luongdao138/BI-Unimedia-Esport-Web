import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TopicRowItem from '@components/TopicRowItem'
import Pagination from '@material-ui/lab/Pagination'
import { Colors } from '@theme/colors'
import { useState, useEffect } from 'react'
import { TopicDetail } from '@services/community.service'

type Props = {
  topicList: TopicDetail[]
}

const TopicListContainer: React.FC<Props> = ({ topicList }) => {
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const chunkSize = 10
  const classes = useStyles()

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
        chunks(topicList, page).map((d, i) => {
          return (
            <TopicRowItem
              key={i}
              title={d.title}
              last_comment={d.last_comment}
              latest_date={d.latest_date}
              comment_count={d.comment_count}
            />
          )
        })}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          className={classes.pagination}
          count={count}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Box>
    </>
  )
}
const useStyles = makeStyles(() => ({
  pagination: {
    zIndex: 1,
    '& .MuiPaginationItem-root': {
      color: Colors.white,
    },
    '& .MuiPaginationItem-outlined': {
      borderColor: Colors.primary,
    },
    '& .Mui-selected': {
      backgroundColor: Colors.primary,
      color: Colors.white,
    },
  },
}))
export default TopicListContainer
