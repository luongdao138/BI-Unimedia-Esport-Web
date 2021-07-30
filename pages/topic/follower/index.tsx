import TopicFollowerContainer from '@containers/Topic/Follower'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const TopicFollowerPage: PageWithLayoutType = () => {
  return <TopicFollowerContainer />
}

TopicFollowerPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
}

export default TopicFollowerPage
