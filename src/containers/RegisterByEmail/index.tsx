import { useState } from 'react'
import { makeStyles, Theme, Typography, Box, InputAdornment } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import ESInput from '@components/Input'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import * as services from '@services/auth.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import useRegisterByEmail from './useRegisterByEmail'
import ESStrengthMeter from '@components/StrengthMeter'
import ButtonPrimary from '@components/ButtonPrimary'
import ESLoader from '@components/FullScreenLoader'
import ESToast from '@components/Toast'

const RegisterByEmailContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { registerByEmail, meta, backAction, resetMeta } = useRegisterByEmail()
  const [score, setScore] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .test('email-validation', t('common:common.error'), (value) => {
        return CommonHelper.validateEmail(value)
      })
      .required(t('common:common.error')),
    password: Yup.string()
      .test('password-validation', t('common:common.error'), (value) => {
        const tempScore = CommonHelper.scorePassword(value)

        setScore(tempScore)
        return tempScore > 40
      })
      .required(t('common:common.error')),
  })

  const { handleChange, values, handleSubmit, errors, touched } = useFormik<services.UserLoginParams>({
    initialValues: {
      email: '',
      password: '',
      registration_id: undefined,
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      if (values.email && values.password) {
        registerByEmail(values)
      }
    },
  })

  const buttonActive = (): boolean => {
    return values.email !== '' && CommonHelper.validateEmail(values.email) && values.password !== '' && score > 40
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box pt={7.5} pb={9} className={classes.topContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center">
            <IconButton className={classes.iconButtonBg} onClick={backAction}>
              <Icon className="fa fa-arrow-left" fontSize="small" />
            </IconButton>
            <Box pl={2}>
              <Typography variant="h2">{t('common:register_by_email.back')}</Typography>
            </Box>
          </Box>

          <Box width="100%" px={5} flexDirection="column" alignItems="center" pt={8} className={classes.container}>
            <Box>
              <ESInput
                id="email"
                autoFocus
                placeholder={t('common:register_by_email.email_placeholder')}
                labelPrimary={t('common:register_by_email.email')}
                labelSecondary={
                  <Typography color="textPrimary" gutterBottom={false} variant="body2">
                    {t('common:register_by_email.forgot_password')}
                  </Typography>
                }
                fullWidth
                value={values.email}
                onChange={handleChange}
                helperText={touched.email && errors.email}
                error={touched.email && !!errors.email}
              />
            </Box>

            <Box pt={3} pb={1}>
              <ESInput
                id="password"
                labelPrimary={t('common:register_by_email.password')}
                type={showPassword ? 'text' : 'password'}
                labelSecondary={<ESStrengthMeter value={score} />}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      size="small"
                      disableRipple
                      onMouseDown={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Icon className="fas fa-eye" fontSize="small" />
                      ) : (
                        <Icon className="fas fa-eye-slash" fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                fullWidth
                value={values.password}
                onChange={handleChange}
                helperText={touched.password && errors.password}
                error={touched.password && !!errors.password}
              />
            </Box>

            <Typography variant="body2">{t('common:register_by_email.hint')}</Typography>
            <Typography variant="body2">{t('common:register_by_email.hint2')}</Typography>
          </Box>
        </Box>
        <Box className={classes.stickyFooter}>
          <Box className={classes.nextBtnHolder}>
            <Box maxWidth={280} className={classes.buttonContainer}>
              <ButtonPrimary type="submit" round fullWidth disabled={!buttonActive()}>
                {t('common:register_by_email.button')}
              </ButtonPrimary>
            </Box>
          </Box>
        </Box>
      </form>
      {meta.pending && <ESLoader open={meta.pending} />}
      {!!meta.error && <ESToast open={!!meta.error} message={t('common:error.signup_failed')} resetMeta={resetMeta} />}
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
  stickyFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    background: Colors.black,
    borderTop: `1px solid`,
    borderTopColor: Colors.text['300'],
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
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

export default RegisterByEmailContainer
