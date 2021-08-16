import { Box } from '@material-ui/core'
import { FormikProps } from 'formik'
import { FormType } from './FormModel/FormType'
import { EditableTypes } from './useTopicCreate'
import { useState } from 'react'
import useUploadImage from '@utils/hooks/useUploadImage'
import CoverUploader from '../UpsertForm/Partials/CoverUploader'
import ESFastInput from '@components/FastInput'

import i18n from '@locales/i18n'
import { GetPrefecturesResponse } from '@services/common.service'

type Props = {
  formik: FormikProps<FormType>
  prefectures: GetPrefecturesResponse
  editables: EditableTypes
}

const StepOne: React.FC<Props> = ({ formik, editables }) => {
  const { uploadArenaCoverImage } = useUploadImage()
  const [isUploading, setUploading] = useState(false)

  const handleUpload = (file: File) => {
    setUploading(true)

    uploadArenaCoverImage(file, undefined, 1, true, (imageUrl) => {
      setUploading(false)
      formik.setFieldValue('stepOne.cover_image_url', imageUrl)
    })
  }

  return (
    <Box pb={9}>
      <Box pb={4}>
        <ESFastInput
          id="title"
          name="stepOne.title"
          labelPrimary={i18n.t('common:topic_create.name')}
          fullWidth
          value={formik.values.stepOne.title}
          onChange={formik.handleChange}
          helperText={formik.touched?.stepOne?.title && formik.errors?.stepOne?.title}
          error={formik.touched?.stepOne?.title && !!formik.errors?.stepOne?.title}
          onBlur={formik.handleBlur}
          size="small"
          required
          disabled={!editables.title}
        />
      </Box>
      <Box pb={4}>
        <ESFastInput
          id="stepOne.overview"
          name="stepOne.overview"
          multiline
          rows={5}
          labelPrimary={i18n.t('common:topic_create.text')}
          placeholder={i18n.t('common:topic_create.please_enter')}
          fullWidth
          value={formik.values.stepOne.overview}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched?.stepOne?.overview && formik.errors?.stepOne?.overview}
          error={formik.touched?.stepOne?.overview && !!formik.errors?.stepOne?.overview}
          size="small"
          required
          disabled={!editables.overview}
        />
      </Box>

      <Box pb={4}>
        <CoverUploader src={formik.values.stepOne.cover_image_url} onChange={handleUpload} isUploading={isUploading} />
      </Box>
    </Box>
  )
}

export default StepOne
