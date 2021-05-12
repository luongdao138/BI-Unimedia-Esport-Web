import UserSettingsContainer from '@containers/UserSettings'
import PrivateAuthLayout from '@layouts/PrivateAuthLayout'

const UserSettingsPage: React.FC = () => {
  return (
    <PrivateAuthLayout>
      <UserSettingsContainer />
    </PrivateAuthLayout>
  )
}

export default UserSettingsPage
