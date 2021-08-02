import EventRecommendedContainer from '@containers/Event/Recommended'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const EventRecommendedPage: PageWithLayoutType = () => {
  return <EventRecommendedContainer />
}

EventRecommendedPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
}

export default EventRecommendedPage
