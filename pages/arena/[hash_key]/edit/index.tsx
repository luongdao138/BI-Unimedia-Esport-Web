import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import { UpsertForm } from '@containers/arena'

const ArenaCreatePage: PageWithLayoutType = () => {
  return <UpsertForm />
}

ArenaCreatePage.Layout = BlankLayout

export default ArenaCreatePage
