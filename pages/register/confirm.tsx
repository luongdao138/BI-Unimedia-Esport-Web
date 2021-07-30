import ConfirmContainer from '@containers/Confirm'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'
import withNoAuth from '@utils/withNoAuth'

const ConfirmPage: PageWithLayoutType = () => {
  return (
    <AuthenticationLayout>
      <ConfirmContainer />
    </AuthenticationLayout>
  )
}

export default withNoAuth(ConfirmPage)
