import { StepButton, StepButtonProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiStepLabel-label.MuiStepLabel-active': {
      color: theme.palette.common.white,
    },
    '& .MuiStepLabel-label': {
      fontSize: 14,
    },
    paddingBottom: theme.spacing(4),
  },
}))

const ESStepButton: React.FC<StepButtonProps> = ({ children, classes: _classes, ...rest }) => {
  const classes = useStyles()
  return (
    <StepButton {...rest} classes={classes}>
      {children}
    </StepButton>
  )
}

export default ESStepButton
