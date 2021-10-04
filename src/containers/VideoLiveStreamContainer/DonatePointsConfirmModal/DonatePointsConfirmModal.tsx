import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import ConfirmModal from '@components/ConfirmModal'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { calValueFromTax } from '@utils/helpers/CommonHelper'

interface ModalProps {
  hasError?: boolean
  ticketPoint?: number
  myPoint?: number
  showConfirmModal?: boolean
  handleClose?: () => void
  handleConfirm?: () => void
  msgContent?: string
}

const DonatePointsConfirmModal: React.FC<ModalProps> = ({
  showConfirmModal,
  myPoint,
  handleClose,
  handleConfirm,
  msgContent,
  hasError,
  ticketPoint,
}) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <Box>
      <ConfirmModal open={showConfirmModal}>
        <Box className={classes.container}>
          <Typography className={classes.dialogTitle}>
            {hasError ? t('purchase_point_tab.purchase_confirm') : t('donate_points.confirm_message_modal')}
          </Typography>
          <Box className={hasError ? classes.wrap_message_error : classes.wrap_message}>
            <Typography className={classes.message}>
              {hasError ? t('purchase_point_tab.purchase_exe_points') : t('donate_points.title_donate_point') + '：'}{' '}
            </Typography>
            <Typography className={classes.message}>
              {FormatHelper.currencyFormat(hasError ? ticketPoint.toString() : myPoint.toString())}{' '}
              {hasError ? t('point_management_tab.eXe_point_text') : t('donate_points.eXe_point_text')}
            </Typography>
          </Box>
          <Box pt={2} />
          {hasError && (
            <Box className={classes.wrap_message_error}>
              <Typography className={classes.message}>{t('purchase_point_tab.purchase_fee')} </Typography>
              <Typography className={classes.message}>
                {FormatHelper.currencyFormat(calValueFromTax(ticketPoint).toString())}
                {t('common.money')}
              </Typography>
            </Box>
          )}
          {!hasError && (
            <Box className={classes.content}>
              <Typography className={classes.contentMsg}>{msgContent}</Typography>
            </Box>
          )}
          {!hasError ? (
            <Box className={classes.warning}>
              <Typography className={classes.warningText}>{t('donate_points.warning_text')}</Typography>
            </Box>
          ) : (
            <Box className={classes.errorWarning}>
              <Typography className={classes.warningErrorText}>{t('donate_points.error_message_purchase_point')}</Typography>
            </Box>
          )}
        </Box>
        {!hasError ? (
          <Box className={classes.actionBox}>
            <ButtonPrimary className={classes.actionBtnClose} gradient={false} onClick={handleClose}>
              {t('donate_points.cancel_text_btn')}
            </ButtonPrimary>
            <ButtonPrimary className={classes.actionBtnConfirm} onClick={handleConfirm}>
              {t('donate_points.confirm_text_btn')}
            </ButtonPrimary>
          </Box>
        ) : (
          <Box className={classes.actionBox}>
            <ButtonPrimary className={classes.actionBtnClose} onClick={handleClose}>
              {t('dialog.confirm')}
            </ButtonPrimary>
          </Box>
        )}
      </ConfirmModal>
    </Box>
  )
}

export default DonatePointsConfirmModal

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '100%',
    display: 'block',
  },
  dialogTitle: {
    color: Colors.white,
    textAlign: 'center',
    paddingBottom: 36,
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
      paddingTop: 16,
      paddingBottom: 16,
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
  actionBtnConfirm: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      order: 0,
      marginBottom: 24,
    },
  },
  wrap_message: {
    fontSize: '14px',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    color: Colors.white_opacity[70],
  },
  wrap_message_error: {
    flexDirection: 'column',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'center',
    color: Colors.white_opacity[70],
  },
  warningText: {
    fontSize: '16px',
    color: '#F7F735',
    padding: '0 0 31px 0',
    textAlign: 'center',
  },
  warningErrorText: {
    fontSize: '16px',
    color: '#F7F735',
    padding: '0 0 31px 0',
    textAlign: 'center',
    whiteSpace: 'pre',
  },
  contentMsg: {
    fontSize: '18px',
    color: '#FF4786',
    textAlign: 'center',
  },
  content: {
    padding: '64px 0 73px 0',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
      paddingBottom: 16,
    },
  },
  warning: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
  errorWarning: {
    marginTop: 32,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
}))
