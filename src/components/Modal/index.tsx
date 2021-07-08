import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog } from '@material-ui/core'
import Slide from '@material-ui/core/Slide'
import { TransitionProps } from '@material-ui/core/transitions'

export interface ESDialogProps {
  open: boolean
  handleClose?: () => void
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />
})

const Modal: React.FC<ESDialogProps> = ({ open, handleClose, children }) => {
  const classes = useStyles()
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <Dialog
      disableScrollLock
      fullScreen
      TransitionComponent={Transition}
      aria-labelledby="modal"
      open={open}
      onClose={handleClose}
      BackdropProps={{ classes: { root: classes.backDrop } }}
      PaperProps={{ classes: { root: classes.paper } }}
      onEntered={() => {
        document.body.style.overflow = 'hidden'
      }}
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
