import { Box, makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import SettingsRowItem from '@components/SettingsRowItem'
import HeaderWithButton from '@components/HeaderWithButton'
import useMessageSettings from './useMessageSettings'
import React, { useEffect, useState } from 'react'
import ESLoader from '@components/Loader'

const ESMessageSettings: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const { fetchMeta, messageSettings, updateMessageSettings } = useMessageSettings()
  const [isRemote, setIsRemote] = useState<boolean>(false)

  const [state, setState] = useState({
    allow_groups_from_strangers: false,
    allow_messages_from_strangers: false,
  })

  useEffect(() => {
    if (messageSettings) {
      setIsRemote(true)
      setState(messageSettings)
    }
  }, [messageSettings])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  useEffect(() => {
    if (isRemote) {
      updateMessageSettings(state)
    }
  }, [state])

  useEffect(() => {
    return () => {
      setState(messageSettings)
    }
  }, [])

  return (
    <div>
      <HeaderWithButton title={t('message_settings.title')} />
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
      {fetchMeta.pending && (
        <div className={classes.loaderCenter}>
          <ESLoader />
        </div>
      )}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  loaderCenter: {
    marginTop: theme.spacing(1),
    width: '100%',
    textAlign: 'center',
  },
}))

export default ESMessageSettings
