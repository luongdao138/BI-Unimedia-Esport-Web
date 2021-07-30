import RegisterProfileContainer from '@containers/RegisterProfile'
import PrivateAuthLayout from '@layouts/PrivateAuthLayout'
import PageWithLayoutType from '@constants/page'
import withNoAuth from '@utils/withNoAuth'
import { ESRoutes } from '@constants/route.constants'

const SetUpProfilePage: PageWithLayoutType = () => {
  return <RegisterProfileContainer />
}

SetUpProfilePage.Layout = PrivateAuthLayout

export default withNoAuth(SetUpProfilePage, ESRoutes.LOGIN)
