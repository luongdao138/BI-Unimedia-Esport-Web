import { Link, LinkProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: theme.typography.body1.fontSize,
  },
}))

const ESLink: React.FC<LinkProps> = ({ children, onClick }) => {
  const classes = useStyles()

  return (
    <Link classes={classes} underline="always" component="button" onClick={onClick}>
      {children}
    </Link>
  )
}

export default ESLink
