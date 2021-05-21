import { useEffect } from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import ESInput from '@components/Input'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { useStore } from 'react-redux'
import { TournamentCreateParams } from '@services/tournament.service'
import { PARTICIPATION_TYPES, RULES } from '@constants/tournament.constants'

type FormProps = {
  rule: string
  t_type: string
  has_third_place: boolean
  participant_type: number
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
  const classes = useStyles()
  const validationSchema = Yup.object().shape({
    max_participants: Yup.number().min(1, t('common:common.error')).integer(t('common:common.integer')),
    terms_of_participation: Yup.string()
      .max(190, t('common:common.error'))
      .test('ng-check', 'ng word', (terms_of_participation) => CommonHelper.matchNgWords(store, terms_of_participation).length == 0),
    notes: Yup.string()
      .max(190, t('common:common.error'))
      .test('ng-check', 'ng word', (notes) => CommonHelper.matchNgWords(store, notes).length == 0),
    participant_type: Yup.number().min(1, t('common:common.error')).max(10, t('common:common.error')).integer(t('common:common.error')),
    rule: Yup.string().required(t('common:common.error')),
  })

  const { handleChange, values, errors, touched, setFieldValue } = useFormik<FormProps>({
    initialValues: {
      rule: data.rule,
      t_type: data.t_type,
      has_third_place: data.has_third_place,
      participant_type: data.participant_type,
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
          className={classes.selectWidth}
          name="rule"
          value={values.rule}
          onChange={(val) => setFieldValue('rule', !val ? 0 : val)}
          label={t('common:tournament_create.holding_format')}
          required={true}
          size="small"
        >
          {RULES.map((rule, index) => (
            <option key={index} value={rule.value}>
              {rule.label}
            </option>
          ))}
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
      <Box pb={4}>
        <ESSelect
          className={classes.selectWidth}
          name="t_type"
          value={TournamentHelper.getTypeValue(values.t_type)}
          onChange={handleChange}
          label={t('common:tournament_create.holding_format')}
          required={true}
          size="small"
        >
          <option value={0}>{t('common:tournament_create.public')}</option>
          <option value={1}>{t('common:tournament_create.private')}</option>
        </ESSelect>
      </Box>
      <Box pb={1}>
        <ESSelect
          className={classes.selectWidth}
          name="participant_type"
          value={values.participant_type}
          onChange={handleChange}
          label={t('common:tournament_create.participation')}
          required={true}
          size="small"
        >
          {PARTICIPATION_TYPES.map((type, index) => (
            <option value={type.value} key={index}>
              {type.label}
            </option>
          ))}
        </ESSelect>
      </Box>
      <Box pb={1} display="flex" flexDirection="row" alignItems="center" width={122}>
        <ESInput
          id="max_participants"
          type="number"
          className={classes.input}
          name="max_participants"
          value={values.max_participants === 0 ? '' : values.max_participants}
          onChange={handleChange}
          helperText={touched.max_participants && errors.max_participants}
          error={touched.max_participants && !!errors.max_participants}
          size="small"
        />
        <Box pl={1}>
          <Typography>{t('common:common.man')}</Typography>
        </Box>
      </Box>
      <Box pb={4}>
        <ESInput
          multiline
          rows={4}
          id="terms_of_participation"
          name="terms_of_participation"
          placeholder={t('common:tournament_create.participation_term')}
          fullWidth
          value={values.terms_of_participation}
          onChange={handleChange}
          helperText={touched.terms_of_participation && errors.terms_of_participation}
          error={touched.terms_of_participation && !!errors.terms_of_participation}
          size="small"
        />
      </Box>
      <Box pb={1}>
        <ESInput
          multiline
          rows={4}
          id="notes"
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
      </Box>
      <ESCheckbox
        disableRipple
        checked={values.retain_history}
        onChange={() => {
          setFieldValue('retain_history', !values.retain_history)
        }}
        label={t('common:tournament_create.retain_history')}
      />
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  selectWidth: {
    width: 200,
  },
  input: {
    textAlign: 'right',
  },
}))

export default StepTwo
