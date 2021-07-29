import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, makeStyles, Theme, IconButton, Icon, Typography, InputAdornment } from '@material-ui/core'
import ESInput from '@components/Input'
import ESStickyFooter from '@components/StickyFooter'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import * as services from '@services/user.service'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import _ from 'lodash'
import ESLoader from '@components/FullScreenLoader'
import usePassword from './usePassword'
import { CommonHelper } from '@utils/helpers/CommonHelper'

const AccountSettingsPasswordContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const [scoreCurrentPassword, setCurrentPasswordScore] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const { changeEmailCheck, meta } = usePassword()

  const validationSchema = Yup.object().shape({
    current_password: Yup.string()
      .test('password-validation', t('error.password_failed'), (value) => {
        const tempScore = CommonHelper.scorePassword(value)
        setCurrentPasswordScore(tempScore)
        return tempScore > 40
      })
      .required(t('common.required'))
      .min(8, t('error.too_short')),
  })

  const { handleChange, values, handleSubmit, errors, touched, handleBlur, setFieldError } = useFormik<services.ChangeEmailCheckParams>({
    initialValues: {
      current_password: '',
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      changeEmailCheck(values)
    },
  })

  useEffect(() => {
    if (meta.error && meta.error['code'] === 4221) {
      setFieldError('current_password', t('error.error_4221'))
    }
  }, [meta.error])

  const buttonActive = (): boolean => values.current_password !== '' && _.isEmpty(errors) && scoreCurrentPassword > 40

  return (
    <ESStickyFooter title={t('common.next')} disabled={!buttonActive()} onClick={() => handleSubmit()} noScroll={true}>
      <Box className={classes.header}>
        <IconButton className={classes.iconButton} disableRipple onClick={() => router.back()}>
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('account_settings.change_email_address')}
        </Typography>
      </Box>
      <Box mt={12} ml={5} className={classes.formWrap}>
        <ESInput
          id="current_password"
          autoFocus
          placeholder={t('common.password')}
          labelPrimary={t('common.password')}
          fullWidth
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end" className={classes.inputContainer}>
              <div className={classes.borderLeft}></div>
              <IconButton
                aria-label="toggle password visibility"
                size="small"
                disableRipple
                onMouseDown={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <img src="/images/password_show.svg" /> : <img src="/images/password_hide.svg" />}
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
  formWrap: {
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down('md')]: {
    header: {
      paddingTop: theme.spacing(2),
    },
    formWrap: {
      marginTop: theme.spacing(4),
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

export default AccountSettingsPasswordContainer
