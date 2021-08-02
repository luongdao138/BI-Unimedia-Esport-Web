import RecruitmentRecommendedContainer from '@containers/Recruitment/Recommended'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const RecruitmentRecommendedPage: PageWithLayoutType = () => {
  return <RecruitmentRecommendedContainer />
}

RecruitmentRecommendedPage.Layout = MainLayout

MainLayout.defaultProps = {
  loginRequired: true,
}

export default RecruitmentRecommendedPage
