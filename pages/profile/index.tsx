import ProfileContainer from '@containers/Profile'
import PageWithLayoutType from '@constants/page'
import MainLayout from '@layouts/MainLayout'

const ProfilePage: PageWithLayoutType = () => {
  return (
    <MainLayout loginRequired={true}>
      <ProfileContainer />
    </MainLayout>
  )
}

export default ProfilePage
