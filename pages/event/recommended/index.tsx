import EventRecommendedContainer from '@containers/Event/Recommended'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const EventRecommendedPage: PageWithLayoutType = () => {
  return <EventRecommendedContainer />
}

EventRecommendedPage.Layout = MainLayout

export default withAuth(EventRecommendedPage)
