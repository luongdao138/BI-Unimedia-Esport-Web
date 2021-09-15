import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import CommunityCreateContainer from '@containers/Community/UpsertForm'

const CommunityCreatePage: PageWithLayoutType = () => {
  return (
    <BlankLayout isWide={false}>
      <CommunityCreateContainer />
    </BlankLayout>
  )
}

export default CommunityCreatePage
