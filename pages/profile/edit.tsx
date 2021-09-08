import ProfileEditContainer from '@containers/Profile/ProfileEdit'
import BlankLayout from '@layouts/BlankLayout'
import { withAuth } from '@utils/withAuth'

const ProfileEditPage: React.FC = () => {
  return (
    <BlankLayout>
      <ProfileEditContainer />
    </BlankLayout>
  )
}

export default withAuth(ProfileEditPage)
