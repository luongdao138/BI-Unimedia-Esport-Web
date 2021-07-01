import { useTranslation } from 'react-i18next'
import HeaderWithButton from '@components/HeaderWithButton'
import { useRouter } from 'next/router'
import { Box, makeStyles, Typography, withStyles } from '@material-ui/core'
import { useAppSelector } from '@store/hooks'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { SNS } from '@constants/common.constants'
import ESButton from '@components/Button'
import SettingsItem from './SettingsItem'
import authStore from '@store/auth'
import useAccount from './useAccount'
import { useContextualRouting } from 'next-use-contextual-routing'
import { ESRoutes } from '@constants/route.constants'
import React from 'react'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import ButtonPrimary from '@components/ButtonPrimary'
import { Colors } from '@theme/colors'

const AccountSettingsContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const { resetSteps } = useAccount()
  const { makeContextualHref } = useContextualRouting()
  const { selectors } = authStore
  const classes = useStyles()
  const router = useRouter()
  const user = useAppSelector(selectors.getAuth)
  const hasEmail = CommonHelper.hasEmail(user?.email)

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    router.push(ESRoutes.INQUIRY_SETTINGS)
    setOpen(false)
  }

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

  const openEmailModal = () => {
    resetSteps()
    router.push(makeContextualHref({ pathName: ESRoutes.USER_ACCOUNT_SETTINGS_PASSWORD }), ESRoutes.USER_ACCOUNT_SETTINGS_PASSWORD, {
      shallow: true,
    })
  }

  const openPasswordModal = () => {
    resetSteps()
    router.push(
      makeContextualHref({ pathName: ESRoutes.USER_ACCOUNT_SETTINGS_CHANGE_PASSWORD }),
      ESRoutes.USER_ACCOUNT_SETTINGS_CHANGE_PASSWORD,
      {
        shallow: true,
      }
    )
  }

  return (
    <>
      <HeaderWithButton title={t('account_settings.title')} />
      <Box>
        <SettingsItem title={t('account_settings.membership_type')} value={t('account_settings.general_member')} disabled />
        <SettingsItem title={t('common.user_id')} value={user?.user_code && '@' + user.user_code} disabled />
        <SettingsItem
          title={t('common.mail_address')}
          value={hasEmail ? user.email : SNS}
          route={hasEmail && !user.is_social ? '/account_settings' : SNS}
          onChangeEmail={openEmailModal}
          showButton={!user.is_social}
        />
        <SettingsItem
          title={t('common.password')}
          value={user?.is_social ? SNS : ''}
          invisible={!user?.is_social}
          route={hasEmail && !user.is_social ? '/account_settings' : SNS}
          onChangePassword={openPasswordModal}
          password
          showButton={!user.is_social}
        />
      </Box>
      <Box my={4} display="flex" justifyContent="center">
        <ESButton onClick={handleClickOpen} variant={'outlined'}>
          {t('account_settings.delete_account')}
        </ESButton>
      </Box>
      <div>
        <Dialog
          maxWidth={'md'}
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Box className={classes.container}>
              <Typography className={classes.dialogTitle}>{t('account_settings.delete_confirm_title')}</Typography>
              <Typography className={classes.message} gutterBottom>
                {t('account_settings.delete_confirm_msg')}
              </Typography>
            </Box>
            <Box className={classes.actionBox}>
              <ButtonPrimary size="small" className={classes.actionBtnClose} gradient={false} onClick={handleClose}>
                {t('account_settings.delete_confirm_no')}
              </ButtonPrimary>
              <ButtonPrimary size="small" className={classes.actionBtnConfirm} onClick={handleSubmit}>
                {t('account_settings.delete_confirm_yes')}
              </ButtonPrimary>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
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
  message: {
    color: Colors.text[200],
    textAlign: 'center',
  },
  actionBox: {
    marginTop: 100,
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
}))

export default AccountSettingsContainer
