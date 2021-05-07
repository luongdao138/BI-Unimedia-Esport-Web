import { ButtonBase, ButtonBaseProps } from '@material-ui/core'

const ButtonPrimary: React.FC<
  ButtonBaseProps & {
    round?: boolean
    gradient?: boolean
    size?: 'small' | 'large'
    fullWidth?: boolean
  }
> = ({ children, classes: _classes, className: _className, ...rest }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { round, gradient, size, fullWidth, ...props } = rest
  const roundClass = round ? 'button-primary primary-rounded' : 'button-primary'
  const gradientClass = gradient ? ' gradient' : ''
  const sizeClass = size === 'large' ? ' primary-large' : ' primary-small'
  const widthClass = fullWidth ? ' full-width' : ''
  const classes = roundClass + gradientClass + sizeClass + widthClass

  return (
    <ButtonBase className={classes} {...props}>
      <div className="circle"></div>
      <span className="label-primary MuiButton-label">{children}</span>
    </ButtonBase>
  )
}

ButtonPrimary.defaultProps = {
  round: true,
  gradient: true,
  size: 'large',
  fullWidth: false,
}
export default ButtonPrimary
