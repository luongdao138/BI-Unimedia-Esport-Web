import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'
import ArenaMatchesEdit from '@containers/ArenaMatchesEdit'

const ArenaMatchEditPage: PageWithLayoutType = () => {
  return <ArenaMatchesEdit />
}

ArenaMatchEditPage.Layout = PlainLayout

export default ArenaMatchEditPage
