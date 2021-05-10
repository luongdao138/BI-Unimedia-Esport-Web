import { useState } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import Image from 'next/image'
import ButtonPrimary from '@components/ButtonPrimary'
import ESDividerWithMiddleText from '@components/DividerWithMiddleText'
import Link from 'next/link'
import ESButtonTwitter from '@components/Button/Twitter'
import ESButtonGoogle from '@components/Button/Google'
import ESButtonLine from '@components/Button/Line'
import ESButtonFacebook from '@components/Button/Facebook'
import ESButtonApple from '@components/Button/Apple'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import ESCheckbox from '@components/Checkbox'
import { useRouter } from 'next/router'
import useSocialLogin from '@utils/hooks/useSocialLogin'

const RegisterContainer: React.FC = () => {
  const router = useRouter()
  const social = useSocialLogin()
  const [checkbox, setCheckox] = useState({
    terms: false,
    privacy: false,
  })
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckox({ ...checkbox, [event.target.name]: event.target.checked })
  }

  const handleSocialLogin = (params) => social.login({ ...params, type: 'register' })

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

        <Box pt={3} flexDirection="column" display="flex">
          <ESCheckbox disableRipple checked={checkbox.terms} onChange={handleChange} label="利用規約に同意する" name="terms" />
          <ESCheckbox disableRipple checked={checkbox.privacy} onChange={handleChange} label="個人情報保護方針に同意する" name="privacy" />
        </Box>

        <Box pt={5} pb={8} className={classes.buttonContainer} textAlign="center">
          <ButtonPrimary round className={classes.submitBtn} onClick={() => router.push('/register/by-email')}>
            {t('common:register.button')}
          </ButtonPrimary>
        </Box>

        <Box width="100%">
          <ESDividerWithMiddleText text={t('common:login.divider')} />
        </Box>

        <Box pt={8} textAlign="center">
          <ESButtonTwitter className={classes.submitBtn} onSuccess={handleSocialLogin} />
          <ESButtonGoogle className={classes.submitBtn} onSuccess={handleSocialLogin} />
          <ESButtonLine className={classes.submitBtn} onSuccess={handleSocialLogin} />
          <ESButtonFacebook className={classes.submitBtn} onSuccess={handleSocialLogin} />
          <ESButtonApple className={classes.submitBtn} onSuccess={handleSocialLogin} />
        </Box>

        <Box pt={4} className={classes.linkContainer}>
          <Link href="/login">
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

export default RegisterContainer
