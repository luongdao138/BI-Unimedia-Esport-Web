import { Box } from '@material-ui/core'

import { useTranslation } from 'react-i18next'

import HeaderWithButton from '@components/HeaderWithButton'
import Input from '@components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import ButtonPrimary from '@components/ButtonPrimary'
import { InquiryParams } from '@services/settings.service'
import useInquiry from './useInquiry'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const ESInquiry: React.FC = () => {
  const { t } = useTranslation('common')
  const { createInquiry, meta } = useInquiry()
  const router = useRouter()

  const validationSchema = Yup.object().shape({
    title: Yup.string().required().max(70, t('common.too_long')),
    description: Yup.string().required().max(1000, t('common.too_long')),
  })

  const formik = useFormik<InquiryParams>({
    initialValues: {
      description: '',
      title: '',
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
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              labelPrimary={t('inquiry.desc')}
              placeholder={t('inquiry.desc_placeholder')}
              required
              fullWidth
              error={!!formik.errors.description}
              multiline
              rows={8}
            />
          </Box>
          <Box mt={1} display="flex" justifyContent="center">
            <ButtonPrimary round type="submit" disabled={meta.pending}>
              {t('inquiry.send')}
            </ButtonPrimary>
          </Box>
          <Box mt={4}></Box>
        </form>
      </Box>
    </div>
  )
}

export default ESInquiry
