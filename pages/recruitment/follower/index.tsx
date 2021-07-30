import RecruitmentFollowerContainer from '@containers/Recruitment/Follower'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const RecruitmentFollowerPage: PageWithLayoutType = () => {
  return (
    <MainLayout>
      <RecruitmentFollowerContainer />
    </MainLayout>
  )
}

export default withAuth(RecruitmentFollowerPage)
