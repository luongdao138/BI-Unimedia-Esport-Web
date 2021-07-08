import ConfirmContainer from '@containers/Confirm'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'

const ConfirmPage: PageWithLayoutType = () => {
  return <ConfirmContainer />
}

ConfirmPage.Layout = AuthenticationLayout

export default ConfirmPage
