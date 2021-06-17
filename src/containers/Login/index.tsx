import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { UserLoginParams } from '@services/auth.service'
import { makeStyles, Theme, Typography, Box, InputAdornment } from '@material-ui/core'
import * as Yup from 'yup'
import useLoginByEmail from './useLoginByEmail'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import ESInput from '@components/Input'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
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
import useSocialLogin from '@utils/hooks/useSocialLogin'
import { ESRoutes } from '@constants/route.constants'
import ESLoader from '@components/FullScreenLoader'
import useReturnHref from '@utils/hooks/useReturnHref'
import ESCheckbox from '@components/Checkbox'
import i18n from '@locales/i18n'
import _ from 'lodash'
import { URI } from '@constants/uri.constants'

const validationSchema = Yup.object().shape({
  email: Yup.string().required(i18n.t('common:common.required')),
  password: Yup.string().required(i18n.t('common:common.required')),
})

const LoginContainer: React.FC = () => {
  const social = useSocialLogin('login')
  const { t } = useTranslation(['common'])
  const [checkbox, setCheckox] = useState({
    terms: false,
    privacy: false,
  })
  const classes = useStyles()
  const { loginByEmail, meta, resetMeta, handleClick } = useLoginByEmail()
  const { handleLink } = useReturnHref()
  const [showPassword, setShowPassword] = useState(false)

  const { handleChange, values, handleSubmit, handleBlur, errors, touched, validateForm } = useFormik<UserLoginParams>({
    initialValues: {
      email: '',
      password: '',
      registration_id: undefined,
    },
    validationSchema,
    onSubmit: (values, _helpers) => {
      if (checkbox.terms && checkbox.privacy) {
        resetMetas()
        loginByEmail(values)
      }
    },
  })

  const resetMetas = () => {
    resetMeta()
    social.resetMeta()
  }

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckox({ ...checkbox, [event.target.name]: event.target.checked })
  }

  const handleSocialLogin = (params) => {
    resetMetas()
    social.login({ ...params, type: 'login' })
  }

  const buttonActive = (): boolean => _.isEmpty(errors)

  const isCheckboxChecked = (): boolean => checkbox.terms && checkbox.privacy

  const renderError = () => {
    return (
      !!meta.error && (
        <Box pb={8}>
          <Box pb={20 / 8} textAlign="center">
            <Typography color="secondary">{i18n.t('common:login.error.title')}</Typography>
          </Box>
          <Box pb={1}>
            <Typography className={classes.detail}>{i18n.t('common:login.error.detail')}</Typography>
          </Box>
          <Typography className={classes.hint} variant="caption">
            {i18n.t('common:login.error.hint')}
          </Typography>
        </Box>
      )
    )
  }

  const renderSocialError = () => {
    return (
      !!social.meta.error && (
        <Box pb={8}>
          <Box pb={20 / 8} textAlign="center">
            <Typography color="secondary">{i18n.t('common:login.error.title2')}</Typography>
          </Box>
        </Box>
      )
    )
  }

  useEffect(() => {
    validateForm()
  }, [])

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
            <img src="/images/lp_exelab_logo.svg" width="116" height="148" />
          </Box>

          {renderError()}
          {renderSocialError()}

          <Box width="100%" flexDirection="column" alignItems="center">
            <form onSubmit={handleSubmit}>
              <Box>
                <ESInput
                  id="email"
                  placeholder={i18n.t('common:login.email_placeholder')}
                  labelPrimary={
                    <Box className={classes.labelPrimaryContainer} display="flex" alignItems="center">
                      <label className={classes.labelMargin}>{i18n.t('common:login.email_label_primary')}</label>
                    </Box>
                  }
                  labelSecondary={
                    <Typography color="textPrimary" gutterBottom={false} variant="body2" className={classes.link}>
                      <a href={URI.WEB_SUPPORT} target="_blank" rel="noopener noreferrer">
                        {t('common:login.email_label_secondary')}
                        <FilterNoneIcon fontSize="inherit" className={classes.iconMargin} />
                      </a>
                    </Typography>
                  }
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email && errors.email}
                  error={touched.email && !!errors.email}
                  autoFocus
                />
              </Box>

              <Box pt={3}>
                <ESInput
                  id="password"
                  labelPrimary={t('common:login.password_label_primary')}
                  type={showPassword ? 'text' : 'password'}
                  labelSecondary={
                    <Link href={handleLink(ESRoutes.FORGOT_PASSWORD)} as={ESRoutes.FORGOT_PASSWORD} shallow>
                      <a className={classes.noLink}>
                        <Typography color="textPrimary" gutterBottom={false} variant="body2">
                          {t('common:login.password_label_secondary')}
                        </Typography>
                      </a>
                    </Link>
                  }
                  endAdornment={
                    <InputAdornment position="end" className={classes.inputContainer}>
                      <div className={classes.borderLeft}></div>
                      <IconButton
                        aria-label="toggle password visibility"
                        size="small"
                        disableRipple
                        color="inherit"
                        onMouseDown={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <img src="/images/password_show.svg" /> : <img src="/images/password_hide.svg" />}
                      </IconButton>
                    </InputAdornment>
                  }
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password && errors.password}
                  error={touched.password && !!errors.password}
                />
              </Box>

              <Box pt={22 / 8} flexDirection="column" display="flex" width={210} margin="0 auto">
                <ESCheckbox
                  disableRipple
                  checked={checkbox.terms}
                  onChange={handleChangeCheckBox}
                  label={t('common:register.terms')}
                  name="terms"
                />
                <ESCheckbox
                  disableRipple
                  checked={checkbox.privacy}
                  onChange={handleChangeCheckBox}
                  label={t('common:register.privacy')}
                  name="privacy"
                />
              </Box>

              <Box pt={22 / 8} pb={4} maxWidth={280} className={classes.buttonContainer}>
                <ButtonPrimary type="submit" round fullWidth disabled={!buttonActive() || !isCheckboxChecked()}>
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
            <ESButtonTwitter onSuccess={handleSocialLogin} fullWidth disabled={!isCheckboxChecked()} />
            <ESButtonGoogle onSuccess={handleSocialLogin} fullWidth disabled={!isCheckboxChecked()} />
            <ESButtonLine onSuccess={handleSocialLogin} fullWidth disabled={!isCheckboxChecked()} />
            <ESButtonFacebook onSuccess={handleSocialLogin} fullWidth disabled={!isCheckboxChecked()} />
            <ESButtonApple onSuccess={handleSocialLogin} fullWidth disabled={!isCheckboxChecked()} />
          </Box>
        </Box>
      </Box>
      {meta.pending && <ESLoader open={meta.pending} />}
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
  inputContainer: {
    position: 'relative',
    paddingRigth: 7,
  },
  borderLeft: {
    width: 1,
    height: 24,
    backgroundColor: '#4B4B4D',
    position: 'absolute',
    left: -8,
  },
  hint: {
    color: Colors.white_opacity[30],
  },
  detail: {
    whiteSpace: 'pre-line',
    color: Colors.white_opacity[70],
  },
  link: {
    '& > a': {
      color: Colors.white_opacity[70],
      cursor: 'pointer',
      textDecoration: 'none',
    },
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
  labelMargin: {
    fontWeight: 'bold',
    fontSize: theme.typography.h3.fontSize,
  },
  labelPrimaryContainer: {
    width: '40%',
  },
}))

export default LoginContainer
