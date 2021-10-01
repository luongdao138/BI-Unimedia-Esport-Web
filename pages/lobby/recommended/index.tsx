import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import LobbyRecommendedContainer from '@containers/Lobby/Recommended'

const LobbyRecommendedPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <LobbyRecommendedContainer />
    </MainLayout>
  )
}

export default LobbyRecommendedPage
