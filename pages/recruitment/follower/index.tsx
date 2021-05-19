import RecruitmentFollowerContainer from '@containers/Recruitment/Follower'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'

const RecruitmentFollowerPage: PageWithLayoutType = () => {
  return <RecruitmentFollowerContainer />
}

RecruitmentFollowerPage.Layout = MainLayout

export default RecruitmentFollowerPage
