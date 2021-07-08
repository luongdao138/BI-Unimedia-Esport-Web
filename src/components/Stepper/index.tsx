import { Stepper, StepperProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'transparent',
  },
}))

const ESStepper: React.FC<StepperProps> = ({ children, classes: _classes, ...rest }) => {
  const classes = useStyles()
  return (
    <Stepper {...rest} classes={classes}>
      {children}
    </Stepper>
  )
}

ESStepper.defaultProps = {
  alternativeLabel: true,
  nonLinear: true,
}

export default ESStepper
