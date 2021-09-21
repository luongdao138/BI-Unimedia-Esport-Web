import MainLayout from '@layouts/MainLayout'
import TopicDetailContainer from '@containers/Community/TopicDetail'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const TopicDetailPage = () => {
  return (
    <MainLayout loginRequired={true} patternBg={true}>
      <TopicDetailContainer />
    </MainLayout>
  )
}

export default TopicDetailPage
