import MainTopic from '@containers/Community/TopicDetail/Partials/MainTopic'
import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import ESInput from '@components/Input'
import ESLabel from '@components/Label'
import { FormType } from './FormModel/FormType'
import { Box } from '@material-ui/core'
import { GetPrefecturesResponse } from '@services/common.service'
import { useAppSelector } from '@store/hooks'
import { getAuth } from '@store/auth/selectors'

interface ConfirmProps {
  values: FormikProps<FormType>['values']
  prefectures?: GetPrefecturesResponse['data']
}

ESInput.defaultProps = {
  size: 'small',
}

const Confirm: React.FC<ConfirmProps> = ({ values }) => {
  const { t } = useTranslation(['common'])
  const user = useAppSelector(getAuth)

  return (
    <Box pb={9}>
      <Box pb={4} />
      <Box>
        <ESInput labelPrimary={t('common:topic_create.name')} value={values.stepOne.title} fullWidth disabled />
      </Box>
      <Box pb={2} />
      <Box>
        <ESLabel label={t('common:topic_create.preview')} bold={false} size="small" />
      </Box>

      <Box>
        <MainTopic
          nickname={user.nickname}
          user_code={user.email}
          description={values.stepOne.content}
          image={values.stepOne.attachments}
          user_avatar={user.avatar_url}
          isConfirm
        />
      </Box>
      <Box pb={2} />
    </Box>
  )
}

export default Confirm
