import { useEffect, useState } from 'react'
import { makeStyles, Typography, Box, Theme } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import ESInput from '@components/Input'
import ESCheckbox from '@components/Checkbox'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useStore } from 'react-redux'
import { TournamentCreateParams } from '@services/tournament.service'
import { Colors } from '@theme/colors'
import GameSelectorDialog from './Partials/GameSelectorDialog'
import ESSelect from '@components/Select'
import { GameTitle } from '@services/game.service'
import { HardwareResponse } from '@services/common.service'
import useUploadImage from '@utils/hooks/useUploadImage'
import { ACTION_TYPE, UPLOADER_TYPE } from '@constants/image.constants'
import CoverUploader from './Partials/CoverUploader'

type GameTitleItem = GameTitle['attributes']
type FormProps = {
  title: string
  cover_image_url: string
  has_prize: boolean
  prize_amount: string
  game_title_id: GameTitleItem[]
  game_hardware_id: number
  overview: string
}

type Props = {
  data: TournamentCreateParams
  saveState: (data: FormProps) => void
  hardwares: HardwareResponse
}

const StepOne: React.FC<Props> = ({ data, saveState, hardwares }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const store = useStore()
  const [isUploading, setUploading] = useState(false)
  const { uploadArenaTeamImage } = useUploadImage()
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required(t('common:common.error'))
      .max(50, t('common:common.too_long'))
      .min(2, t('common:common.at_least'))
      .test('ng-check', 'match_ng_word', function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
    overview: Yup.string()
      .max(190, t('common:common.too_long'))
      .test('ng-check', 'match_ng_word', (overview) => CommonHelper.matchNgWords(store, overview).length == 0),
    game_title_id: Yup.array().min(1, t('common:common.error')),
    game_hardware_id: Yup.number().min(1, t('common:common.error')).integer(t('common:common.integer')),
  })

  const { handleChange, values, errors, touched, setFieldValue } = useFormik<FormProps>({
    initialValues: {
      title: data.title,
      overview: data.overview,
      cover_image_url: data.cover_image_url,
      game_hardware_id: data.game_hardware_id,
      game_title_id: data.game_title_id,
      has_prize: data.has_prize,
      prize_amount: data.prize_amount,
    },
    validationSchema,
    onSubmit: (values) => {
      saveState(values)
    },
  })

  useEffect(() => {
    saveState(values)
  }, [values])

  const handleImageUpload = (file: File) => {
    setUploading(true)

    uploadArenaTeamImage(file, 1, UPLOADER_TYPE.TOURNAMENT, ACTION_TYPE.CREATE, (imageUrl) => {
      setUploading(false)
      setFieldValue('cover_image_url', imageUrl)
    })
  }

  return (
    <Box pb={9}>
      <Box pb={4}>
        <CoverUploader src={values.cover_image_url} onChange={handleImageUpload} isUploading={isUploading} />
      </Box>
      <Box pb={4}>
        <ESInput
          id="title"
          name="title"
          labelPrimary={t('common:tournament_create.name')}
          fullWidth
          value={values.title}
          onChange={handleChange}
          helperText={touched.title && errors.title}
          error={touched.title && !!errors.title}
          size="small"
          required
        />
      </Box>
      <Box pb={3 / 8}>
        <ESCheckbox
          disableRipple
          checked={values.has_prize}
          onChange={() => {
            setFieldValue('has_prize', !values.has_prize)
          }}
          label={t('common:tournament_create.has_prize')}
        />
      </Box>
      <Box pb={1}>
        <ESInput
          id="prize_amount"
          name="prize_amount"
          placeholder={t('common:tournament_create.prize_placeholder')}
          fullWidth
          value={values.prize_amount}
          onChange={handleChange}
          helperText={touched.prize_amount && errors.prize_amount}
          error={touched.prize_amount && !!errors.prize_amount}
          size="small"
        />
      </Box>
      <Box pb={4} display="flex" flexDirection="row" color={Colors.secondary}>
        <Icon className={`fa fa-exclamation-triangle ${classes.iconMargin}`} fontSize="small" />
        <Typography variant="body2">{t('common:tournament_create.hint')}</Typography>
      </Box>
      <Box pb={3}>
        <GameSelectorDialog
          values={values.game_title_id}
          onChange={(value) => {
            setFieldValue('game_title_id', value)
          }}
        />
      </Box>
      <Box pb={4}>
        <ESSelect
          className={classes.selectWidth}
          name="game_hardware_id"
          value={values.game_hardware_id}
          onChange={handleChange}
          label={t('common:tournament_create.game_hardware')}
          required={true}
          size="small"
        >
          <option disabled value={-1}>
            {t('common:please_select')}
          </option>
          {hardwares?.data.map((hardware, key) => (
            <option value={hardware.id} key={key}>
              {hardware.attributes.name}
            </option>
          ))}
        </ESSelect>
      </Box>
      <Box>
        <ESInput
          multiline
          rows={4}
          id="overview"
          name="overview"
          labelPrimary={t('common:tournament_create.overview')}
          placeholder={t('common:tournament_create.please_enter')}
          fullWidth
          value={values.overview}
          onChange={handleChange}
          helperText={touched.overview && errors.overview}
          error={touched.overview && !!errors.overview}
          size="small"
        />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  iconMargin: {
    marginRight: theme.spacing(1 / 2),
  },
  selectWidth: {
    width: 200,
  },
}))

export default StepOne
