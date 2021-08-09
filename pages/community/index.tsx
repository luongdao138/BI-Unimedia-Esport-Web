import CommunityContainer from '@containers/Community'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const CommunityPage: PageWithLayoutType = () => {
  return <CommunityContainer />
}

CommunityPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
}

export default CommunityPage
