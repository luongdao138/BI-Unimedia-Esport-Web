import { makeStyles, Typography, Box } from '@material-ui/core'
import ESInput from '@components/Input'
import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import CoOrganizersDialog from './Partials/CoOrganizersDialog'
import { Colors } from '@theme/colors'
import { UserLoginResponse } from '@services/auth.service'
import { FormType } from './FormModel/FormType'

type Props = {
  formik: FormikProps<FormType>
  user: UserLoginResponse
}

const StepFour: React.FC<Props> = ({ formik, user }) => {
  const { t } = useTranslation(['common'])
  const classes = useStyles()

  return (
    <Box pb={9}>
      <Box pb={4}>
        <Box pb={1}>
          <Typography className={classes.labelColor}>{t('common:tournament_create.organizer')}</Typography>
        </Box>
        <Typography className={classes.hintColor}>{user.nickname}</Typography>
      </Box>
      <Box pb={4}>
        <CoOrganizersDialog
          values={formik.values.stepFour.co_organizers}
          onChange={(value) => formik.setFieldValue('stepFour.co_organizers', value)}
        />
      </Box>
      <Box pb={4}>
        <ESInput
          id="organizer_name"
          name="stepFour.organizer_name"
          labelPrimary={t('common:tournament_create.organizer_name')}
          fullWidth
          value={formik.values.stepFour.organizer_name}
          onChange={formik.handleChange}
          helperText={formik.touched?.stepFour?.organizer_name && formik.errors?.stepFour?.organizer_name}
          error={formik.touched?.stepFour?.organizer_name && !!formik.errors?.stepFour?.organizer_name}
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
