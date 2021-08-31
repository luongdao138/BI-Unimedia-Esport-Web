import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import CommunityDetailContainer from '@containers/Community/Detail'

const CommunityDetailPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <CommunityDetailContainer />
    </MainLayout>
  )
}

export default CommunityDetailPage
