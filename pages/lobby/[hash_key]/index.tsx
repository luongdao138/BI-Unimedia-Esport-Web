import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { DetailContainer } from '@containers/Lobby'

const LobbyPage: PageWithLayoutType = () => {
  return (
    <MainLayout>
      <DetailContainer />
    </MainLayout>
  )
}

export default LobbyPage
