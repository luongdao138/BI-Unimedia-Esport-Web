import { ButtonBase, ButtonProps } from '@material-ui/core'

const ButtonPrimary: React.FC<
  ButtonProps & {
    round?: boolean
    gradient?: boolean
    size?: 'small' | 'large'
  }
> = ({ children, classes: _classes, className: _className, ...rest }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { round, gradient, size, ...props } = rest
  const roundClass = round ? 'button-primary primary-rounded' : 'button-primary'
  const gradientClass = gradient ? ' gradient' : ''
  const sizeClass = size === 'large' ? ' primary-large' : ' primary-small'
  const classes = roundClass + gradientClass + sizeClass

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
}
export default ButtonPrimary
