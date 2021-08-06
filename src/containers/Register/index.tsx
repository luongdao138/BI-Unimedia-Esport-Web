import { useState } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import ButtonPrimary from '@components/ButtonPrimary'
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
import useReturnHref from '@utils/hooks/useReturnHref'
import i18n from '@locales/i18n'
import AuthenticationLayout from '@layouts/AuthenticationLayout'
import RegisterAgreementBox from './RegisterAgreementBox'

const RegisterContainer: React.FC = () => {
  const social = useSocialLogin('register')
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { handleLink, navigateScreen, handleReturn } = useReturnHref()
  const [isAgreementChecked, setAgreementChecked] = useState(false)

  const handleSocialLogin = (params) => {
    social.resetMeta()
    social.login({ ...params, type: 'register' })
  }

  const renderSocialError = () => {
    return (
      !!social.meta.error && (
        <Box pb={8} textAlign="center">
          <Typography color="secondary">{i18n.t('common:register.error.title')}</Typography>
        </Box>
      )
    )
  }

  return (
    <AuthenticationLayout>
      <Box pt={7.5} pb={9} className={classes.topContainer}>
        <Box py={2}>
          <IconButton
            className={classes.iconButtonBg}
            onClick={() => {
              social.resetMeta()
              handleReturn()
            }}
          >
            <Icon className="fa fa-arrow-left" fontSize="small" />
          </IconButton>
        </Box>

        <Box px={5} pt={6.625} display="flex" flexDirection="column" alignItems="center" className={classes.container}>
          <Box pt={1.375} pb={6}>
            <img src="/images/lp_exelab_logo.svg" width="116" height="148" />
          </Box>

          {renderSocialError()}

          <Box width="100%" flexDirection="column" alignItems="center">
            <Box textAlign="center">
              <Typography className={classes.termsText}>
                <a href={ESRoutes.TERMS} target="_blank" rel="noopener noreferrer">
                  {t('common:register.link1')}
                </a>
                {t('common:register.description1')}
                <a href={ESRoutes.PRIVACY} target="_blank" rel="noopener noreferrer">
                  {t('common:register.link2')}
                </a>
                {t('common:register.description2')}
                <br />
                {t('common:register.description3')}
              </Typography>
            </Box>
          </Box>

          <Box pb={2}>
            <RegisterAgreementBox onAgreementChange={setAgreementChecked} />
          </Box>

          <Box pt={2} maxWidth={280} className={classes.buttonContainer}>
            <ButtonPrimary
              round
              fullWidth
              onClick={() => {
                social.resetMeta()
                navigateScreen(ESRoutes.REGISTER_BY_EMAIL)
              }}
              disabled={!isAgreementChecked}
            >
              {t('common:register.button')}
            </ButtonPrimary>
          </Box>

          <Box pt={4} maxWidth={280} className={classes.buttonContainer}>
            <ESButtonTwitter fullWidth onSuccess={handleSocialLogin} disabled={!isAgreementChecked} />
            <ESButtonGoogle fullWidth onSuccess={handleSocialLogin} disabled={!isAgreementChecked} />
            <ESButtonLine fullWidth onSuccess={handleSocialLogin} disabled={!isAgreementChecked} />
            <ESButtonFacebook fullWidth onSuccess={handleSocialLogin} disabled={!isAgreementChecked} />
            <ESButtonApple fullWidth onSuccess={handleSocialLogin} disabled={!isAgreementChecked} />
          </Box>

          <Box pt={4} className={classes.linkContainer}>
            <Link href={handleLink(ESRoutes.LOGIN)} as={ESRoutes.LOGIN} shallow>
              <a onClick={() => social.resetMeta()}>{t('common:register.footer_link')}</a>
            </Link>
          </Box>
        </Box>
      </Box>
    </AuthenticationLayout>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  termsText: {
    '& > a': {
      color: theme.palette.primary.main,
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[200]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[200]}80`,
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

export default RegisterContainer
