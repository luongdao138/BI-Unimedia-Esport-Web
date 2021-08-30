import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { DetailContainer } from '@containers/Lobby'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = async () => {
  return {
    props: {},
  }
}

const LobbyPage: PageWithLayoutType = () => {
  return (
    <MainLayout>
      <DetailContainer />
    </MainLayout>
  )
}

export default LobbyPage
