import React, { useState } from 'react'
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
import useRegisterByEmail from './useRegisterByEmail'
import ESStrengthMeter from '@components/StrengthMeter'
import ESLoader from '@components/FullScreenLoader'
import _ from 'lodash'
import i18n from '@locales/i18n'
import ESStickyFooter from '@components/StickyFooter'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { showDialog } from '@store/common/actions'
import { useAppDispatch } from '@store/hooks'
import { NG_WORD_DIALOG_CONFIG, NG_WORD_AREA } from '@constants/common.constants'
import ESPasswordInput from '@components/PasswordInput'

const RegisterByEmailContainer: React.FC = () => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { registerByEmail, meta, backAction, resetMeta, registerByEmailLoading } = useRegisterByEmail()
  const [score, setScore] = useState(0)
  const dispatch = useAppDispatch()
  const { checkNgWord } = useCheckNgWord()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .test('email-validation', t('common:login.validation.email'), (value) => {
        return CommonHelper.validateEmail(value)
      })
      .required(t('common:common.input_required')),
    password: Yup.string()
      .test('password-validation', t('common:error.password_failed'), (value) => {
        const tempScore = CommonHelper.scorePassword(value)

        setScore(tempScore)
        return tempScore > 40
      })
      .required(t('common:common.input_required')),
  })

  const { handleChange, values, handleSubmit, errors, touched, setFieldValue, handleBlur } = useFormik<services.UserLoginParams>({
    initialValues: {
      email: '',
      password: '',
      registration_id: undefined,
    },
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      if (values.email && values.password) {
        if (_.isEmpty(checkNgWord(values.email))) {
          registerByEmail(values)
        } else {
          dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.register_by_email }))
        }
        resetMeta()
      }
    },
  })

  const renderError = () => {
    return (
      !!meta.error && (
        <Box pb={8}>
          <Box pb={20 / 8} textAlign="center">
            <Typography color="secondary">{i18n.t('common:register.error.title')}</Typography>
          </Box>
        </Box>
      )
    )
  }

  return (
    <>
      <ESStickyFooter disabled={!_.isEmpty(errors)} title={t('common:register_by_email.button')} onClick={handleSubmit} noScroll>
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
              {renderError()}
              <Box>
                <ESInput
                  id="email"
                  autoFocus
                  placeholder={t('common:register_by_email.email_placeholder')}
                  labelPrimary={t('common:register_by_email.email')}
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email && errors.email}
                  error={touched.email && !!errors.email}
                />
              </Box>

              <Box pt={3} pb={1}>
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
            </Box>
          </Box>

          <Box className={classes.blankSpace}></Box>
        </form>
        {registerByEmailLoading && <ESLoader open={true} />}
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

export default RegisterByEmailContainer
