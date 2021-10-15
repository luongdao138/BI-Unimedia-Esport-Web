import { Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import TopicRowItem from '@components/TopicRowItem'
import { useState, useEffect, createRef, useLayoutEffect } from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useCommunityDetail from '../../useCommunityDetail'
import ESLoader from '@components/FullScreenLoader'
import { TOPIC_STATUS } from '@constants/community.constants'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import Pagination from '@containers/Community/Partials/Pagination'
import TopicCreateButton from '@containers/Community/Partials/TopicCreateButton'
import styled from 'styled-components'

type StyleParams = {
  leftPosition: number
}
const StyledBox = styled(Box)``
const contentRef = createRef<HTMLDivElement>()

type TopicListProps = {
  toCreateTopic: () => void
  isNotMember: boolean
}

const TopicListContainer: React.FC<TopicListProps> = ({ toCreateTopic, isNotMember }) => {
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(1)
  const { t } = useTranslation(['common'])
  const router = useRouter()

  const { topicList, getTopicList, topicListMeta, topicListPageMeta } = useCommunityDetail()
  const { hash_key } = router.query

  const _theme = useTheme()
  const isMobile = useMediaQuery(_theme.breakpoints.down('sm'), { noSsr: true })

  const [position, setPosition] = useState<number>()

  useLayoutEffect(() => {
    const updateSize = () => {
      const width = document.getElementById('content-main').getBoundingClientRect().right
      setPosition(width)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const classes = useStyles({ leftPosition: position })

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
      <StyledBox ref={contentRef}>
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
        {!isNotMember && (
          <Box className={classes.topicCreateContainer}>
            <TopicCreateButton onClick={toCreateTopic} isMobile={isMobile} />
          </Box>
        )}
      </StyledBox>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  topicCreateContainer: {
    zIndex: 50,
    display: 'flex',
    justifyContent: 'flex-end',
    width: 99,
    left: (props: StyleParams) => props.leftPosition - 120,
    position: 'fixed',
    bottom: theme.spacing(5),
  },
  [theme.breakpoints.down('sm')]: {
    topicCreateContainer: {
      bottom: theme.spacing(3),
    },
  },
}))

export default TopicListContainer
