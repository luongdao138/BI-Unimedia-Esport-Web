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
        <Typography>{i18n.t('common:lobby_create.holding_period')}</Typography>
        <Typography component="span" className={classes.required}>
          {i18n.t('common:common.required')}
        </Typography>
      </Box>
      <Box pb={4} display="flex" flexDirection="row" alignItems="flex-start" maxWidth={340}>
        <ESInputDatePicker
          name="stepTwo.start_date"
          placeholder={i18n.t('common:lobby_create.start_date')}
          fullWidth
          multiline
          rows={2}
          value={formik.values.stepTwo.start_date}
          onChange={(date) => formik.setFieldValue('stepTwo.start_date', date.toString())}
          onBlur={formik.handleBlur}
          helperText={formik.touched?.stepTwo?.start_date && formik.errors?.stepTwo?.start_date}
          error={formik.touched?.stepTwo?.start_date && !!formik.errors?.stepTwo?.start_date}
          disabled={!editables.start_date}
        />
        <Box mt={2}>
          <span className={classes.dashes}>-</span>
        </Box>
        <ESInputDatePicker
          name="stepTwo.end_date"
          placeholder={i18n.t('common:lobby_create.end_date')}
          fullWidth
          multiline
          rows={2}
          value={formik.values.stepTwo.end_date}
          onChange={(date) => formik.setFieldValue('stepTwo.end_date', date.toString())}
          onBlur={formik.handleBlur}
          helperText={(formik.touched?.stepTwo?.end_date && formik.errors?.stepTwo?.end_date) || formik.errors?.stepTwo?.start_end_date}
          error={formik.touched?.stepTwo?.end_date && !!formik.errors?.stepTwo?.end_date}
          disabled={!editables.end_date}
        />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography>{i18n.t('common:lobby_create.entry_period')}</Typography>
        <Typography component="span" className={classes.required}>
          {i18n.t('common:common.required')}
        </Typography>
      </Box>
      <Box pb={4} display="flex" flexDirection="row" alignItems="flex-start" maxWidth={158}>
        <ESInputDatePicker
          name="stepTwo.acceptance_start_date"
          placeholder={i18n.t('common:lobby_create.start_date')}
          fullWidth
          multiline
          rows={2}
          value={formik.values.stepTwo.acceptance_start_date}
          onChange={(date) => formik.setFieldValue('stepTwo.acceptance_start_date', date.toString())}
          onBlur={formik.handleBlur}
          helperText={
            (formik.touched?.stepTwo?.acceptance_start_date && formik.errors?.stepTwo?.acceptance_start_date) ||
            formik.errors?.stepTwo?.acceptance_dates ||
            formik.errors?.stepTwo?.recruit_date
          }
          error={formik.touched?.stepTwo?.acceptance_start_date && !!formik.errors?.stepTwo?.acceptance_start_date}
          disabled={!editables.acceptance_start_date}
        />

        {/* <Box mt={2}>
          <span className={classes.dashes}>-</span>
        </Box>
        <ESInputDatePicker
          name="stepThree.acceptance_end_date"
          placeholder={i18n.t('common:tournament_create.end_date')}
          fullWidth
          multiline
          rows={2}
          value={formik.values.stepThree.acceptance_end_date}
          onChange={(date) => formik.setFieldValue('stepThree.acceptance_end_date', date.toString())}
          onBlur={formik.handleBlur}
          helperText={
            (formik.touched?.stepThree?.acceptance_end_date && formik.errors?.stepThree?.acceptance_end_date) ||
            formik.errors?.stepThree?.acceptance_end_start_date
          }
          error={formik.touched?.stepThree?.acceptance_end_date && !!formik.errors?.stepThree?.acceptance_end_date}
          disabled={!editables.acceptance_end_date}
        /> */}
      </Box>
      <Box pb={1} width={200}>
        <ESSelect
          name="stepTwo.area_id"
          value={formik.values.stepTwo.area_id}
          onChange={formik.handleChange}
          label={i18n.t('common:tournament_create.area')}
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
          name="stepThree.address"
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
