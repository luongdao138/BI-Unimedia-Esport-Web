import ESSlider from '@components/Slider'
import { ESRoutes } from '@constants/route.constants'
import { useTranslation } from 'react-i18next'
import TournamentCardResult from '@components/TournamentCard'
import { SLIDE_LIMIT } from '@constants/common.constants'
import { Meta } from '@store/metadata/actions/types'
import { ResultsResponse } from '@services/arena.service'

interface Props {
  data: ResultsResponse[]
  meta: Meta
}

export const TournamentResult: React.FC<Props> = ({ data, meta }) => {
  const { t } = useTranslation(['common'])
  return (
    <ESSlider
      title={t('common:tournament.follower_ended')}
      moreLink={ESRoutes.TOURNAMENT_FOLLOWER_ENDED}
      navigation
      meta={meta}
      noItemsMessage={t('common:tournament.no_data.followers_entering_results')}
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
