import ConfirmContainer from '@containers/Confirm'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'

const ForgotConfirmPage: PageWithLayoutType = () => {
  return <ConfirmContainer />
}

ForgotConfirmPage.Layout = AuthenticationLayout

export default ForgotConfirmPage
