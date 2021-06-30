import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, makeStyles, Theme, IconButton, Icon, Typography } from '@material-ui/core'
import ESPinInput from '@components/PinInput'
import ESStickyFooter from '@components/StickyFooter'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import useChangeEmailConfirm from './useConfirm'
import ESLoader from '@components/FullScreenLoader'
import * as actions from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'
import useConfirm from '@containers/Confirm/useConfirm'

const AccountSettingsConfirmContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const router = useRouter()
  const [confirmationCode, setConfirmationCode] = useState<string>('')
  const { changeEmailConfirm, meta, user, changeEmailSteps } = useChangeEmailConfirm(confirmationCode)
  const { resendConfirmation } = useConfirm('')

  const handleSubmit = () => {
    const params = {
      email: user.email,
      confirmation_code: confirmationCode,
    }

    changeEmailConfirm(params)
  }

  const handleResend = () => {
    if (user?.email) resendConfirmation({ email: user.email, type: 'reset_password' })
    dispatch(actions.addToast(`${t('account_settings.sent_resend_code')}`))
  }

  const buttonActive = (): boolean => {
    return user?.email !== '' && confirmationCode.length === 6 && !meta.error
  }

  if (!changeEmailSteps.step_change) {
    return null
  }

  return (
    <ESStickyFooter title={t('common.send')} disabled={!buttonActive()} onClick={handleSubmit}>
      <Box className={classes.header}>
        <IconButton className={classes.iconButton} disableRipple onClick={() => router.back()}>
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('account_settings.change_email_address')}
        </Typography>
      </Box>
      <Box mt={12} mx={4} mb={4} className={classes.formWrap}>
        <Typography variant="h3" className={classes.content}>
          {t('account_settings.confirm_title')}
        </Typography>
      </Box>
      <Box mb={4} display="flex" alignItems="center" flexDirection="column">
        <ESPinInput error={!!meta.error} value={confirmationCode} onChange={(value) => setConfirmationCode(value)} />
      </Box>
      <Box mx={4} mb={6} textAlign="center" className={classes.section}>
        <Typography className={classes.resend_code} variant="caption" onClick={handleResend}>
          {t('confirm.resend')}
        </Typography>
      </Box>
      <Box mx={4} className={classes.section}>
        <Typography variant="caption">{t('confirm.dont_receive')}</Typography>
      </Box>
      <Box mx={4} className={classes.sectionBottom}>
        <Typography variant="caption" className={classes.subtitle}>
          {t('confirm.send_again')}
        </Typography>
      </Box>
      {meta.pending && <ESLoader open={meta.pending} />}
    </ESStickyFooter>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  header: {
    paddingTop: theme.spacing(12),
  },
  icon: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  iconButton: {
    backgroundColor: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  headerTitle: {
    color: Colors.white,
    display: 'inline-block',
  },
  content: {
    whiteSpace: 'pre-line',
    textAlign: 'center',
    color: Colors.white_opacity['70'],
  },
  subtitle: {
    color: Colors.white_opacity['30'],
  },
  sectionBottom: {
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down('md')]: {
    header: {
      paddingTop: theme.spacing(2),
    },
    formWrap: {
      marginTop: theme.spacing(4),
      marginLeft: theme.spacing(2),
    },
    section: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
  },
  resend_code: {
    cursor: 'pointer',
  },
}))

export default AccountSettingsConfirmContainer
