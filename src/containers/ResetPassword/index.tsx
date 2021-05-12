import { useState } from 'react'
import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import ESInput from '@components/Input'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import * as services from '@services/auth.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import ButtonPrimary from '@components/ButtonPrimary'
import ESLoader from '@components/FullScreenLoader'
import useResetPassword from './useResetPassword'
import ESStrengthMeter from '@components/StrengthMeter'

const ResetPasswordContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { user, resetPassword, meta, backAction } = useResetPassword()
  const [score, setScore] = useState(0)

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .test('password-validation', 'エラー文言が入ります', (value) => {
        const tempScore = CommonHelper.scorePassword(value)

        setScore(tempScore)
        return tempScore > 40
      })
      .required('エラー文言が入ります'),
  })

  const { handleChange, values, handleSubmit, errors, touched } = useFormik<services.UserResetPasswordParams>({
    initialValues: {
      email: user.email,
      confirmation_code: user.confirmation_code,
      password: '',
      password_confirm: '',
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      if (values) {
        resetPassword(values)
      }
    },
  })

  const buttonActive = (): boolean => values.password !== '' && score > 40

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
            <Box pb={1}>
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
            <Box maxWidth={280} className={classes.buttonContainer}>
              <ButtonPrimary type="submit" round fullWidth disabled={!buttonActive()}>
                再発行する
              </ButtonPrimary>
            </Box>
          </Box>
        </Box>
      </form>
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

export default ResetPasswordContainer
