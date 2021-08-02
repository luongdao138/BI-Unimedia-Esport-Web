import ForgotPasswordContainer from '@containers/ForgotPassword'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'
import withNoAuth from '@utils/withNoAuth'

const ForgotPasswordPage: PageWithLayoutType = () => {
  return (
    <AuthenticationLayout>
      <ForgotPasswordContainer />
    </AuthenticationLayout>
  )
}

export default withNoAuth(ForgotPasswordPage)
