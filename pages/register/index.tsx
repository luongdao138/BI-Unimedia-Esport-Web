import RegisterContainer from '@containers/Register'
import PageWithLayoutType from '@constants/page'
import withNoAuth from '@utils/withNoAuth'

const RegisterPage: PageWithLayoutType = () => {
  return <RegisterContainer />
}

export default withNoAuth(RegisterPage)
