import { Step, StepProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiStepConnector-alternativeLabel': {
      display: 'none',
    },
    '& .MuiStepIcon-root': {
      fontSize: 38,
      fill: 'transparent',
      overflow: 'visible',
      '&.MuiStepIcon-active': {
        fill: theme.palette.common.white,
        strokeWidth: 0,
        '& text': {
          fill: '#2D2D2D',
        },
      },
      '& circle': {
        stroke: theme.palette.common.white,
        strokeWidth: 1,
        strokeOpacity: '30%',
      },
    },
    '& .MuiStepIcon-text': {
      fill: theme.palette.text.secondary,
    },
  },
}))

const ESStep: React.FC<StepProps> = ({ children, classes: _classes, ...rest }) => {
  const classes = useStyles()
  return (
    <Step {...rest} classes={classes}>
      {children}
    </Step>
  )
}

export default ESStep
