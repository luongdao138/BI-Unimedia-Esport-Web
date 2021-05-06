import { Avatar, AvatarProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AccountBalance } from '@material-ui/icons' //temp

const useStyles = makeStyles(() => ({
  root: {
    width: 60,
    height: 60,
  },
  facebook: {
    background: '#1877F2',
  },
}))

const ESButtonFacebookCircle: React.FC<AvatarProps> = ({ classes: _classes, className: _className, ...rest }) => {
  const classes = useStyles(rest)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { ...props } = rest

  return (
    <Avatar classes={{ root: classes.root }} className={classes.facebook}>
      <AccountBalance />
    </Avatar>
  )
}

ESButtonFacebookCircle.defaultProps = {}
export default ESButtonFacebookCircle
