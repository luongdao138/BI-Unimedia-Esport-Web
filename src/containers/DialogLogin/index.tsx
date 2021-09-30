import React, { useState, useEffect } from 'react'
import { makeStyles, Theme, Box, Container } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import ESDividerWithMiddleText from '@components/DividerWithMiddleText'
import Link from 'next/link'
import ESButtonTwitter from '@components/Button/Twitter'
import ESButtonGoogle from '@components/Button/Google'
import ESButtonLine from '@components/Button/Line'
import ESButtonFacebook from '@components/Button/Facebook'
import ESButtonApple from '@components/Button/Apple'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import useSocialLogin from '@utils/hooks/useSocialLogin'
import { ESRoutes } from '@constants/route.constants'
import ESLoader from '@components/FullScreenLoader'
import useReturnHref from '@utils/hooks/useReturnHref'
import useLoginByEmail from '@containers/Login/useLoginByEmail'
import LoginForm from '@containers/Login/LoginForm'
import LoginSocialError from '@containers/Login/LoginSocialError'
import LoginError from '@containers/Login/LoginError'
import { URI } from '@constants/uri.constants'
import LoginAgreementBox from '@containers/Login/LoginAgreementBox'
import ESModal from '@components/Modal'

interface DialogLoginProps {
  loginRequired?: boolean
  showDialogLogin: boolean
  onCloseDialogLogin: () => void
}

const DialogLoginContainer: React.FC<DialogLoginProps> = ({ showDialogLogin, onCloseDialogLogin }) => {
  const social = useSocialLogin('login')
  const { t } = useTranslation(['common'])

  const classes = useStyles()

  const { handleLink } = useReturnHref()
  const [isAgreementChecked, setAgreementChecked] = useState(false)

  const { loginByEmail, meta, resetMeta, handleClick } = useLoginByEmail()

  const resetMetas = () => {
    resetMeta()
    social.resetMeta()
  }

  const handleSocialLogin = (params) => {
    resetMetas()
    social.login({ ...params, type: 'login' })
  }

  const handleLoginByEmail = (_values) => {
    resetMetas()
    loginByEmail(_values)
  }

  useEffect(() => {
    if (meta.loaded) {
      onCloseDialogLogin()
    }
  }, [meta.loaded])

  return (
    <ESModal open={showDialogLogin} handleClose={onCloseDialogLogin}>
      <Container maxWidth={false} className={classes.root}>
        <Box pt={7.5} pb={9} className={classes.topContainer}>
          <Box py={2}>
            <IconButton className={classes.iconButtonBg} onClick={handleClick}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
          </Box>
          <Box px={5} pt={6.625} display="flex" flexDirection="column" alignItems="center" className={classes.container}>
            <Box pt={1.375} pb={8}>
              <img src="/images/lp_exelab_logo.svg" width="116" height="148" />
            </Box>

            {!!meta.error && <LoginError />}
            {!!social.meta.error && <LoginSocialError />}

            <LoginForm onSubmitClicked={handleLoginByEmail} />

            <Box pb={8} className={classes.linkContainer}>
              <Link href={handleLink(ESRoutes.REGISTER)} as={ESRoutes.REGISTER} shallow>
                <a onClick={resetMetas}>{t('common:login.register')}</a>
              </Link>
            </Box>

            <Box width="100%">
              <ESDividerWithMiddleText text={t('common:login.divider')} />
            </Box>

            <Box pt={4} maxWidth={280} className={classes.buttonContainer}>
              <Box pb={2}>
                <LoginAgreementBox onAgreementChange={setAgreementChecked} />
              </Box>
              <ESButtonTwitter fullWidth disabled={!isAgreementChecked} twitterButtonType="login" redirectTo={social.redirectTo} />
              <ESButtonGoogle onSuccess={handleSocialLogin} fullWidth disabled={!isAgreementChecked} />
              <ESButtonLine fullWidth disabled={!isAgreementChecked} lineButtonType="login" redirectTo={social.redirectTo} />
              <ESButtonFacebook onSuccess={handleSocialLogin} fullWidth disabled={!isAgreementChecked} />
              <ESButtonApple onSuccess={handleSocialLogin} fullWidth disabled={!isAgreementChecked} />
            </Box>
            <Box pb={4} pt={4} className={classes.linkContainer}>
              <a href={URI.ZENDESK_SUPPORT} target="_blank" rel="noopener noreferrer">
                {t('common:login.cannot_login')}
              </a>
            </Box>
          </Box>
        </Box>
        {meta.pending && <ESLoader open={meta.pending} />}
      </Container>
    </ESModal>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 622,
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  linkContainer: {
    textAlign: 'center',
    fontSize: 14,
    '& a': {
      color: theme.palette.primary.main,
    },
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
  },
}))

export default DialogLoginContainer
