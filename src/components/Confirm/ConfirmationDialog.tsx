/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ButtonPrimary from '@components/ButtonPrimary'
import { ConfirmOptions } from './types'
import ESButton from '@components/Button'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import WarningRounded from '@material-ui/icons/WarningRounded'
import { Colors } from '@theme/colors'

interface ConfirmationDialogProps {
  open: boolean
  options: ConfirmOptions
  onCancel: () => void
  onConfirm: () => void
  onClose: () => void
}

const ConfirmationDialog = ({ open, options, onCancel, onConfirm, onClose }: ConfirmationDialogProps) => {
  const {
    title,
    description,
    content,
    confirmationText,
    cancellationText,
    dialogProps,
    confirmationButtonProps,
    cancellationButtonProps,
    additionalText,
  } = options

  const classes = useStyles()

  return (
    <Dialog fullWidth {...dialogProps} open={open} onClose={onClose} PaperProps={{ className: classes.root }}>
      {title && <DialogTitle className={classes.title}>{title}</DialogTitle>}
      {content ? (
        <DialogContent>{content}</DialogContent>
      ) : (
        description && (
          <DialogContent className={classes.dialogContent}>
            <DialogContentText className={classes.desc}>{description}</DialogContentText>
          </DialogContent>
        )
      )}
      <DialogActions className={classes.dialogActions}>
        <ESButton {...cancellationButtonProps} className={classes.secondary} onClick={onCancel}>
          {cancellationText}
        </ESButton>
        <ButtonPrimary {...confirmationButtonProps} onClick={onConfirm}>
          {confirmationText}
        </ButtonPrimary>
      </DialogActions>
      {additionalText && (
        <Typography className={classes.additional} variant="body1" component="p">
          <WarningRounded className={classes.icon} fontSize="small" />
          {additionalText}
        </Typography>
      )}
    </Dialog>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  dialogContent: {
    textAlign: 'center',
  },
  root: {
    padding: theme.spacing(3),
    display: 'block',
    background: 'linear-gradient(180deg, rgba(16,16,16,1) 0%, rgba(52,52,52,1) 100%)',
    width: '100%',
    '&:first-child': {
      padding: theme.spacing(3),
    },
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    color: Colors.white,
  },
  additional: {
    color: theme.palette.secondary.main,
    textAlign: 'center',
  },
  icon: {
    color: theme.palette.secondary.main,
    marginRight: 5,
    position: 'relative',
    top: 5,
  },
  desc: {
    color: Colors.white_opacity[70],
    fontSize: 14,
  },
  [theme.breakpoints.down('sm')]: {
    secondary: {
      padding: '12px 22px',
    },
    dialogActions: {
      flexDirection: 'column-reverse',
      padding: 10,
      '&.MuiDialogActions-spacing > :not(:first-child)': {
        marginLeft: 0,
      },
      '&.MuiDialogActions-spacing > button': {
        margin: 5,
      },
    },
  },
}))

export default ConfirmationDialog
