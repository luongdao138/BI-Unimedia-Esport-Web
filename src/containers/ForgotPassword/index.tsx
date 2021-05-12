import { useFormik } from 'formik'
import * as services from '@services/auth.service'
import { Colors } from '@theme/colors'
import ESInput from '@components/Input'
import { Typography, Box, makeStyles, Theme } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import * as Yup from 'yup'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useTranslation } from 'react-i18next'
import useForgotPassword from './useForgotPassword'
import ButtonPrimary from '@components/ButtonPrimary'
import ESLoader from '@components/FullScreenLoader'
import { IconButton } from '@material-ui/core'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .test('email-validation', 'エラー文言が入ります', (value) => {
      return CommonHelper.validateEmail(value)
    })
    .required('エラー文言が入ります'),
})

const ForgotPasswordContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { forgotPassword, meta, backAction } = useForgotPassword()

  const { handleChange, values, handleSubmit, errors, touched } = useFormik<services.ForgotPasswordParams>({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.email) {
        forgotPassword(values)
      }
    },
  })

  const buttonActive = (): boolean => {
    return values.email !== '' && CommonHelper.validateEmail(values.email)
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
                labelPrimary="登録済みメールアドレス"
                fullWidth
                value={values.email}
                onChange={handleChange}
                helperText={touched.email && errors.email}
                error={touched.email && !!errors.email}
              />
            </Box>
          </Box>
        </Box>
        <Box className={classes.stickyFooter}>
          <Box className={classes.nextBtnHolder}>
            <Box maxWidth={280} className={classes.buttonContainer}>
              <ButtonPrimary type="submit" round fullWidth disabled={!buttonActive()}>
                認証コードを送信
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

export default ForgotPasswordContainer
