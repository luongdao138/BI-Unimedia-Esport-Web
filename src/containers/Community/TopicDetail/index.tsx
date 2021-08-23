import React, { useEffect } from 'react'
import CommunityDetailHeader from '@containers/Community/TopicDetail/Partials/CommunityDetailHeader'
import Comment from '@containers/Community/TopicDetail/Partials/Comment'
import MainTopic from '@containers/Community/TopicDetail/Partials/MainTopic'
import { Link, Box } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core'
import CommentInput from './Partials/CommentInput'
import useTopicDetail from './useTopicDetail'
import { useRouter } from 'next/router'
import moment from 'moment'
// import { useTranslation } from 'react-i18next'
// import { Colors } from '@theme/colors'

const TopicDetailContainer: React.FC = () => {
  // const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { topic_id } = router.query
  const { getTopicDetail, topic, topicDetailMeta } = useTopicDetail()
  const data = topic?.attributes

  useEffect(() => {
    if (topic_id) getTopicDetail({ topic_id: String(topic_id) })
  }, [router])

  const comments = [
    {
      username: 'コイチコイチコイチコイチコイ',
      mail: '@koichi',
      date: '２時間前',
      number: 51,
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
    },
    {
      discription: 'トピックス本文が。ス本文が入りトピックス本文が入ります。ス本文が入りますトピックス本文が入ります。ス本文が入りますます',
      username: 'コイチコイチコイチコイチコイ',
      mail: '@koichi',
      date: '２時間前',
      number: 53,
    },
    {
      discription:
        'トピックス本文が入ります。ス本文がトピックス本文が入ります。ス本文が入りますトピックス本文が入ります。ス本文が入ります入ります',
      username: 'コイチコイチコイチコイチコイ',
      mail: '@koichi@koichi@koichi@koichi@koichi@koichi@koichi@koichi@koichi@koichi@koichi',
      date: '２時間前',
      number: 55,
    },
    {
      discription:
        'トピックス本文が入ります。ス本文トピックス本文が入ります。ス本文が入りますトピックス本文が入ります。ス本文が入りますが入ります',
      username:
        'コイチコイチコイチココイチコイチコイチコイチコイチコイコイチコイチコイチコイチコイチコイコイチコイチコイチコイチコイチコイイチコイ',
      mail: '@koichi',
      date: '２時間前',
      number: 91,
    },
  ]
  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box flex={1}>
          {topicDetailMeta.loaded && (
            <>
              <CommunityDetailHeader title={data.title}></CommunityDetailHeader>
              <Box className={classes.blank}></Box>
              <MainTopic
                username={data.owner_name}
                user_avatar={data.owner_profile}
                mail="@koichi"
                date={`${moment(data.created_at).format('YYYY年MM月DD日')}`}
                count={data.like_count}
                discription={data.content}
                image={data.attachments[0].assets_url}
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
  blank: {
    marginTop: theme.spacing(11.5),
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
  [theme.breakpoints.down('sm')]: {
    blank: {
      marginTop: theme.spacing(11.2),
    },
  },
}))

export default TopicDetailContainer
