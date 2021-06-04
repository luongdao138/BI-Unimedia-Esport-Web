import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import ArenaCreateContainer from '@containers/arena/UpsertForm'

const ArenaCreatePage: PageWithLayoutType = () => {
  return <ArenaCreateContainer />
}

ArenaCreatePage.Layout = BlankLayout

export default ArenaCreatePage
