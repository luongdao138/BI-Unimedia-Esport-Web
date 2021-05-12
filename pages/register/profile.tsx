import RegisterProfileContainer from '@containers/RegisterProfile'
import PrivateAuthLayout from '@layouts/PrivateAuthLayout'

const SetUpProfilePage: React.FC = () => {
  return (
    <PrivateAuthLayout>
      <RegisterProfileContainer />
    </PrivateAuthLayout>
  )
}

export default SetUpProfilePage
