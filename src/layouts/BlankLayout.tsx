import { makeStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'

type BlankLayoutProps = {
  isWide?: boolean
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ children, isWide }) => {
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={isWide ? classes.wideRoot : classes.root}>
      {children}
    </Container>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 622,
  },
  wideRoot: {
    maxWidth: 754,
  },
}))

BlankLayout.defaultProps = {
  isWide: false,
}

export default BlankLayout
