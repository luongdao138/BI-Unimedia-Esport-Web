import { Box, makeStyles, Typography } from '@material-ui/core'
import ESInput from '@components/Input'
import ESSelect from '@components/Select'
import ESCheckbox from '@components/Checkbox'
import { useTranslation } from 'react-i18next'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { PARTICIPATION_TYPES, RULES, T_TYPES } from '@constants/tournament.constants'
import { FormType } from './FormModel/FormType'
import { FormikProps } from 'formik'
import { EditableTypes } from './useTournamentCreate'

type Props = {
  formik: FormikProps<FormType>
  editables: EditableTypes
}

const StepTwo: React.FC<Props> = ({ formik, editables }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  return (
    <Box pb={9}>
      <Box pb={1}>
        <ESSelect
          className={classes.selectWidth}
          name="stepTwo.rule"
          value={formik.values.stepTwo.rule}
          onChange={formik.handleChange}
          label={t('common:tournament_create.holding_format')}
          required={true}
          size="small"
          disabled={!editables.rule}
        >
          <option disabled value={-1}>
            {t('common:please_select')}
          </option>
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
          checked={formik.values.stepTwo.has_third_place}
          onChange={() => formik.setFieldValue('stepTwo.has_third_place', !formik.values.stepTwo.has_third_place)}
          label={t('common:tournament_create.has_third_place')}
          disabled={!editables.has_third_place}
        />
      </Box>
      <Box pb={4}>
        <ESSelect
          className={classes.selectWidth}
          name="stepTwo.t_type"
          value={TournamentHelper.getTypeValue(formik.values.stepTwo.t_type)}
          onChange={(e) => formik.setFieldValue('stepTwo.t_type', TournamentHelper.getTypeEnum(e.target.value))}
          label={t('common:tournament_create.public_or_private')}
          required={true}
          size="small"
          disabled={!editables.t_type}
        >
          <option disabled value="-1">
            {t('common:please_select')}
          </option>
          {T_TYPES.map((type, index) => (
            <option key={type.value + index} value={type.value}>
              {type.label}
            </option>
          ))}
        </ESSelect>
      </Box>
      <Box pb={1}>
        <ESSelect
          className={classes.selectWidth}
          name="stepTwo.participant_type"
          value={formik.values.stepTwo.participant_type}
          onChange={formik.handleChange}
          label={t('common:tournament_create.participation')}
          required={true}
          size="small"
          disabled={!editables.participant_type}
        >
          <option disabled value={-1}>
            {t('common:please_select')}
          </option>
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
          name="stepTwo.max_participants"
          value={formik.values.stepTwo.max_participants === 0 ? '' : formik.values.stepTwo.max_participants}
          onChange={formik.handleChange}
          helperText={formik.touched?.stepTwo?.max_participants && formik.errors?.stepTwo?.max_participants}
          error={formik.touched?.stepTwo?.max_participants && !!formik.errors?.stepTwo?.max_participants}
          size="small"
          disabled={!editables.max_participants}
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
          name="stepTwo.terms_of_participation"
          placeholder={t('common:tournament_create.participation_term')}
          fullWidth
          value={formik.values.stepTwo.terms_of_participation}
          onChange={formik.handleChange}
          helperText={formik.touched?.stepTwo?.terms_of_participation && formik.errors?.stepTwo?.terms_of_participation}
          error={formik.touched?.stepTwo?.terms_of_participation && !!formik.errors?.stepTwo?.terms_of_participation}
          size="small"
          disabled={!editables.terms_of_participation}
        />
      </Box>
      <Box pb={1}>
        <ESInput
          multiline
          rows={4}
          id="notes"
          name="stepTwo.notes"
          labelPrimary={t('common:tournament_create.precautions')}
          placeholder={t('common:tournament_create.please_enter')}
          fullWidth
          value={formik.values.stepTwo.notes}
          onChange={formik.handleChange}
          helperText={formik.touched?.stepTwo?.notes && formik.errors?.stepTwo?.notes}
          error={formik.touched?.stepTwo?.notes && !!formik.errors?.stepTwo?.notes}
          size="small"
          disabled={!editables.notes}
        />
      </Box>
      <ESCheckbox
        disableRipple
        checked={formik.values.stepTwo.retain_history}
        onChange={() => formik.setFieldValue('stepTwo.retain_history', !formik.values.stepTwo.retain_history)}
        label={t('common:tournament_create.retain_history')}
        disabled={!editables.retain_history}
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
