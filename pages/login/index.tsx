import LoginContainer from '@containers/Login'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import PageWithLayoutType from '@constants/page'

const LoginPage: PageWithLayoutType = () => {
  return <LoginContainer />
}

LoginPage.Layout = AuthenticationLayout

export default LoginPage
