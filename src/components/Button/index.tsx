import { Button, ButtonProps } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  containedPrimary: (props: { gradient?: boolean; round?: boolean; minWidth?: number }) => ({
    minWidth: props.minWidth,
    borderRadius: props.round ? 25 : 4,
    boxShadow: props.gradient ? '0px 0px 10px #e11ad4' : 'none',
    background: props.gradient
      ? 'transparent linear-gradient(234deg, #D600FD 0%, #FC5E66 100%, #FB5C69 100%, #FD6161 100%) 0% 0% no-repeat padding-box;'
      : Colors.primary,
    fontWeight: 'bold',
    '&:hover': {
      boxShadow: props.gradient ? '0px 0px 10px #e11ad4' : 'none',
      background: Colors.white,
      backgroundColor: Colors.white,
      color: Colors.primary,
    },

    '&.Mui-disabled': {
      background: '#4D4D4D',
      color: 'rgba(255,255,255,0.3)',
      boxShadow: 'none',
    },
  }),
  outlined: (props: { gradient?: boolean; round?: boolean }) => ({
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
    <Button classes={classes} {...props}>
      {children}
    </Button>
  )
}

ESButton.defaultProps = {
  gradient: false,
  round: false,
}
export default ESButton
