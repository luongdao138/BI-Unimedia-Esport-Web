import React, { useEffect, useState } from 'react'
import TopicDetailHeader from '@containers/Community/TopicDetail/Partials/TopicDetailHeader'
import Comment from '@containers/Community/TopicDetail/Partials/Comment'
import MainTopic from '@containers/Community/TopicDetail/Partials/MainTopic'
import { Link, Box, Grid } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core'
import CommentInput from './Partials/CommentInput'
import useTopicDetail from './useTopicDetail'
import ESLoader from '@components/Loader'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import useCommunityDetail from '../Detail/useCommunityDetail'
import useCommunityHelper from '../hooks/useCommunityHelper'

const TopicDetailContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { back } = useRouter()
  const { topic_hash_key, hash_key } = router.query
  const {
    getTopicDetail,
    topic,
    topicDetailMeta,
    deleteTopic,
    getCommentsList,
    getCommentsListPage,
    commentsList,
    pages,
    commentsListMeta,
    commentsListPageMeta,
    getCommentsListNext,
    commentsListNextMeta,
  } = useTopicDetail()
  const { getCommunityDetail, communityDetail } = useCommunityDetail()
  const [reply, setReply] = useState<{ hash_key: string; comment_no: number } | any>({})
  const [lastCommentHashKey, setLastCommentHashKey] = useState<string>('')
  const [isBottomOfPage, setIsBottomOfPage] = useState<boolean>(false)
  const { isNotMember } = useCommunityHelper(communityDetail)
  const data = topic?.attributes

  useEffect(() => {
    if (topic_hash_key) {
      getCommunityDetail(String(hash_key))
      getTopicDetail({ topic_hash: String(topic_hash_key), community_hash: String(hash_key) })
      getCommentsListPage({ hash_key: String(topic_hash_key) })
    }
  }, [router])

  useEffect(() => {
    if (commentsListPageMeta.loaded) {
      getCommentsList({ hash_key: String(topic_hash_key), page: Number(pages.total_pages) })
    }
  }, [commentsListPageMeta])

  useEffect(() => {
    if (commentsList) {
      setLastCommentHashKey(String(commentsList[_.findLastIndex(commentsList)]?.attributes?.hash_key))
    }
  }, [commentsList])

  useEffect(() => {
    if (isBottomOfPage && !commentsListNextMeta.pending) {
      loadMore()
    }
  }, [isBottomOfPage])

  const handleDeleteTopic = () => {
    deleteTopic({ hash_key: String(topic_hash_key) })
  }

  const handleBack = () => back()

  const hasPrevious = pages && Number(pages.current_page) > 1

  const loadMore = () => {
    if (_.isEmpty(commentsList)) {
      getCommentsListNext({ hash_key: String(topic_hash_key) })
      return
    }
    getCommentsListNext({ hash_key: String(topic_hash_key), comment_hash_key: lastCommentHashKey })
  }

  const loadPrevious = () => {
    if (hasPrevious && !commentsListMeta.pending) {
      getCommentsList({ hash_key: String(topic_hash_key), page: Number(pages.current_page) - 1 })
    }
  }

  const renderComments = () => {
    return (
      <>
        {commentsList.map((comment, i) => {
          return <Comment key={i} comment={comment} community={communityDetail} handleReply={setReply} />
        })}
      </>
    )
  }

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box flex={1}>
          {topicDetailMeta.loaded && (
            <>
              <TopicDetailHeader title={data.title} isTopic={true} onHandleBack={handleBack} />
              <MainTopic topic={topic} handleDelete={handleDeleteTopic} community={communityDetail} />
            </>
          )}
          {hasPrevious && (
            <Box className={classes.link}>
              <Link onClick={loadPrevious} style={{ cursor: 'pointer' }}>
                {t('common:community.topic.view_past_comments')}
              </Link>
            </Box>
          )}
          {commentsListMeta.pending && (
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          )}
          {!!commentsList && commentsList.length > 0 && (
            <InfiniteScroll
              dataLength={commentsList.length}
              next={() => {
                return
              }}
              hasMore={true}
              scrollableTarget="scrollableDiv"
              scrollThreshold={0.99}
              style={{ overflow: 'hidden ' }}
              loader={null}
              onScroll={() => {
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight - (commentsListNextMeta.pending ? 164 : 50)) {
                  setIsBottomOfPage(true)
                } else {
                  setIsBottomOfPage(false)
                }
              }}
            >
              {renderComments()}
            </InfiniteScroll>
          )}

          {commentsListNextMeta.pending && (
            <Grid item xs={12}>
              <Box my={4} mb={6} display="flex" justifyContent="center" alignItems="center">
                <ESLoader />
              </Box>
            </Grid>
          )}
        </Box>
        {!isNotMember && (
          <Box className={classes.inputContainer}>
            <CommentInput reply_param={reply} handleReply={setReply} loadMore={loadMore} />
          </Box>
        )}
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'sticky',
    bottom: 0,
    padding: 11,
    width: '100%',
    background: '#101010',
    willChange: 'transform',
  },
}))

export default TopicDetailContainer
