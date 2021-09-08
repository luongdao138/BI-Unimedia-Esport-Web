import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import { UpsertForm } from '@containers/arena'
import useAuthenticated from '@utils/hooks/useAuthenticated'

const ArenaCreatePage: PageWithLayoutType = () => {
  useAuthenticated()
  return <UpsertForm />
}

ArenaCreatePage.Layout = BlankLayout

export default ArenaCreatePage
