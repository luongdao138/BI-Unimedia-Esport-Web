import { useEffect } from 'react'
import { makeStyles, Box, Theme } from '@material-ui/core'
import ESInput from '@components/Input'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useStore } from 'react-redux'
import { TournamentCreateParams } from '@services/tournament.service'
import ESSelect from '@components/Select'

type FormProps = {
  acceptance_start_date: string
  acceptance_end_date: string
  start_date: string
  end_date: string
  area_id: number
  area_name: string
}

type Props = {
  data: TournamentCreateParams
  saveState: (data: FormProps) => void
}

const StepThree: React.FC<Props> = ({ data, saveState }) => {
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

  const { handleChange, values, errors, touched } = useFormik<FormProps>({
    initialValues: {
      acceptance_start_date: data.acceptance_start_date,
      acceptance_end_date: data.acceptance_end_date,
      start_date: data.start_date,
      end_date: data.end_date,
      area_id: data.area_id,
      area_name: data.area_name,
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
      <Box pb={4} display="flex" flexDirection="row" alignItems="flex-end">
        <ESInput
          name="acceptance_start_date"
          labelPrimary={t('common:tournament_create.entry_period')}
          placeholder={t('common:tournament_create.start_date')}
          fullWidth
          value={values.acceptance_start_date}
          onChange={handleChange}
          helperText={touched.acceptance_start_date && errors.acceptance_start_date}
          error={touched.acceptance_start_date && !!errors.acceptance_start_date}
          size="small"
          required
        />
        <Box>
          <span className={classes.dashes}>-</span>
        </Box>
        <ESInput
          name="acceptance_end_date"
          fullWidth
          placeholder={t('common:tournament_create.end_date')}
          value={values.acceptance_end_date}
          onChange={handleChange}
          helperText={touched.acceptance_end_date && errors.acceptance_end_date}
          error={touched.acceptance_end_date && !!errors.acceptance_end_date}
          size="small"
          required
        />
      </Box>
      <Box pb={4} display="flex" flexDirection="row" alignItems="flex-end">
        <ESInput
          name="start_date"
          labelPrimary={t('common:tournament_create.holding_period')}
          placeholder={t('common:tournament_create.start_date')}
          fullWidth
          value={values.start_date}
          onChange={handleChange}
          helperText={touched.start_date && errors.start_date}
          error={touched.start_date && !!errors.start_date}
          size="small"
          required
        />
        <Box>
          <span className={classes.dashes}>-</span>
        </Box>
        <ESInput
          name="end_date"
          fullWidth
          placeholder={t('common:tournament_create.end_date')}
          value={values.end_date}
          onChange={handleChange}
          helperText={touched.end_date && errors.end_date}
          error={touched.end_date && !!errors.end_date}
          size="small"
          required
        />
      </Box>
      <Box pb={1}>
        <ESSelect
          name="area_id"
          value={values.area_id}
          onChange={handleChange}
          label={t('common:tournament_create.area')}
          required={true}
          size="small"
        >
          <option value="" disabled>
            プルダウン
          </option>
        </ESSelect>
      </Box>
      <Box>
        <ESInput
          name="area_name"
          fullWidth
          placeholder={t('common:tournament_create.area_name')}
          value={values.area_name}
          onChange={handleChange}
          helperText={touched.area_name && errors.area_name}
          error={touched.area_name && !!errors.area_name}
          size="small"
          required
        />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  dashes: {
    fontSize: 26,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}))

export default StepThree
