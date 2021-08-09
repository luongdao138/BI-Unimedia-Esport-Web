import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const CommunityDetailPage: PageWithLayoutType = () => {
  return <></>
}

CommunityDetailPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
}

export default CommunityDetailPage
