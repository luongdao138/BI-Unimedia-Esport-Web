import MainLayout from '@layouts/MainLayout'
import PageWithLayoutType from '@constants/page'
import HeaderWithButton from '@components/HeaderWithButton'
import { useTranslation } from 'react-i18next'
import SettingsRowItem from '@components/SettingsRowItem'
import { Box } from '@material-ui/core'

const NotificationSettingsPage: PageWithLayoutType = () => {
  const { t } = useTranslation('common')
  return (
    <div>
      <HeaderWithButton title={t('notification_settings.title')} />
      <Box>
        <SettingsRowItem
          key="settings_select_all"
          title={t('notification_settings.settings_select_all')}
          name="settings_select_all"
          showSwitch={true}
        />
      </Box>
      <Box>
        <SettingsRowItem key="follow" title={t('notification_settings.follow')} name="follow" showSwitch={true} />
      </Box>
      <Box>
        <SettingsRowItem
          key="receive_message"
          title={t('notification_settings.receive_message')}
          name="receive_message"
          showSwitch={true}
        />
      </Box>
      <Box>
        <SettingsRowItem
          key="reply_to_comment"
          title={t('notification_settings.reply_to_comment')}
          name="reply_to_comment"
          showSwitch={true}
        />
      </Box>
      <Box>
        <SettingsRowItem
          key="reply_to_comment_community"
          title={t('notification_settings.reply_to_comment_community')}
          name="reply_to_comment_community"
          showSwitch={true}
        />
      </Box>
      <Box>
        <SettingsRowItem
          key="system_notification_community"
          title={t('notification_settings.system_notification_community')}
          name="system_notification_community"
          showSwitch={true}
        />
      </Box>
      <Box>
        <SettingsRowItem
          key="system_notification_tournament"
          title={t('notification_settings.system_notification_tournament')}
          name="system_notification_tournament"
          showSwitch={true}
        />
      </Box>
      <Box>
        <SettingsRowItem
          key="system_notification_recruitment"
          title={t('notification_settings.system_notification_recruitment')}
          name="system_notification_recruitment"
          showSwitch={true}
        />
      </Box>
      <Box>
        <SettingsRowItem
          key="system_notification"
          title={t('notification_settings.system_notification')}
          name="system_notification"
          showSwitch={true}
        />
      </Box>
    </div>
  )
}

NotificationSettingsPage.Layout = MainLayout

export default NotificationSettingsPage
