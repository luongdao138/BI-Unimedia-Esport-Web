import ESSlider from '@components/Slider'
import { ESRoutes } from '@constants/route.constants'
import { useTranslation } from 'react-i18next'
import TournamentCardResult from '@components/TournamentCard'
import { SLIDE_LIMIT } from '@constants/common.constants'

interface Props {
  data: any
}

export const TournamentResult: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation(['common'])
  return (
    <ESSlider
      title={t('common:tournament.follower_ended')}
      moreLink={ESRoutes.TOURNAMENT_FOLLOWER_ENDED}
      navigation
      breakpoints={{
        '767': {
          slidesPerView: 3.1,
          slidesPerGroup: 2,
        },
      }}
      items={data.slice(0, SLIDE_LIMIT).map((tournament, i: number) => (
        <TournamentCardResult key={i} tournament={tournament} />
      ))}
    />
  )
}
