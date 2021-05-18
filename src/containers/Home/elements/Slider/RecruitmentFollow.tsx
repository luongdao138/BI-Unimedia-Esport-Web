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
      moreLink={ESRoutes.RECRUITMENT_FOLLOWER}
      navigation
      width={256}
      items={data.map((recruitment, i) => (
        <RecruitmentCard key={i} recruitment={recruitment} />
      ))}
    />
  )
}
