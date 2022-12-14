import { makeStyles, Typography, Box, Theme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import { ESRoutes } from '@constants/route.constants'
import useReturnHref from '@utils/hooks/useReturnHref'
import ESInput from '@components/Input'
import FilterNoneIcon from '@material-ui/icons/FilterNone'
import { URI } from '@constants/uri.constants'
import Link from 'next/link'
import i18n from '@locales/i18n'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { UserLoginParams } from '@services/auth.service'
import { useEffect } from 'react'
import _, { NotVoid } from 'lodash'
import ESPasswordInput from '@components/PasswordInput'
import { CommonHelper } from '@utils/helpers/CommonHelper'

const validationSchema = Yup.object().shape({
  email: Yup.string().required(i18n.t('common:common.input_required')),
  password: Yup.string().required(i18n.t('common:common.input_required')),
})

interface LoginFormProps {
  onSubmitClicked: (value) => NotVoid
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmitClicked }) => {
  const classes = useStyles()

  const { handleLink } = useReturnHref()

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, validateForm, setFieldValue } = useFormik<UserLoginParams>({
    initialValues: { email: '', password: '', registration_id: undefined },
    validationSchema,
    onSubmit: (values) => {
      onSubmitClicked(values)
    },
  })

  useEffect(() => {
    validateForm()
  }, [])

  return (
    <Box width="100%" flexDirection="column" alignItems="center">
      <form onSubmit={handleSubmit}>
        <Box>
          <ESInput
            id="email"
            placeholder={i18n.t('common:login.email_placeholder')}
            labelPrimary={
              <Box className={classes.labelPrimaryContainer} display="flex" alignItems="center">
                <label className={classes.labelMargin}>{i18n.t('common:login.email_label_primary')}</label>
              </Box>
            }
            labelSecondary={
              <Typography color="textPrimary" gutterBottom={false} variant="body2" className={classes.link}>
                <a href={URI.WEB_SUPPORT} target="_blank" rel="noopener noreferrer">
                  {i18n.t('common:login.email_label_secondary')}
                  <FilterNoneIcon fontSize="inherit" className={classes.iconMargin} />
                </a>
              </Typography>
            }
            fullWidth
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.email && errors.email}
            error={touched.email && !!errors.email}
          />
        </Box>

        <Box pt={3}>
          <ESPasswordInput
            id="password"
            labelPrimary={i18n.t('common:login.password_label_primary')}
            labelSecondary={
              <Link href={handleLink(ESRoutes.FORGOT_PASSWORD)} as={ESRoutes.FORGOT_PASSWORD} shallow>
                <a className={classes.noLink}>
                  <Typography color="textPrimary" gutterBottom={false} variant="body2">
                    {i18n.t('common:login.password_label_secondary')}
                  </Typography>
                </a>
              </Link>
            }
            fullWidth
            value={values.password}
            onChange={(e) => setFieldValue('password', CommonHelper.replaceSingleByteString(e.target.value))}
            onBlur={handleBlur}
            helperText={touched.password && errors.password}
            error={touched.password && !!errors.password}
          />
        </Box>

        <Box pt={22 / 8} pb={4} maxWidth={280} className={classes.buttonContainer}>
          <ButtonPrimary type="submit" round fullWidth disabled={!_.isEmpty(errors)}>
            {i18n.t('common:login.submit')}
          </ButtonPrimary>
        </Box>
      </form>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  labelPrimaryContainer: {
    width: '40%',
  },
  labelMargin: {
    fontWeight: 'bold',
    fontSize: theme.typography.h3.fontSize,
  },
  link: {
    '& > a': {
      color: Colors.white_opacity[70],
      cursor: 'pointer',
      textDecoration: 'none',
    },
  },
  iconMargin: {
    marginLeft: theme.spacing(1 / 2),
  },
  noLink: {
    textDecoration: 'none',
  },
  buttonContainer: {
    width: '100%',
    margin: '0 auto',
  },
}))

export default LoginForm
