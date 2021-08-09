import React from 'react'
import CommunityDetailHeader from '@components/CommunityDetailHeader'
import Comment from '@components/CommunityTopicDetail/Comment'
import MainTopic from '@components/CommunityTopicDetail/MainTopic'
import { Link, Box } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import { Colors } from '@theme/colors'

const TopicDetailContainer: React.FC = () => {
  // const { t } = useTranslation(['common'])
  const classes = useStyles()

  const data = [
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
      <CommunityDetailHeader title="攻略情報共有"></CommunityDetailHeader>

      <MainTopic
        username="コイチコイチコイチコイチコイチコイチコイチコイチコイチコイチ"
        mail="@koichi"
        date="2020年07月07日"
        count={900}
        discription="トピックス本文が入ります。トピックス本文が入ります。トピックス本文が入ります。トピックス本文が入ります。トピックス本文が入ります。トピックス本文が入ります。トピックス本文が入ります。"
        image="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F11%2Frick-and-morty-season-4-2000.jpg&q=85"
      />
      <Box className={classes.link}>
        <Link>↑過去のコメントを表示する</Link>
      </Box>
      {data.map((d, i) => {
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
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
}))

export default TopicDetailContainer
