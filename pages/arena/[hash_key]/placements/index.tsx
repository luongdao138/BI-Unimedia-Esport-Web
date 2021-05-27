import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import ArenaWinners from '@containers/ArenaWinners'

const ArenaPlacementPage: PageWithLayoutType = () => {
  return <ArenaWinners />
}

MainLayout.defaultProps = {
  footer: false,
  patternBg: false,
}
ArenaPlacementPage.Layout = MainLayout

export default ArenaPlacementPage
