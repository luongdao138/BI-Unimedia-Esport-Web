import { ButtonBaseProps, makeStyles } from '@material-ui/core'
import ESButton from '@components/Button'
import { ReactNode } from 'react'

const ButtonPrimaryOutlined: React.FC<
  ButtonBaseProps & {
    leadingIcon?: ReactNode
  }
> = ({ children, onClick, leadingIcon }) => {
  const classes = useStyles()
  return (
    <ESButton variant="outlined" round onClick={onClick} startIcon={leadingIcon} fullWidth className={classes.outlinedPrimary}>
      {children}
    </ESButton>
  )
}

const useStyles = makeStyles((theme) => ({
  outlinedPrimary: {
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    fontSize: theme.typography.h3.fontSize,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

ButtonPrimaryOutlined.defaultProps = {}

export default ButtonPrimaryOutlined
