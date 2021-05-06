import { Snackbar } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { TransitionProps } from '@material-ui/core/transitions'
import Slide from '@material-ui/core/Slide'
import { Colors } from '@theme/colors'

const slideTransition = (props: TransitionProps) => {
  return <Slide {...props} direction="down" />
}

interface Props {
  open: boolean
  message: string
  onClose?: () => void
}

const Toast: React.FC<Props> = ({ open, message, onClose }) => {
  const classes = useStyles()

  function handleClose() {
    onClose && onClose()
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      classes={{ anchorOriginTopCenter: classes.snackBarRoot }}
      TransitionComponent={slideTransition}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={message}
      aria-describedby="toast"
      ContentProps={{
        classes: { root: classes.root, message: classes.message },
      }}
    />
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    justifyContent: 'center',
    fontSize: 14,
    boxShadow: 'none',
  },
  snackBarRoot: {
    width: '100%',
    top: 0,
  },
  message: {
    color: Colors.white,
  },
}))

export default Toast
