import { useEffect } from 'react'
import { makeStyles, Typography, Box } from '@material-ui/core'
import ESInput from '@components/Input'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useStore } from 'react-redux'
import { TournamentCreateParams } from '@services/tournament.service'
import CoOrganizersDialog from './Partials/CoOrganizersDialog'
import { Colors } from '@theme/colors'

type FormProps = {
  owner_id: number
  co_organizers: string[]
  organizer_name: string
}

type Props = {
  data: TournamentCreateParams
  saveState: (data: FormProps) => void
}

const StepFour: React.FC<Props> = ({ data, saveState }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()
  const store = useStore()
  const validationSchema = Yup.object().shape({
    organizer_name: Yup.string()
      .required(t('common:common.error'))
      .max(50, t('common:common.too_long'))
      .min(2, t('common:common.at_least'))
      .test('user_code', 'match_ng_word', function (value) {
        return CommonHelper.matchNgWords(store, value).length <= 0
      }),
  })

  const { handleChange, values, errors, touched, setFieldValue } = useFormik<FormProps>({
    initialValues: {
      owner_id: data.owner_id,
      co_organizers: data.co_organizers,
      organizer_name: data.organizer_name,
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
        <Box pb={1}>
          <Typography className={classes.labelColor}>{t('common:tournament_create.organizer')}</Typography>
        </Box>
        <Typography className={classes.hintColor}>わたなべ</Typography>
      </Box>
      <Box pb={4}>
        <CoOrganizersDialog
          value={values.co_organizers}
          onChange={(value) => {
            setFieldValue('co_organizers', value)
          }}
        />
      </Box>
      <Box pb={4}>
        <ESInput
          id="organizer_name"
          name="organizer_name"
          labelPrimary={t('common:tournament_create.organizer_name')}
          fullWidth
          value={values.organizer_name}
          onChange={handleChange}
          helperText={touched.organizer_name && errors.organizer_name}
          error={touched.organizer_name && !!errors.organizer_name}
          size="small"
        />
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  labelColor: {
    color: Colors.text[200],
  },
  hintColor: {
    color: Colors.text[300],
  },
}))

export default StepFour
