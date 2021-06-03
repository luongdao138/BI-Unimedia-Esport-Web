import ESSlider from '@components/Slider'
import { ESRoutes } from '@constants/route.constants'
import { useTranslation } from 'react-i18next'
import TopicCard from '@components/TopicCard'
import { SLIDE_LIMIT } from '@constants/common.constants'

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
      items={data.slice(0, SLIDE_LIMIT).map((topic, i: number) => (
        <TopicCard key={i} topic={topic} />
      ))}
    />
  )
}
