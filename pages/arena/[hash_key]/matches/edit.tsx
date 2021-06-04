import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'
import { MatchesEditContainer } from '@containers/arena'

const ArenaMatchEditPage: PageWithLayoutType = () => {
  return <MatchesEditContainer />
}
PlainLayout.defaultProps = {
  noFooter: true,
}
ArenaMatchEditPage.Layout = PlainLayout

export default ArenaMatchEditPage
