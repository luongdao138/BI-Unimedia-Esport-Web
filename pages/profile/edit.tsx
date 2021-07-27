import ProfileEditContainer from '@containers/Profile/ProfileEdit'
import BlankLayout from '@layouts/BlankLayout'
import useAuthenticated from '@utils/hooks/useAuthenticated'

const ProfileEditPage: React.FC = () => {
  useAuthenticated()
  return (
    <BlankLayout>
      <ProfileEditContainer />
    </BlankLayout>
  )
}

export default ProfileEditPage
