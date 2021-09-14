import { Box, useMediaQuery, useTheme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TopicRowItem from '@components/TopicRowItem'
import Pagination from '@material-ui/lab/Pagination'
import { Colors } from '@theme/colors'
import { useState, useEffect } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import PaginationMobile from '../../../Partials/PaginationMobile'
import useCommunityDetail from '../../useCommunityDetail'
import ESLoader from '@components/Loader'
import { TOPIC_STATUS } from '@constants/community.constants'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

const TopicListContainer: React.FC = () => {
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const classes = useStyles()
  const _theme = useTheme()
  const { t } = useTranslation(['common'])
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'))
  const router = useRouter()

  const { topicList, getTopicList, topicListMeta, topicListPageMeta } = useCommunityDetail()
  const { hash_key } = router.query

  useEffect(() => {
    getTopicList({ community_hash: String(hash_key), filter: TOPIC_STATUS.ALL, page: 1 })
  }, [])

  useEffect(() => {
    if (!topicListMeta.pending && topicListMeta.loaded) {
      setCount(topicListPageMeta?.total_pages)
    }
  }, [topicListMeta])

  useEffect(() => {
    getTopicList({ community_hash: String(hash_key), filter: TOPIC_STATUS.ALL, page: page })
  }, [page])

  const handleChange = (event, value) => {
    setPage(value)
    return event
  }

  return (
    <>
      <Box mt={2} />
      {_.isEmpty(topicList) ? (
        <Box display="flex" justifyContent="center">
          <Typography>{t('common:topic_comment.there_is_no_topic')}</Typography>
        </Box>
      ) : topicListMeta.pending ? (
        <Box className={classes.loaderBox}>
          <ESLoader />
        </Box>
      ) : (
        !!topicList &&
        !_.isEmpty(topicList) &&
        topicList.map((d, i) => {
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
            />
          )
        })
      )}
      {!_.isEmpty(topicList) && (
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
      )}
    </>
  )
}
const useStyles = makeStyles(() => ({
  loaderBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
export default TopicListContainer
