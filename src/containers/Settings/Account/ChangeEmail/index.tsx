import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, makeStyles, Theme, IconButton, Icon, Typography } from '@material-ui/core'
import ESInput from '@components/Input'
import ESStickyFooter from '@components/StickyFooter'
import { Colors } from '@theme/colors'
import { useRouter } from 'next/router'
import useChangeEmail from './useChangeEmail'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useStore } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import * as services from '@services/user.service'
import _ from 'lodash'
import ESLoader from '@components/FullScreenLoader'

const AccountSettingsChangeEmailContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const store = useStore()
  const { changeEmail, meta, user, changeEmailSteps } = useChangeEmail()

  const validationSchema = Yup.object().shape({
    new_email: Yup.string().required(t('common.required')).email(t('error.email_invalid')),
  })

  const { handleChange, values, handleSubmit, errors, touched, handleBlur, setFieldError } = useFormik<services.ChangeEmailParams>({
    initialValues: {
      new_email: '',
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      if (values.new_email.toLowerCase() !== user.email) {
        if (CommonHelper.matchNgWords(store, values.new_email).length > 0) {
          setFieldError('new_email', t('common.contains_ngword'))
        } else {
          changeEmail(values)
        }
      } else {
        setFieldError('new_email', t('error.same_email'))
      }
    },
  })

  useEffect(() => {
    if (meta.error && meta.error['code'] === 4221) {
      setFieldError('new_email', t('error.error_email_4221'))
    } else if (meta.error && meta.error['code'] === 4222) {
      setFieldError('new_email', t('error.error_email_4222'))
    }
  }, [meta.error])

  const buttonActive = (): boolean => values.new_email !== '' && _.isEmpty(errors)

  if (!changeEmailSteps.step_check) {
    return null
  }

  return (
    <ESStickyFooter title={t('common.next')} noScroll={true} disabled={!buttonActive()} onClick={() => handleSubmit()}>
      <Box className={classes.header}>
        <IconButton className={classes.iconButton} disableRipple onClick={() => router.back()}>
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('account_settings.change_email_address')}
        </Typography>
      </Box>
      <Box mt={12} ml={5} className={classes.formWrap}>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('account_settings.current_email')}
        </Typography>
        <Typography className={classes.currentEmail}>{user.email}</Typography>
      </Box>
      <Box mt={4} ml={5} className={classes.formWrapBottom}>
        <ESInput
          id="new_email"
          autoFocus
          placeholder={t('account_settings.new_email_placeholder')}
          labelPrimary={t('account_settings.new_email_title')}
          fullWidth
          onBlur={handleBlur}
          value={values.new_email}
          onChange={handleChange}
          helperText={touched.new_email && errors.new_email}
          error={touched.new_email && !!errors.new_email}
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
  currentEmail: {
    marginTop: theme.spacing(1),
    color: Colors.white_opacity['30'],
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
    },
    formWrapBottom: {
      marginTop: theme.spacing(4),
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
  },
}))

export default AccountSettingsChangeEmailContainer
