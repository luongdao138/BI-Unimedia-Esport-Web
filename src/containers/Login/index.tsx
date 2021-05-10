import { useEffect } from 'react'
import { useFormik } from 'formik'
import { UserLoginParams } from '@services/auth.service'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import useLoginByEmail from './useLoginByEmail'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import Image from 'next/image'
import ESInput from '@components/Input'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import ESButton from '@components/Button'
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

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required').email(),
  password: Yup.string().required('Required').min(8),
})

const LoginContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const router = useRouter()
  const { loginByEmail, meta, resetMeta } = useLoginByEmail()
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

  useEffect(() => {
    if (meta.loaded) {
      router.push('/welcome')
    }
  }, [meta.loaded])

  return (
    <>
      <Box pt={7.5} pb={9} className={classes.topContainer}>
        <Box py={2}>
          <IconButton className={classes.iconButtonBg}>
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
                    <Typography color="textPrimary" gutterBottom={false} variant="body2">
                      {t('common:login.password_label_secondary')}
                    </Typography>
                  }
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  helperText={touched.password && errors.password}
                  error={touched.password && !!errors.password}
                />
              </Box>

              <Box pt={6} pb={4} className={classes.buttonContainer} textAlign="center">
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
            </form>
          </Box>

          <Box pb={8} className={classes.linkContainer}>
            <Link href="/register">
              <a>{t('common:login.register')}</a>
            </Link>
          </Box>

          <Box width="100%">
            <ESDividerWithMiddleText text={t('common:login.divider')} />
          </Box>

          <Box pt={8} textAlign="center">
            <ESButtonTwitter variant="contained" className={classes.submitBtn} />
            <ESButtonGoogle variant="contained" className={classes.submitBtn} />
            <ESButtonLine variant="contained" className={classes.submitBtn} />
            <ESButtonFacebook variant="contained" className={classes.submitBtn} />
            <ESButtonApple variant="contained" className={classes.submitBtn} />
          </Box>
        </Box>
      </Box>
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

export default LoginContainer
