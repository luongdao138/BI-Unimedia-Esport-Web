import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import TopicCreateContainer from '@containers/Community/Topic/UpsertForm'

const TopicCreatePage: PageWithLayoutType = () => {
  return <TopicCreateContainer />
}

TopicCreatePage.Layout = BlankLayout
export default TopicCreatePage
