import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TopicRowItem from '@components/TopicRowItem'
import Pagination from '@material-ui/lab/Pagination'
import { Colors } from '@theme/colors'
import { useState, useEffect } from 'react'

const InfoContainer: React.FC = () => {
  const dummy_data = [
    {
      title: '自己紹介しよう！ 自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！',
      mail: '@watanabe @watanabe@watanabe@watanabe',
      description: 'はじめまして！　ダミーテキストです〜 はじめまして！　ダミーテキストです〜はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 901,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 902,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 903,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 904,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 905,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 906,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 907,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 908,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 909,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 910,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 911,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 912,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 913,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 914,
    },
  ]

  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const chunkSize = 10
  const classes = useStyles()
  useEffect(() => {
    setCount(Math.ceil(dummy_data.length / 10))
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

      {chunks(dummy_data, page).map((d, i) => {
        return (
          <TopicRowItem key={i} title={d.title} mail={d.mail} description={d.description} date={d.date} comment_number={d.comment_number} />
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
export default InfoContainer
