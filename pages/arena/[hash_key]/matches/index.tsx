import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'
import { MatchesContainer } from '@containers/arena'

const ArenaMatchesPage: PageWithLayoutType = () => {
  return <MatchesContainer />
}

PlainLayout.defaultProps = {
  noFooter: true,
}

ArenaMatchesPage.Layout = PlainLayout

export default ArenaMatchesPage
