import LoginContainer from '@containers/Login'
import AuthenticationLayout from '@layouts/AuthenticationLayout'

const LoginPage: React.FC = () => {
  return (
    <AuthenticationLayout>
      <LoginContainer />
    </AuthenticationLayout>
  )
}

export default LoginPage
