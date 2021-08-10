import React from 'react'
import { Dialog, withStyles } from '@material-ui/core'
import MuiDialogContent from '@material-ui/core/DialogContent'

export interface ESDialogProps {
  open: boolean
  handleClose?: () => void
}

const Modal: React.FC<ESDialogProps> = ({ open, handleClose, children }) => {
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

  return (
    <Dialog
      maxWidth={'md'}
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
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
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default Modal
