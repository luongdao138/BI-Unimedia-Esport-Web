import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import TopicCreateContainer from '@containers/Community/Topic/UpsertForm'
import withAuth from '@utils/withAuth'

const TopicCreatePage: PageWithLayoutType = () => {
  return (
    <BlankLayout isWide>
      <TopicCreateContainer />
    </BlankLayout>
  )
}

export default withAuth(TopicCreatePage)
