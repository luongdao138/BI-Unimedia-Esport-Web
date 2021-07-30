import TopicFollowerContainer from '@containers/Topic/Follower'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const TopicFollowerPage: PageWithLayoutType = () => {
  return (
    <MainLayout>
      <TopicFollowerContainer />
    </MainLayout>
  )
}

export default withAuth(TopicFollowerPage)
