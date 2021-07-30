import RegisterContainer from '@containers/Register'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'
import withNoAuth from '@utils/withNoAuth'

const RegisterPage: PageWithLayoutType = () => {
  return (
    <AuthenticationLayout>
      <RegisterContainer />
    </AuthenticationLayout>
  )
}

export default withNoAuth(RegisterPage)
