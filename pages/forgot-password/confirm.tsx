import ForgotConfirmContainer from '@containers/ForgotConfirm'
import AuthenticationLayout from '@layouts/AuthenticationLayout'

const ForgotConfirmPage: React.FC = () => {
  return (
    <AuthenticationLayout>
      <ForgotConfirmContainer />
    </AuthenticationLayout>
  )
}

export default ForgotConfirmPage
