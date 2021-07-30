import RecruitmentFollowerContainer from '@containers/Recruitment/Follower'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const RecruitmentFollowerPage: PageWithLayoutType = () => {
  return <RecruitmentFollowerContainer />
}

RecruitmentFollowerPage.Layout = MainLayout

export default withAuth(RecruitmentFollowerPage)
