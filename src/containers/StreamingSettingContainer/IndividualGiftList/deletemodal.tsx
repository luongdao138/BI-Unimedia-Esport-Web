import { Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import ConfirmModal from '@components/ConfirmModal'

interface ModalProps {
  open: boolean
  name: string
  handleClose: () => void
  handleDelete: () => void
}

const DeleteConfirmModal: React.FC<ModalProps> = ({ open, handleClose, name, handleDelete }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <Box>
      <ConfirmModal open={open}>
        <Box className={classes.container}>
          <Typography className={classes.dialogTitle}>{t('streaming_gift_management.delete_dialog_title')}</Typography>
          <Box className={classes.wrap_message}>
            <Typography className={classes.name}>
              {`${t('streaming_gift_management.delete_dialog_deleted_name')}: ${name}`}
              {`\n\n`}
            </Typography>
            <Typography className={classes.message}>{t('streaming_gift_management.delete_dialog_warning_1')}</Typography>
            <Typography className={classes.message}>{t('streaming_gift_management.delete_dialog_warning_2')}</Typography>
          </Box>
        </Box>
        <Box className={classes.actionBox}>
          <ButtonPrimary className={classes.actionBtnClose} gradient={false} onClick={handleClose}>
            {t('streaming_gift_management.delete_cancel')}
          </ButtonPrimary>
          <ButtonPrimary className={classes.actionBtnBuy} onClick={handleDelete}>
            {t('streaming_gift_management.delete_confirm')}
          </ButtonPrimary>
        </Box>
      </ConfirmModal>
    </Box>
  )
}

export default DeleteConfirmModal

const useStyles = makeStyles((theme) => ({
  deleteWarning: {
    fontSize: '12px',
    color: Colors.primary,
    padding: '10px 0px',
    textAlign: 'center',
  },
  container: {
    width: '100%',
    display: 'block',
  },
  dialogTitle: {
    color: Colors.white,
    textAlign: 'center',
    paddingBottom: 51,
    fontSize: 24,
    [theme.breakpoints.up(320)]: {
      minWidth: '265px',
    },
    fontWeight: 'bold',
  },
  name: {
    color: Colors.white_opacity[70],
    textAlign: 'center',
    marginBottom: '16px',
  },
  message: {
    color: Colors.white_opacity[70],
    textAlign: 'center',
  },
  actionBox: {
    marginTop: '52px',
    '& .MuiButtonBase-root.button-primary.primary-large': {
      width: 220,
      height: 50,
    },
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down(375)]: {
      marginLeft: '11px',
    },
  },
  actionBtnClose: {
    width: 220,
    height: 50,
    marginRight: 16,
    [theme.breakpoints.down('sm')]: {
      order: 1,
      marginRight: 0,
    },
  },
  actionBtnBuy: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      order: 0,
      marginBottom: 24,
    },
  },
  wrap_message: {
    fontSize: '14px',
    color: Colors.white_opacity[70],
    [theme.breakpoints.down(375)]: {
      marginLeft: '11px',
    },
  },
  note_purchase_point: {
    fontSize: '10px',
    color: '#F7F735',
    padding: '29px 0 37px 0',
    textAlign: 'center',
  },
  dialog_container: {
    '& .MuiDialog-paperFullWidth': {
      borderRadius: 10,
      maxWidth: 754,
    },
  },
  mess_delete_card_error: {
    fontSize: '14px',
    color: '#F7F735',
    paddingBottom: '32px',
    textAlign: 'center',
    whiteSpace: 'pre-line',
  },
}))
