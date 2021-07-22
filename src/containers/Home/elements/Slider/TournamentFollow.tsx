import ESSlider from '@components/Slider'
import { ESRoutes } from '@constants/route.constants'
import { useTranslation } from 'react-i18next'
import TournamentCardFollow from '@components/TournamentCard'
import { SLIDE_LIMIT } from '@constants/common.constants'
import { Meta } from '@store/metadata/actions/types'
import { FollowersResponse } from '@services/arena.service'

interface Props {
  data: FollowersResponse[]
  meta: Meta
}

export const TournamentFollow: React.FC<Props> = ({ data, meta }) => {
  const { t } = useTranslation(['common'])
  return (
    <ESSlider
      title={t('common:tournament.follower_entering')}
      moreLink={ESRoutes.TOURNAMENT_FOLLOWER_ENTERING}
      navigation
      breakpoints={{
        '767': {
          slidesPerView: 3.1,
          slidesPerGroup: 2,
        },
      }}
      meta={meta}
      noItemsMessage={t('common:tournament.no_data.followers_entering')}
      items={data.slice(0, SLIDE_LIMIT).map((tournament, i: number) => (
        <TournamentCardFollow key={i} tournament={tournament} />
      ))}
    />
  )
}
