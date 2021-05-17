import { Avatar, SvgIcon, IconButton, IconButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: 30,
    height: 30,
  },
  svgRoot: {
    height: 17,
    width: 16,
  },
  iconRoot: {
    padding: 4,
  },
  avatar: (props: { disabled: boolean }) => {
    return {
      background: '#6441A5',
      opacity: props.disabled ? 0.3 : 1,
    }
  },
}))

interface SocialProps {
  link?: string
  onlyIcon?: boolean
}

const ESButtonTwitchCircle: React.FC<IconButtonProps & SocialProps> = ({ link, onlyIcon }) => {
  const disabled = !link || link.length === 0
  const classes = useStyles({ disabled: onlyIcon ? false : disabled })
  return (
    <IconButton href={link} target="_blank" disabled={disabled} classes={{ root: classes.iconRoot }}>
      <Avatar classes={{ root: classes.root }} className={classes.avatar}>
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 15.528 16.237">
          <path
            id="Path_16710"
            data-name="Path 16710"
            d="M11.512,11.2l-1.059,2.824V25.319h3.881v2.119h2.119l2.116-2.119h3.176l4.236-4.234V11.2Zm1.411,1.411H24.57v7.766L22.1,22.848H18.217L16.1,24.964V22.848H12.922Zm3.883,7.06h1.412V15.436H16.805Zm3.882,0H22.1V15.436H20.687Z"
            transform="translate(-10.453 -11.2)"
            fill="#fff"
            fillRule="evenodd"
          />
        </SvgIcon>
      </Avatar>
    </IconButton>
  )
}

export default ESButtonTwitchCircle
