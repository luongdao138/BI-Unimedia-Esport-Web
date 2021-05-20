import { useEffect } from 'react'
import { Box } from '@material-ui/core'
import ESInput from '@components/Input'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useStore } from 'react-redux'
import { TournamentCreateParams } from '@services/tournament.service'

type FormProps = {
  title: string
  has_third_place: boolean
  address: string
  max_participants: number
  terms_of_participation: string
  notes: string
  retain_history: boolean
}

type Props = {
  data: TournamentCreateParams
  saveState: (data: FormProps) => void
}

const StepTwo: React.FC<Props> = ({ data, saveState }) => {
  const { t } = useTranslation(['common'])
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
      has_third_place: data.has_third_place,
      address: data.address,
      max_participants: data.max_participants,
      terms_of_participation: data.terms_of_participation,
      notes: data.notes,
      retain_history: data.retain_history,
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
      <Box pb={1}>
        <ESSelect
          fullWidth
          name="title"
          value={values.title}
          onChange={handleChange}
          label={t('common:tournament_create.holding_format')}
          required={true}
          size="small"
        >
          <option value="" disabled>
            プルダウン
          </option>
        </ESSelect>
      </Box>
      <Box pb={4}>
        <ESCheckbox
          disableRipple
          checked={values.has_third_place}
          onChange={() => {
            setFieldValue('has_prize', !values.has_third_place)
          }}
          label={t('common:tournament_create.has_third_place')}
        />
      </Box>
      <Box pb={1}>
        <ESSelect
          fullWidth
          name="address"
          value={values.address}
          onChange={handleChange}
          label={t('common:tournament_create.participation')}
          required={true}
          size="small"
        >
          <option value="" disabled>
            プルダウン
          </option>
        </ESSelect>
      </Box>
      <Box pb={1}>
        <ESInput
          type="number"
          name="max_participants"
          value={values.max_participants}
          onChange={handleChange}
          helperText={touched.max_participants && errors.max_participants}
          error={touched.max_participants && !!errors.max_participants}
          size="small"
        />
      </Box>
      <Box pb={4}>
        <ESInput
          multiline
          rows={4}
          name="participation_term"
          placeholder={t('common:tournament_create.participation_term')}
          fullWidth
          value={values.terms_of_participation}
          onChange={handleChange}
          helperText={touched.terms_of_participation && errors.terms_of_participation}
          error={touched.terms_of_participation && !!errors.terms_of_participation}
          size="small"
        />
      </Box>
      <Box>
        <ESInput
          multiline
          rows={4}
          name="notes"
          labelPrimary={t('common:tournament_create.precautions')}
          placeholder={t('common:tournament_create.please_enter')}
          fullWidth
          value={values.notes}
          onChange={handleChange}
          helperText={touched.notes && errors.notes}
          error={touched.notes && !!errors.notes}
          size="small"
        />
        <ESCheckbox
          disableRipple
          checked={values.retain_history}
          onChange={() => {
            setFieldValue('retain_history', !values.retain_history)
          }}
          label={t('common:tournament_create.retain_history')}
        />
      </Box>
    </Box>
  )
}

export default StepTwo
