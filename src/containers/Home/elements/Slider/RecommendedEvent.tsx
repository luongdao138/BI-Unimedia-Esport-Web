import ESSlider from '@components/Slider'
import { ESRoutes } from '@constants/route.constants'
import { useTranslation } from 'react-i18next'
import EventCard from '@components/EventCard'

interface Props {
  data: any
}

export const RecommendedEvent: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation(['common'])
  return (
    <ESSlider
      title={t('common:home.recommended_event')}
      navigation
      moreLink={ESRoutes.EVENT_RECOMMENDED}
      width={256}
      items={data.map((event, i) => (
        <EventCard key={i} event={event} />
      ))}
    />
  )
}
