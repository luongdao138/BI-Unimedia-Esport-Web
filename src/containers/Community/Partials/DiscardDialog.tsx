import { Box, Dialog, makeStyles, Typography, withStyles } from '@material-ui/core'
import MuiDialogContent from '@material-ui/core/DialogContent'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import { useTranslation } from 'react-i18next'

interface IndividualEntryModalProps {
  open: boolean
  title: string
  description?: string
  confirmTitle: string
  onClose?: () => void
  onSubmit: () => void
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

const DiscardDialog: React.FC<IndividualEntryModalProps> = ({ onClose, open, onSubmit, title, description, confirmTitle }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])

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
      PaperProps={{
        style: {
          margin: 0,
          maxHeight: '100vh',
          height: '100vh',
          width: '100%',
        },
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <Box className={classes.container}>
          <Typography className={classes.dialogTitle}>{title}</Typography>
          <Typography className={classes.message}>{description}</Typography>
        </Box>
        <Box className={classes.actionBox}>
          <Box maxWidth="100%" className={classes.actionBtnCloseWrap}>
            <ButtonPrimary fullWidth className={classes.actionBtnClose} gradient={false} onClick={handleClose}>
              {t('common:common.cancel')}
            </ButtonPrimary>
          </Box>
          <Box maxWidth="100%" className={classes.actionBtnConfirmWrap}>
            <ButtonPrimary fullWidth className={classes.actionBtnConfirm} onClick={handleSubmit}>
              {confirmTitle}
            </ButtonPrimary>
          </Box>
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
    marginBottom: theme.spacing(9),
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
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actionBtnCloseWrap: {
    marginRight: theme.spacing(2),
    width: 220,
  },
  actionBtnClose: {
    color: `${Colors.white_opacity[70]} !important`,
  },
  actionBtnConfirmWrap: {
    width: 220,
  },
  message: {
    color: Colors.text[200],
    textAlign: 'center',
  },
  [theme.breakpoints.down('md')]: {
    dialogTitle: {
      fontSize: 22,
      marginBottom: theme.spacing(4),
    },
    actionBox: {
      flexDirection: 'column',
    },
    actionBtnCloseWrap: {
      marginRight: theme.spacing(0),
      order: 2,
      width: '100%',
    },
    actionBtnConfirmWrap: {
      order: 1,
      marginBottom: theme.spacing(3),
      width: '100%',
    },
    dialogContent: {
      background: '#2d2d2d',
    },
  },
}))

export default DiscardDialog
