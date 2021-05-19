import PlainLayout from '@layouts/PlainLayout'
import PageWithLayoutType from '@constants/page'
import Matches from '@containers/TournamentDetail/Matches'

const TournamentMatchesPage: PageWithLayoutType = () => {
  return <Matches />
}

TournamentMatchesPage.Layout = PlainLayout

export default TournamentMatchesPage
