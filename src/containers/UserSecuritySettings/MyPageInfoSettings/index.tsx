import { Box, makeStyles } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import SettingsRowItem from '@components/SettingsRowItem'
import HeaderWithButton from '@components/HeaderWithButton'
import useMyPageSettings from './useMyPageSettings'
import React, { useEffect, useState } from 'react'
import ESLoader from '@components/Loader'

const ESMyPageInfoSettings: React.FC = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const { fetchMeta, securitySettings, updateSecuritySettings } = useMyPageSettings()
  const [isRemote, setIsRemote] = useState<boolean>(false)

  const [state, setState] = useState({
    show_tournament_history: false,
    show_activity_logs: false,
    show_about: false,
  })

  useEffect(() => {
    if (securitySettings) {
      setIsRemote(true)
      setState(securitySettings)
    }
  }, [securitySettings])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked })
  }

  useEffect(() => {
    if (isRemote) {
      updateSecuritySettings(state)
    }
  }, [state])

  useEffect(() => {
    return () => {
      setState(securitySettings)
    }
  }, [])

  return (
    <div>
      <HeaderWithButton title={t('my_page_settings.title')} />
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

export default ESMyPageInfoSettings
