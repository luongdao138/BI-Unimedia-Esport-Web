import FollowerEnteringContainer from '@containers/Tournament/Follower/Entering'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const FollowerEnteringPage: PageWithLayoutType = () => {
  return <FollowerEnteringContainer />
}

FollowerEnteringPage.Layout = MainLayout

export default withAuth(FollowerEnteringPage)
