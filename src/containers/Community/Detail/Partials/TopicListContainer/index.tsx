import { Box, Typography } from '@material-ui/core'
import TopicRowItem from '@components/TopicRowItem'
import { useState, useEffect } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useCommunityDetail from '../../useCommunityDetail'
import ESLoader from '@components/FullScreenLoader'
import { TOPIC_STATUS } from '@constants/community.constants'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import Pagination from '@containers/Community/Partials/Pagination'

const TopicListContainer: React.FC = () => {
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const { t } = useTranslation(['common'])
  const router = useRouter()

  const { topicList, getTopicList, topicListMeta, topicListPageMeta } = useCommunityDetail()
  const { hash_key } = router.query

  useEffect(() => {
    if (!topicListMeta.pending && topicListMeta.loaded) {
      setCount(topicListPageMeta?.total_pages)
    }
  }, [topicListMeta])

  useEffect(() => {
    getTopicList({ community_hash: String(hash_key), filter: TOPIC_STATUS.ALL, page: page })
  }, [page])

  return (
    <>
      <Box mt={2} />
      <ESLoader open={!topicListMeta.loaded && topicListMeta.pending} />
      {topicListMeta.loaded && _.isEmpty(topicList) ? (
        <Box display="flex" justifyContent="center">
          <Typography>{t('common:topic_comment.there_is_no_topic')}</Typography>
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
          <Pagination page={page} pageNumber={count} setPage={setPage} disabled={topicListMeta.pending} />
        </Box>
      )}
    </>
  )
}

export default TopicListContainer
