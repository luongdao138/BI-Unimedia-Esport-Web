import ConfirmContainer from '@containers/Confirm'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'
import withNoAuth from '@utils/withNoAuth'
import { ESRoutes } from '@constants/route.constants'

const ConfirmPage: PageWithLayoutType = () => {
  return <ConfirmContainer />
}

ConfirmPage.Layout = AuthenticationLayout

export default withNoAuth(ConfirmPage, ESRoutes.LOGIN)
