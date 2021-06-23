import React from 'react'
import { makeStyles, Theme, withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import _ from 'lodash'

import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
const styles = (theme: Theme) =>
  createStyles({
    root: {
      fontSize: 18,
      margin: 0,
      padding: theme.spacing(2),
      left: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      left: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    dialogTitle: {
      color: 'white',
      fontSize: 18,
    },
  })

const useStyles = makeStyles({
  backDrop: {
    backdropFilter: 'blur(3px)',
  },
  customClass: {
    '& .MuiDialog-container ': {
      alignItems: 'flex-start',
    },
  },
})

export interface ESDialogProps extends DialogProps {
  title: string
  open: boolean
  handleClose: () => void
  bkColor?: string
  alignTop?: boolean
  fixedFooter?: React.ReactNode
}

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose: () => void
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      {onClose ? (
        <>
          <IconButton aria-label="close" onClick={onClose}>
            <Icon className="fa fa-arrow-left" fontSize="small" />
          </IconButton>
          <span className={classes.dialogTitle}>{children}</span>
        </>
      ) : null}
    </MuiDialogTitle>
  )
})

const ESDialog: React.FC<ESDialogProps> = ({ title, open, handleClose, children, bkColor, alignTop, fixedFooter, ...rest }) => {
  const classes = useStyles()
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      aria-labelledby="Followers"
      open={open}
      onClose={handleClose}
      disableBackdropClick
      className={alignTop === true ? classes.customClass : undefined}
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
        style: { backgroundColor: _.isString(bkColor) ? bkColor : 'rgba(0,0,30,0.6)' },
        children: fixedFooter ? fixedFooter : undefined,
      }}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          overflowY: 'hidden',
        },
      }}
      onEnter={() => {document.body.style.overflow = 'hidden'}}
      onExit={() => {document.body.style.overflow = 'unset'}}
      {...rest}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </DialogTitle>

      {children}
    </Dialog>
  )
}
export default ESDialog
