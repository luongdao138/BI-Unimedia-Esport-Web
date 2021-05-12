import ForgotPasswordContainer from '@containers/ForgotPassword'
import AuthenticationLayout from '@layouts/AuthenticationLayout'

const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthenticationLayout>
      <ForgotPasswordContainer />
    </AuthenticationLayout>
  )
}

export default ForgotPasswordPage
