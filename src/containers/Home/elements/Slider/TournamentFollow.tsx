import ESSlider from '@components/Slider'
import { ESRoutes } from '@constants/route.constants'
import { useTranslation } from 'react-i18next'
import TournamentCardFollow from '@components/TournamentCard'
import { SLIDE_LIMIT } from '@constants/common.constants'

interface Props {
  data: any
}

export const TournamentFollow: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation(['common'])
  return (
    <ESSlider
      title={t('common:tournament.follower_entering')}
      moreLink={ESRoutes.TOURNAMENT_FOLLOWER_ENTERING}
      navigation
      width={256}
      items={data.slice(0, SLIDE_LIMIT).map((tournament, i: number) => (
        <TournamentCardFollow key={i} tournament={tournament} />
      ))}
    />
  )
}
