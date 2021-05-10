import RegisterByEmailContainer from '@containers/RegisterByEmail'
import AuthenticationLayout from '@layouts/AuthenticationLayout'

const RegisterByEmailPage: React.FC = () => {
  return (
    <AuthenticationLayout>
      <RegisterByEmailContainer />
    </AuthenticationLayout>
  )
}

export default RegisterByEmailPage
