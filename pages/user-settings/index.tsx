import UserSettingsContainer from '@containers/UserSettings'
import useAuthenticated from '@utils/hooks/useAuthenticated'

const UserSettingsPage: React.FC = () => {
  const { isAuth } = useAuthenticated()

  return isAuth && <UserSettingsContainer />
}

export default UserSettingsPage
