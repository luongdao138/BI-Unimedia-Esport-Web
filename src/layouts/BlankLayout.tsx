import { makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'

const BlankLayout: React.FC = ({ children }) => {
  const classes = useStyles()

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

export default BlankLayout
