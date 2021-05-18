import ESSlider from '@components/Slider'
import { ESRoutes } from '@constants/route.constants'
import { useTranslation } from 'react-i18next'
import RecruitmentCard from '@components/RecruitmentCard'

interface Props {
  data: Array<recruitmentProps>
}

type recruitmentProps = {
  type: string
  attributes: recruitmentAttributesProps
}

type recruitmentAttributesProps = {
  title: string
  message: string
  recruitment_cover: string | null
  max_participants: number
  start_datetime: string | null
  participants_count: number
  entry_count: number
}

export const RecommendedRecruitment: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation(['common'])
  return (
    <ESSlider
      title={t('common:home.recommended_recruitment')}
      navigation
      moreLink={ESRoutes.RECRUITMENT_RECOMMENDED}
      width={256}
      items={data.map((recruitment, i) => (
        <RecruitmentCard key={i} recruitment={recruitment} />
      ))}
    />
  )
}
