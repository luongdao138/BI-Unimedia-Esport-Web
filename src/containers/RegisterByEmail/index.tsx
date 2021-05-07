import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import Image from 'next/image'
import ESButton from '@components/Button'
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

const RegisterByEmailContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const social = useSocialLogin()

  const handleGoogleLogin = (params) => social.login({ ...params, type: 'login' })

  return (
    <Box pt={7.5} pb={9} className={classes.topContainer}>
      <Box py={2}>
        <IconButton className={classes.iconButtonBg}>
          <Icon className="fa fa-arrow-left" fontSize="small" />
        </IconButton>
      </Box>

      <Box px={5} pt={6.625} display="flex" flexDirection="column" alignItems="center" className={classes.container}>
        <Box pt={1.375} pb={6}>
          <Image height="148" width="116" src="/images/big_logo.png" alt="logo" />
        </Box>

        <Box width="100%" flexDirection="column" alignItems="center">
          <Box textAlign="center">
            <Typography className={classes.termsText}>
              <a onClick={() => true}>{t('common:register.link1')}</a>
              {t('common:register.description1')}
              <a onClick={() => true}>{t('common:register.link2')}</a>
              {t('common:register.description2')}
              <br />
              {t('common:register.description3')}
            </Typography>
          </Box>
        </Box>

        <Box pt={6} pb={8} className={classes.buttonContainer} textAlign="center">
          <ESButton
            type="submit"
            variant="contained"
            color="primary"
            round
            gradient
            size="large"
            minWidth={280}
            className={classes.submitBtn}
          >
            {t('common:login.submit')}
          </ESButton>
        </Box>

        <Box width="100%">
          <ESDividerWithMiddleText text={t('common:login.divider')} />
        </Box>

        <Box pt={8} textAlign="center">
          <ESButtonTwitter />
          <ESButtonGoogle onSuccess={handleGoogleLogin} />
          <ESButtonLine />
          <ESButtonFacebook />
          <ESButtonApple />
        </Box>

        <Box pt={4} className={classes.linkContainer}>
          <Link href="/register">
            <a>{t('common:register.footer_link')}</a>
          </Link>
        </Box>
      </Box>
    </Box>
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
    backgroundColor: `${Colors.grey[1000]}80`,
    '&:focus': {
      backgroundColor: `${Colors.grey[1000]}80`,
    },
  },
  linkContainer: {
    textAlign: 'center',
    fontSize: 14,
    '& a': {
      color: theme.palette.primary.main,
    },
  },
  buttonContainer: {},
  topContainer: {},
  container: {},
  submitBtn: {},
  ['@media (max-width: 414px)']: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
  },
  ['@media (max-width: 330px)']: {
    submitBtn: {
      minWidth: 220,
    },
  },
}))

export default RegisterByEmailContainer
