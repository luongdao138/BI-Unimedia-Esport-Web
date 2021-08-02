import FollowerEnteringContainer from '@containers/Tournament/Follower/Entering'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const FollowerEnteringPage: PageWithLayoutType = () => {
  return <FollowerEnteringContainer />
}

FollowerEnteringPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
}

export default FollowerEnteringPage
