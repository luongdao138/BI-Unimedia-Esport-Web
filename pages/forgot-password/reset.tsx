import ResetPasswordContainer from '@containers/ResetPassword'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'
import withNoAuth from '@utils/withNoAuth'

const ForgotResetPage: PageWithLayoutType = () => {
  return (
    <AuthenticationLayout>
      <ResetPasswordContainer />
    </AuthenticationLayout>
  )
}

export default withNoAuth(ForgotResetPage)
