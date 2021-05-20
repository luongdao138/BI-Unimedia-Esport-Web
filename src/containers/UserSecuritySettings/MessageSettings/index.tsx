import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import SettingsRowItem from '@components/SettingsRowItem'
import HeaderWithButton from '@components/HeaderWithButton'
import useMessageSettings from './useMessageSettings'
import { useEffect, useState } from 'react'
import ESLoader from '@components/Loader'
import _ from 'lodash'

const ESMessageSettings: React.FC = () => {
  const { t } = useTranslation('common')
  const { fetchMeta, messageSettings, updateMessageSettings } = useMessageSettings()

  const [state, setState] = useState({
    allow_groups_from_strangers: false,
    allow_messages_from_strangers: false,
  })

  useEffect(() => {
    if (messageSettings) {
      setState(messageSettings)
    }
  }, [messageSettings])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  useEffect(() => {
    if (messageSettings) {
      if (!_.isEqual(messageSettings, state)) {
        updateMessageSettings(state)
      }
    }
  }, [state.allow_groups_from_strangers, state.allow_messages_from_strangers])

  return (
    <div>
      <HeaderWithButton title={t('message_settings.title')} />
      {fetchMeta.pending && <ESLoader />}

      <Box>
        <SettingsRowItem
          key="allow_messages_from_strangers"
          title={t('message_settings.receive_messages_from_anyone')}
          checked={state.allow_messages_from_strangers}
          handleChange={handleChange}
          name="allow_messages_from_strangers"
          showSwitch={true}
        />
        <SettingsRowItem
          key="allow_groups_from_strangers"
          title={t('message_settings.receive_invitations_from_anyone')}
          checked={state.allow_groups_from_strangers}
          handleChange={handleChange}
          name="allow_groups_from_strangers"
          showSwitch={true}
        />
      </Box>
    </div>
  )
}

export default ESMessageSettings
