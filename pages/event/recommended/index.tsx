import EventRecommendedContainer from '@containers/Event/Recommended'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const EventRecommendedPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <EventRecommendedContainer />
    </MainLayout>
  )
}

export default EventRecommendedPage
