import { makeStyles, Theme, Typography, Box } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import ESInput from '@components/Input'
import { Colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import Yup from '@utils/Yup'
import { useFormik } from 'formik'
import * as services from '@services/auth.service'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import ESLoader from '@components/FullScreenLoader'
import useProfile from './useProfile'
import { isEmpty } from 'lodash'
import { ERROR_CODE } from '@constants/error.constants'
import ESStickyFooter from '@components/StickyFooter'
import _ from 'lodash'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { showDialog } from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'

const RegisterProfileContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { registerProfile, meta, isSocial, resetMeta } = useProfile()
  const dispatch = useAppDispatch()
  const { checkNgWord } = useCheckNgWord()

  const validationSchema = Yup.object().shape({
    user_code: Yup.string()
      .required(t('common:common.user_id_at_least'))
      .max(50)
      .test('user_code', t('common:common.validation.only_single_byte'), function (value) {
        return !CommonHelper.isDoubleByte(value)
      })
      .min(2, t('common:common.user_id_at_least'))
      .test('user_code', t('common:common.user_code_invalid'), function (value) {
        return CommonHelper.userCodeValid(value)
      }),

    nickname: Yup.string().required(t('common:common.nickname_at_least')).max(50).min(2, t('common:common.nickname_at_least')),
  })

  const { values, handleSubmit, errors, touched, handleBlur, setFieldValue, handleChange } = useFormik<services.UserProfileParams>({
    initialValues: {
      user_code: '',
      nickname: '',
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      const checked = checkNgWord([values.user_code, values.nickname])

      if (_.isEmpty(checked)) {
        registerProfile(values)
      } else {
        dispatch(
          showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: `${NG_WORD_AREA.profile_user_code}、 ${NG_WORD_AREA.profile_nickname}` })
        )
      }
      resetMeta()
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
      <ESStickyFooter disabled={!buttonActive()} title={t('common:register_by_email.button')} onClick={handleSubmit} noScroll>
        <form onSubmit={handleSubmit}>
          <Box pt={7.5} pb={9} className={classes.topContainer}>
            <Box className={classes.titleContainer}>
              <Typography variant="h2">{isSocial ? t('common:register_by_email.sns') : t('common:register_by_email.back')}</Typography>
            </Box>

            <Box width="100%" px={5} flexDirection="column" alignItems="center" pt={8} className={classes.container}>
              {renderError()}
              <Box pb={1}>
                <ESInput
                  id="user_code"
                  labelPrimary={t('common:register_profile.user_id')}
                  fullWidth
                  value={values.user_code}
                  onChange={handleChange}
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
                  onChange={(e) => setFieldValue('nickname', CommonHelper.replaceWhiteSpace(e.target.value))}
                  onBlur={handleBlur}
                  helperText={touched.nickname && errors.nickname}
                  error={touched.nickname && !!errors.nickname}
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
  iconMargin: {
    marginRight: theme.spacing(1 / 2),
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
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '16px 40px',
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
    titleContainer: {
      padding: '16px 0px',
    },
  },
}))

export default RegisterProfileContainer
