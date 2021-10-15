import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import LobbyFollowerContainer from '@containers/Lobby/Follower'

const LobbyFollowerPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <LobbyFollowerContainer />
    </MainLayout>
  )
}

export default LobbyFollowerPage
