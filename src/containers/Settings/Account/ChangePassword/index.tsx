import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, makeStyles, Theme, IconButton, Icon, Typography, InputAdornment } from '@material-ui/core'
import ESInput from '@components/Input'
import ESStickyFooter from '@components/StickyFooter'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import ESStrengthMeter from '@components/StrengthMeter'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import * as services from '@services/user.service'
import useChangePassword from './useChangePassword'
import ESLoader from '@components/FullScreenLoader'
import _ from 'lodash'

const AccountSettingsChangePasswordContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const { changePassword, meta } = useChangePassword()
  const [score, setScore] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)

  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required(t('common.required')).min(8, t('error.too_short')),
    new_password: Yup.string()
      .test('password-validation', t('common.error'), (value) => {
        const tempScore = CommonHelper.scorePassword(value)

        setScore(tempScore)
        return tempScore > 40
      })
      .required(t('common.error')),
    //TODO password_must_match translate
    confirm_new_password: Yup.string().test('password-match', t('error.password_must_match'), function (value) {
      return this.parent.new_password === value
    }),
  })

  const { handleChange, values, handleSubmit, errors, touched, handleBlur, setFieldError } = useFormik<services.ChangePasswordParams>({
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      changePassword(values)
    },
  })

  useEffect(() => {
    if (meta.error && meta.error['code'] === 4221) {
      // TODO error.error_4221 translate
      setFieldError('current_password', t('error.error_4221'))
    }
  }, [meta.error])

  const buttonActive = (): boolean =>
    values.current_password !== '' && values.new_password !== '' && values.confirm_new_password !== '' && _.isEmpty(errors) && score > 40

  return (
    <ESStickyFooter title={t('common.next')} disabled={!buttonActive()} onClick={() => handleSubmit()}>
      <Box className={classes.header}>
        <IconButton className={classes.iconButton} disableRipple onClick={() => router.back()}>
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('account_settings.change_password')}
        </Typography>
      </Box>
      <Box mt={12} mx={5} mb={4} className={classes.formWrap}>
        <ESInput
          id="current_password"
          autoFocus
          placeholder={t('account_settings.current_password')}
          labelPrimary={t('account_settings.current_password')}
          fullWidth
          type={showCurrentPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end" className={classes.inputContainer}>
              <div className={classes.borderLeft}></div>
              <IconButton
                aria-label="toggle password visibility"
                size="small"
                disableRipple
                onMouseDown={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <img src="/images/password_show.svg" /> : <img src="/images/password_hide.svg" />}
              </IconButton>
            </InputAdornment>
          }
          onBlur={handleBlur}
          value={values.current_password}
          onChange={handleChange}
          helperText={touched.current_password && errors.current_password}
          error={touched.current_password && !!errors.current_password}
        />
      </Box>
      <Box mx={5} mb={4} className={classes.formWrap}>
        <ESInput
          id="new_password"
          placeholder={t('account_settings.new_password')}
          labelPrimary={t('account_settings.new_password')}
          fullWidth
          onBlur={handleBlur}
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end" className={classes.inputContainer}>
              <div className={classes.borderLeft}></div>
              <IconButton
                aria-label="toggle new password visibility"
                size="small"
                disableRipple
                onMouseDown={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <img src="/images/password_show.svg" /> : <img src="/images/password_hide.svg" />}
              </IconButton>
            </InputAdornment>
          }
          labelSecondary={<ESStrengthMeter value={score} />}
          value={values.new_password}
          onChange={handleChange}
          helperText={touched.new_password && errors.new_password}
          error={touched.new_password && !!errors.new_password}
        />
        <Box mt={1} />
        <Typography variant="body2">{t('account_settings.hint')}</Typography>
        <Typography variant="body2">{t('account_settings.hint2')}</Typography>
      </Box>
      <Box mx={5} className={classes.formWrapBottom}>
        <ESInput
          id="confirm_new_password"
          placeholder={t('account_settings.new_password_re_enter')}
          labelPrimary={t('account_settings.new_password_re_enter')}
          fullWidth
          onBlur={handleBlur}
          type={showPasswordRepeat ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end" className={classes.inputContainer}>
              <div className={classes.borderLeft}></div>
              <IconButton
                aria-label="toggle confirm new password visibility"
                size="small"
                disableRipple
                onMouseDown={() => setShowPasswordRepeat(!showPasswordRepeat)}
              >
                {showPasswordRepeat ? <img src="/images/password_show.svg" /> : <img src="/images/password_hide.svg" />}
              </IconButton>
            </InputAdornment>
          }
          value={values.confirm_new_password}
          onChange={handleChange}
          helperText={touched.confirm_new_password && errors.confirm_new_password}
          error={touched.confirm_new_password && !!errors.confirm_new_password}
        />
      </Box>
      {meta.pending && <ESLoader open={meta.pending} />}
    </ESStickyFooter>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  header: {
    paddingTop: theme.spacing(12),
  },
  icon: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  iconButton: {
    backgroundColor: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  headerTitle: {
    color: Colors.white,
    display: 'inline-block',
  },
  content: {
    overflow: 'scroll',
  },
  formWrapBottom: {
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down('md')]: {
    header: {
      paddingTop: theme.spacing(2),
    },
    formWrap: {
      marginTop: theme.spacing(4),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    formWrapBottom: {
      marginTop: theme.spacing(4),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
    section: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
    },
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
}))

export default AccountSettingsChangePasswordContainer
