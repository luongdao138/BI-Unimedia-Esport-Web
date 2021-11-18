import ESSlider from '@components/Slider'
import { ESRoutes } from '@constants/route.constants'
import { useTranslation } from 'react-i18next'
import RecruitmentCard from '@components/RecruitmentCard'

interface Props {
  data: any
}

export const RecruitmentFollow: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation(['common'])
  return (
    <ESSlider
      title={t('common:home.recruitment_follow')}
      moreLink={ESRoutes.LOBBY_FOLLOWER}
      navigation
      breakpoints={{
        '767': {
          slidesPerView: 3.1,
          slidesPerGroup: 2,
        },
      }}
      items={data.map((recruitment, i) => (
        <RecruitmentCard key={i} recruitment={recruitment} />
      ))}
    />
  )
}
