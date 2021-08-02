import RecruitingContainer from '@containers/Tournament/Recruiting'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const RecruitingPage: PageWithLayoutType = () => {
  return <RecruitingContainer />
}

RecruitingPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
}

export default RecruitingPage
