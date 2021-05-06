import { Avatar, AvatarProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

const useStyles = makeStyles(() => ({
  root: (props: { src: string; stringValue: string }) => {
    const colorIndex = props.stringValue.toUpperCase().charCodeAt(0) % 11
    return {
      backgroundColor: props.src ? 'none' : Colors.avatar[colorIndex],
      width: 50,
      height: 50,
      fontSize: 33,
      border: props.src ? 'none' : '1px solid rgba(255,255,255,0.15)',
      color: Colors.white,
    }
  },
}))

const ESAvatar: React.FC<AvatarProps & { stringValue: string }> = (props) => {
  const classes = useStyles({ src: props.src, stringValue: props.stringValue })
  if (props.src) {
    return <Avatar {...props} classes={classes} alt={props.stringValue} />
  }

  return (
    <Avatar classes={classes} {...props}>
      {props.stringValue.toUpperCase().charAt(0)}
    </Avatar>
  )
}

export default ESAvatar
