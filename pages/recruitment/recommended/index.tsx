import RecruitmentRecommendedContainer from '@containers/Recruitment/Recommended'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const RecruitmentRecommendedPage: PageWithLayoutType = () => {
  return (
    <MainLayout>
      <RecruitmentRecommendedContainer />
    </MainLayout>
  )
}

export default withAuth(RecruitmentRecommendedPage)
