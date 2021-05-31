import { useState } from 'react'
import { useFormik } from 'formik'
import { UserLoginParams } from '@services/auth.service'
import { makeStyles, Theme, Typography, Box, InputAdornment } from '@material-ui/core'
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
import ESCheckbox from '@components/Checkbox'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import i18n from '@locales/i18n'
import _ from 'lodash'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .test('email-validation', i18n.t('common:login.validation.email'), (value) => {
      return CommonHelper.validateEmail(value)
    })
    .required(i18n.t('common:common.required')),
  password: Yup.string().required(i18n.t('common:common.required')),
})

const LoginContainer: React.FC = () => {
  const social = useSocialLogin()
  const { t } = useTranslation(['common'])
  const [checkbox, setCheckox] = useState({
    terms: false,
    privacy: false,
  })
  const classes = useStyles()
  const { loginByEmail, meta, resetMeta, metaReset, resetPasswordMeta, handleClick } = useLoginByEmail()
  const { handleLink } = useReturnHref()
  const [showPassword, setShowPassword] = useState(false)

  const { handleChange, values, handleSubmit, handleBlur, errors, touched } = useFormik<UserLoginParams>({
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
    resetMetas()
    setCheckox({ ...checkbox, [event.target.name]: event.target.checked })
  }

  const handleSocialLogin = (params) => social.login({ ...params, type: 'login' })

  const buttonActive = (): boolean => _.isEmpty(errors)

  const isCheckboxChecked = (): boolean => checkbox.terms && checkbox.privacy

  const renderError = () => {
    return (
      !!meta.error && (
        <Box pb={8}>
          <Box pb={20 / 8} textAlign="center">
            <Typography className={classes.wrap} color="secondary">
              {i18n.t('common:login.error.title')}
            </Typography>
          </Box>
          <Box pb={1}>
            <Typography className={classes.wrap}>{i18n.t('common:login.error.detail')}</Typography>
          </Box>
          <Typography className={classes.wrap} variant="caption">
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
            <Typography color="secondary">{i18n.t('common:register.error.title')}</Typography>
          </Box>
          <Box pb={1}>
            <Typography className={classes.detail}>{i18n.t('common:register.error.detail')}</Typography>
          </Box>
          <Typography className={classes.hint} variant="caption">
            {i18n.t('common:register.error.hint')}
          </Typography>
        </Box>
      )
    )
  }

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

          {renderError()}
          {renderSocialError()}

          <Box width="100%" flexDirection="column" alignItems="center">
            <form onSubmit={handleSubmit}>
              <Box>
                <ESInput
                  id="email"
                  placeholder={i18n.t('common:login.email_placeholder')}
                  labelPrimary={i18n.t('common:login.email_label_primary')}
                  labelSecondary={
                    <Typography color="textPrimary" gutterBottom={false} variant="body2">
                      {t('common:login.email_label_secondary')}
                      <FilterNoneIcon fontSize="inherit" className={classes.iconMargin} />
                    </Typography>
                  }
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email && errors.email}
                  error={touched.email && !!errors.email}
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
      {metaReset.loaded && <ESToast open={metaReset.loaded} message={t('common:error.password_reissue')} resetMeta={resetPasswordMeta} />}
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
