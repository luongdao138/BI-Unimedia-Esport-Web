import FollowerEnteringContainer from '@containers/Tournament/Follower/Entering'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const FollowerEnteringPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <FollowerEnteringContainer />
    </MainLayout>
  )
}

export default FollowerEnteringPage
