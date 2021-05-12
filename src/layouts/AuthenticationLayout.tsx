import { makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import useAuthenticated from '@utils/hooks/useAuthenticated'

const AuthenticationLayout: React.FC = ({ children }) => {
  const classes = useStyles()
  useAuthenticated()

  return (
    <Container maxWidth={false} className={classes.root}>
      {children}
    </Container>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 622,
  },
}))

export default AuthenticationLayout
