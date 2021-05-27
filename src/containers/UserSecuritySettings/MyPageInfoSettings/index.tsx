import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import SettingsRowItem from '@components/SettingsRowItem'
import HeaderWithButton from '@components/HeaderWithButton'
import useMyPageSettings from './useMyPageSettings'
import { useEffect, useState } from 'react'
import ESLoader from '@components/Loader'
import _ from 'lodash'

const ESMyPageInfoSettings: React.FC = () => {
  const { t } = useTranslation('common')
  const { fetchMeta, securitySettings, updateSecuritySettings } = useMyPageSettings()

  const [state, setState] = useState({
    show_tournament_history: false,
    show_activity_logs: false,
    show_about: false,
  })

  useEffect(() => {
    if (securitySettings) {
      setState(securitySettings)
    }
  }, [securitySettings])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  useEffect(() => {
    if (securitySettings) {
      if (!_.isEqual(securitySettings, state)) {
        updateSecuritySettings(state)
      }
    }
  }, [state.show_tournament_history, state.show_activity_logs, state.show_about])

  return (
    <div>
      <HeaderWithButton title={t('my_page_settings.title')} />
      {fetchMeta.pending && <ESLoader />}

      <Box>
        <SettingsRowItem
          key="show_tournament_history"
          title={t('my_page_settings.tournament_title')}
          checked={state.show_tournament_history}
          handleChange={handleChange}
          name="show_tournament_history"
          showSwitch={true}
        />
        <SettingsRowItem
          key="show_activity_logs"
          title={t('my_page_settings.activity_title')}
          checked={state.show_activity_logs}
          handleChange={handleChange}
          name="show_activity_logs"
          showSwitch={true}
        />
        <SettingsRowItem
          key="show_about"
          title={t('my_page_settings.profile_title')}
          checked={state.show_about}
          handleChange={handleChange}
          name="show_about"
          showSwitch={true}
        />
      </Box>
    </div>
  )
}

export default ESMyPageInfoSettings
