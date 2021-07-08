import { StepLabel, StepLabelProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 20,
    '&.MuiStepLabel-alternativeLabel': {
      marginTop: theme.spacing(1),
    },
    '&.MuiStepLabel-active': {
      color: theme.palette.common.white,
      marginTop: theme.spacing(1),
    },
  },
}))

const ESStepLabel: React.FC<StepLabelProps> = ({ children, classes: _classes, ...rest }) => {
  const classes = useStyles()
  return (
    <StepLabel {...rest} classes={classes}>
      {children}
    </StepLabel>
  )
}

export default ESStepLabel
