import RegisterContainer from '@containers/Register'
import AuthenticationLayout from '@layouts/AuthenticationLayout'

const RegisterPage: React.FC = () => {
  return (
    <AuthenticationLayout>
      <RegisterContainer />
    </AuthenticationLayout>
  )
}

export default RegisterPage
