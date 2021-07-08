import RegisterByEmailContainer from '@containers/RegisterByEmail'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'

const RegisterByEmailPage: PageWithLayoutType = () => {
  return <RegisterByEmailContainer />
}

RegisterByEmailPage.Layout = AuthenticationLayout

export default RegisterByEmailPage
