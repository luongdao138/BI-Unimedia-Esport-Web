import { Box, makeStyles } from '@material-ui/core'
import { TournamentHelper } from '@utils/helpers/TournamentHelper'
import { PARTICIPATION_TYPES, RULES } from '@constants/tournament.constants'
import { FormType } from './FormModel/FormType'
import { FormikProps } from 'formik'
import { EditableTypes } from './useTournamentCreate'
import ESFastInput from '@components/FastInput'
import ESCheckbox from '@components/Checkbox'
import ESSelect from '@components/Select'
import ESLabel from '@components/Label'
import i18n from '@locales/i18n'

type Props = {
  formik: FormikProps<FormType>
  editables: EditableTypes
}

const StepTwo: React.FC<Props> = ({ formik, editables }) => {
  const classes = useStyles()

  return (
    <Box pb={9}>
      <Box pb={1}>
        <ESSelect
          className={classes.selectWidth}
          name="stepTwo.rule"
          value={formik.values.stepTwo.rule}
          onChange={formik.handleChange}
          label={i18n.t('common:tournament_create.holding_format')}
          required={true}
          size="small"
          disabled={!editables.rule}
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
          checked={formik.values.stepTwo.has_third_place}
          onChange={() => formik.setFieldValue('stepTwo.has_third_place', !formik.values.stepTwo.has_third_place)}
          label={i18n.t('common:tournament_create.has_third_place')}
          disabled={!editables.has_third_place}
        />
      </Box>
      <Box pb={4}>
        <ESSelect
          className={classes.selectWidth}
          name="stepTwo.participant_type"
          value={formik.values.stepTwo.participant_type}
          onChange={formik.handleChange}
          label={i18n.t('common:tournament_create.participation')}
          required={true}
          size="small"
          disabled={!editables.participant_type}
        >
          {PARTICIPATION_TYPES.map((type, index) => (
            <option value={type.value} key={index}>
              {type.label}
            </option>
          ))}
        </ESSelect>
      </Box>
      <Box pb={4} display="flex" flexDirection="row" alignItems="center" width={122}>
        <ESFastInput
          id="max_participants"
          type="number"
          required={true}
          className={classes.input}
          labelPrimary={i18n.t('common:tournament_create.max_participants')}
          placeholder={i18n.t('common:tournament_create.max_participants_placeholder')}
          name="stepTwo.max_participants"
          value={formik.values.stepTwo.max_participants === 0 ? '' : formik.values.stepTwo.max_participants}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched?.stepTwo?.max_participants && formik.errors?.stepTwo?.max_participants}
          error={formik.touched?.stepTwo?.max_participants && !!formik.errors?.stepTwo?.max_participants}
          size="small"
          disabled={!editables.max_participants}
        />
      </Box>
      <Box pb={4}>
        <ESFastInput
          multiline
          rows={5}
          id="terms_of_participation"
          name="stepTwo.terms_of_participation"
          labelPrimary={i18n.t('common:tournament_create.participation_term')}
          placeholder={i18n.t('common:tournament_create.participation_term_placeholder')}
          fullWidth
          value={formik.values.stepTwo.terms_of_participation}
          onChange={formik.handleChange}
          helperText={formik.touched?.stepTwo?.terms_of_participation && formik.errors?.stepTwo?.terms_of_participation}
          error={formik.touched?.stepTwo?.terms_of_participation && !!formik.errors?.stepTwo?.terms_of_participation}
          size="small"
          disabled={!editables.terms_of_participation}
        />
      </Box>
      <Box pb={4}>
        <ESLabel label={i18n.t('common:tournament_create.public_or_private')} size="small" />
        <ESCheckbox
          disableRipple
          checked={TournamentHelper.getTypeValue(formik.values.stepTwo.t_type)}
          onChange={() => formik.setFieldValue('stepTwo.t_type', TournamentHelper.onTypeChange(formik.values.stepTwo.t_type))}
          label={i18n.t('common:profile.show')}
          disabled={!editables.retain_history}
        />
      </Box>
      <Box pb={1}>
        <ESFastInput
          multiline
          rows={5}
          id="notes"
          name="stepTwo.notes"
          labelPrimary={i18n.t('common:tournament_create.precautions')}
          placeholder={i18n.t('common:tournament_create.precautions_placeholder')}
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
        label={i18n.t('common:tournament_create.retain_history')}
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
