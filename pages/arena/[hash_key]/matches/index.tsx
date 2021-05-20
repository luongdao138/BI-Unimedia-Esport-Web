import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'
import ArenaMatches from '@containers/ArenaMatches'

const ArenaMatchesPage: PageWithLayoutType = () => {
  return <ArenaMatches />
}

ArenaMatchesPage.Layout = PlainLayout

export default ArenaMatchesPage
