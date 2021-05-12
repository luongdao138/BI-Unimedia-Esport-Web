import RegisterContainer from '@containers/Register'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'

const RegisterPage: PageWithLayoutType = () => {
  return <RegisterContainer />
}

RegisterPage.Layout = AuthenticationLayout

export default RegisterPage
