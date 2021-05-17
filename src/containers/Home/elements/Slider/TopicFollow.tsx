import ESSlider from '@components/Slider'
import { ESRoutes } from '@constants/route.constants'
import { useTranslation } from 'react-i18next'
import TopicCard from '@components/TopicCard'

interface Props {
  data: any
}

export const TopicFollow: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation(['common'])
  return (
    <ESSlider
      title={t('common:home.topic_follow')}
      moreLink={ESRoutes.TOPIC_FOLLOWER}
      navigation
      width={256}
      items={data.map((topic, i) => (
        <TopicCard key={i} topic={topic} />
      ))}
    />
  )
}
