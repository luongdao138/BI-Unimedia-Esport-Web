import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import TopicDetailContainer from '@containers/Community/TopicDetail'

const TopicDetailPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <TopicDetailContainer />
    </MainLayout>
  )
}

export default TopicDetailPage
