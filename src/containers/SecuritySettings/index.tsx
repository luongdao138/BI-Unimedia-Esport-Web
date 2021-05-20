import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import SettingsRowItem from '@components/SettingsRowItem'
import HeaderWithButton from '@components/HeaderWithButton'
import useSecuritySettings from './useSecuritySettings'
import useUpdateSecuritySettings from './useUpdateSecuritySettings'
import { useEffect, useState } from 'react'

const ESSecuritySettings: React.FC = () => {
  const { t } = useTranslation('common')
  const { securitySettings, fetchSecuritySettings } = useSecuritySettings()
  const { updateSecuritySettings } = useUpdateSecuritySettings()

  useEffect(() => {
    fetchSecuritySettings()
  }, [])

  const [state, setState] = useState({
    show_tournament_history: securitySettings && securitySettings.data.attributes.show_tournament_history,
    show_activity_logs: securitySettings && securitySettings.data.attributes.show_activity_logs,
    show_about: securitySettings && securitySettings.data.attributes.show_about,
  })

  const handleChange = (e) => {
    setState({ ...state, [e.target.key]: e.target.checked })
    updateSecuritySettings(state)
  }

  return (
    <div>
      <HeaderWithButton title={t('user_security_settings.title')} />
      <Box>
        <SettingsRowItem
          key="tournament"
          title={t('user_security_settings.tournament_title')}
          checked={state.show_tournament_history}
          handleChange={handleChange}
          name="tournament"
          showSwitch={true}
        />
        <SettingsRowItem
          key="activity"
          title={t('user_security_settings.activity_title')}
          checked={state.show_activity_logs}
          handleChange={handleChange}
          name="activity"
          showSwitch={true}
        />
        <SettingsRowItem
          key="profile"
          title={t('user_security_settings.profile_title')}
          checked={state.show_about}
          handleChange={handleChange}
          name="profile"
          showSwitch={true}
        />
      </Box>
    </div>
  )
}

export default ESSecuritySettings
