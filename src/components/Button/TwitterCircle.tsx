import { Avatar, SvgIcon, IconButton, IconButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    width: 30,
    height: 30,
  },
  svgRoot: {
    height: 14,
    width: 17,
  },
  iconRoot: {
    padding: 0,
  },
  avatar: (props: { disabled: boolean }) => {
    return {
      background: '#1D9BF0',
      opacity: props.disabled ? 0.3 : 1,
    }
  },
}))

interface SocialProps {
  link?: string
  onlyIcon?: boolean
  className?: string
}

const ESButtonTwitterCircle: React.FC<IconButtonProps & SocialProps> = ({ link, onlyIcon, className }) => {
  const disabled = !link || link.length === 0
  const classes = useStyles({ disabled: onlyIcon ? false : disabled })
  return (
    <IconButton href={link} target="_blank" disabled={disabled} classes={{ root: classes.iconRoot }} className={className}>
      <div className="esbutton-hover" />
      <Avatar classes={{ root: classes.root }} className={classes.avatar}>
        <SvgIcon classes={{ root: classes.svgRoot }} viewBox="0 0 16.625 13.511">
          <path
            id="Path_104"
            data-name="Path 104"
            d="M94.728,128.018a9.639,9.639,0,0,0,9.7-9.7c0-.148,0-.295-.01-.441a6.939,6.939,0,0,0,1.7-1.766,6.809,6.809,0,0,1-1.959.537,3.423,3.423,0,0,0,1.5-1.887,6.835,6.835,0,0,1-2.166.828,3.414,3.414,0,0,0-5.813,3.111,9.684,9.684,0,0,1-7.031-3.564,3.414,3.414,0,0,0,1.056,4.553,3.386,3.386,0,0,1-1.545-.427c0,.014,0,.029,0,.043a3.412,3.412,0,0,0,2.736,3.344,3.4,3.4,0,0,1-1.54.058,3.415,3.415,0,0,0,3.186,2.369,6.844,6.844,0,0,1-4.236,1.46,6.943,6.943,0,0,1-.814-.047,9.656,9.656,0,0,0,5.228,1.532"
            transform="translate(-89.5 -114.507)"
            fill="#fff"
          />
        </SvgIcon>
      </Avatar>
    </IconButton>
  )
}

export default ESButtonTwitterCircle
