import { useEffect } from 'react'
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
}

const StepOne: React.FC<Props> = ({ data, saveState }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const store = useStore()
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required(t('common:common.error'))
      .max(50, t('common:common.too_long'))
      .min(2, t('common:common.at_least'))
      .test('user_code', 'match_ng_word', function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
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

  return (
    <Box pb={9}>
      <Box pb={4}>
        <ESInput
          id="title"
          name="title"
          autoFocus
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
          style={{ width: 200 }}
          name="game_hardware_id"
          value={values.game_hardware_id}
          onChange={handleChange}
          label={t('common:tournament_create.game_hardware')}
          required={true}
          size="small"
        >
          <option disabled value={-1}>
            プルダウン
          </option>
        </ESSelect>
      </Box>
      <Box>
        <ESInput
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
}))

export default StepOne
