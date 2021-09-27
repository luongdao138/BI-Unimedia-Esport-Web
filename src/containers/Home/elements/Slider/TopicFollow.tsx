import ESSlider from '@components/Slider'
import { ESRoutes } from '@constants/route.constants'
import { useTranslation } from 'react-i18next'
import TopicCard from '@components/TopicCard'
import { SLIDE_LIMIT } from '@constants/common.constants'
import { FollowersTopicResponse } from '@services/community.service'

interface Props {
  data: FollowersTopicResponse[]
}

export const TopicFollow: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation(['common'])
  return (
    <ESSlider
      title={t('common:home.topic_follow')}
      moreLink={ESRoutes.TOPIC_FOLLOWER}
      navigation
      noItemsMessage={t('common:community.no_data_topics')}
      breakpoints={{
        '767': {
          slidesPerView: 3.1,
          slidesPerGroup: 2,
        },
      }}
      items={data.slice(0, SLIDE_LIMIT).map((topic, i: number) => (
        <TopicCard key={i} topic={topic} />
      ))}
    />
  )
}
