import RecruitingContainer from '@containers/Tournament/Recruiting'
import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import { withAuth } from '@utils/withAuth'

const RecruitingPage: PageWithLayoutType = () => {
  return <RecruitingContainer />
}

RecruitingPage.Layout = MainLayout

export default withAuth(RecruitingPage)
