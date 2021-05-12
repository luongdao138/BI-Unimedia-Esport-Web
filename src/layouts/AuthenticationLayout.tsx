import Container from '@material-ui/core/Container'
import useAuthenticated from '@utils/hooks/useAuthenticated'

const AuthenticationLayout: React.FC = ({ children }) => {
  useAuthenticated()

  return <Container maxWidth="sm">{children}</Container>
}

export default AuthenticationLayout
