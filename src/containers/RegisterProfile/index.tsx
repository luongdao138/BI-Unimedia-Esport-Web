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

const RegisterProfileContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { registerProfile, meta, backAction } = useProfile()
  const store = useStore()
  const validationSchema = Yup.object().shape({
    user_code: Yup.string()
      .required(t('common:common.error'))
      .max(50, t('common:common.too_long'))
      .min(2, t('common:common.at_least'))
      .test('user_code', 'at_least', function (value) {
        return CommonHelper.userCodeValid(value)
      })
      .test('user_code', 'at_least', function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
    nickname: Yup.string()
      .required(t('common:common.error'))
      .max(50, t('common:common.too_long'))
      .min(2, t('common:common.at_least'))
      .test('nickname', 'at_least', function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
  })

  const { handleChange, values, handleSubmit, errors, touched } = useFormik<services.UserProfileParams>({
    initialValues: {
      user_code: '',
      nickname: '',
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      if (!hasMatchNgWord()) {
        registerProfile(values)
      }
    },
  })

  const hasMatchNgWord = (): boolean =>
    CommonHelper.matchNgWords(store, values.user_code).length > 0 || CommonHelper.matchNgWords(store, values.nickname).length > 0

  const buttonActive = (): boolean => {
    return (
      values.nickname !== null &&
      values.user_code !== null &&
      values.nickname !== '' &&
      values.user_code !== '' &&
      values.nickname.length >= 2 &&
      values.user_code.length >= 2 &&
      isEmpty(errors)
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
              <Typography variant="h2">{t('common:register_by_email.back')}</Typography>
            </Box>
          </Box>

          <Box width="100%" px={5} flexDirection="column" alignItems="center" pt={8} className={classes.container}>
            <Box pb={1}>
              <ESInput
                id="user_code"
                autoFocus
                labelPrimary={t('common:register_profile.user_id')}
                fullWidth
                value={values.user_code}
                onChange={handleChange}
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
                helperText={touched.nickname && errors.nickname}
                error={touched.nickname && !!errors.nickname}
              />
            </Box>
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
    borderTop: `1px solid #ffffff30`,
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

export default RegisterProfileContainer
