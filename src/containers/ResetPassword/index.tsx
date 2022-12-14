import { useState } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import * as services from '@services/auth.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import ESLoader from '@components/FullScreenLoader'
import useResetPassword from './useResetPassword'
import ESStrengthMeter from '@components/StrengthMeter'
import { ERROR_CODE } from '@constants/error.constants'
import ESStickyFooter from '@components/StickyFooter'
import ESPasswordInput from '@components/PasswordInput'

const ResetPasswordContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { user, resetPassword, meta, backAction, resetMeta } = useResetPassword()
  const [score, setScore] = useState(0)

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(t('common:common.input_required'))
      .min(8, t('common:common.at_least_8'))
      .test('password-validation', t('common:error.password_failed'), (value) => {
        const tempScore = CommonHelper.scorePassword(value)

        setScore(tempScore)
        return tempScore > 40
      }),
    password_confirm: Yup.string()
      .required(t('common:common.input_required'))
      .min(8, t('common:common.at_least_8'))
      .when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref('password')], t('common:error.password_must_match')),
      }),
  })

  const { values, handleSubmit, errors, touched, handleBlur, setFieldValue } = useFormik<services.UserResetPasswordParams>({
    initialValues: {
      email: user?.email,
      confirmation_code: user?.confirmation_code,
      password: '',
      password_confirm: '',
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      if (values) {
        resetMeta()
        resetPassword(values)
      }
    },
  })

  const buttonActive = (): boolean => values.password !== '' && score > 40 && values.password === values.password_confirm

  const renderErrorText = () => {
    switch (Number(meta?.error['code'])) {
      case ERROR_CODE.PASSWORD_ALREADY_USE:
        return t('common:common.password_duplicated')
      case ERROR_CODE.CONFIRMATION_CODE_EXPIRED:
        return t('common:common.confirmation_expire')
      default:
        return t('common:common.sns_reset_password_error')
    }
  }

  const renderError = () => {
    return (
      !!meta.error && (
        <Box pb={8}>
          <Box pb={20 / 8} textAlign="center">
            <Typography color="secondary">{renderErrorText()}</Typography>
          </Box>
        </Box>
      )
    )
  }

  return (
    <>
      <ESStickyFooter disabled={!buttonActive()} title={t('common:forgot_password.reissue')} onClick={handleSubmit} noScroll>
        <form onSubmit={handleSubmit}>
          <Box pt={7.5} pb={9} className={classes.topContainer}>
            <Box py={2} display="flex" flexDirection="row" alignItems="center">
              <IconButton className={classes.iconButtonBg} onClick={backAction}>
                <Icon className="fa fa-arrow-left" fontSize="small" />
              </IconButton>
              <Box pl={2}>
                <Typography variant="h2">{t('common:forgot_password.title')}</Typography>
              </Box>
            </Box>

            <Box width="100%" px={5} flexDirection="column" alignItems="center" pt={8} className={classes.container}>
              {renderError()}
              <Box pb={1}>
                <ESPasswordInput
                  id="password"
                  labelPrimary={t('common:register_by_email.password')}
                  labelSecondary={<ESStrengthMeter value={score} />}
                  value={values.password}
                  onChange={(e) => setFieldValue('password', CommonHelper.replaceSingleByteString(e.target.value))}
                  onBlur={handleBlur}
                  helperText={touched.password && errors.password}
                  error={touched.password && !!errors.password}
                />
              </Box>

              <Typography variant="body2">{t('common:register_by_email.hint')}</Typography>
              <Typography variant="body2">{t('common:register_by_email.hint2')}</Typography>
              <Typography variant="body2">{t('common:register_by_email.hint3')}</Typography>

              <Box pt={4}>
                <ESPasswordInput
                  id="password_confirm"
                  labelPrimary={t('common:register_by_email.enter_password_again')}
                  value={values.password_confirm}
                  onChange={(e) => setFieldValue('password_confirm', CommonHelper.replaceSingleByteString(e.target.value))}
                  onBlur={handleBlur}
                  helperText={touched.password_confirm && errors.password_confirm}
                  error={touched.password_confirm && !!errors.password_confirm}
                />
              </Box>
            </Box>
          </Box>

          <Box className={classes.blankSpace}></Box>
        </form>
      </ESStickyFooter>

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
    marginRight: theme.spacing(1 / 2),
  },
  blankSpace: {
    height: 169,
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
    blankSpace: {
      height: theme.spacing(15),
    },
  },
}))

export default ResetPasswordContainer
