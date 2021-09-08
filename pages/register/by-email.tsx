import RegisterByEmailContainer from '@containers/RegisterByEmail'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'
import withNoAuth from '@utils/withNoAuth'

const RegisterByEmailPage: PageWithLayoutType = () => {
  return (
    <AuthenticationLayout>
      <RegisterByEmailContainer />
    </AuthenticationLayout>
  )
}

export default withNoAuth(RegisterByEmailPage)
