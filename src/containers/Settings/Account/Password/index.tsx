import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, makeStyles, Theme, IconButton, Icon, Typography } from '@material-ui/core'
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
import ESPasswordInput from '@components/PasswordInput'

const AccountSettingsPasswordContainer: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const [scoreCurrentPassword, setCurrentPasswordScore] = useState(0)
  const { changeEmailCheck, meta } = usePassword()

  const validationSchema = Yup.object().shape({
    current_password: Yup.string()
      .test('password-validation', t('error.password_failed'), (value) => {
        const tempScore = CommonHelper.scorePassword(value)
        setCurrentPasswordScore(tempScore)
        return tempScore > 40
      })
      .required(t('common.input_required'))
      .min(8, t('error.too_short')),
  })

  const { values, handleSubmit, errors, touched, handleBlur, setFieldError, setFieldValue } = useFormik<services.ChangeEmailCheckParams>({
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
        <IconButton
          className={classes.iconButton}
          disableRipple
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('backToTopVideo::back::16')
            router.back()
          }}
        >
          <Icon className={`fa fa-arrow-left ${classes.icon}`} />
        </IconButton>
        <Typography variant="body1" className={classes.headerTitle}>
          {t('account_settings.change_email_address')}
        </Typography>
      </Box>
      <Box mt={12} ml={5} className={classes.formWrap}>
        <ESPasswordInput
          id="current_password"
          autoFocus
          placeholder={t('common.password')}
          labelPrimary={t('common.password')}
          fullWidth
          onBlur={handleBlur}
          value={values.current_password}
          onChange={(e) => setFieldValue('current_password', CommonHelper.replaceSingleByteString(e.target.value))}
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
}))

export default AccountSettingsPasswordContainer
