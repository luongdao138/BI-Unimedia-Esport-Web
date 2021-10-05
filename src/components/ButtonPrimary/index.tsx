import { ButtonBase, ButtonBaseProps } from '@material-ui/core'

export interface PrimaryButtonProps extends ButtonBaseProps {
  round?: boolean
  gradient?: boolean
  size?: 'small' | 'large'
  fullWidth?: boolean
  px?: number
}

const ButtonPrimary: React.FC<PrimaryButtonProps> = ({ children, classes: _classes, className, ...rest }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { round, gradient, size, fullWidth, px, ...props } = rest
  const roundClass = round ? 'button-primary primary-rounded' : 'button-primary'
  const gradientClass = gradient ? ' gradient' : ''
  const sizeClass = size === 'large' ? ' primary-large' : ' primary-small'
  const widthClass = fullWidth ? ' full-width' : ''
  const classes = roundClass + gradientClass + sizeClass + widthClass

  return (
    <ButtonBase
      className={`${classes} ${className}`}
      style={{ paddingLeft: px, paddingRight: px, paddingTop: 0, paddingBottom: 0 }}
      {...props}
    >
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
  className: '',
  px: 16,
}
export default ButtonPrimary
