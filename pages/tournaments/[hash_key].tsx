import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import TournamentDetail from '@containers/TournamentDetail'

const TournamentsPage: PageWithLayoutType = () => {
  return <TournamentDetail />
}

TournamentsPage.Layout = MainLayout

export default TournamentsPage
