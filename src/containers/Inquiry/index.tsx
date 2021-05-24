import { Box } from '@material-ui/core'

import { useTranslation } from 'react-i18next'

import HeaderWithButton from '@components/HeaderWithButton'
import Input from '@components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import ButtonPrimary from '@components/ButtonPrimary'
import { InquiryParams } from '@services/settings.service'
import useInquiry from './useInquiry'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const ESInquiry: React.FC = () => {
  const { t } = useTranslation('common')
  const { createInquiry, meta } = useInquiry()
  const router = useRouter()

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().max(100, t('common.too_long')),
    email: Yup.string()
      .test('email-validation', t('common.error'), (value) => {
        return CommonHelper.validateEmail(value)
      })
      .max(100, t('common.too_long'))
      .required(),
    content: Yup.string().required().max(1000, t('common.too_long')),
  })

  const formik = useFormik<InquiryParams>({
    initialValues: {
      content: '',
      title: '',
      email: '',
    },
    validationSchema,
    onSubmit(values) {
      createInquiry(values)
    },
  })

  useEffect(() => {
    if (meta.loaded) {
      formik.resetForm()
      router.back()
    }
  }, [meta.loaded])

  return (
    <div>
      <HeaderWithButton title={t('service_info.inquiry')} />
      <Box display="flex" justifyContent="center">
        <form onSubmit={formik.handleSubmit}>
          <Box mt={2} width={494}>
            <Input
              id="title"
              name="title"
              value={formik.values.title}
              fullWidth
              size="big"
              onChange={formik.handleChange}
              labelPrimary={t('inquiry.subject')}
              placeholder=""
              required
              error={!!formik.errors.title}
            />
          </Box>

          <Box mt={1} height={210}>
            <Input
              id="content"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              labelPrimary={t('inquiry.desc')}
              placeholder={t('inquiry.desc_placeholder')}
              required
              fullWidth
              error={!!formik.errors.content}
              multiline
              rows={8}
            />
          </Box>
          <Box mt={1}>
            <Input
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              labelPrimary={t('inquiry.email')}
              required
              fullWidth
              error={!!formik.errors.email}
              rows={8}
            />
          </Box>
          <Box mt={3} display="flex" justifyContent="center">
            <ButtonPrimary round type="submit" disabled={meta.pending}>
              {t('inquiry.send')}
            </ButtonPrimary>
          </Box>
          <Box mt={3}></Box>
        </form>
      </Box>
    </div>
  )
}

export default ESInquiry
