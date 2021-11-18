import { ESRoutes } from '@constants/route.constants'
import { SLIDE_LIMIT } from '@constants/common.constants'
import ESSlider from '@components/Slider'
import useLobbyData from '@containers/Home/useLobbyData'
import LobbyCard from '@components/LobbyCard'
import i18n from '@locales/i18n'

export const RecentLobbies: React.FC = () => {
  const { recentLobbies, getRecentLobbiesMeta } = useLobbyData()

  return (
    <ESSlider
      title={i18n.t('common:lobby.home.recent_lobbies_title')}
      moreLink={ESRoutes.LOBBY_FOLLOWER}
      navigation
      meta={getRecentLobbiesMeta}
      noItemsMessage={i18n.t('common:lobby.home.recent_lobbies_empty')}
      breakpoints={{
        '767': {
          slidesPerView: 3.1,
          slidesPerGroup: 2,
        },
      }}
      items={recentLobbies.slice(0, SLIDE_LIMIT).map((lobby, i) => (
        <LobbyCard key={i} lobby={lobby} />
      ))}
    />
  )
}
