import ForgotPasswordContainer from '@containers/ForgotPassword'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'

const ForgotPasswordPage: PageWithLayoutType = () => {
  return <ForgotPasswordContainer />
}

ForgotPasswordPage.Layout = AuthenticationLayout

export default ForgotPasswordPage
