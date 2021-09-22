import { Link, LinkProps, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const LinkButton: React.FC<LinkProps> = ({ children, onClick, ...props }) => {
  const classes = useStyles()

  return (
    <Link className={classes.link} underline="always" component="button" onClick={onClick} style={props.style}>
      <Typography>{children}</Typography>
    </Link>
  )
}

const useStyles = makeStyles(() => ({
  link: {
    color: '#FFFFFF30',
    '&:focus': {
      color: '#ffffff9c',
    },
    cursor: 'pointer',
  },
}))

export default LinkButton
