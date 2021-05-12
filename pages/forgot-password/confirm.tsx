import ForgotConfirmContainer from '@containers/ForgotConfirm'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'

const ForgotConfirmPage: PageWithLayoutType = () => {
  return <ForgotConfirmContainer />
}

ForgotConfirmPage.Layout = AuthenticationLayout

export default ForgotConfirmPage
