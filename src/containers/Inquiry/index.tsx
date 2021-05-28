import { Box, Typography, Button } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { useTranslation } from 'react-i18next'

import HeaderWithButton from '@components/HeaderWithButton'
import Input from '@components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import ButtonPrimary from '@components/ButtonPrimary'
import { InquiryParams } from '@services/settings.service'
import useInquiry from './useInquiry'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Colors } from '@theme/colors'
import { ESRoutes } from '@constants/route.constants'

const ESInquiry: React.FC = () => {
  const { t } = useTranslation('common')
  const { createInquiry, meta, currentUserEmail } = useInquiry()
  const router = useRouter()
  const [showPreview, setShowPreview] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const classes = useStyles()

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t('common.required')).max(100, t('common.too_long')),
    email: Yup.string()
      .test('email-validation', t('inquiry.error.email'), (value) => {
        return CommonHelper.validateEmail(value)
      })
      .max(100, t('common.too_long'))
      .required(t('inquiry.error.email')),
    content: Yup.string().required(t('common.required')).max(1000, t('common.too_long')),
  })

  const { handleChange, values, handleSubmit, errors, touched } = useFormik<InquiryParams>({
    initialValues: {
      content: '',
      title: '',
      email: currentUserEmail ?? '',
    },
    validationSchema,
    onSubmit() {
      setShowPreview(true)
    },
  })

  useEffect(() => {
    if (meta.loaded) {
      setShowSuccess(true)
    }
  }, [meta.loaded])

  return (
    <div>
      <HeaderWithButton title={t('service_info.inquiry')} />
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
          <form className={classes.root} onSubmit={handleSubmit}>
            <Box mt={2} bgcolor={showPreview ? Colors.black : null} borderRadius={4} padding={3} margin={3}>
              <Input
                id="title"
                name="title"
                value={values.title}
                fullWidth
                onChange={handleChange}
                labelPrimary={t('inquiry.subject')}
                placeholder=""
                required
                helperText={touched.title && errors.title}
                error={touched.title && !!errors.title}
                disabled={showPreview}
                size="small"
              />
              <Box mt={1}>
                <Input
                  id="content"
                  name="content"
                  value={values.content}
                  onChange={handleChange}
                  labelPrimary={t('inquiry.desc')}
                  placeholder={t('inquiry.desc_placeholder')}
                  required
                  fullWidth
                  helperText={touched.content && errors.content}
                  error={touched.content && !!errors.content}
                  multiline
                  rows={8}
                  disabled={showPreview}
                  size="small"
                />
              </Box>
              <Box mt={1}></Box>
              <Input
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                labelPrimary={t('inquiry.email')}
                required
                fullWidth
                helperText={touched.email && errors.email}
                error={touched.email && !!errors.email}
                rows={8}
                disabled={showPreview}
                size="small"
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
                  <ButtonPrimary round fullWidth type="submit" disabled={meta.pending}>
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
  root: {
    '& .MuiInputBase-input.Mui-disabled': {
      marginLeft: -12,
    },
  },
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
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 'none',
      background: '#1a1a1a',
    },
  },
  cancel: {
    textDecorationLine: 'underline',
  },
}))

export default ESInquiry
