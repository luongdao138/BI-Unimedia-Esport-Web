import ESSlider from '@components/Slider'
import { ESRoutes } from '@constants/route.constants'
import { useTranslation } from 'react-i18next'
import TournamentCardFollow from '@components/TournamentCard/Follow'

interface Props {
  data: any
}

export const TournamentFollow: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation(['common'])
  return (
    <ESSlider
      title={t('common:home.tournament_follow')}
      moreLink={ESRoutes.TOURNAMENT_FOLLOWER_ENTERING}
      navigation
      width={256}
      items={data.map((tournament, i) => (
        <TournamentCardFollow key={i} tournament={tournament} />
      ))}
    />
  )
}
