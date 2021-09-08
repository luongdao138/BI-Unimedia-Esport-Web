import RecruitmentRecommendedContainer from '@containers/Recruitment/Recommended'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const RecruitmentRecommendedPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <RecruitmentRecommendedContainer />
    </MainLayout>
  )
}

export default RecruitmentRecommendedPage
