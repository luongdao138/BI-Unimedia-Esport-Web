import EventRecommendedContainer from '@containers/Event/Recommended'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const EventRecommendedPage: PageWithLayoutType = () => {
  return <EventRecommendedContainer />
}

EventRecommendedPage.Layout = MainLayout

export default EventRecommendedPage
