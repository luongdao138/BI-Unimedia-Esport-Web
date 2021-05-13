import { useFormik } from 'formik'
import { UserLoginParams } from '@services/auth.service'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import * as Yup from 'yup'
import useLoginByEmail from './useLoginByEmail'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import Image from 'next/image'
import ESInput from '@components/Input'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import ButtonPrimary from '@components/ButtonPrimary'
import ESDividerWithMiddleText from '@components/DividerWithMiddleText'
import Link from 'next/link'
import ESToast from '@components/Toast'
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

const LoginContainer: React.FC = () => {
  const social = useSocialLogin()
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { loginByEmail, meta, resetMeta, handleClick } = useLoginByEmail()
  const { handleLink } = useReturnHref()
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(t('common:common.error')).email(),
    password: Yup.string().required(t('common:common.error')).min(8),
  })
  const { handleChange, values, handleSubmit, errors, touched } = useFormik<UserLoginParams>({
    initialValues: {
      email: '',
      password: '',
      registration_id: undefined,
    },
    validationSchema,
    onSubmit: (values, _helpers) => {
      loginByEmail(values)
    },
  })

  const handleSocialLogin = (params) => social.login({ ...params, type: 'login' })

  return (
    <>
      <Box pt={7.5} pb={9} className={classes.topContainer}>
        <Box py={2}>
          <IconButton className={classes.iconButtonBg} onClick={handleClick}>
            <Icon className="fa fa-arrow-left" fontSize="small" />
          </IconButton>
        </Box>

        <Box px={5} pt={6.625} display="flex" flexDirection="column" alignItems="center" className={classes.container}>
          <Box pt={1.375} pb={8}>
            <Image height="148" width="116" src="/images/big_logo.png" alt="logo" />
          </Box>

          <Box width="100%" flexDirection="column" alignItems="center">
            <form onSubmit={handleSubmit}>
              <Box>
                <ESInput
                  id="email"
                  placeholder={t('common:login.email_placeholder')}
                  labelPrimary={t('common:login.email_label_primary')}
                  labelSecondary={
                    <Typography color="textPrimary" gutterBottom={false} variant="body2">
                      {t('common:login.email_label_secondary')}
                      <FilterNoneIcon fontSize="inherit" className={classes.iconMargin} />
                    </Typography>
                  }
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  helperText={touched.email && errors.email}
                  error={touched.email && !!errors.email}
                />
              </Box>

              <Box pt={3}>
                <ESInput
                  id="password"
                  labelPrimary={t('common:login.password_label_primary')}
                  type="password"
                  labelSecondary={
                    <Link href={handleLink(ESRoutes.FORGOT_PASSWORD)} as={ESRoutes.FORGOT_PASSWORD} shallow>
                      <a className={classes.noLink}>
                        <Typography color="textPrimary" gutterBottom={false} variant="body2">
                          {t('common:login.password_label_secondary')}
                        </Typography>
                      </a>
                    </Link>
                  }
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  helperText={touched.password && errors.password}
                  error={touched.password && !!errors.password}
                />
              </Box>

              <Box pt={6} pb={4} maxWidth={280} className={classes.buttonContainer}>
                <ButtonPrimary type="submit" round fullWidth>
                  {t('common:login.submit')}
                </ButtonPrimary>
              </Box>
            </form>
          </Box>

          <Box pb={8} className={classes.linkContainer}>
            <Link href={handleLink(ESRoutes.REGISTER)} as={ESRoutes.REGISTER} shallow>
              <a>{t('common:login.register')}</a>
            </Link>
          </Box>

          <Box width="100%">
            <ESDividerWithMiddleText text={t('common:login.divider')} />
          </Box>

          <Box pt={8} maxWidth={280} className={classes.buttonContainer}>
            <ESButtonTwitter onSuccess={handleSocialLogin} fullWidth />
            <ESButtonGoogle onSuccess={handleSocialLogin} fullWidth />
            <ESButtonLine onSuccess={handleSocialLogin} fullWidth />
            <ESButtonFacebook onSuccess={handleSocialLogin} fullWidth />
            <ESButtonApple onSuccess={handleSocialLogin} fullWidth />
          </Box>
        </Box>
      </Box>
      {meta.pending && <ESLoader open={meta.pending} />}
      {!!meta.error && <ESToast open={!!meta.error} message={t('common:error.login_failed')} resetMeta={resetMeta} />}
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
  iconMargin: {
    marginLeft: theme.spacing(1 / 2),
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
  noLink: {
    textDecoration: 'none',
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

export default LoginContainer
