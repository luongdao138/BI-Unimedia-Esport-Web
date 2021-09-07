import { useDispatch } from 'react-redux'
import { Snackbar } from '@material-ui/core'
import { clearMetaData } from '@store/metadata/actions'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  open: boolean
  message: string
  onClose?: () => void
}

const ErrorSnackbar: React.FC<Props> = ({ open, message, onClose }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  function handleClose() {
    onClose && onClose()
    dispatch(clearMetaData)
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      message={message}
      aria-describedby="client-snackbar"
      ContentProps={{ classes: { root: classes.root, action: classes.action } }}
      action={
        <IconButton size="small" aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      }
    />
  )
}

const useStyles = makeStyles(() => ({
  root: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  action: {
    alignSelf: 'start',
  },
}))

export default ErrorSnackbar
