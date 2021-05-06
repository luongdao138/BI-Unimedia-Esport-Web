import { useEffect } from 'react'
import { useFormik } from 'formik'
import { UserLoginParams } from '@services/auth.service'
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core'
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
  const { loginByEmail, meta } = useLoginByEmail()
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
      <Grid container>
        <Grid item className={classes.topContainer}>
          <IconButton className={classes.iconButtonBg}>
            <Icon className={`fa fa-arrow-left ${classes.iconSmall}`} />
          </IconButton>
        </Grid>

        <Grid container direction="row" justify="center">
          <Grid item className={classes.itemContainer}>
            <Image height="148" width="116" src="/images/big_logo.png" alt="logo" />
          </Grid>

          <form onSubmit={handleSubmit}>
            <Grid container direction="row" justify="center">
              <Grid item xs={12}>
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
              </Grid>

              <Grid item xs={12} className={classes.passwordContainer}>
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
              </Grid>

              <Grid item xs={12} className={classes.buttonContainer}>
                <ESButton type="submit" variant="contained" color="primary" round gradient fullWidth>
                  {t('common:login.submit')}
                </ESButton>
              </Grid>
            </Grid>
          </form>

          <Grid item xs={12} className={classes.linkContainer}>
            <Link href="/register">
              <a>{t('common:login.register')}</a>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <ESDividerWithMiddleText text={t('common:login.divider')} />
          </Grid>

          <Grid item xs={12} className={classes.socialContainer}>
            <ESButtonTwitter variant="contained" fullWidth />
            <ESButtonGoogle variant="contained" fullWidth />
            <ESButtonLine variant="contained" fullWidth />
            <ESButtonFacebook variant="contained" fullWidth />
            <ESButtonApple variant="contained" fullWidth />
          </Grid>
        </Grid>
      </Grid>
      {!!meta.error && <ESToast open={!!meta.error} message={t('common:error.login_failed')} />}
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  topContainer: {
    paddingTop: theme.spacing(4),
  },
  iconButtonBg: {
    backgroundColor: `${Colors.grey[1000]}80`,
  },
  iconSmall: {
    fontSize: 12,
  },
  itemContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  iconMargin: {
    marginLeft: theme.spacing(1 / 2),
  },
  passwordContainer: {
    paddingTop: theme.spacing(3),
  },
  buttonContainer: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(4),
    textAlign: 'center',
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  linkContainer: {
    paddingBottom: theme.spacing(8),
    textAlign: 'center',
    '& a': {
      color: theme.palette.primary.main,
    },
  },
  socialContainer: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
}))

export default LoginContainer
