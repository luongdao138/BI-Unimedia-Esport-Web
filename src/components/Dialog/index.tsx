import React from 'react'
import { makeStyles, Theme, withStyles, WithStyles, createStyles } from '@material-ui/core/styles'

import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import { useTranslation } from 'react-i18next'

const styles = (theme: Theme) =>
  createStyles({
    root: {
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
  })

const useStyles = makeStyles({
  backDrop: {
    backdropFilter: 'blur(3px)',
    backgroundColor: 'rgba(0,0,30,0.6)',
  },
})

export interface ESDialogProps {
  open: boolean
  handleClose: () => void
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
          <span style={{ color: 'white' }}>{children}</span>
        </>
      ) : null}
    </MuiDialogTitle>
  )
})

const ESDialog: React.FC<ESDialogProps> = ({ open, handleClose, children, ...rest }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  return (
    <Dialog
      aria-labelledby="Followers"
      open={open}
      onClose={handleClose}
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
      }}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      {...rest}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {t('common:followers.title')}
      </DialogTitle>

      {children}
    </Dialog>
  )
}
export default ESDialog
