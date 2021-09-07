import TopicFollowerContainer from '@containers/Topic/Follower'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const TopicFollowerPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <TopicFollowerContainer />
    </MainLayout>
  )
}

export default TopicFollowerPage
