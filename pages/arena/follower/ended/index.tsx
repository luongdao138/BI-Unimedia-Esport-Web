import FollowerEndedContainer from '@containers/Tournament/Follower/Ended'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const FollowerEndedPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <FollowerEndedContainer />
    </MainLayout>
  )
}

export default FollowerEndedPage
