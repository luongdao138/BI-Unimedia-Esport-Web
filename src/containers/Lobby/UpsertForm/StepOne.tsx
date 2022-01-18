import { Box, makeStyles, Typography } from '@material-ui/core'
import { FormikProps } from 'formik'
import { HardwareResponse } from '@services/common.service'
import { FormType } from './FormModel/FormType'
import { EditableTypes } from './useLobbyCreate'
import { useCallback } from 'react'
import useUploadImage from '@utils/hooks/useUploadImage'
import GameSelectorDialog from './Partials/GameSelectorDialog'
import CategorySelectorDialog from './Partials/CategorySelectorDialog'
import CoverUploader from './Partials/CoverUploader'
import ESSelect from '@components/Select'
import ESFastInput from '@components/FastInput'
import ESSwitchIOS from '@components/Switch'
import i18n from '@locales/i18n'
import CharacterLimited from '@components/CharacterLimited'

type Props = {
  formik: FormikProps<FormType>
  hardwares: HardwareResponse
  editables: EditableTypes
}

const StepOne: React.FC<Props> = ({ formik, hardwares, editables }) => {
  const classes = useStyles()
  const { uploadLobbyCoverImage, isUploading } = useUploadImage()

  const handleUpload = useCallback((file: File, blob: any) => {
    uploadLobbyCoverImage(file, blob, 1, true, (imageUrl) => {
      formik.setFieldValue('stepOne.cover_image_url', imageUrl)
    })
  }, [])

  const handleRemove = useCallback(() => {
    formik.setFieldValue('stepOne.cover_image_url', '')
  }, [])

  const handleSelectedGame = useCallback((value) => {
    formik.setFieldValue('stepOne.game_title_id', value)
  }, [])

  const handleSelectedCategory = useCallback((value) => {
    formik.setFieldValue('stepOne.categories', value)
  }, [])

  return (
    <Box pb={9}>
      <Box pb={4}>
        <CoverUploader
          src={formik.values.stepOne.cover_image_url}
          isUploading={isUploading}
          disabled={!editables.cover_image_url}
          onChange={handleUpload}
          onRemove={handleRemove}
        />
      </Box>
      <Box pb={4}>
        <ESFastInput
          id="title"
          name="stepOne.title"
          labelPrimary={i18n.t('common:lobby.create.name')}
          fullWidth
          value={formik.values.stepOne.title}
          onChange={formik.handleChange}
          helperText={formik.touched?.stepOne?.title && formik.errors?.stepOne?.title}
          error={formik.touched?.stepOne?.title && !!formik.errors?.stepOne?.title}
          onBlur={formik.handleBlur}
          size="small"
          required
          disabled={!editables.title}
          endAdornment={<CharacterLimited value={formik.values.stepOne.title} limit={60} />}
        />
      </Box>
      <Box pb={4}>
        <ESFastInput
          id="stepOne.message"
          name="stepOne.message"
          multiline
          rows={5}
          labelPrimary={i18n.t('common:lobby.create.overview')}
          placeholder={i18n.t('common:lobby.create.overview_placeholder')}
          fullWidth
          value={formik.values.stepOne.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched?.stepOne?.message && formik.errors?.stepOne?.message}
          error={formik.touched?.stepOne?.message && !!formik.errors?.stepOne?.message}
          size="small"
          disabled={!editables.message}
          endAdornment={<CharacterLimited value={formik.values.stepOne.message} limit={5000} multiLines />}
        />
      </Box>
      <Box pb={3}>
        <CategorySelectorDialog
          values={formik.values.stepOne.categories}
          onChange={handleSelectedCategory}
          disabled={!editables.categories}
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
          label={i18n.t('common:lobby.create.game_hardware')}
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
      <Box pb={4} display="flex" flexDirection="row" alignItems="center" width={122}>
        <ESFastInput
          id="max_participants"
          required={true}
          className={classes.input}
          labelPrimary={i18n.t('common:lobby.create.max_participants')}
          placeholder={i18n.t('common:lobby.create.max_participants_placeholder')}
          name="stepOne.max_participants"
          value={formik.values.stepOne.max_participants === 0 ? '' : formik.values.stepOne.max_participants}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched?.stepOne?.max_participants && formik.errors?.stepOne?.max_participants}
          error={formik.touched?.stepOne?.max_participants && !!formik.errors?.stepOne?.max_participants}
          size="small"
          disabled={!editables.max_participants}
          nowrapHelperText
        />
      </Box>
      <Box pb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Typography className={classes.organizerParticipated}>{i18n.t('common:lobby.create.organizer_participated')}</Typography>
        <ESSwitchIOS
          checked={formik.values.stepOne.organizer_participated}
          disabled={!editables.organizer_participated}
          handleChange={() => {
            formik.setFieldValue('stepOne.organizer_participated', !formik.values.stepOne.organizer_participated)
          }}
        />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  selectWidth: {
    width: 200,
  },
  input: {
    textAlign: 'right',
  },
  [theme.breakpoints.down('sm')]: {
    organizerParticipated: {
      fontSize: 12,
    },
  },
}))

export default StepOne
