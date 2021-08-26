import { Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import ConfirmModal from '@components/ConfirmModal'

interface ModalProps {
  open: boolean,
  deletedCard: any,
  handleClose: () => void,
  deleteSavedCard: (card_seq) => void,
}

const CardDeleteConfirmModal: React.FC<ModalProps> = ({ open, handleClose, deletedCard, deleteSavedCard }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <Box>
      <ConfirmModal open={open}>
        <Box className={classes.container}>
          <Typography className={classes.dialogTitle}>{t('purchase_point_tab.delete_confirm')}</Typography>
          <Box className={classes.wrap_message}>
            <Typography className={classes.message}>{t('purchase_point_tab.delete_confirm_content')}</Typography>
            <Box pb={4}></Box>
            <Typography className={classes.message}>{deletedCard.card_number}</Typography>
            <Box pb={4}></Box>
          </Box>
        </Box>
        <Box className={classes.actionBox}>
          <ButtonPrimary className={classes.actionBtnClose} gradient={false} onClick={handleClose}>
            {t('common.cancel')}
          </ButtonPrimary>
          <ButtonPrimary className={classes.actionBtnBuy} onClick={() => deleteSavedCard(deletedCard.card_seq)}>
            {t('purchase_point_tab.btn_delete')}
          </ButtonPrimary>
        </Box>
      </ConfirmModal>
    </Box>
  )
}

export default CardDeleteConfirmModal

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'block',
  },
  dialogTitle: {
    color: Colors.white,
    textAlign: 'center',
    paddingBottom: 51,
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    color: Colors.white_opacity[70],
    textAlign: 'center',
  },
  actionBox: {
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
}))
