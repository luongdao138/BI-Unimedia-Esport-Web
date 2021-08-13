import { Box, Dialog, makeStyles, Typography, withStyles } from '@material-ui/core'
import MuiDialogContent from '@material-ui/core/DialogContent'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'

interface IndividualEntryModalProps {
  open: boolean
  title: string
  description1?: string
  description2?: string
  confirmTitle: string
  onClose?: () => void
  onSubmit: () => void
  cancelTitle: string
}

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    display: 'block',
    background: 'linear-gradient(180deg, rgba(16,16,16,1) 0%, rgba(52,52,52,1) 100%)',
    width: '100%',
    '&:first-child': {
      padding: theme.spacing(3),
    },
  },
}))(MuiDialogContent)

const DeleteDialog: React.FC<IndividualEntryModalProps> = ({
  onClose,
  open,
  onSubmit,
  title,
  description1,
  description2,
  confirmTitle,
  cancelTitle,
}) => {
  const classes = useStyles()

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = () => {
    onSubmit()
  }
  return (
    <Dialog
      disableBackdropClick
      maxWidth={'md'}
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      BackdropProps={{
        onTouchMove: (e) => {
          e.preventDefault()
        },
        onTouchStart: (e) => {
          e.preventDefault()
        },
        onTouchEnd: (e) => {
          e.preventDefault()
        },
      }}
    >
      <DialogContent>
        <Box className={classes.container}>
          <Typography className={classes.dialogTitle} gutterBottom>
            {title}
          </Typography>
          <Typography className={classes.message}>{description1}</Typography>
          <Typography className={classes.message} gutterBottom>
            {description2}
          </Typography>
        </Box>
        <Box className={classes.actionBox}>
          <ButtonPrimary size="small" className={classes.actionBtnClose} gradient={false} onClick={handleClose}>
            {cancelTitle}
          </ButtonPrimary>
          <ButtonPrimary size="small" className={classes.actionBtnConfirm} onClick={handleSubmit}>
            {confirmTitle}
          </ButtonPrimary>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'block',
  },
  dialogTitle: {
    color: Colors.white,
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    fontSize: 24,
    fontWeight: 'bold',
  },
  actionBox: {
    marginTop: theme.spacing(14),
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  message: {
    color: Colors.text[200],
    textAlign: 'center',
  },
  actionBtnClose: {
    width: '100%',
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  actionBtnConfirm: {
    width: '100%',
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      order: 0,
    },
  },
}))

export default DeleteDialog
