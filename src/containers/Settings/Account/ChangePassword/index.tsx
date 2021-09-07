import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, makeStyles, Theme, IconButton, Icon, Typography } from '@material-ui/core'
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
import ESPasswordInput from '@components/PasswordInput'

const AccountSettingsChangePasswordContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const { changePassword, meta } = useChangePassword()
  const [score, setScore] = useState(0)
  const [scoreCurrentPassword, setCurrenPasswordScore] = useState(0)

  const validationSchema = Yup.object().shape({
    current_password: Yup.string()
      .test('password-validation', t('error.password_failed'), (value) => {
        const tempScore = CommonHelper.scorePassword(value)
        setCurrenPasswordScore(tempScore)
        return tempScore > 40
      })
      .required(t('common.input_required'))
      .min(8, t('error.too_short')),

    new_password: Yup.string()
      .test('password-validation', t('error.password_failed'), (value) => {
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

  const { values, handleSubmit, errors, touched, handleBlur, setFieldError, setFieldValue } = useFormik<services.ChangePasswordParams>({
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      if (values.current_password === values.new_password) {
        setFieldError('new_password', t('common.password_duplicated'))
      } else {
        changePassword(values)
      }
    },
  })

  useEffect(() => {
    if (meta.error && meta.error['code'] === 4221) {
      setFieldError('current_password', t('error.error_4221'))
    }
  }, [meta.error])

  const buttonActive = (): boolean =>
    values.current_password !== '' &&
    values.new_password !== '' &&
    values.confirm_new_password !== '' &&
    _.isEmpty(errors) &&
    score > 40 &&
    scoreCurrentPassword > 40

  return (
    <ESStickyFooter title={t('common.next')} disabled={!buttonActive()} onClick={() => handleSubmit()} noScroll={true}>
      <Box className={classes.header}>
        <IconButton className={classes.iconButton} disableRipple onClick={() => router.back()}>
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('account_settings.change_password')}
        </Typography>
      </Box>

      <Box mt={7} mx={5} mb={4} className={classes.formWrap}>
        <ESPasswordInput
          id="current_password"
          autoFocus
          placeholder={t('account_settings.current_password')}
          labelPrimary={t('account_settings.current_password')}
          onBlur={handleBlur}
          value={values.current_password}
          onChange={(e) => setFieldValue('current_password', CommonHelper.replaceSingleByteString(e.target.value))}
          helperText={touched.current_password && errors.current_password}
          error={touched.current_password && !!errors.current_password}
        />
      </Box>
      <Box mx={5} mb={4} className={classes.formWrap}>
        <ESPasswordInput
          id="new_password"
          placeholder={t('account_settings.new_password')}
          labelPrimary={t('account_settings.new_password')}
          onBlur={handleBlur}
          labelSecondary={<ESStrengthMeter value={score} />}
          value={values.new_password}
          onChange={(e) => setFieldValue('new_password', CommonHelper.replaceSingleByteString(e.target.value))}
          helperText={touched.new_password && errors.new_password}
          error={touched.new_password && !!errors.new_password}
        />
        <Box mt={1} />
        <Typography variant="body2">{t('account_settings.hint')}</Typography>
        <Typography variant="body2">{t('account_settings.hint2')}</Typography>
        <Typography variant="body2">{t('account_settings.hint3')}</Typography>
      </Box>
      <Box mx={5} className={classes.formWrapBottom}>
        <ESPasswordInput
          id="confirm_new_password"
          placeholder={t('account_settings.new_password_re_enter')}
          labelPrimary={t('account_settings.new_password_re_enter')}
          onBlur={handleBlur}
          value={values.confirm_new_password}
          onChange={(e) => setFieldValue('confirm_new_password', CommonHelper.replaceSingleByteString(e.target.value))}
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
  formWrap: {
    position: 'relative',
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
}))

export default AccountSettingsChangePasswordContainer
