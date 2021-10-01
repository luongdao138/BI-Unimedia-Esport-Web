import { ESRoutes } from '@constants/route.constants'
import { SLIDE_LIMIT } from '@constants/common.constants'
import ESSlider from '@components/Slider'
import LobbyCard from '@components/LobbyCard'
import i18n from '@locales/i18n'
import useLobbyRecommendedData from '@containers/Home/useLobbyRecommendedData'

export const RecommendedLobbies: React.FC = () => {
  const { lobbies, meta } = useLobbyRecommendedData()

  return (
    <ESSlider
      title={i18n.t('common:lobby.home.recommended_lobbies_title')}
      moreLink={ESRoutes.LOBBY_RECOMMENDED}
      navigation
      meta={meta}
      noItemsMessage={i18n.t('common:lobby.home.recommended_lobbies_empty')}
      breakpoints={{
        '767': {
          slidesPerView: 3.1,
          slidesPerGroup: 2,
        },
      }}
      items={lobbies.slice(0, SLIDE_LIMIT).map((lobby, i) => (
        <LobbyCard key={i} lobby={lobby} />
      ))}
    />
  )
}
