import React from 'react'
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

const RegularModal: React.FC<ESDialogProps> = ({ open, handleClose, children, ...rest }) => {
  const classes = useStyles()

  return (
    <Dialog
      fullScreen
      TransitionComponent={Transition}
      aria-labelledby="modal"
      open={open}
      disableScrollLock={false}
      onClose={handleClose}
      BackdropProps={{
        classes: { root: classes.backDrop },
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
      PaperProps={{ classes: { root: classes.paper }, id: 'es-modal' }}
      {...rest}
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

export default RegularModal
