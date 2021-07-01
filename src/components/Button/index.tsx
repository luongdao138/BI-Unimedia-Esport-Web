import { Button, ButtonProps } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  containedPrimary: (props: { gradient?: boolean; round?: boolean; minWidth?: number }) => ({
    minWidth: props.minWidth,
    borderRadius: props.round ? 25 : 4,
    boxShadow: 'none',
    background: Colors.primary,
    fontWeight: 'bold',
    '&:hover': {
      background: Colors.white,
      backgroundColor: Colors.white,
      color: Colors.primary,
      transition: 'all 0.2s ease-in',
    },

    '&.Mui-disabled': {
      background: '#4D4D4D',
      color: Colors.white_opacity[30],
      boxShadow: 'none',
    },
  }),
  outlined: (props: { round?: boolean; normalColor?: string; hoverColor?: string }) => ({
    borderRadius: props.round ? 25 : 4,
    fontWeight: 'normal',
    color: props.normalColor || Colors.white_opacity[70],
    border: '1px solid',
    borderColor: props.normalColor || Colors.white_opacity[70],
    '&:hover': {
      background: props.hoverColor || Colors.white_opacity[30],
      color: props.normalColor || Colors.white,
    },
    '&.Mui-disabled': {
      color: Colors.white_opacity[30],
      border: '1px solid',
      borderColor: Colors.white_opacity[30],
    },
  }),
  [theme.breakpoints.down('sm')]: {
    outlined: {
      padding: '2px 10px',
    },
  },
}))

const ESButton: React.FC<
  ButtonProps & { gradient?: boolean; round?: boolean; minWidth?: number; normalColor?: string; hoverColor?: string }
> = ({ children, classes: _classes, ...rest }) => {
  const classes = useStyles(rest)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { gradient, round, minWidth, ...props } = rest
  return (
    <Button classes={classes} {...props} disableRipple>
      {children}
    </Button>
  )
}

ESButton.defaultProps = {
  round: false,
}
export default ESButton
