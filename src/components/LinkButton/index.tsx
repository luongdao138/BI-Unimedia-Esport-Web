import { Link, LinkProps, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'

const LinkButton: React.FC<LinkProps> = ({ children, onClick }) => {
  const classes = useStyles()

  return (
    <Link className={classes.link} underline="always" component="button" onClick={onClick}>
      <Typography>{children}</Typography>
    </Link>
  )
}

const useStyles = makeStyles(() => ({
  link: {
    color: Colors.white_opacity[70],
    '&:hover, &:focus': {
      color: Colors.white,
    },
  },
}))

export default LinkButton
