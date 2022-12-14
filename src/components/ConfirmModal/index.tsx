import { Box, makeStyles, withStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'

interface ConfirmModalProps {
  children: React.ReactNode
  open: boolean
  containerStyle?: React.CSSProperties
  className?: string
}

interface StyleProps {
  containerStyle: React.CSSProperties
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ children, open, containerStyle = {}, className }) => {
  const classes = useStyles({ containerStyle })

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
      document.body.style.height = 'unset'
    }
  }, [])

  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(3),
      display: 'block',
      background: 'linear-gradient(180deg, rgba(16,16,16,1) 0%, rgba(52,52,52,1) 100%)',
      width: '100%',
      '&:first-child': {
        padding: '40px 24px 40px 24px',
        [theme.breakpoints.down(321)]: {
          padding: '20px 24px 20px 24px',
        },
        [theme.breakpoints.down(375)]: {
          paddingLeft: '13px',
        },
      },
    },
  }))(MuiDialogContent)

  return (
    <Box className={className}>
      <Dialog
        disableBackdropClick
        fullWidth
        open={open}
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
        className={`${classes.dialog_container} ${className}`}
      >
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </Box>
  )
}

export default ConfirmModal

const useStyles = makeStyles((theme) => ({
  dialog_container: (props: StyleProps) => ({
    ...props.containerStyle,
    '& .MuiDialog-paperFullWidth': {
      borderRadius: 10,
      maxWidth: 754,
    },
    '& .MuiDialog-paperScrollPaper': {
      display: 'unset',
    },
  }),
  [theme.breakpoints.down(321)]: {
    dialog_container: {
      '& .MuiDialog-paperFullWidth': {
        width: 'calc(100% - 32px)',
        margin: 0,
      },
    },
  },
}))
