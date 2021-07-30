import ConfirmContainer from '@containers/Confirm'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'
import withNoAuth from '@utils/withNoAuth'
import { ESRoutes } from '@constants/route.constants'

const ForgotConfirmPage: PageWithLayoutType = () => {
  return <ConfirmContainer />
}

ForgotConfirmPage.Layout = AuthenticationLayout

export default withNoAuth(ForgotConfirmPage, ESRoutes.LOGIN)
