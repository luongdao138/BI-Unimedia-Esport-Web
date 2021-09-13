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
  resetMeta?: () => void
}

const Toast: React.FC<Props> = ({ open, message, onClose, resetMeta }) => {
  const classes = useStyles()

  function handleClose() {
    onClose && onClose()
    resetMeta && resetMeta()
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
      autoHideDuration={5000}
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
    boxShadow: 'none',
    paddingBottom: 0,
    paddingTop: 0,
  },
  snackBarRoot: {
    width: '100%',
    top: 0,
    minHeight: 30,
  },
  message: {
    color: Colors.white,
    paddingTop: theme.spacing(0.625),
    paddingBottom: theme.spacing(0.625),
    fontSize: 14,
  },
}))

export default Toast
