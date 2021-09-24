import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import { UpsertForm } from '@containers/Lobby'
import useAuthenticated from '@utils/hooks/useAuthenticated'

const LobbyEditPage: PageWithLayoutType = () => {
  useAuthenticated()
  return (
    <BlankLayout isWide={false}>
      <UpsertForm />
    </BlankLayout>
  )
}

export default LobbyEditPage
