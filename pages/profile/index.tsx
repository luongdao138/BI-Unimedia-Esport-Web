import ProfileContainer from '@containers/Profile'
import PageWithLayoutType from '@constants/page'
import MainLayout from '@layouts/MainLayout'
import { withAuth } from '@utils/withAuth'

const ProfilePage: PageWithLayoutType = () => {
  return <ProfileContainer />
}

ProfilePage.Layout = MainLayout

export default withAuth(ProfilePage)
