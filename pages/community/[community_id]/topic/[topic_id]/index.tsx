import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import TopicDetailContainer from '@containers/Community/TopicDetail'

const TopicDetailPage: PageWithLayoutType = () => {
  return (
    <MainLayout>
      <TopicDetailContainer />
    </MainLayout>
  )
}

TopicDetailPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
}

export default TopicDetailPage
