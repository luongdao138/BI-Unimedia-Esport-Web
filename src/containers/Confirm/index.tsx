import { useState } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import useConfirm from './useConfirm'
import ESPinInput from '@components/PinInput'
import ESLoader from '@components/FullScreenLoader'
import ESToast from '@components/Toast'
import ESStickyFooter from '@components/StickyFooter'
import AuthenticationLayout from '@layouts/AuthenticationLayout'

const ConfirmContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [confirmationCode, setConfirmationCode] = useState<string>('')
  const {
    user,
    registerConfirm,
    resetMeta,
    metaConfirm,
    metaForgot,
    backAction,
    resendConfirmation,
    metaResend,
    metaResendForgot,
    resetResendMeta,
  } = useConfirm(confirmationCode)

  const handleSubmit = () => {
    const params = {
      email: user?.email,
      confirmation_code: confirmationCode,
    }
    registerConfirm(params)
  }

  const buttonActive = (): boolean => {
    return user?.email !== '' && confirmationCode.length === 6 && (!metaConfirm.error || !metaForgot.error)
  }

  const handleResend = () => {
    resetMeta()
    if (user?.email) resendConfirmation({ email: user.email })
  }

  const renderError = () => {
    return (
      (!!metaConfirm.error || !!metaForgot.error) && (
        <Box pb={8}>
          <Typography color="secondary">{t('common:error.invalid_confirmation')}</Typography>
        </Box>
      )
    )
  }

  return (
    <AuthenticationLayout>
      <ESStickyFooter disabled={!buttonActive()} title={t('common:register_by_email.button')} onClick={handleSubmit} noScroll>
        <Box pt={7.5} pb={9} className={classes.topContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center">
            <IconButton className={classes.iconButtonBg} onClick={backAction}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <Box pl={2}>
              <Typography variant="h2">{t('common:register_by_email.back')}</Typography>
            </Box>
          </Box>

          <Box width="100%" px={5} pt={12} flexDirection="column" alignItems="center" textAlign="center" className={classes.container}>
            {renderError()}
            <Typography variant="h3" className={classes.hint}>
              {t('common:confirm.sent')}
            </Typography>
            <Typography variant="h3" className={classes.hint}>
              {t('common:confirm.verification_code')}
            </Typography>
            <Box py={4} display="flex" alignItems="center" flexDirection="column">
              <ESPinInput
                error={!!metaConfirm.error || !!metaForgot.error}
                value={confirmationCode}
                onChange={(value) => setConfirmationCode(value)}
              />
            </Box>

            <Box onClick={handleResend}>
              <Typography variant="body2" className={classes.resend}>
                {t('common:confirm.resend')}
              </Typography>
            </Box>
          </Box>

          <Box pt={12}>
            <Typography variant="body2" className={classes.hint}>
              {t('common:confirm.dont_receive')}
            </Typography>
            <Typography variant="body2" className={classes.hintDetail}>
              {t('common:confirm.send_again')}
            </Typography>
          </Box>

          <Box className={classes.blankSpace}></Box>
        </Box>
      </ESStickyFooter>

      <ESLoader open={metaConfirm.pending || metaResend.pending || metaForgot.pending || metaResendForgot.pending} />
      {(metaResend.loaded || metaResendForgot.loaded) && (
        <ESToast
          open={metaResend.loaded || metaResendForgot.loaded}
          message={t('common:register.resend_success')}
          resetMeta={resetResendMeta}
        />
      )}
    </AuthenticationLayout>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  hint: {
    color: Colors.grey[300],
  },
  resend: {
    color: Colors.grey[300],
    cursor: 'pointer',
  },
  hintDetail: {
    color: Colors.text[300],
  },
  blankSpace: {
    height: 169,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
    blankSpace: {
      height: theme.spacing(15),
    },
  },
}))

export default ConfirmContainer
