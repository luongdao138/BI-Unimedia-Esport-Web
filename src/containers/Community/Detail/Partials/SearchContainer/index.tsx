import { Box, IconButton, OutlinedInput, Icon, Button, useMediaQuery, useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ESCheckbox from '@components/Checkbox'
import ESLabel from '@components/Label'
import TopicRowItem from '@components/TopicRowItem'
import Pagination from '@material-ui/lab/Pagination'
import PaginationMobile from '../../../Partials/PaginationMobile'

const InfoContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  // TODO change useSearch when data is ready
  const [hasValue, setHasvalue] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const classes = useStyles()
  const [showResult, setShowResult] = useState(false)
  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))

  useEffect(() => {
    if (!_.isEmpty(value)) {
      setHasvalue(true)
    } else {
      setHasvalue(false)
    }
  }, [value])

  const handleCheckbox = () => {
    //
  }

  const handleSearch = () => {
    setShowResult(true)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClear = () => {
    setHasvalue(false)
    setValue('')
  }

  const renderIcon = () => {
    if (hasValue) {
      return (
        <IconButton onClick={onClear} aria-label="back" size="small" disableRipple>
          <Icon fontSize="small" className={classes.closeIcon + ' fa fa-times-circle'} />
        </IconButton>
      )
    } else {
      return null
    }
  }

  const dummy_data = [
    {
      title: '自己紹介しよう！ 自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜 はじめまして！　ダミーテキストです〜はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 901,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 902,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 903,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 904,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 905,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 906,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 907,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 908,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 909,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 910,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 911,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 912,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 913,
    },
    {
      title: '自己紹介しよう！',
      last_comment: 'はじめまして！　ダミーテキストです〜',
      latest_date: '数秒前',
      comment_count: 914,
    },
  ]

  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const chunkSize = 10

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
    <Box ml={2}>
      <Box mt={3} mb={1}>
        <form onSubmit={handleSearch} className={classes.searchContainer}>
          <OutlinedInput
            autoComplete="off"
            onChange={onChange}
            placeholder={t('common:community.detail_search.placeholder')}
            value={value}
            classes={{ root: classes.input }}
            margin="dense"
            endAdornment={renderIcon()}
          />

          <Button
            onClick={handleSearch}
            className={classes.searchBtn}
            variant="outlined"
            startIcon={<Icon className={`fa fa-search ${classes.icon}`} />}
          />
        </form>
      </Box>

      <Box mb={5}>
        <ESCheckbox disableRipple onChange={handleCheckbox} label={t('common:community.detail_search.by_title')} />
      </Box>
      {showResult && (
        <>
          <Box mb={2}>
            <ESLabel label={t('common:community.detail_search.result')} bold />
          </Box>
          <>
            {chunks(dummy_data, page).map((d, i) => {
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
              {isMobile ? (
                <PaginationMobile page={page} pageNumber={count} setPage={setPage} count={count} />
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
        </>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  searchBtn: {
    fontWeight: 400,
    height: 38,
    minWidth: 33,
    backgroundColor: Colors.black,
    borderBottomLeftRadius: 'unset',
    borderTopLeftRadius: 'unset',
    borderLeft: 0,
    padding: `${theme.spacing(0.75)}px 0`,
    '&:before': {
      content: "''",
      background: Colors.white_opacity[20],
      position: 'absolute',
      left: 0,
      height: '80%',
      width: '1px',
    },
  },
  icon: {
    paddingLeft: theme.spacing(0.75),
    color: Colors.white,
    fontSize: '17px !important',
  },
  closeIcon: {
    color: '#888',
  },
  input: {
    width: '100%',
    borderBottomRightRadius: 'unset',
    borderTopRightRadius: 'unset',
    backgroundColor: Colors.black,
    '& .MuiOutlinedInput-notchedOutline': {
      borderRight: 0,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderRightStyle: 'solid',
      borderWidth: 1,
      borderColor: '#fff',
    },
    '&:hover:not(.Mui-focused)': {
      borderRightStyle: 'solid !important',
    },
    '&.Mui-error .MuiOutlinedInput-notchedOutline': {
      background: 'rgba(247, 247, 53, 0.1)',
    },
    '&.Mui-disabled': {
      backgroundColor: 'transparent',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
    },
    '& :-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #000000 inset',
    },
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    width: '65%',
  },
  [theme.breakpoints.down('sm')]: {
    searchContainer: {
      width: '100%',
    },
  },
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
