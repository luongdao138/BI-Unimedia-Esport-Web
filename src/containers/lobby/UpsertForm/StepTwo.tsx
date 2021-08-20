import { makeStyles, Box, Theme, Typography } from '@material-ui/core'
import { GetPrefecturesResponse } from '@services/common.service'
import { FormType } from './FormModel/FormType'
import { FormikProps } from 'formik'
import { Colors } from '@theme/colors'
import { EditableTypes } from './useLobbyCreate'
import ESInputDatePicker from '@components/InputDatePicker'
import ESFastInput from '@components/FastInput'
import ESSelect from '@components/Select'
import i18n from '@locales/i18n'

type Props = {
  formik: FormikProps<FormType>
  prefectures: GetPrefecturesResponse
  editables: EditableTypes
}

const StepTwo: React.FC<Props> = ({ formik, prefectures, editables }) => {
  const classes = useStyles()

  return (
    <Box pb={9}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography>{i18n.t('common:lobby_create.entry_period')}</Typography>
        <Typography component="span" className={classes.required}>
          {i18n.t('common:common.required')}
        </Typography>
      </Box>
      <Box pb={4} display="flex" flexDirection="row" alignItems="flex-start" maxWidth={340}>
        <ESInputDatePicker
          name="stepTwo.entry_start_datetime"
          placeholder={i18n.t('common:lobby_create.start_date')}
          fullWidth
          multiline
          rows={2}
          value={formik.values.stepTwo.entry_start_datetime}
          onChange={(date) => formik.setFieldValue('stepTwo.entry_start_datetime', date.toString())}
          onBlur={formik.handleBlur}
          helperText={
            (formik.touched?.stepTwo?.entry_start_datetime && formik.errors?.stepTwo?.entry_start_datetime) ||
            formik.errors?.stepTwo?.recruit_date ||
            formik.errors?.stepTwo?.before_entry_end_date
          }
          error={formik.touched?.stepTwo?.entry_start_datetime && !!formik.errors?.stepTwo?.entry_start_datetime}
          disabled={!editables.entry_start_datetime}
        />
        <Box mt={2}>
          <span className={classes.dashes}>-</span>
        </Box>
        <ESInputDatePicker
          name="stepTwo.entry_end_datetime"
          placeholder={i18n.t('common:lobby_create.end_date')}
          fullWidth
          multiline
          rows={2}
          value={formik.values.stepTwo.entry_end_datetime}
          onChange={(date) => formik.setFieldValue('stepTwo.entry_end_datetime', date.toString())}
          onBlur={formik.handleBlur}
          helperText={
            (formik.touched?.stepTwo?.entry_end_datetime && formik.errors?.stepTwo?.entry_end_datetime) ||
            formik.errors?.stepTwo?.acceptance_dates ||
            formik.errors?.stepTwo?.acceptance_end_start_date
          }
          error={formik.touched?.stepTwo?.entry_end_datetime && !!formik.errors?.stepTwo?.entry_end_datetime}
          disabled={!editables.entry_end_datetime}
        />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography>{i18n.t('common:lobby_create.recruitment_start_date')}</Typography>
        <Typography component="span" className={classes.required}>
          {i18n.t('common:common.required')}
        </Typography>
      </Box>
      <Box pb={4} display="flex" flexDirection="row" alignItems="flex-start" maxWidth={158}>
        <ESInputDatePicker
          name="stepTwo.start_datetime"
          placeholder={i18n.t('common:lobby_create.start_date')}
          fullWidth
          multiline
          rows={2}
          value={formik.values.stepTwo.start_datetime}
          onChange={(date) => formik.setFieldValue('stepTwo.start_datetime', date.toString())}
          onBlur={formik.handleBlur}
          helperText={formik.touched?.stepTwo?.start_datetime && formik.errors?.stepTwo?.start_datetime}
          error={formik.touched?.stepTwo?.start_datetime && !!formik.errors?.stepTwo?.start_datetime}
          disabled={!editables.start_datetime}
        />
      </Box>
      <Box pb={1} width={200}>
        <ESSelect
          name="stepTwo.area_id"
          value={formik.values.stepTwo.area_id}
          onChange={formik.handleChange}
          label={i18n.t('common:lobby_create.area')}
          required={true}
          size="small"
          fullWidth
          disabled={!editables.area_id}
        >
          <option disabled value={-1}>
            {i18n.t('common:please_select')}
          </option>
          {prefectures?.data?.map((prefecture, index) => (
            <option value={prefecture.id} key={index}>
              {prefecture.attributes.area}
            </option>
          ))}
        </ESSelect>
      </Box>
      <Box>
        <ESFastInput
          multiline
          rows={5}
          name="stepTwo.address"
          fullWidth
          placeholder={i18n.t('common:lobby_create.area_name_placeholder')}
          value={formik.values.stepTwo.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={formik.touched?.stepTwo?.address && formik.errors?.stepTwo?.address}
          error={formik.touched?.stepTwo?.address && !!formik.errors?.stepTwo?.address}
          size="small"
          required
          disabled={!editables.address}
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
  required: {
    backgroundColor: Colors.primary,
    borderRadius: 2,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    height: 16,
    fontSize: 10,
    marginLeft: theme.spacing(1),
    color: Colors.white,
  },
}))

export default StepTwo
