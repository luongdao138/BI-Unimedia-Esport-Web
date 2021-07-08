import { ButtonBaseProps, makeStyles } from '@material-ui/core'
import ESButton from '@components/Button'
import { ReactNode } from 'react'

const ButtonPrimaryOutlined: React.FC<
  ButtonBaseProps & {
    leadingIcon?: ReactNode
    disabled?: boolean
  }
> = ({ children, onClick, leadingIcon, disabled }) => {
  const classes = useStyles()
  return (
    <ESButton
      variant="outlined"
      round
      disabled={disabled}
      onClick={onClick}
      startIcon={leadingIcon}
      fullWidth
      className={classes.outlinedPrimary}
    >
      {children}
    </ESButton>
  )
}

const useStyles = makeStyles((theme) => ({
  outlinedPrimary: {
    height: 50,
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    fontSize: theme.typography.h3.fontSize,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

ButtonPrimaryOutlined.defaultProps = {
  disabled: false,
}

export default ButtonPrimaryOutlined
