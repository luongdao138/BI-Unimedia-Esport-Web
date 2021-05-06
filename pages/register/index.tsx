import RegisterByEmailContainer from '@containers/RegisterByEmail'
import AuthenticationLayout from '@layouts/AuthenticationLayout'

const RegisterPage: React.FC = () => {
  return (
    <AuthenticationLayout>
      <RegisterByEmailContainer />
    </AuthenticationLayout>
  )
}

export default RegisterPage
