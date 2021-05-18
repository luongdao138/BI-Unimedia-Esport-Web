import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog } from '@material-ui/core'

export interface ESDialogProps {
  open: boolean
  handleClose?: () => void
}

const Modal: React.FC<ESDialogProps> = ({ open, handleClose, children }) => {
  const classes = useStyles()

  return (
    <Dialog
      fullScreen
      aria-labelledby="modal"
      open={open}
      onClose={handleClose}
      BackdropProps={{ classes: { root: classes.backDrop } }}
      PaperProps={{ classes: { root: classes.paper } }}
    >
      {children}
    </Dialog>
  )
}

const useStyles = makeStyles({
  backDrop: {
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  paper: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
})

export default Modal
