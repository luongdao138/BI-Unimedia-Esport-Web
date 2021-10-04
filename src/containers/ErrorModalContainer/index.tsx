import { Box, Typography, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Colors } from '@theme/colors'
import ButtonPrimary from '../../components/ButtonPrimary'
import ConfirmModal from '../../components/ConfirmModal'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import * as selectors from '@store/common/selectors'
import * as actions from '@store/common/actions'
import _ from 'lodash'

const ErrorModalContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const errorModalData = useAppSelector(selectors.getErrorModal)
  const closeModal = () => dispatch(actions.closeErrorModal())
  const title = _.get(errorModalData, 'title', t('common.title_error_modal'))
  const msgContent = _.get(errorModalData, 'msgContent', t('common.error_message_content'))
  const showModal = _.get(errorModalData, 'showModal', false)
  const handleCloseModal = () => {
    closeModal()
  }
  return (
    <Box>
      <ConfirmModal open={showModal}>
        <Box className={classes.container}>
          <Typography className={classes.dialogTitle}>{title}</Typography>
          <Box className={classes.errorWarning}>
            <Typography className={classes.warningErrorText}>{msgContent}</Typography>
          </Box>
        </Box>
        <Box className={classes.actionBox}>
          <ButtonPrimary className={classes.actionBtnClose} onClick={handleCloseModal}>
            {t('dialog.confirm')}
          </ButtonPrimary>
        </Box>
      </ConfirmModal>
    </Box>
  )
}

export default ErrorModalContainer

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
  warningErrorText: {
    fontSize: '14px',
    color: '#F7F735',
    padding: '0 0 31px 0',
    textAlign: 'center',
    whiteSpace: 'pre',
  },
  errorWarning: {
    marginTop: 32,
    marginBottom: 32,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
}))
