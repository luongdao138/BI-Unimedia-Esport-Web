import RegisterProfileContainer from '@containers/RegisterProfile'
import AuthenticationLayout from '@layouts/AuthenticationLayout'

const SetUpProfilePage: React.FC = () => {
  return (
    <AuthenticationLayout>
      <RegisterProfileContainer />
    </AuthenticationLayout>
  )
}

export default SetUpProfilePage
