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
import ESStickyFooter from '@components/StickyFooter'
import ESLoader from '@components/FullScreenLoader'
import { IconButton } from '@material-ui/core'
import _ from 'lodash'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { showDialog } from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'

const ForgotPasswordContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { forgotPassword, meta, backAction } = useForgotPassword()
  const dispatch = useAppDispatch()
  const checkNgWord = useCheckNgWord()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .test('email-validation', t('common:login.validation.email'), (value) => {
        return CommonHelper.validateEmail(value)
      })
      .required(t('common:common.input_required')),
  })

  const { handleChange, values, handleSubmit, errors, touched, handleBlur } = useFormik<services.ForgotPasswordParams>({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.email) {
        if (_.isEmpty(checkNgWord(values.email))) {
          forgotPassword(values)
        } else {
          dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.forgot_password }))
        }
      }
    },
  })

  const buttonActive = (): boolean => {
    return values.email !== '' && CommonHelper.validateEmail(values.email)
  }

  return (
    <>
      <ESStickyFooter disabled={!buttonActive()} title={t('common:forgot_password.send')} onClick={handleSubmit} noScroll>
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
              <Box>
                <ESInput
                  id="email"
                  placeholder={t('common:register_by_email.email_placeholder')}
                  labelPrimary={t('common:forgot_password.email')}
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email && errors.email}
                  error={touched.email && !!errors.email}
                />
              </Box>
            </Box>
          </Box>
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
