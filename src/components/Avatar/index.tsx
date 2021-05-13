import { Avatar, AvatarProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

const useStyles = makeStyles(() => ({
  root: (props: { src: string; alt: string; size?: number }) => {
    const colorIndex = props.alt ? props.alt.toUpperCase().charCodeAt(0) % 11 : 0
    return {
      backgroundColor: props.src ? 'none' : Colors.avatar[colorIndex],
      fontSize: 33,
      width: props.size,
      height: props.size,
      border: props.src ? 'none' : '1px solid rgba(255,255,255,0.15)',
      color: Colors.white,
    }
  },
}))

interface Props extends AvatarProps {
  size?: number
}

const ESAvatar: React.FC<Props> = (props) => {
  const classes = useStyles({ src: props.src, alt: props.alt, size: props.size })
  if (props.src) {
    return <Avatar {...props} classes={classes} alt={props.alt} />
  }

  return (
    <Avatar classes={classes} {...props}>
      {props.alt.toUpperCase().charAt(0)}
    </Avatar>
  )
}

ESAvatar.defaultProps = {
  size: 50,
}

export default ESAvatar
