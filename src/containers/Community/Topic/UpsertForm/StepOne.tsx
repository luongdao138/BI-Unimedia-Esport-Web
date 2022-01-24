import { Box, makeStyles } from '@material-ui/core'
import { FormikProps } from 'formik'
import { FormType } from './FormModel/FormType'
import { useState } from 'react'
import useUploadImage from '@utils/hooks/useUploadImage'
import CoverUploader from '../UpsertForm/Partials/CoverUploader'
import ESFastInput from '@components/FastInput'
import i18n from '@locales/i18n'
import CharacterLimited from '@components/CharacterLimited'
import { CommonHelper } from '@utils/helpers/CommonHelper'

type Props = {
  formik: FormikProps<FormType>
}

const StepOne: React.FC<Props> = ({ formik }) => {
  const classes = useStyles()
  const { uploadArenaCoverImage } = useUploadImage()
  const [isUploading, setUploading] = useState(false)

  const handleUpload = (file: File) => {
    setUploading(true)

    uploadArenaCoverImage(file, undefined, 1, true, (imageUrl) => {
      setUploading(false)
      formik.setFieldValue('stepOne.attachments', imageUrl)
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
          disabled={false}
          required
          endAdornment={<CharacterLimited value={formik.values.stepOne.title} limit={60} />}
        />
      </Box>
      <Box pb={4}>
        <ESFastInput
          id="stepOne.content"
          name="stepOne.content"
          multiline
          rows={5}
          labelPrimary={i18n.t('common:topic_create.text')}
          placeholder={i18n.t('common:topic_create.please_enter')}
          fullWidth
          value={formik.values.stepOne.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched?.stepOne?.content && formik.errors?.stepOne?.content}
          error={formik.touched?.stepOne?.content && !!formik.errors?.stepOne?.content}
          size="small"
          disabled={false}
          required
          endAdornment={
            <CharacterLimited
              value={formik.values.stepOne.content}
              limit={5000}
              multiLines
              isScroll={CommonHelper.hasScrollBar('stepOne.content')}
            />
          }
          className={`${classes.pointListRow} ${CommonHelper.hasScrollBar('stepOne.content') ? 'hide-scroll-indicator' : null}`}
        />
      </Box>

      <Box pb={4}>
        <CoverUploader src={formik.values.stepOne.attachments} onChange={handleUpload} isUploading={isUploading} />
      </Box>
    </Box>
  )
}
const useStyles = makeStyles(() => ({
  pointListRow: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '&::-webkit-scrollbar-track': {
      display: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
      display: 'none',
    },
  },
}))
export default StepOne
