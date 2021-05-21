import HeaderWithButton from '@components/HeaderWithButton'
import { useTranslation } from 'react-i18next'
import SettingsRowItem from '@components/SettingsRowItem'
import useNotificationSettings from './useNotificationSettings'

const ESNotificationSettings = () => {
  const { t } = useTranslation('common')
  const { notificationSettings } = useNotificationSettings()

  // const handleChange = () => {
  //
  // }

  return (
    <div>
      <HeaderWithButton title={t('notification_settings.title')} />
      <SettingsRowItem
        key="settings_select_all"
        title={t('notification_settings.settings_select_all')}
        name="settings_select_all"
        showSwitch={true}
      />
      {notificationSettings.map((settings, i) => (
        <SettingsRowItem
          key={i}
          title={settings.attributes.name}
          checked={settings.attributes.status}
          // handleChange={handleChange}
          name={settings.attributes.name}
          showSwitch={true}
        />
      ))}
    </div>
  )
}

export default ESNotificationSettings
