import { useState } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import useForgotConfirm from './useForgotConfirm'
import ESPinInput from '@components/PinInput'
import ESLoader from '@components/FullScreenLoader'
import ButtonPrimary from '@components/ButtonPrimary'
import ESToast from '@components/Toast'

const ForgotConfirmContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const [confirmationCode, setConfirmationCode] = useState<string>('')
  const { user, forgotConfirm, metaConfirm, backAction, resendConfirmation, metaResend, resetResendMeta } = useForgotConfirm(
    confirmationCode
  )

  const handleSubmit = () => {
    const params = {
      email: user?.email,
      confirmation_code: confirmationCode,
    }

    forgotConfirm(params)
  }

  const buttonActive = (): boolean => {
    return user?.email !== '' && confirmationCode.length === 6 && !metaConfirm.error
  }

  const handleResend = () => {
    if (user?.email) resendConfirmation({ email: user.email })
  }

  return (
    <>
      <Box pt={7.5} pb={9} className={classes.topContainer}>
        <Box py={2} display="flex" flexDirection="row" alignItems="center">
          <IconButton className={classes.iconButtonBg} onClick={backAction}>
            <Icon className="fa fa-arrow-left" fontSize="small" />
          </IconButton>
          <Box pl={2}>
            <Typography variant="h2">{t('common:forgot_password.title')}</Typography>
          </Box>
        </Box>

        <Box width="100%" px={5} pt={12} flexDirection="column" alignItems="center" textAlign="center" className={classes.container}>
          <Typography variant="h3" className={classes.hint}>
            {t('common:confirm.sent')}
          </Typography>
          <Typography variant="h3" className={classes.hint}>
            {t('common:confirm.verification_code')}
          </Typography>
          <Box py={4} display="flex" alignItems="center" flexDirection="column">
            <ESPinInput error={!!metaConfirm.error} value={confirmationCode} onChange={(value) => setConfirmationCode(value)} />
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

      <Box className={classes.stickyFooter}>
        <Box className={classes.nextBtnHolder}>
          <Box maxWidth={280} className={classes.buttonContainer}>
            <ButtonPrimary type="submit" round fullWidth disabled={!buttonActive()} onClick={handleSubmit}>
              {t('common:register_by_email.button')}
            </ButtonPrimary>
          </Box>
        </Box>
      </Box>
      <ESLoader open={metaConfirm.pending || metaResend.pending} />
      {metaResend.loaded && <ESToast open={metaResend.loaded} message={t('common:register.resend_success')} resetMeta={resetResendMeta} />}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
  },
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid`,
    borderTopColor: Colors.text['300'],
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
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
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
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

export default ForgotConfirmContainer
