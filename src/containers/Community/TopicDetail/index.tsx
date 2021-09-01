import React, { useEffect, useState } from 'react'
import CommunityDetailHeader from '@containers/Community/TopicDetail/Partials/CommunityDetailHeader'
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
    commentsList,
    pages,
    getComments,
    commentsListMeta,
  } = useTopicDetail()
  const [reply, setReply] = useState<{ hash_key: string; id: number } | any>({})

  const data = topic?.attributes

  useEffect(() => {
    if (topic_hash_key) {
      getTopicDetail({ topic_hash: String(topic_hash_key), community_hash: hash_key })
      getCommentsList({ hash_key: String(topic_hash_key) })
    }
  }, [router])

  const handleDeleteTopic = () => {
    deleteTopic({ hash_key: String(topic_hash_key) })
  }

  const handleBack = () => back()

  const hasNextPage = pages && Number(pages.current_page) !== Number(pages.total_pages)

  const loadMore = () => {
    if (hasNextPage) {
      getComments({ hash_key: String(topic_hash_key), page: Number(pages.current_page) + 1 })
    }
  }

  const renderComments = () => {
    return (
      <>
        {commentsList.map((comment, i) => {
          return <Comment key={i} comment={comment} handleReply={setReply} />
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
              <CommunityDetailHeader title={data.title} isTopic onHandleBack={handleBack} />
              <MainTopic topic={topic} handleDelete={handleDeleteTopic} />
            </>
          )}
          {hasNextPage && (
            <Box className={classes.link}>
              <Link onClick={loadMore} style={{ cursor: 'pointer' }}>
                {t('common:community.topic.view_past_comments')}
              </Link>
            </Box>
          )}
          {!!commentsList && commentsList.length > 0 && (
            <InfiniteScroll
              dataLength={commentsList.length}
              next={loadMore}
              hasMore={hasNextPage}
              scrollableTarget="scrollableDiv"
              scrollThreshold={0.99}
              style={{ overflow: 'hidden ' }}
              loader={null}
            >
              {renderComments()}
            </InfiniteScroll>
          )}
          {commentsListMeta.pending && (
            <Grid item xs={12}>
              <Box my={4} mb={10} display="flex" justifyContent="center" alignItems="center">
                <ESLoader />
              </Box>
            </Grid>
          )}
        </Box>
        <Box className={classes.inputContainer}>
          <CommentInput reply_param={reply} handleReply={setReply} />
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
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
  scroll: {
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      borderRadius: 6,
    },
  },
  list: {
    overflow: 'auto',
    overflowX: 'hidden',
  },
}))

export default TopicDetailContainer
