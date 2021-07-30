import FollowerEndedContainer from '@containers/Tournament/Follower/Ended'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const FollowerEndedPage: PageWithLayoutType = () => {
  return (
    <MainLayout>
      <FollowerEndedContainer />
    </MainLayout>
  )
}

export default withAuth(FollowerEndedPage)
