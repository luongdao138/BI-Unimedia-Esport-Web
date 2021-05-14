import { Avatar, SvgIcon, IconButton, IconButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: 60,
    height: 60,
  },
  svgRoot: {
    height: 28,
    width: 33,
  },
  iconRoot: {
    padding: 2,
  },
  avatar: (props: { disabled: boolean }) => {
    return {
      background: '#212121',
      opacity: props.disabled ? 0.3 : 1,
    }
  },
}))

interface SocialProps {
  link?: string
}

const ESButtonAppleCircle: React.FC<IconButtonProps & SocialProps> = ({ link }) => {
  const disabled = !link || link.length === 0
  const classes = useStyles({ disabled: disabled })
  return (
    <IconButton href={link} target="_blank" disabled={disabled} classes={{ root: classes.iconRoot }}>
      <Avatar classes={{ root: classes.root }} className={classes.avatar}>
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 28.152 32.633">
          <path
            id="Path_16891"
            data-name="Path 16891"
            d="M28.782-8.625Q25.077-6,25.077-2.316q0,4.417,4.579,6.779a18.237,18.237,0,0,1-3.559,6.2Q23.766,13.3,21.841,13.3a7.489,7.489,0,0,1-2.475-.6l-.5-.194a7.632,7.632,0,0,0-2.718-.6,7.375,7.375,0,0,0-2.443.469l-.631.227-.793.324a5.1,5.1,0,0,1-1.893.372q-2.249,0-4.967-3.705A19.074,19.074,0,0,1,1.5-1.976,10.316,10.316,0,0,1,3.947-9.143a8.28,8.28,0,0,1,6.472-2.718,7.2,7.2,0,0,1,2.815.55l.6.243.631.259a3.718,3.718,0,0,0,1.359.356,4.186,4.186,0,0,0,1.472-.307l.825-.324.615-.227a9.479,9.479,0,0,1,3.252-.534A8.269,8.269,0,0,1,28.782-8.625ZM22.116-19.336q.049.566.049.874a6.852,6.852,0,0,1-2.039,4.91,6.4,6.4,0,0,1-4.74,2.111,8.129,8.129,0,0,1-.081-.906A6.554,6.554,0,0,1,17.2-16.812a7.2,7.2,0,0,1,4.385-2.443Q21.76-19.287,22.116-19.336Z"
            transform="translate(-1.504 19.336)"
            fill="#fff"
          />
        </SvgIcon>
      </Avatar>
    </IconButton>
  )
}

export default ESButtonAppleCircle
