import { Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import ConfirmModal from '@components/ConfirmModal'
import ESLoader from '@components/FullScreenLoader'

interface ModalProps {
  isLoading: boolean
  open: boolean
  video: any
  deleteError: any
  handleClose: () => void
  handleDeleteVideo: () => void
}

const VideoDeleteConfirmModal: React.FC<ModalProps> = ({ open, handleClose, video, handleDeleteVideo, deleteError, isLoading }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  return (
    <Box>
      <ConfirmModal open={open} containerStyle={{ backgroundColor: '#000000BB' }} className={classes.confirm_delete_video}>
        {isLoading && <ESLoader open={isLoading} />}
        <Box className={classes.container}>
          <Typography className={classes.dialogTitle}>{t('archive_detail_screen.delete_dialog_title')}</Typography>
          <Box className={classes.wrap_message}>
            <Typography className={classes.message}>{t('archive_detail_screen.delete_dialog_sub_title')}</Typography>
            <Box pb={4}></Box>
            <Typography className={classes.message}>{video?.title}</Typography>
            <Typography className={classes.deleteWarning}>{t('archive_detail_screen.delete_warning')}</Typography>
            <Box pb={4}></Box>
            {!!deleteError && <Typography className={classes.mess_delete_card_error}>{deleteError}</Typography>}
          </Box>
        </Box>
        <Box className={classes.actionBox}>
          <ButtonPrimary className={classes.actionBtnClose} gradient={false} onClick={handleClose}>
            {t('archive_detail_screen.cancel')}
          </ButtonPrimary>
          <ButtonPrimary className={classes.actionBtnBuy} onClick={handleDeleteVideo}>
            {t('archive_detail_screen.delete_confirm')}
          </ButtonPrimary>
        </Box>
      </ConfirmModal>
    </Box>
  )
}

export default VideoDeleteConfirmModal

const useStyles = makeStyles((theme) => ({
  confirm_delete_video: {
    '& .MuiDialog-paperFullWidth': {
      maxWidth: 815,
    },
  },
  deleteWarning: {
    marginTop: 32,
    fontSize: '16px',
    color: '#F7F735',
    padding: '10px 0px',
    textAlign: 'center',
    whiteSpace: 'pre-line',
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
  mess_delete_card_error: {
    fontSize: '14px',
    color: '#F7F735',
    paddingBottom: '32px',
    textAlign: 'center',
    whiteSpace: 'pre-line',
  },
}))
