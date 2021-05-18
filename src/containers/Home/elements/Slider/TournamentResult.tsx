import ESSlider from '@components/Slider'
import { ESRoutes } from '@constants/route.constants'
import { useTranslation } from 'react-i18next'
import TournamentCardResult from '@components/TournamentCard/Result'

interface Props {
  data: any
}

export const TournamentResult: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation(['common'])
  return (
    <ESSlider
      title={t('common:home.tournament_result')}
      moreLink={ESRoutes.TOURNAMENT_FOLLOWER_ENDED}
      navigation
      width={256}
      items={data.map((tournament, i) => (
        <TournamentCardResult key={i} tournament={tournament} />
      ))}
    />
  )
}
