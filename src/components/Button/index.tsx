import { Button, ButtonProps } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
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
      color: 'rgba(255,255,255,0.3)',
      boxShadow: 'none',
    },
  }),
  outlined: (props: { round?: boolean }) => ({
    borderRadius: props.round ? 25 : 4,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(255,255,255,0.7)',
    '&:hover': {
      background: 'rgba(255,255,255,0.3)',
      color: Colors.white,
    },
    '&.Mui-disabled': {
      color: 'rgba(255,255,255,0.3)',
      border: '1px solid rgba(255,255,255,0.3)',
    },
  }),
}))

const ESButton: React.FC<ButtonProps & { gradient?: boolean; round?: boolean; minWidth?: number }> = ({
  children,
  classes: _classes,
  ...rest
}) => {
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
