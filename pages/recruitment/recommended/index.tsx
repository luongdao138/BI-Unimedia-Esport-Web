import RecruitmentRecommendedContainer from '@containers/Recruitment/Recommended'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const RecruitmentRecommendedPage: PageWithLayoutType = () => {
  return <RecruitmentRecommendedContainer />
}

RecruitmentRecommendedPage.Layout = MainLayout

export default withAuth(RecruitmentRecommendedPage)
