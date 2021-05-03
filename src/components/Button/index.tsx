import { Button, ButtonProps } from '@material-ui/core'
import { Colors } from '@theme/colors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  containedPrimary: {
    borderRadius: 25,
    minHeight: 50,
    boxShadow: '0px 0px 10px #e11ad4',
    fontWeight: 'bold',
    '&:hover': {
      boxShadow: '0px 0px 10px #e11ad4',
      background: Colors.white,
      backgroundColor: Colors.white,
      color: Colors.primary,
    },
    background:
      'transparent linear-gradient(234deg, #D600FD 0%, #FC5E66 100%, #FB5C69 100%, #FD6161 100%) 0% 0% no-repeat padding-box;',
    '&.Mui-disabled': {
      background: '#4D4D4D',
      color: 'rgba(255,255,255,0.3)',
      boxShadow: 'none',
    },
  },
  outlined: {
    borderRadius: 25,
    minHeight: 50,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(255,255,255,0.7)',
    '&:hover': {
      background: 'rgba(255,255,255,0.3)',
      color: Colors.white,
    },
  },
}))

const ESButton: React.FC<ButtonProps> = ({
  children,
  variant,
  color: _color,
  classes: _classes,
  className: _className,
  ...rest
}) => {
  const classes = useStyles()

  if (variant === 'contained') {
    return (
      <Button classes={classes} variant={variant} color="primary" {...rest}>
        {children}
      </Button>
    )
  }

  return (
    <Button classes={classes} variant={variant} {...rest}>
      {children}
    </Button>
  )
}

export default ESButton
