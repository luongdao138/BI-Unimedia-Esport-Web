import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import TournamentCreateContainer from '@containers/TournamentCreate'

const TournamentCreatePage: PageWithLayoutType = () => {
  return <TournamentCreateContainer />
}

TournamentCreatePage.Layout = BlankLayout

export default TournamentCreatePage
