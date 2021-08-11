// import { Theme} from '@material-ui/core'
// import { makeStyles } from '@material-ui/core/styles'
// import { useTranslation } from 'react-i18next'
import TopicRowItem from '@components/TopicRowItem'

const InfoContainer: React.FC = () => {
  // const classes = useStyles()
  // const { t } = useTranslation(['common'])
  const data = [
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 999,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 999,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 999,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 999,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 999,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 999,
    },
    {
      title: '自己紹介しよう！',
      mail: '@watanabe',
      description: 'はじめまして！　ダミーテキストです〜',
      date: '数秒前',
      comment_number: 999,
    },
  ]
  return (
    <>
      {data.map((d, i) => {
        return (
          <TopicRowItem key={i} title={d.title} mail={d.mail} description={d.description} date={d.date} comment_number={d.comment_number} />
        )
      })}
    </>
  )
}

// const useStyles = makeStyles((theme: Theme) => ({

// }))

export default InfoContainer
