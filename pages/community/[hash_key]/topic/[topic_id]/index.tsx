import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import TopicDetailContainer from '@containers/Community/TopicDetail'

const TopicDetailPage: PageWithLayoutType = () => {
  return <TopicDetailContainer />
}

TopicDetailPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
  patternBg: true,
}

export default TopicDetailPage
