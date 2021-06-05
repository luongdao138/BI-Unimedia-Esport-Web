import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { WinnersContainer } from '@containers/arena'

const ArenaPlacementPage: PageWithLayoutType = () => {
  return <WinnersContainer />
}

MainLayout.defaultProps = {
  footer: false,
  patternBg: false,
}
ArenaPlacementPage.Layout = MainLayout

export default ArenaPlacementPage
