import { makeStyles, Typography, Box, Theme } from '@material-ui/core'
import { FormikProps } from 'formik'
import { Colors } from '@theme/colors'
import { HardwareResponse } from '@services/common.service'
import { FormType } from './FormModel/FormType'
import { EditableTypes } from './useTournamentCreate'
import { useCallback, useEffect } from 'react'
import useUploadImage from '@utils/hooks/useUploadImage'
import GameSelectorDialog from './Partials/GameSelectorDialog'
import CoverUploader from './Partials/CoverUploader'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import ESFastInput from '@components/FastInput'
import Icon from '@material-ui/core/Icon'
import i18n from '@locales/i18n'

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
          labelPrimary={i18n.t('common:tournament_create.name')}
          placeholder={i18n.t('common:tournament_create.title_placeholder')}
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
          labelPrimary={i18n.t('common:tournament_create.overview')}
          placeholder={i18n.t('common:tournament_create.overview_placeholder')}
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
      <Box pb={3 / 8}>
        <ESCheckbox
          disableRipple
          checked={formik.values.stepOne.has_prize}
          onChange={() => {
            formik.setFieldValue('stepOne.has_prize', !formik.values.stepOne.has_prize)
          }}
          label={i18n.t('common:tournament_create.has_prize')}
          disabled={!editables.prize}
        />
      </Box>
      <Box pb={1}>
        {formik.values.stepOne.has_prize && (
          <ESFastInput
            id="stepOne.prize_amount"
            name="stepOne.prize_amount"
            placeholder={i18n.t('common:tournament_create.prize_placeholder')}
            fullWidth
            value={formik.values.stepOne.prize_amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched?.stepOne?.prize_amount && formik.errors?.stepOne?.prize_amount}
            error={formik.values.stepOne.has_prize && formik.touched?.stepOne?.prize_amount && !!formik.errors?.stepOne?.prize_amount}
            size="small"
            disabled={!editables.prize}
          />
        )}
      </Box>
      <Box pb={4} display="flex" flexDirection="row" color={Colors.secondary}>
        <Icon className={`fa fa-exclamation-triangle ${classes.iconMargin}`} fontSize="small" />
        <Typography variant="body2">{i18n.t('common:tournament_create.hint')}</Typography>
      </Box>
      <Box pb={3}>
        <GameSelectorDialog values={formik.values.stepOne.game_title_id} onChange={handleSelectedGame} disabled={!editables.game_title} />
      </Box>
      <Box>
        <ESSelect
          name="stepOne.game_hardware_id"
          fullWidth
          value={formik.values.stepOne.game_hardware_id}
          onChange={formik.handleChange}
          label={i18n.t('common:tournament_create.game_hardware')}
          required={true}
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
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconMargin: {
    marginRight: theme.spacing(1 / 2),
  },
}))

export default StepOne
