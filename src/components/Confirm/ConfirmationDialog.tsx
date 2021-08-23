/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ConfirmOptions } from './types'

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
  } = options

  return (
    <Dialog fullWidth {...dialogProps} open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content ? (
        <DialogContent>{content}</DialogContent>
      ) : (
        description && (
          <DialogContent>
            <DialogContentText>{description}</DialogContentText>
          </DialogContent>
        )
      )}
      <DialogActions>
        <Button {...cancellationButtonProps} onClick={onCancel}>
          {cancellationText}
        </Button>
        <Button color="primary" {...confirmationButtonProps} onClick={onConfirm}>
          {confirmationText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
