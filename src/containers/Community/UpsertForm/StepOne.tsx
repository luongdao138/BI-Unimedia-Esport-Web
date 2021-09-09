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
    formik.setFieldValue('stepOne.game_titles', value)
  }, [])

  const handleSelectedTag = useCallback((value) => {
    // value = value.filter((v) => {id: v.id, feature: v.attributes.feature})
    formik.setFieldValue('stepOne.features', value)
  }, [])

  return (
    <Box pb={9}>
      <Box pb={4}>
        <CoverUploader
          src={formik.values.stepOne.cover_image_url}
          onChange={handleUpload}
          isUploading={isUploading}
          disabled={!editables.cover_image_url}
        />
      </Box>
      <Box pb={4}>
        <ESFastInput
          id="title"
          name="stepOne.name"
          labelPrimary={i18n.t('common:community_create.name')}
          fullWidth
          value={formik.values.stepOne.name}
          onChange={formik.handleChange}
          helperText={formik.touched?.stepOne?.name && formik.errors?.stepOne?.name}
          error={formik.touched?.stepOne?.name && !!formik.errors?.stepOne?.name}
          onBlur={formik.handleBlur}
          size="small"
          required
          disabled={!editables.name}
        />
      </Box>
      <Box pb={4}>
        <ESFastInput
          id="stepOne.description"
          name="stepOne.description"
          multiline
          rows={5}
          labelPrimary={i18n.t('common:community_create.introduction')}
          placeholder={i18n.t('common:community_create.introduction_placeholder')}
          fullWidth
          value={formik.values.stepOne.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched?.stepOne?.description && formik.errors?.stepOne?.description}
          error={formik.touched?.stepOne?.description && !!formik.errors?.stepOne?.description}
          size="small"
          disabled={!editables.description}
        />
      </Box>
      <Box pb={3}>
        <GameSelectorDialog values={formik.values.stepOne.game_titles} onChange={handleSelectedGame} disabled={!editables.game_titles} />
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
        <Box pb={1}>
          <ESLabel label={i18n.t('common:community_create.public_or_private')} size="small" />
        </Box>
        <ESCheckbox
          disableRipple
          checked={CommunityHelper.getTypeValue(formik.values.stepOne.open_range)}
          onChange={() => formik.setFieldValue('stepOne.open_range', CommunityHelper.onTypeChange(formik.values.stepOne.open_range))}
          label={i18n.t('common:profile.show')}
          disabled={!editables.open_range}
        />
      </Box>
      <Box pb={4} width={200}>
        <ESSelect
          name="stepOne.join_condition"
          value={formik.values.stepOne.join_condition}
          onChange={formik.handleChange}
          label={i18n.t('common:community_create.participation_approval')}
          size="small"
          fullWidth
          disabled={!editables.area_id}
          required
        >
          <option value={1}>{i18n.t('common:community_create.approval_automatic')}</option>
          <option value={0}>{i18n.t('common:community_create.approval_manual')}</option>
        </ESSelect>
      </Box>
      <Box>
        <TagSelectorDialog values={formik.values.stepOne.features} onChange={handleSelectedTag} disabled={!editables.features} />
      </Box>
    </Box>
  )
}

export default StepOne
