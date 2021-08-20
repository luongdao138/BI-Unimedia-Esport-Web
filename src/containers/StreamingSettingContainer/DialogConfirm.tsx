import ButtonPrimary from '@components/ButtonPrimary'
import i18n from '@locales/i18n'
import { Box, Theme, Typography, makeStyles, withStyles } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import { Colors } from '@theme/colors'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import MuiDialogContent from '@material-ui/core/DialogContent'

interface Props {
  open: boolean
  handleClose: () => void
  handleSubmit: () => void
  title: string
  message: string
}

const DialogConfirm: React.FC<Props> = ({ open, handleClose, handleSubmit, title, message }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
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

  return (
    <div>
      <Dialog
        disableBackdropClick
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
          document.body.style.backgroundColor = 'transparent'
        }}
        onExited={() => {
          document.body.style.position = 'unset'
          document.body.style.width = 'unset'
          document.body.style.height = 'unset'
          document.body.style.backgroundColor = 'transparent'
        }}
        style={{ backgroundColor: 'transparent' }}
        className={classes.dialogTagCover}
      >
        <DialogContent className={classes.dialogTag}>
          <Box className={classes.containerDialog}>
            <Typography className={classes.dialogTitle}>{title}</Typography>
            <Typography className={classes.messageDialog} gutterBottom>
              {message}
            </Typography>
          </Box>
          <Box className={classes.actionBox}>
            <ButtonPrimary size="small" className={classes.actionBtnClose} gradient={false} onClick={handleClose}>
              {t('common:common.cancel')}
            </ButtonPrimary>
            <ButtonPrimary size="small" className={classes.actionBtnConfirm} onClick={handleSubmit}>
              {i18n.t('common:streaming_setting_screen.update')}
            </ButtonPrimary>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default memo(DialogConfirm)

const useStyles = makeStyles((theme: Theme) => ({
  containerDialog: {
    width: '100%',
    display: 'block',
  },
  dialogTitle: {
    color: Colors.white,
    textAlign: 'center',
    paddingBottom: 56,
    fontSize: 24,
    fontWeight: 'bold',
  },
  messageDialog: {
    color: Colors.text[200],
    textAlign: 'center',
  },
  actionBox: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  actionBtnClose: {
    width: '100%',
    margin: 16,
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  actionBtnConfirm: {
    width: '100%',
    margin: 16,
    [theme.breakpoints.down('sm')]: {
      order: 0,
    },
  },
  dialogTag: {
    '&.MuiDialogContent-root': {
      border: `1px solid rgba(255,255,255,0.3)`,
      borderRadius: 15,
    },
  },
  dialogTagCover: {
    backgroundColor: 'transparent',
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
    },
    '& .MuiDialog-paperFullWidth': {
      width: '80%',
    },
  },
}))
