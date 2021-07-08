import ResetPasswordContainer from '@containers/ResetPassword'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'

const ForgotResetPage: PageWithLayoutType = () => {
  return <ResetPasswordContainer />
}

ForgotResetPage.Layout = AuthenticationLayout

export default ForgotResetPage
