import { makeStyles, Typography, Box, Theme } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import ESInput from '@components/Input'
import ESCheckbox from '@components/Checkbox'
import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import { Colors } from '@theme/colors'
import GameSelectorDialog from './Partials/GameSelectorDialog'
import ESSelect from '@components/Select'
import { HardwareResponse } from '@services/common.service'
import useUploadImage from '@utils/hooks/useUploadImage'
import CoverUploader from './Partials/CoverUploader'
import { FormType } from './FormModel/FormType'
import { EditableTypes } from './useTournamentCreate'

type Props = {
  formik: FormikProps<FormType>
  hardwares: HardwareResponse
  editables: EditableTypes
}

const StepOne: React.FC<Props> = ({ formik, hardwares, editables }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const { uploadArenaCoverImage, isUploading } = useUploadImage()
  const handleImageUpload = (file: File) => {
    uploadArenaCoverImage(file, 1, true, (imageUrl) => {
      formik.setFieldValue('stepOne.cover_image_url', imageUrl)
    })
  }
  return (
    <Box pb={9}>
      <Box pb={4}>
        <CoverUploader
          src={formik.values.stepOne.cover_image_url}
          onChange={handleImageUpload}
          isUploading={isUploading}
          disabled={!editables.cover_image}
        />
      </Box>
      <Box pb={4}>
        <ESInput
          id="title"
          name="stepOne.title"
          labelPrimary={t('common:tournament_create.name')}
          placeholder={t('common:tournament_create.title_placeholder')}
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
        <ESInput
          id="stepOne.overview"
          name="stepOne.overview"
          multiline
          rows={5}
          labelPrimary={t('common:tournament_create.overview')}
          placeholder={t('common:tournament_create.overview_placeholder')}
          fullWidth
          value={formik.values.stepOne.overview}
          onChange={formik.handleChange}
          helperText={formik.touched?.stepOne?.overview && formik.errors?.stepOne?.overview}
          error={formik.touched?.stepOne?.overview && !!formik.errors?.stepOne?.overview}
          size="small"
          disabled={!editables.overview}
        />
      </Box>
      <Box pb={3 / 8}>
        <ESCheckbox
          disableRipple
          checked={formik.values.stepOne.has_prize}
          onChange={() => {
            formik.setFieldValue('stepOne.has_prize', !formik.values.stepOne.has_prize)
          }}
          label={t('common:tournament_create.has_prize')}
          disabled={!editables.has_prize}
        />
      </Box>
      <Box pb={1}>
        <ESInput
          id="stepOne.prize_amount"
          name="stepOne.prize_amount"
          placeholder={t('common:tournament_create.prize_placeholder')}
          fullWidth
          value={formik.values.stepOne.prize_amount}
          onChange={formik.handleChange}
          helperText={formik.touched?.stepOne?.prize_amount && formik.errors?.stepOne?.prize_amount}
          error={formik.values.stepOne.has_prize && formik.touched?.stepOne?.prize_amount && !!formik.errors?.stepOne?.prize_amount}
          size="small"
          onBlur={formik.handleBlur}
          disabled={!editables.prize_amount}
        />
      </Box>
      <Box pb={4} display="flex" flexDirection="row" color={Colors.secondary}>
        <Icon className={`fa fa-exclamation-triangle ${classes.iconMargin}`} fontSize="small" />
        <Typography variant="body2">{t('common:tournament_create.hint')}</Typography>
      </Box>
      <Box pb={3}>
        <GameSelectorDialog
          values={formik.values.stepOne.game_title_id}
          onChange={(value) => {
            formik.setFieldValue('stepOne.game_title_id', value)
          }}
          disabled={!editables.game_title}
        />
      </Box>
      <Box>
        <ESSelect
          name="stepOne.game_hardware_id"
          fullWidth
          value={formik.values.stepOne.game_hardware_id}
          onChange={formik.handleChange}
          label={t('common:tournament_create.game_hardware')}
          required={true}
          size="small"
          disabled={!editables.game_hardware}
        >
          <option disabled value={-1}>
            {t('common:please_select')}
          </option>
          {(hardwares?.data || []).map((hardware, key) => (
            <option value={hardware.id} key={key}>
              {hardware.attributes.name}
            </option>
          ))}
        </ESSelect>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconMargin: {
    marginRight: theme.spacing(1 / 2),
  },
}))

export default StepOne
