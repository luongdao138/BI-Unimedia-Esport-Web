import ProfileContainer from '@containers/Profile'
import MainLayout from '@layouts/MainLayout'

const ProfilePage: React.FC = () => {
  return (
    <MainLayout loginRequired>
      <ProfileContainer />
    </MainLayout>
  )
}

export default ProfilePage
