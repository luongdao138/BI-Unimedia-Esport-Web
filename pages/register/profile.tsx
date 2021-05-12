import RegisterProfileContainer from '@containers/RegisterProfile'
import PrivateAuthLayout from '@layouts/PrivateAuthLayout'
import PageWithLayoutType from '@constants/page'

const SetUpProfilePage: PageWithLayoutType = () => {
  return <RegisterProfileContainer />
}

SetUpProfilePage.Layout = PrivateAuthLayout

export default SetUpProfilePage
