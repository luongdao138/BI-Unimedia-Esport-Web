import { makeStyles, Box, Theme, Typography } from '@material-ui/core'
import ESInput from '@components/Input'
import { useTranslation } from 'react-i18next'
import ESSelect from '@components/Select'
import { GetPrefecturesResponse } from '@services/common.service'
import { FormType } from './FormModel/FormType'
import { FormikProps } from 'formik'
import ESInputDatePicker from '@components/InputDatePicker'
import { Colors } from '@theme/colors'

type Props = {
  formik: FormikProps<FormType>
  prefectures: GetPrefecturesResponse
}

const StepThree: React.FC<Props> = ({ formik, prefectures }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  return (
    <Box pb={9}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography>{t('common:tournament_create.entry_period')}</Typography>
        <Typography component="span" className={classes.required}>
          {t('common:common.required')}
        </Typography>
      </Box>
      <Box pb={4} display="flex" flexDirection="row" alignItems="flex-start">
        <ESInputDatePicker
          name="stepThree.acceptance_start_date"
          placeholder={t('common:tournament_create.start_date')}
          fullWidth
          value={formik.values.stepThree.acceptance_start_date}
          onChange={(date) => formik.setFieldValue('stepThree.acceptance_start_date', date.toString())}
          onBlur={formik.handleBlur}
          helperText={
            (formik.touched?.stepThree?.acceptance_start_date && formik.errors?.stepThree?.acceptance_start_date) ||
            formik.errors?.stepThree?.recruit_date
          }
          error={formik.touched?.stepThree?.acceptance_start_date && !!formik.errors?.stepThree?.acceptance_start_date}
        />
        <Box mt={1}>
          <span className={classes.dashes}>-</span>
        </Box>
        <ESInputDatePicker
          name="stepThree.acceptance_end_date"
          placeholder={t('common:tournament_create.end_date')}
          fullWidth
          value={formik.values.stepThree.acceptance_end_date}
          onChange={(date) => formik.setFieldValue('stepThree.acceptance_end_date', date.toString())}
          onBlur={formik.handleBlur}
          helperText={
            (formik.touched?.stepThree?.acceptance_end_date && formik.errors?.stepThree?.acceptance_end_date) ||
            formik.errors?.stepThree?.acceptance_dates
          }
          error={formik.touched?.stepThree?.acceptance_end_date && !!formik.errors?.stepThree?.acceptance_end_date}
        />
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography>{t('common:tournament_create.holding_period')}</Typography>
        <Typography component="span" className={classes.required}>
          {t('common:common.required')}
        </Typography>
      </Box>
      <Box pb={4} display="flex" flexDirection="row" alignItems="flex-start">
        <ESInputDatePicker
          name="stepThree.start_date"
          placeholder={t('common:tournament_create.start_date')}
          fullWidth
          value={formik.values.stepThree.start_date}
          onChange={(date) => formik.setFieldValue('stepThree.start_date', date.toString())}
          onBlur={formik.handleBlur}
          helperText={
            (formik.touched?.stepThree?.start_date && formik.errors?.stepThree?.start_date) ||
            formik.errors?.stepThree?.acceptance_end_start_date
          }
          error={formik.touched?.stepThree?.start_date && !!formik.errors?.stepThree?.start_date}
        />
        <Box mt={1}>
          <span className={classes.dashes}>-</span>
        </Box>
        <ESInputDatePicker
          name="stepThree.end_date"
          placeholder={t('common:tournament_create.end_date')}
          fullWidth
          value={formik.values.stepThree.end_date}
          onChange={(date) => formik.setFieldValue('stepThree.end_date', date.toString())}
          onBlur={formik.handleBlur}
          helperText={
            (formik.touched?.stepThree?.end_date && formik.errors?.stepThree?.end_date) || formik.errors?.stepThree?.start_end_date
          }
          error={formik.touched?.stepThree?.end_date && !!formik.errors?.stepThree?.end_date}
        />
      </Box>
      <Box pb={1}>
        <ESSelect
          name="stepThree.area_id"
          value={formik.values.stepThree.area_id}
          onChange={formik.handleChange}
          label={t('common:tournament_create.area')}
          required={true}
          size="small"
        >
          {prefectures?.data?.map((prefecture, index) => (
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
          name="stepThree.area_name"
          fullWidth
          placeholder={t('common:tournament_create.area_name')}
          value={formik.values.stepThree.area_name}
          onChange={formik.handleChange}
          helperText={formik.touched?.stepThree?.area_name && formik.errors?.stepThree?.area_name}
          error={formik.touched?.stepThree?.area_name && !!formik.errors?.stepThree?.area_name}
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
  required: {
    backgroundColor: Colors.primary,
    borderRadius: 2,
    paddingLeft: theme.spacing(1 / 2),
    paddingRight: theme.spacing(1 / 2),
    height: 16,
    fontSize: 10,
    marginLeft: theme.spacing(1),
    color: Colors.white,
  },
}))

export default StepThree
