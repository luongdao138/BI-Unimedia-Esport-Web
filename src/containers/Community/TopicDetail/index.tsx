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

const TopicDetailContainer: React.FC = () => {
  const classes = useStyles()
  const router = useRouter()
  const { topic_id } = router.query
  const { getTopicDetail, topic, topicDetailMeta, deleteTopic } = useTopicDetail()
  const data = topic?.attributes

  useEffect(() => {
    if (topic_id) getTopicDetail({ hash_key: String(topic_id) })
  }, [router])

  const handleDeleteTopic = () => {
    deleteTopic({ hash_key: String(topic_id) })
  }

  const comments = [
    {
      username: 'コイチコイチコイチコイチコイ',
      mail: '@koichi',
      date: '２時間前',
      number: 51,
      hash_key: 'asdfejlksefjlksejfl23423rsekfsdf',
      discription: 'トピックス本文が入ります。',
      image:
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F11%2Frick-and-morty-season-4-2000.jpg&q=85',
    },
    {
      discription: 'トピックス本文が入りまが入りトピックス本文が入ります。ス本文が入りますトピックス本文が入ります。ス本文が入りますます',
      username: 'コイチコイチコイチコイチコイ',
      mail: '@koichi',
      date: '２時間前',
      number: 52,
      hash_key: 'asdfejlksefjlksejfl23423rsekfsdf',
    },
    {
      discription: 'トピックス本文が。ス本文が入りトピックス本文が入ります。ス本文が入りますトピックス本文が入ります。ス本文が入りますます',
      username: 'コイチコイチコイチコイチコイ',
      mail: '@koichi',
      date: '２時間前',
      number: 53,
      hash_key: 'asdfejlksefjlksejfl23423rsekfsdf',
    },
    {
      discription:
        'トピックス本文が入ります。ス本文がトピックス本文が入ります。ス本文が入りますトピックス本文が入ります。ス本文が入ります入ります',
      username: 'コイチコイチコイチコイチコイ',
      mail: '@koichi@koichi@koichi@koichi@koichi@koichi@koichi@koichi@koichi@koichi@koichi',
      date: '２時間前',
      number: 55,
      hash_key: 'asdfejlksefjlksejfl23423rsekfsdf',
    },
    {
      discription:
        'トピックス本文が入ります。ス本文トピックス本文が入ります。ス本文が入りますトピックス本文が入ります。ス本文が入りますが入ります',
      username:
        'コイチコイチコイチココイチコイチコイチコイチコイチコイコイチコイチコイチコイチコイチコイコイチコイチコイチコイチコイチコイイチコイ',
      mail: '@koichi',
      date: '２時間前',
      number: 91,
      hash_key: 'asdfejlksefjlksejfl23423rsekfsdf',
    },
  ]

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box flex={1}>
          {topicDetailMeta.loaded && (
            <>
              <CommunityDetailHeader title={data.title} isTopic />
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
          {comments.map((d, i) => {
            return (
              <Comment
                key={i}
                discription={d.discription}
                image={d.image}
                username={d.username}
                mail={d.mail}
                date={d.date}
                number={d.number}
                hash_key={d.hash_key}
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
