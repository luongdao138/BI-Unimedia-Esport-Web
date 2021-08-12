import { Box, IconButton, OutlinedInput, Icon, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ESCheckbox from '@components/Checkbox'
import ESLabel from '@components/Label'
import TopicRowItem from '@components/TopicRowItem'
import Pagination from '@material-ui/lab/Pagination'

const InfoContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  // TODO change useSearch when data is ready
  const [hasValue, setHasvalue] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const classes = useStyles()
  const [showResult, setShowResult] = useState(false)

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

  useEffect(() => {
    setCount(Math.ceil(dummy_data.length / 10))
  }, [])

  const handleChange = (event, value) => {
    setPage(value)
    return event
  }

  const chunks = (arr, chunkSize, index) => {
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
            {chunks(dummy_data, chunkSize, page).map((d, i) => {
              return (
                <TopicRowItem
                  key={i}
                  title={d.title}
                  mail={d.mail}
                  description={d.description}
                  date={d.date}
                  comment_number={d.comment_number}
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
        </>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  searchBtn: {
    fontWeight: 400,
    height: 37.6,
    minWidth: 33,
    backgroundColor: Colors.black,
    borderBottomLeftRadius: 'unset',
    borderTopLeftRadius: 'unset',
    borderLeft: 0,
    padding: `${theme.spacing(0.75)}px 0`,
    '&:before': {
      content: "' '",
      background: Colors.white_opacity[20],
      position: 'absolute',
      left: 0,
      height: '80%',
      width: '1px',
      top: '50%',
      transform: 'translateY(-50%)',
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
    zIndex: 11,
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
    width: 500,
  },
  pagination: {
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
