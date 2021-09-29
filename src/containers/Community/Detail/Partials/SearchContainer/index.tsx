import { Box, IconButton, OutlinedInput, Icon, Button, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ESCheckbox from '@components/Checkbox'
import ESLabel from '@components/Label'
import TopicRowItem from '@components/TopicRowItem'
import useTopicSearch from '../useTopicSearch'
import moment from 'moment'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import ESLoader from '@components/Loader'
import Pagination from '@containers/Community/Partials/Pagination'

const InfoContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const router = useRouter()
  const [hasValue, setHasvalue] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  const classes = useStyles()
  const [showResult, setShowResult] = useState(false)
  const [isOnlyTitle, setIsOnlyTitle] = useState(false)
  const { topicList, getTopicList, topicListMeta, pages } = useTopicSearch()
  const hash_key = String(router.query.hash_key)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const [isSearched, setIsSearched] = useState<boolean>(false)

  useEffect(() => {
    if (!_.isEmpty(value)) {
      setHasvalue(true)
    } else {
      setHasvalue(false)
    }
  }, [value])

  const handleCheckbox = () => {
    setIsOnlyTitle(!isOnlyTitle)
  }

  const handleSearch = () => {
    getTopicList({ community_hash: hash_key, keyword: value.trim(), only_title: isOnlyTitle, page: 1 })
    setShowResult(true)
    setIsSearched(true)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    setIsSearched(false)
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

  useEffect(() => {
    if (topicList) {
      setCount(pages?.total_pages)
    }
  }, [pages])

  useEffect(() => {
    if (showResult) {
      getTopicList({ community_hash: hash_key, keyword: value, only_title: isOnlyTitle, page: page })
    }
  }, [page])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch()
  }

  return (
    <Box ml={2}>
      <Box mt={3} mb={1}>
        <form method="post" onSubmit={handleSubmit} className={classes.searchContainer}>
          <OutlinedInput
            autoComplete="off"
            onChange={onChange}
            placeholder={t('common:community.detail_search.placeholder')}
            value={value}
            classes={{ root: classes.input }}
            margin="dense"
            endAdornment={renderIcon()}
            inputProps={{ maxLength: 50 }}
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
        <ESCheckbox disableRipple onChange={handleCheckbox} label={t('common:community.detail_search.by_title')} value={isOnlyTitle} />
      </Box>
      {showResult && (
        <>
          <Box mb={2}>
            <ESLabel label={t('common:community.detail_search.result')} bold />
          </Box>
          {!!topicList && topicList.length > 0 && topicListMeta.loaded && (
            <>
              {topicList.map((d, i) => {
                const attr = d.attributes
                const latestDate = moment(attr.created_at).isSameOrAfter(attr.last_comment_date) ? attr.created_at : attr.last_comment_date
                return (
                  <TopicRowItem
                    key={i}
                    handleClick={() => router.push(`${ESRoutes.TOPIC.replace(/:id/gi, attr.community_hash)}/${attr.hash_key}`)}
                    title={attr.topic_title}
                    last_comment={attr.last_comment.data}
                    latest_date={latestDate}
                    comment_count={attr.comment_count}
                    keyword={value}
                    isSearched={isSearched}
                    isOnlyTitle={isOnlyTitle}
                  />
                )
              })}

              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination page={page} pageNumber={count} setPage={setPage} disabled={topicListMeta.pending} />
              </Box>
            </>
          )}
          {topicListMeta.loaded && topicList.length == 0 && (
            <Typography variant="body1">{t('common:community.detail_search.no_data')}</Typography>
          )}
          {topicList.length === 0 && !topicListMeta.loaded && topicListMeta.pending && (
            <Grid item xs={12}>
              <Box my={4} display="flex" justifyContent="center" alignItems="center">
                <ESLoader />
              </Box>
            </Grid>
          )}
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
      borderRightWidth: 1,
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

export default InfoContainer
