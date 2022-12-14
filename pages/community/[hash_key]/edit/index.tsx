import BlankLayout from '@layouts/BlankLayout'
import PageWithLayoutType from '@constants/page'
import CommunityCreate from '@containers/Community/UpsertForm'
import useAuthenticated from '@utils/hooks/useAuthenticated'

const CommunityCreatePage: PageWithLayoutType = () => {
  useAuthenticated()
  return (
    <BlankLayout isWide={false}>
      <CommunityCreate />
    </BlankLayout>
  )
}

export default CommunityCreatePage
