import ResetPasswordContainer from '@containers/ResetPassword'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'
import { ESRoutes } from '@constants/route.constants'
import withNoAuth from '@utils/withNoAuth'

const ForgotResetPage: PageWithLayoutType = () => {
  return <ResetPasswordContainer />
}

ForgotResetPage.Layout = AuthenticationLayout

export default withNoAuth(ForgotResetPage, ESRoutes.LOGIN)
