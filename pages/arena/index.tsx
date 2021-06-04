import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

import { ArenaHomeContainer } from '@containers/arena'
const TournamentPage: PageWithLayoutType = () => {
  return <ArenaHomeContainer />
}

TournamentPage.Layout = MainLayout

export default TournamentPage
