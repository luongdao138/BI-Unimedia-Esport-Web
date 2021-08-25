import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import TopicCreateContainer from '@containers/Community/Topic/UpsertForm'

const TopicCreatePage: PageWithLayoutType = () => {
  return (
    <BlankLayout isWide>
      <TopicCreateContainer />
    </BlankLayout>
  )
}

export default TopicCreatePage
