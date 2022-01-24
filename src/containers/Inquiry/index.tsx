import { Box, Typography, Button, IconButton, Icon } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { useTranslation } from 'react-i18next'

import HeaderWithButton from '@components/HeaderWithButton'
import ESInput from '@components/Input'
import { useFormik } from 'formik'
import Yup from '@utils/Yup'
import ButtonPrimary from '@components/ButtonPrimary'
import { InquiryParams } from '@services/settings.service'
import useInquiry from './useInquiry'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Colors } from '@theme/colors'
import { ESRoutes } from '@constants/route.constants'
import _ from 'lodash'
import useCheckNgWord from '@utils/hooks/useCheckNgWord'
import { showDialog } from '@store/common/actions'
import { INQUIRY_REQUEST_LABELS, NG_WORD_AREA, NG_WORD_DIALOG_CONFIG } from '@constants/common.constants'
import { useAppDispatch } from '@store/hooks'
import i18n from '@locales/i18n'
import ESSelect from '@components/Select'
import CharacterLimited from '@components/CharacterLimited'

const ESInquiry: React.FC = () => {
  const { t } = useTranslation('common')
  const { createInquiry, meta, currentUserEmail } = useInquiry()
  const router = useRouter()
  const [showPreview, setShowPreview] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { checkNgWord } = useCheckNgWord()
  const hasEmail = CommonHelper.hasEmail(currentUserEmail)

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t('inquiry.title_required')).max(100),

    email: Yup.string()
      .required(t('inquiry.error.email'))
      .max(100)
      .test('email', t('inquiry.error.email'), (value) => {
        return CommonHelper.validateEmail(value)
      }),

    content: Yup.string().required(t('inquiry.desc_required')).max(5000),
  })

  const { handleChange, values, handleSubmit, errors, touched, handleBlur } = useFormik<InquiryParams>({
    initialValues: {
      content: '',
      title: '',
      email: hasEmail ? currentUserEmail : '',
    },
    validationSchema,
    onSubmit() {
      const check_title = checkNgWord([values.title])
      const check_content = checkNgWord([values.content])
      const check_email = checkNgWord([values.email])

      if (_.isEmpty(check_title) && _.isEmpty(check_content) && _.isEmpty(check_email)) {
        setShowPreview(true)
      } else if (!_.isEmpty(check_title)) {
        dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.inquiry_title }))
      } else if (!_.isEmpty(check_content)) {
        dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.inquiry_content }))
      } else if (!_.isEmpty(check_email)) {
        dispatch(showDialog({ ...NG_WORD_DIALOG_CONFIG, actionText: NG_WORD_AREA.inquiry_email }))
      }
    },
  })

  useEffect(() => {
    if (meta.loaded) {
      setShowSuccess(true)
    }
  }, [meta.loaded])

  const buttonActive = (): boolean => {
    return values.title !== '' && values.content !== '' && _.isEmpty(errors)
  }

  return (
    <div>
      {showPreview ? (
        <Box className={classes.header}>
          <IconButton
            className={classes.iconButton}
            disableRipple
            onClick={(e) => {
              e.preventDefault()
              setShowPreview(false)
            }}
          >
            <Icon className={`fa fa-arrow-left ${classes.icon}`} />
          </IconButton>
          <Typography variant="body1" className={classes.headerTitle}>
            {t('service_info.inquiry')}
          </Typography>
        </Box>
      ) : (
        <HeaderWithButton title={t('service_info.inquiry')} />
      )}

      {showSuccess ? (
        <Box>
          <Box mt={9}>
            <Typography className={classes.wrap} paragraph={true}>
              {t('inquiry.success_message')}
            </Typography>
            <Box mt={9} display="flex" justifyContent="center">
              <Box width={220}>
                <ButtonPrimary
                  round
                  fullWidth
                  onClick={() => {
                    router.push(ESRoutes.HOME)
                  }}
                >
                  {t('inquiry.go_home')}
                </ButtonPrimary>
              </Box>
            </Box>
            <Box mt={3}></Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <form onSubmit={handleSubmit}>
            <Box mt={2} bgcolor={showPreview ? Colors.black : null} borderRadius={4} padding={3} margin={3}>
              <Box mt={1}>
                {showPreview ? (
                  <Box>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Typography>{i18n.t('common:inquiry.subject')}</Typography>
                      <Typography component="span" className={classes.required}>
                        {t('common.required')}
                      </Typography>
                    </Box>
                    <Typography className={classes.titlePreview}>{values.title}</Typography>
                  </Box>
                ) : (
                  <ESSelect
                    id="title"
                    name="title"
                    fullWidth
                    value={values.title}
                    onChange={handleChange}
                    label={i18n.t('common:inquiry.subject')}
                    required
                    size="big"
                    disabled={false}
                    helperText={touched.title && errors.title}
                    error={touched.title && !!errors.title}
                    // helperText={formik?.touched?.stepSettingTwo?.category && formik?.errors?.stepSettingTwo?.category}
                    // error={formik?.touched?.stepSettingTwo?.category && !!formik?.errors?.stepSettingTwo?.category}
                  >
                    <option disabled value={''}>
                      {''}
                    </option>
                    {INQUIRY_REQUEST_LABELS.map((item, index) => (
                      <option key={index} value={i18n.t(`common:${item}`).toString()}>
                        {i18n.t(`common:${item}`)}
                      </option>
                    ))}
                  </ESSelect>
                )}
              </Box>
              <Box mt={1}>
                <ESInput
                  id="content"
                  name="content"
                  value={values.content}
                  fullWidth
                  onChange={handleChange}
                  labelPrimary={t('inquiry.desc')}
                  placeholder={t('inquiry.desc_placeholder')}
                  onBlur={handleBlur}
                  required
                  multiline
                  helperText={touched.content && errors.content}
                  error={touched.content && !!errors.content}
                  disabled={showPreview}
                  rows={8}
                  size="small"
                  endAdornment={
                    <CharacterLimited value={values.content} limit={5000} multiLines isScroll={CommonHelper.hasScrollBar('content')} />
                  }
                  className={`${CommonHelper.hasScrollBar('content') ? 'hide-scroll-indicator' : null}`}
                />
              </Box>
              <Box mt={1}></Box>
              <ESInput
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                labelPrimary={t('inquiry.email')}
                onBlur={handleBlur}
                required
                fullWidth
                helperText={touched.email && errors.email}
                error={touched.email && !!errors.email}
                rows={8}
                disabled={!!hasEmail || showPreview}
                readOnly={!!hasEmail}
                size="small"
                endAdornment={!hasEmail && <CharacterLimited value={values.email} limit={100} />}
              />
            </Box>

            <Box mt={3} display="flex" justifyContent="center">
              <Box width={220}>
                {showPreview ? (
                  <ButtonPrimary
                    round
                    fullWidth
                    onClick={(e) => {
                      e.preventDefault()
                      createInquiry(values)
                    }}
                  >
                    {t('inquiry.send')}
                  </ButtonPrimary>
                ) : (
                  <ButtonPrimary round fullWidth type="submit" disabled={!buttonActive()}>
                    {t('inquiry.next')}
                  </ButtonPrimary>
                )}
              </Box>
            </Box>
            {showPreview ? (
              <Box mt={3} display="flex" justifyContent="center">
                <Button
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPreview(false)
                  }}
                  className={classes.cancel}
                >
                  {t('inquiry.go_edit')}
                </Button>
              </Box>
            ) : null}
            <Box mt={3}></Box>
          </form>
        </Box>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  primary: {
    '& .MuiButton-label': {
      textDecorationLine: 'none',
    },
  },
  wrap: {
    whiteSpace: 'pre-line',
    margin: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(5),
    color: '#707070',
    background: Colors.black_opacity[70],
    borderRadius: '4px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  cancel: {
    textDecorationLine: 'underline',
  },
  header: {
    padding: 16,
    width: '100%',
    position: 'sticky',
    background: Colors.black,
    zIndex: 10,
    left: 0,
    top: 0,
    right: 0,
    height: 60,
    borderBottom: '1px solid #212121',
  },
  icon: {
    fontSize: 12,
    color: theme.palette.text.primary,
  },
  iconButton: {
    backgroundColor: theme.palette.text.secondary,
    marginRight: 14,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.white,
    display: 'inline-block',
  },
  required: {
    backgroundColor: Colors.primary,
    borderRadius: 2,
    paddingLeft: theme.spacing(1 / 2),
    paddingRight: theme.spacing(1 / 2),
    height: 16,
    fontSize: 10,
    marginLeft: theme.spacing(1),
    color: Colors.white,
  },
  titlePreview: {
    color: Colors.white_opacity['30'],
    marginTop: '8px',
  },
}))

export default ESInquiry
