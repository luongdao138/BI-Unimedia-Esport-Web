import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { useStore } from 'react-redux'
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
import useProfile from './useProfile'
import { isEmpty } from 'lodash'
import { ERROR_CODE } from '@constants/error.constants'

const RegisterProfileContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { registerProfile, meta, backAction, isSocial, resetMeta } = useProfile()
  const store = useStore()
  const validationSchema = Yup.object().shape({
    user_code: Yup.string()
      .required(t('common:common.user_id_at_least'))
      .max(50, t('common:common.too_long'))
      .min(2, t('common:common.user_id_at_least'))
      .test('user_code', t('common:common.user_code_invalid'), function (value) {
        return CommonHelper.userCodeValid(value)
      })
      .test('user_code', t('common:common.contains_ngword'), function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
    nickname: Yup.string()
      .required(t('common:common.nickname_at_least'))
      .max(50, t('common:common.too_long'))
      .min(2, t('common:common.nickname_at_least'))
      .test('nickname', t('common:common.contains_ngword'), function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
  })

  const { handleChange, values, handleSubmit, errors, touched, handleBlur, setFieldValue } = useFormik<services.UserProfileParams>({
    initialValues: {
      user_code: '',
      nickname: '',
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      resetMeta()
      registerProfile(values)
    },
  })

  const buttonActive = (): boolean => isEmpty(errors)

  const renderError = () => {
    return (
      !!meta.error &&
      meta.error['code'] === ERROR_CODE.USER_CODE_ALREADY_TAKEN && (
        <Box pb={8} textAlign="center">
          <Typography color="secondary">{t('common:register_by_email.duplicated')}</Typography>
        </Box>
      )
    )
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
              <Typography variant="h2">{isSocial ? t('common:register_by_email.sns') : t('common:register_by_email.back')}</Typography>
            </Box>
          </Box>

          <Box width="100%" px={5} flexDirection="column" alignItems="center" pt={8} className={classes.container}>
            {renderError()}
            <Box pb={1}>
              <ESInput
                id="user_code"
                autoFocus
                labelPrimary={t('common:register_profile.user_id')}
                fullWidth
                value={values.user_code}
                onChange={(e) => setFieldValue('user_code', CommonHelper.replaceSingleByteString(e.target.value))}
                onBlur={handleBlur}
                helperText={touched.user_code && errors.user_code}
                error={touched.user_code && !!errors.user_code}
              />
            </Box>

            <Box>
              <Box display="flex" flexDirection="row" pb={1}>
                <Icon className={`fa fa-exclamation-triangle ${classes.iconMargin}`} fontSize="small" />
                <Typography variant="body2">{t('common:register_profile.hint')}</Typography>
              </Box>

              <Typography variant="body2">{t('common:register_profile.hint2')}</Typography>
            </Box>

            <Box pt={3} pb={1}>
              <ESInput
                id="nickname"
                labelPrimary={t('common:register_profile.nickname')}
                fullWidth
                value={values.nickname}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.nickname && errors.nickname}
                error={touched.nickname && !!errors.nickname}
              />
            </Box>
          </Box>
        </Box>

        <Box className={classes.blankSpace}></Box>

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
  hint: {
    color: Colors.white_opacity[30],
  },
  detail: {
    whiteSpace: 'pre-line',
    color: Colors.white_opacity[70],
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

export default RegisterProfileContainer
