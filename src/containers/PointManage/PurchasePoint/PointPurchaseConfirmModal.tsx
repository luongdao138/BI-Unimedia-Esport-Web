import { Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import ConfirmModal from '@components/ConfirmModal'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { calValueFromTax } from '@utils/helpers/CommonHelper'
interface ModalProps {
  selectedPoint: any
  open: boolean
  hasError: boolean
  handleClose: () => void
  handlePurchasePoint: () => void
}

const PointPurchaseConfirmModal: React.FC<ModalProps> = ({ open, selectedPoint, handleClose, handlePurchasePoint, hasError }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <Box>
      <ConfirmModal open={open}>
        <Box className={classes.container}>
          <Typography className={classes.dialogTitle}>{t('purchase_point_tab.purchase_confirm')}</Typography>
          <Box className={classes.wrap_message}>
            <Typography className={classes.message}>{t('purchase_point_tab.purchase_exe_points')}</Typography>
            <Typography className={classes.message}>
              {FormatHelper.currencyFormat(selectedPoint.toString())} {t('point_management_tab.eXe_point_text')}
            </Typography>
            <Box pb={3}></Box>
            <Typography className={classes.message}>{t('purchase_point_tab.purchase_fee')}</Typography>
            <Typography className={classes.message}>
              {FormatHelper.currencyFormat(calValueFromTax(selectedPoint).toString())}
              {t('common.money')}
            </Typography>
          </Box>
          {hasError ? 
            <Typography className={classes.mess_purchase_point_error}>{t('purchase_point_tab.mess_purchase_point_error')}</Typography> 
            : <Typography className={classes.note_purchase_point}>{t('purchase_point_tab.note_purchase_point')}</Typography>
          }
        </Box>
        <Box className={classes.actionBox}>
          <ButtonPrimary className={classes.actionBtnClose} gradient={false} onClick={handleClose}>
            {t('common.cancel')}
          </ButtonPrimary>
          <ButtonPrimary className={classes.actionBtnBuy} onClick={handlePurchasePoint}>
            {t('purchase_point_tab.btn_buy')}
          </ButtonPrimary>
        </Box>
      </ConfirmModal>
    </Box>
  )
}

export default PointPurchaseConfirmModal

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'block',
  },
  dialogTitle: {
    color: Colors.white,
    textAlign: 'center',
    paddingBottom: 39,
    fontSize: 24,
    fontWeight: 'bold',
  },
  message: {
    color: Colors.text[200],
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
  mess_purchase_point_error: {
    fontSize: '14px',
    color: '#F7F735',
    padding: '24px 0 24px 0',
    textAlign: 'center',
    whiteSpace: "pre-line"
  }
}))
