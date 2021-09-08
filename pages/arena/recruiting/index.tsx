import RecruitingContainer from '@containers/Tournament/Recruiting'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const RecruitingPage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <RecruitingContainer />
    </MainLayout>
  )
}

export default RecruitingPage
