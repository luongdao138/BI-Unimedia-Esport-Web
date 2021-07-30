import RegisterProfileContainer from '@containers/RegisterProfile'
import PrivateAuthLayout from '@layouts/PrivateAuthLayout'
import PageWithLayoutType from '@constants/page'
import withNoAuth from '@utils/withNoAuth'

const SetUpProfilePage: PageWithLayoutType = () => {
  return (
    <PrivateAuthLayout>
      <RegisterProfileContainer />
    </PrivateAuthLayout>
  )
}

export default withNoAuth(SetUpProfilePage)
