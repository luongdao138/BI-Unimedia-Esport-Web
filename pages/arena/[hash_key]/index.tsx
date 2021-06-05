import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { DetailContainer } from '@containers/arena'

const TournamentsPage: PageWithLayoutType = () => {
  return <DetailContainer />
}

MainLayout.defaultProps = {
  footer: false,
}

TournamentsPage.Layout = MainLayout

export default TournamentsPage
