import { useEffect } from 'react'
import { makeStyles, Box, Theme } from '@material-ui/core'
import ESInput from '@components/Input'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { useStore } from 'react-redux'
import { TournamentCreateParams } from '@services/tournament.service'
import ESSelect from '@components/Select'
import { GetPrefecturesResponse } from '@services/common.service'
import moment from 'moment'

type FormProps = {
  acceptance_start_date: string
  acceptance_end_date: string
  start_date: string
  end_date: string
  area_id: number
  area_name: string
  acceptance_dates: string
  recruit_date: string
  acceptance_end_start_date: string
  start_end_date: string
}

type Props = {
  data: TournamentCreateParams
  saveState: (data: FormProps) => void
  prefectures: GetPrefecturesResponse
}

const StepThree: React.FC<Props> = ({ data, saveState, prefectures }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const store = useStore()

  let recruitMinDate = new Date()
  let recruitEndMinDate = new Date()
  if (!!data && !!data.status) {
    const beforeRecruit = TournamentHelper.checkStatus(data.status, 'recruiting')
    const beforeRecruitEnd = TournamentHelper.checkStatus(data.status, 'recruitment_closed')
    if (!beforeRecruit && data.acceptance_start_date) recruitMinDate = new Date(data.acceptance_start_date)
    if (!beforeRecruitEnd && data.acceptance_end_date) recruitEndMinDate = new Date(data.acceptance_end_date)
  }

  const validationSchema = Yup.object().shape({
    start_date: Yup.date().required(t('common:common.error')).min(new Date(), t('common:common.error')),
    end_date: Yup.date().required(t('common:common.error')).min(new Date(), t('common:common.error')),
    acceptance_start_date: Yup.date().required(t('common:common.error')).min(recruitMinDate, t('common:common.error')),
    acceptance_end_date: Yup.date().required(t('common:common.error')).min(recruitEndMinDate, t('common:common.error')),
    recruit_date: Yup.string().when(['acceptance_start_date'], {
      is: (acceptance_start_date) => {
        return acceptance_start_date && moment(acceptance_start_date) < moment(recruitMinDate)
      },
      then: Yup.string().required(t('common:common.validation.min_date')),
    }),
    acceptance_dates: Yup.string().when(['acceptance_start_date', 'acceptance_end_date'], {
      is: (acceptance_start_date, acceptance_end_date) => {
        return Date.parse(acceptance_start_date) >= Date.parse(acceptance_end_date)
      },
      then: Yup.string().required(t('common:common.validation.acceptance_dates')),
    }),
    acceptance_end_start_date: Yup.string().when(['acceptance_end_date', 'start_date'], {
      is: (acceptance_end_date, start_date) => {
        return Date.parse(acceptance_end_date) > Date.parse(start_date)
      },
      then: Yup.string().required(t('common:common.validation.acceptance_end_start_date')),
    }),
    start_end_date: Yup.string().when(['start_date', 'end_date'], {
      is: (start_date, end_date) => {
        return Date.parse(start_date) >= Date.parse(end_date)
      },
      then: Yup.string().required(t('common:common.validation.start_end_date')),
    }),
    address: Yup.string()
      .max(60, t('common:common.too_long'))
      .test('ng-check', 'ng word', (address) => CommonHelper.matchNgWords(store, address).length == 0),
  })

  const { handleChange, values, errors, touched } = useFormik<FormProps>({
    initialValues: {
      acceptance_start_date: data.acceptance_start_date,
      acceptance_end_date: data.acceptance_end_date,
      start_date: data.start_date,
      end_date: data.end_date,
      area_id: data.area_id,
      area_name: data.area_name,
      // for cross-fields validations
      acceptance_dates: '',
      recruit_date: '',
      acceptance_end_start_date: '',
      start_end_date: '',
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
          {prefectures?.data.map((prefecture, index) => (
            <option value={prefecture.id} key={index}>
              {prefecture.attributes.area}
            </option>
          ))}
        </ESSelect>
      </Box>
      <Box>
        <ESInput
          multiline
          rows={2}
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
