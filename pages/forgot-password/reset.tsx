import ResetPasswordContainer from '@containers/ResetPassword'
import AuthenticationLayout from '@layouts/AuthenticationLayout'

const ForgotResetPage: React.FC = () => {
  return (
    <AuthenticationLayout>
      <ResetPasswordContainer />
    </AuthenticationLayout>
  )
}

export default ForgotResetPage
