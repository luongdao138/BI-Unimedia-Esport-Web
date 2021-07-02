import React, { useEffect } from 'react'
import { makeStyles, Theme, withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import _ from 'lodash'

import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { Colors } from '@theme/colors'
const styles = (theme: Theme) =>
  createStyles({
    root: {
      fontSize: 18,
      margin: 0,
      padding: '32px 0',
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
      padding: 0,
    },
    iconButton: {
      backgroundColor: Colors.grey[200],
      marginRight: 14,
      '&:hover': {
        backgroundColor: Colors.grey[200],
      },
    },
    icon: {
      fontSize: 12,
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down('sm')]: {
      root: {
        fontSize: 18,
        margin: 0,
        padding: '16px',
      },
    },
  })

const useStyles = makeStyles((theme: Theme) => ({
  backDrop: {
    backdropFilter: 'blur(3px)',
  },
  scrollPaper: {
    alignItems: 'baseline', // default center
    '& .MuiDialog-paper': {
      margin: 0,
      maxHeight: '100%',
    },
  },
  [theme.breakpoints.down('sm')]: {
    scrollPaper: {
      alignItems: 'baseline', // default center
      '& .MuiDialog-paper': {
        margin: 0,
        width: '100%',
      },
    },
  },
}))

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
          <IconButton className={classes.iconButton} aria-label="close" onClick={onClose}>
            <Icon className={`fa fa-arrow-left ${classes.icon}`} fontSize="small" />
          </IconButton>
          <span className={classes.dialogTitle}>{children}</span>
        </>
      ) : null}
    </MuiDialogTitle>
  )
})

const ESDialog: React.FC<ESDialogProps> = ({ title, open, handleClose, children, bkColor, alignTop, fixedFooter, ...rest }) => {
  const classes = useStyles()
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      aria-labelledby="Followers"
      open={open}
      classes={{ scrollPaper: alignTop ? classes.scrollPaper : '' }}
      onClose={handleClose}
      disableBackdropClick
      style={{ alignItems: 'flex-start' }}
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
        style: {
          backgroundColor: _.isString(bkColor)
            ? bkColor
            : window.navigator.userAgent.indexOf('Firefox') != -1
            ? 'rgba(0,0,30,0.8)'
            : 'rgba(0,0,30,0.6)',
        },
        children: fixedFooter ? fixedFooter : undefined,
      }}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      className={classes.dialog}
      onEntered={() => {
        document.body.style.overflow = 'hidden'
      }}
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
