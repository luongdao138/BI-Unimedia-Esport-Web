import BlankLayout from '@layouts/BlankLayout'
import TopicCreateContainer from '@containers/Community/Topic/UpsertForm'
import withAuth from '@utils/withAuth'

const TopicCreatePage = () => {
  return (
    <BlankLayout isWide>
      <TopicCreateContainer />
    </BlankLayout>
  )
}

export default withAuth(TopicCreatePage)
