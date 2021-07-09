import React, { useEffect } from 'react'
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

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
      document.body.style.height = 'unset'
    }
  }, [])

  return (
    <Dialog
      disableScrollLock
      maxWidth={'md'}
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onEntered={() => {
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.height = '100%'
      }}
      onExited={() => {
        document.body.style.position = 'unset'
        document.body.style.width = 'unset'
        document.body.style.height = 'unset'
      }}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default Modal
