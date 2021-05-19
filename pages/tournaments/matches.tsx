import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import Matches from '@containers/TournamentDetail/Matches'

const TournamentMatchesPage: PageWithLayoutType = () => {
  return <Matches />
}

TournamentMatchesPage.Layout = MainLayout

export default TournamentMatchesPage
