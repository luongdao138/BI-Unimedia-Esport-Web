import { useEffect, useState } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import ESButton from '@components/Button'
import ESInput from '@components/Input'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import * as services from '@services/auth.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import useRegisterByEmail from './useRegisterByEmail'
import { useRouter } from 'next/router'
import ESStrengthMeter from '@components/StrengthMeter'

const RegisterByEmailContainer: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { meta, registerByEmail } = useRegisterByEmail()
  const [score, setScore] = useState(0)

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .test('email-validation', 'エラー文言が入ります', (value) => {
        return CommonHelper.validateEmail(value)
      })
      .required('エラー文言が入ります'),
    password: Yup.string()
      .test('password-validation', 'エラー文言が入ります', (value) => {
        const tempScore = CommonHelper.scorePassword(value)

        setScore(tempScore)
        return tempScore > 40
      })
      .required('エラー文言が入ります'),
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

  useEffect(() => {
    if (meta.loaded) {
      router.push('/register/confirm')
    }
  }, [meta.loaded])

  const buttonActive = (): boolean => {
    return values.email !== '' && CommonHelper.validateEmail(values.email) && values.password !== '' && score > 40
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box pt={7.5} pb={9} className={classes.topContainer}>
          <Box py={2} display="flex" flexDirection="row" alignItems="center">
            <IconButton className={classes.iconButtonBg}>
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
                type="password"
                labelSecondary={<ESStrengthMeter value={score} />}
                fullWidth
                value={values.password}
                onChange={handleChange}
                helperText={touched.password && errors.password}
                error={touched.password && !!errors.password}
              />
            </Box>

            <Typography variant="body2">{t('common:register_by_email.hint')}</Typography>
          </Box>
        </Box>
        <Box className={classes.stickyFooter}>
          <Box className={classes.nextBtnHolder}>
            <ESButton
              type="submit"
              variant="contained"
              color="primary"
              round
              gradient
              size="large"
              minWidth={280}
              className={classes.submitBtn}
              disabled={!buttonActive()}
            >
              {t('common:register_by_email.button')}
            </ESButton>
          </Box>
        </Box>
      </form>
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
    backgroundColor: Colors.black,
  },
  nextBtnHolder: {
    display: 'flex',
    marginBottom: theme.spacing(11),
    marginTop: theme.spacing(3),
    justifyContent: 'center',
  },
  topContainer: {},
  container: {},
  submitBtn: {},
  ['@media (max-width: 414px)']: {
    container: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    topContainer: {
      paddingTop: 0,
    },
  },
  ['@media (max-width: 330px)']: {
    submitBtn: {
      minWidth: 220,
    },
  },
}))

export default RegisterByEmailContainer
