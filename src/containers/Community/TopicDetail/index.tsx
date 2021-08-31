import React, { useEffect, useState } from 'react'
import CommunityDetailHeader from '@containers/Community/TopicDetail/Partials/CommunityDetailHeader'
import Comment from '@containers/Community/TopicDetail/Partials/Comment'
import MainTopic from '@containers/Community/TopicDetail/Partials/MainTopic'
import { Link, Box } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core'
import CommentInput from './Partials/CommentInput'
import useTopicDetail from './useTopicDetail'
import { useRouter } from 'next/router'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import InfiniteScroll from 'react-infinite-scroll-component'
import _ from 'lodash'

const TopicDetailContainer: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { back } = useRouter()
  const { topic_hash_key } = router.query
  const { getTopicDetail, topic, topicDetailMeta, deleteTopic, getCommentsList, commentsList, pages, getComments } = useTopicDetail()
  const data = topic?.attributes
  const commentsDataReversed = _.reverse(_.clone(commentsList))
  const [reply, setReply] = useState<{ hash_key: string; id: number } | any>({})

  useEffect(() => {
    if (topic_hash_key) {
      getTopicDetail({ hash_key: String(topic_hash_key) })
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
        {commentsDataReversed.map((d, i) => {
          return (
            <Comment
              key={i}
              discription={d.attributes.content}
              image={d.attributes.attachments[0]?.assets_url}
              userAvatar={d.attributes.owner_profile}
              username={d.attributes.owner_nickname}
              mail={d.attributes.user_code}
              date={CommonHelper.staticSmartTime(d.attributes.created_at)}
              number={d.attributes.comment_no}
              hash_key={d.attributes.hash_key}
              id={d.attributes.id}
              handleReply={setReply}
            />
          )
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
              <MainTopic
                username={data.owner_name}
                user_avatar={data.owner_profile}
                mail={data.owner_email}
                date={`${CommonHelper.staticSmartTime(data.created_at)}`}
                count={data.like_count}
                description={data.content}
                hash_key={data.hash_key}
                image={(!!data.attachments && data.attachments[0].assets_url) || ''}
                handleDelete={handleDeleteTopic}
              />
            </>
          )}
          <Box className={classes.link}>
            <Link>↑過去のコメントを表示する</Link>
          </Box>
          {/* {!!commentsList &&
            commentsList.length > 0 &&
            commentsDataReversed.map((d, i) => {
              return (
                <Comment
                  key={i}
                  discription={d.attributes.content}
                  image={d.attributes.attachments[0]?.assets_url}
                  userAvatar={d.attributes.owner_profile}
                  username={d.attributes.owner_nickname}
                  mail={d.attributes.user_code}
                  date={CommonHelper.staticSmartTime(d.attributes.created_at)}
                  number={d.attributes.comment_no}
                />
              )
            })} */}
          {!!commentsList && commentsList.length > 0 && (
            <Box id="scrollableDiv" style={{ height: 600, paddingRight: 10 }} className={`${classes.scroll} ${classes.list}`}>
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
            </Box>
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
