import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import CommunityDetailContainer from '@containers/Community/Detail'

const CommunityDetailPage: PageWithLayoutType = () => {
  return <CommunityDetailContainer />
}

CommunityDetailPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
}

export default CommunityDetailPage
