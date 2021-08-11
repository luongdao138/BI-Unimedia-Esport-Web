import { Box } from '@material-ui/core'
import { FormikProps } from 'formik'
import { FormType } from './FormModel/FormType'
import { EditableTypes } from './useCommunityCreate'
import { useCallback } from 'react'
import useUploadImage from '@utils/hooks/useUploadImage'
import GameSelectorDialog from './Partials/GameSelectorDialog'
import CoverUploader from '@components/CoverUploader'
import ESSelect from '@components/Select'
import ESFastInput from '@components/FastInput'
import ESCheckbox from '@components/Checkbox'
import ESLabel from '@components/Label'
import TagSelectorDialog from './Partials/TagSelectorDialog'
import i18n from '@locales/i18n'
import { CommunityHelper } from '@utils/helpers/CommunityHelper'
import { GetPrefecturesResponse } from '@services/common.service'

type Props = {
  formik: FormikProps<FormType>
  prefectures: GetPrefecturesResponse
  editables: EditableTypes
}

const StepOne: React.FC<Props> = ({ formik, prefectures, editables }) => {
  const { uploadArenaCoverImage, isUploading } = useUploadImage()

  const handleUpload = useCallback((file: File, blob: any) => {
    uploadArenaCoverImage(file, blob, 1, true, (imageUrl) => {
      formik.setFieldValue('stepOne.cover_image_url', imageUrl)
    })
  }, [])

  const handleSelectedGame = useCallback((value) => {
    formik.setFieldValue('stepOne.game_title_id', value)
  }, [])

  const handleSelectedTag = useCallback((value) => {
    formik.setFieldValue('stepOne.tag_title_id', value)
  }, [])

  return (
    <Box pb={9}>
      <Box pb={4}>
        <CoverUploader
          src={formik.values.stepOne.cover_image_url}
          onChange={handleUpload}
          isUploading={isUploading}
          disabled={!editables.cover_image}
        />
      </Box>
      <Box pb={4}>
        <ESFastInput
          id="title"
          name="stepOne.title"
          labelPrimary={i18n.t('common:community_create.name')}
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
          labelPrimary={i18n.t('common:community_create.introduction')}
          placeholder={i18n.t('common:community_create.introduction_placeholder')}
          fullWidth
          value={formik.values.stepOne.overview}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched?.stepOne?.overview && formik.errors?.stepOne?.overview}
          error={formik.touched?.stepOne?.overview && !!formik.errors?.stepOne?.overview}
          size="small"
          disabled={!editables.overview}
        />
      </Box>
      <Box pb={3}>
        <GameSelectorDialog values={formik.values.stepOne.game_title_id} onChange={handleSelectedGame} disabled={!editables.game_title} />
      </Box>
      <Box pb={1} width={200}>
        <ESSelect
          name="stepOne.area_id"
          value={formik.values.stepOne.area_id}
          onChange={formik.handleChange}
          label={i18n.t('common:community_create.area')}
          size="small"
          fullWidth
          disabled={!editables.area_id}
        >
          <option disabled value={-1}>
            {i18n.t('common:please_select')}
          </option>
          {prefectures?.data?.map((prefecture, index) => (
            <option value={prefecture.id} key={index}>
              {prefecture.attributes.area}
            </option>
          ))}
        </ESSelect>
      </Box>
      <Box pb={4}>
        <ESFastInput
          multiline
          rows={5}
          name="stepOne.address"
          fullWidth
          placeholder={i18n.t('common:community_create.area_name_placeholder')}
          value={formik.values.stepOne.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched?.stepOne?.address && formik.errors?.stepOne?.address}
          error={formik.touched?.stepOne?.address && !!formik.errors?.stepOne?.address}
          size="small"
          required
          disabled={!editables.address}
        />
      </Box>
      <Box pb={4}>
        <ESLabel label={i18n.t('common:community_create.public_or_private')} size="small" />
        <ESCheckbox
          disableRipple
          checked={CommunityHelper.getTypeValue(formik.values.stepOne.t_type)}
          onChange={() => formik.setFieldValue('stepOne.t_type', CommunityHelper.onTypeChange(formik.values.stepOne.t_type))}
          label={i18n.t('common:profile.show')}
          disabled={!editables.t_type}
        />
      </Box>
      <Box pb={4} width={200}>
        <ESSelect
          name="stepOne.participation_approval"
          value={formik.values.stepOne.participation_approval}
          onChange={formik.handleChange}
          label={i18n.t('common:community_create.participation_approval')}
          size="small"
          fullWidth
          disabled={!editables.area_id}
          required
        >
          <option disabled value={-1}>
            {i18n.t('common:please_select')}
          </option>
          {prefectures?.data?.map((prefecture, index) => (
            <option value={prefecture.id} key={index}>
              {prefecture.attributes.area}
            </option>
          ))}
        </ESSelect>
      </Box>
      <Box>
        <TagSelectorDialog values={formik.values.stepOne.tag_title_id} onChange={handleSelectedTag} disabled={!editables.tag_title} />
      </Box>
    </Box>
  )
}

export default StepOne
