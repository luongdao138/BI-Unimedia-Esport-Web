import MainTopic from '@containers/Community/TopicDetail/Partials/MainTopic'
import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import ESInput from '@components/Input'
import ESLabel from '@components/Label'
import { FormType } from './FormModel/FormType'
import { makeStyles, Box, Theme } from '@material-ui/core'
import { GetPrefecturesResponse } from '@services/common.service'

interface ConfirmProps {
  values: FormikProps<FormType>['values']
  prefectures?: GetPrefecturesResponse['data']
}

ESInput.defaultProps = {
  size: 'small',
}

const Confirm: React.FC<ConfirmProps> = ({ values }) => {
  const { t } = useTranslation(['common'])

  const classes = useStyles()

  return (
    <Box pb={20} className={classes.viewHolder}>
      <Box pb={8} />
      <Box ml={3}>
        <ESInput labelPrimary={t('common:topic_create.name')} value={values.stepOne.title} fullWidth disabled />
      </Box>
      <Box pb={2} />
      <Box ml={3}>
        <ESLabel label={t('common:topic_create.preview')} bold={false} size="small" />
      </Box>

      <MainTopic
        username="コイチコイチコイチコイチコイチコイチコイチコイチコイチコイチ"
        mail="@koichi"
        discription={values.stepOne.overview}
        image={values.stepOne.cover_image_url}
        isConfirm
      />
      <Box pb={2} />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  viewHolder: {
    marginRight: 40,
    marginLeft: 40,
    width: 800,
    position: 'relative',
    left: -150,
  },

  [theme.breakpoints.down('sm')]: {
    viewHolder: {
      marginLeft: 0,
      marginRight: 0,
      width: 500,
      position: 'relative',
      left: 50,
    },
  },
}))

export default Confirm
