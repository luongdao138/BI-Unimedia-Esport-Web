import RecruitingContainer from '@containers/Tournament/Recruiting'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const RecruitingPage: PageWithLayoutType = () => {
  return (
    <MainLayout>
      <RecruitingContainer />
    </MainLayout>
  )
}

export default withAuth(RecruitingPage)
