import UserSettingsContainer from '@containers/UserSettings'
import PrivateAuthLayout from '@layouts/PrivateAuthLayout'
import PageWithLayoutType from '@constants/page'

const UserSettingsPage: PageWithLayoutType = () => {
  return <UserSettingsContainer />
}

UserSettingsPage.Layout = PrivateAuthLayout

export default UserSettingsPage
