import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import ConfirmModal from '@components/ConfirmModal'
import { FormatHelper } from '@utils/helpers/FormatHelper'

interface ModalProps {
  donatedPoint: number
  showConfirmModal: boolean
  handleClose: () => void
  handleConfirm: () => void
  msgContent: string
}

const DonatePointsConfirmModal: React.FC<ModalProps> = ({ showConfirmModal, donatedPoint, handleClose, handleConfirm, msgContent }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <Box>
      <ConfirmModal open={showConfirmModal}>
        <Box className={classes.container}>
          <Typography className={classes.dialogTitle}>{t('donate_points.confirm_message_modal')}</Typography>
          <Box className={classes.wrap_message}>
            <Typography className={classes.message}>{t('donate_points.title_donate_point') + ':'} </Typography>
            <Typography className={classes.message}>
              {FormatHelper.currencyFormat(donatedPoint.toString())} {t('donate_points.eXe_point_text')}
            </Typography>
          </Box>
          <Box className={classes.content}>
            <Typography className={classes.contentMsg}>{t('donate_points.title_send_message')}</Typography>
            <Typography className={classes.contentMsg}>{msgContent}</Typography>
            <Box className={classes.warning}>
              <Typography className={classes.warningText}>{t('donate_points.warning_text')}</Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.actionBox}>
          <ButtonPrimary className={classes.actionBtnClose} gradient={false} onClick={handleClose}>
            {t('donate_points.cancel_text_btn')}
          </ButtonPrimary>
          <ButtonPrimary className={classes.actionBtnConfirm} onClick={handleConfirm}>
            {t('donate_points.confirm_text_btn')}
          </ButtonPrimary>
        </Box>
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
  warningText: {
    fontSize: '16px',
    color: '#F7F735',
    padding: '0 0 16px 0',
    textAlign: 'center',
  },
  contentMsg: {
    fontSize: '18px',
    color: '#FF4786',
    textAlign: 'center',
  },
  content: {
    paddingTop: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
  warning: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
}))
