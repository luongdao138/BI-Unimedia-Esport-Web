import { makeStyles, Typography, Box } from '@material-ui/core'
import { FormikProps } from 'formik'
import { Colors } from '@theme/colors'
import { UserLoginResponse } from '@services/auth.service'
import { FormType } from './FormModel/FormType'
import { EditableTypes } from './useTournamentCreate'
import CoOrganizersDialog from './Partials/CoOrganizersDialog'
import ESFastInput from '@components/FastInput'
import i18n from '@locales/i18n'

type Props = {
  formik: FormikProps<FormType>
  user: UserLoginResponse
  editables: EditableTypes
}

const StepFour: React.FC<Props> = ({ formik, user, editables }) => {
  const classes = useStyles()

  return (
    <Box pb={9}>
      <Box pb={4}>
        <Box pb={1}>
          <Typography className={classes.labelColor}>{i18n.t('common:tournament_create.organizer')}</Typography>
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
        <ESFastInput
          id="organizer_name"
          name="stepFour.organizer_name"
          labelPrimary={i18n.t('common:tournament_create.organizer_name')}
          fullWidth
          value={formik.values.stepFour.organizer_name}
          onChange={formik.handleChange}
          helperText={formik.touched?.stepFour?.organizer_name && formik.errors?.stepFour?.organizer_name}
          error={formik.touched?.stepFour?.organizer_name && !!formik.errors?.stepFour?.organizer_name}
          size="small"
          disabled={!editables.organizer_name}
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
