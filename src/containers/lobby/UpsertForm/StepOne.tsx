import { Box, makeStyles } from '@material-ui/core'
import { FormikProps } from 'formik'
import { HardwareResponse } from '@services/common.service'
import { FormType } from './FormModel/FormType'
import { EditableTypes } from './useLobbyCreate'
import { useCallback, useEffect } from 'react'
import useUploadImage from '@utils/hooks/useUploadImage'
import GameSelectorDialog from './Partials/GameSelectorDialog'
import CategorySelectorDialog from './Partials/CategorySelectorDialog'
import CoverUploader from './Partials/CoverUploader'
import ESSelect from '@components/Select'
import ESFastInput from '@components/FastInput'
import i18n from '@locales/i18n'
import useReturnHref from '@utils/hooks/useReturnHref'

type Props = {
  formik: FormikProps<FormType>
  hardwares: HardwareResponse
  editables: EditableTypes
}

const StepOne: React.FC<Props> = ({ formik, hardwares, editables }) => {
  const classes = useStyles()
  const { uploadArenaCoverImage, isUploading } = useUploadImage()

  const handleUpload = useCallback((file: File, blob: any) => {
    uploadArenaCoverImage(file, blob, 1, true, (imageUrl) => {
      formik.setFieldValue('stepOne.cover_image_url', imageUrl)
    })
  }, [])

  const handleSelectedGame = useCallback((value) => {
    formik.setFieldValue('stepOne.game_title_id', value)
  }, [])

  useEffect(() => {
    if (!formik.values.stepOne.has_prize) formik.setFieldValue('stepOne.prize_amount', '')
  }, [formik.values.stepOne.has_prize])

  const { hasUCRReturnHref } = useReturnHref()
  const handleCoverDailogStateChange = (_open: boolean) => {
    if (hasUCRReturnHref) {
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
    }
  }

  return (
    <Box pb={9}>
      <Box pb={4}>
        <CoverUploader
          src={formik.values.stepOne.cover_image_url}
          onChange={handleUpload}
          isUploading={isUploading}
          disabled={!editables.cover_image}
          onOpenStateChange={handleCoverDailogStateChange}
        />
      </Box>
      <Box pb={4}>
        <ESFastInput
          id="title"
          name="stepOne.title"
          labelPrimary={i18n.t('common:lobby_create.name')}
          // placeholder={i18n.t('common:lobby_create.title_placeholder')}
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
          labelPrimary={i18n.t('common:chat.title')}
          placeholder={i18n.t('common:lobby_create.overview_placeholder')}
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
        <CategorySelectorDialog
          values={formik.values.stepOne.game_title_id}
          onChange={handleSelectedGame}
          disabled={!editables.game_title}
        />
      </Box>
      <Box pb={3}>
        <GameSelectorDialog values={formik.values.stepOne.game_title_id} onChange={handleSelectedGame} disabled={!editables.game_title} />
      </Box>
      <Box pb={3}>
        <ESSelect
          name="stepOne.game_hardware_id"
          fullWidth
          value={formik.values.stepOne.game_hardware_id}
          onChange={formik.handleChange}
          label={i18n.t('common:tournament_create.game_hardware')}
          required={false}
          size="small"
          disabled={!editables.game_hardware}
        >
          <option disabled value={-1}>
            {i18n.t('common:please_select')}
          </option>
          {(hardwares?.data || []).map((hardware, key) => (
            <option value={hardware.id} key={key}>
              {hardware.attributes.name}
            </option>
          ))}
        </ESSelect>
      </Box>
      <Box pb={4}>
        <ESSelect
          className={classes.selectWidth}
          name="stepTwo.participant_type"
          value={formik.values.stepTwo.participant_type}
          onChange={formik.handleChange}
          label={i18n.t('common:lobby_create.max_participants')}
          required={true}
          size="small"
          disabled={!editables.participant_type}
        >
          <option disabled value={-1}>
            {i18n.t('common:please_select')}
          </option>
        </ESSelect>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  selectWidth: {
    width: 200,
  },
}))

export default StepOne
