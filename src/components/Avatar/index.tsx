import { Avatar, AvatarProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface StyleProps {
  src: string
  alt: string | null
  size: number
}

const useStyles = makeStyles(() => ({
  root: {
    width: (props: StyleProps) => props.size,
    height: (props: StyleProps) => props.size,
    border: (props: StyleProps) => (props.src ? 'none' : '1px solid rgba(255,255,255,0.15)'),
    color: Colors.white,
  },
}))

interface Props extends AvatarProps {
  size?: number
}

const ESAvatar: React.FC<Props> = (props) => {
  const classes = useStyles({ src: props.src, alt: props.alt, size: props.size })

  const colorIndex = props.alt ? props.alt.toUpperCase().charCodeAt(0) % 11 : 0
  let backgroundColor = props.src ? 'none' : Colors.avatar[colorIndex]
  if (!props.alt) {
    backgroundColor = '#4D4D4D'
  }

  const restProps = _.omit(props, ['src'])

  if (props.src) {
    return (
      <Avatar classes={classes} {...restProps}>
        {props.children ? props.children : <LazyLoadImage className="MuiAvatar-img" alt={props.alt} src={props.src} />}
      </Avatar>
    )
  }
  const zIndex = _.get(props, 'style.zIndex')
  return (
    <Avatar
      classes={classes}
      {...props}
      style={{ backgroundColor: backgroundColor, fontSize: (props.size * 33) / 50, zIndex: _.isNumber(zIndex) ? zIndex : undefined }}
    >
      {props.alt ? props.alt.toUpperCase().charAt(0) : ''}
    </Avatar>
  )
}

ESAvatar.defaultProps = {
  size: 50,
  alt: '',
}

export default ESAvatar
