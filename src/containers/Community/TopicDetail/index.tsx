import React, { useEffect } from 'react'
import CommunityDetailHeader from '@containers/Community/TopicDetail/Partials/CommunityDetailHeader'
import Comment from '@containers/Community/TopicDetail/Partials/Comment'
import MainTopic from '@containers/Community/TopicDetail/Partials/MainTopic'
import { Link, Box } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core'
import CommentInput from './Partials/CommentInput'
import useTopicDetail from './useTopicDetail'
import { useRouter } from 'next/router'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import _ from 'lodash'

const TopicDetailContainer: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { back } = useRouter()
  const { topic_hash_key } = router.query
  const { getTopicDetail, topic, topicDetailMeta, deleteTopic, getCommentsList, commentsList } = useTopicDetail()
  const data = topic?.attributes
  const commentsData = commentsList?.data
  const commentsDataReversed = _.reverse(_.clone(commentsData))

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

  // console.log(commentsList)

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
                image={(!!data.attachments && data.attachments[0].assets_url) || ''}
                handleDelete={handleDeleteTopic}
              />
            </>
          )}
          <Box className={classes.link}>
            <Link>↑過去のコメントを表示する</Link>
          </Box>
          {!!commentsData &&
            commentsData.length > 0 &&
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
            })}
        </Box>
        <Box className={classes.inputContainer}>
          <CommentInput />
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
}))

export default TopicDetailContainer
