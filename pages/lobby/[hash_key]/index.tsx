import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { DetailContainer } from '@containers/lobby'

const LobbyPage: PageWithLayoutType = () => {
  return (
    <MainLayout>
      <DetailContainer />
    </MainLayout>
  )
}

export default LobbyPage
