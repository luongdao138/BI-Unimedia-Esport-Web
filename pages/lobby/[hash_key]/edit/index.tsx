import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import { UpsertForm } from '@containers/Lobby'
import useAuthenticated from '@utils/hooks/useAuthenticated'

const LobbyEditPage: PageWithLayoutType = () => {
  useAuthenticated()
  return <UpsertForm />
}

LobbyEditPage.Layout = BlankLayout

export default LobbyEditPage
