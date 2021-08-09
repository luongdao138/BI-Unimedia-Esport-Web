import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const TopicDetailPage: PageWithLayoutType = () => {
  return <></>
}

TopicDetailPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
}

export default TopicDetailPage
