import HeaderWithButton from '@components/HeaderWithButton'
import { useTranslation } from 'react-i18next'
import SettingsRowItem from '@components/SettingsRowItem'
import useNotificationSettings from './useNotificationSettings'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import ESLoader from '@components/FullScreenLoader'

const ESNotificationSettings = () => {
  const { t } = useTranslation('common')
  const { notificationSettings, updateNotificationSettings, meta } = useNotificationSettings()

  const [state, setState] = useState<{ id: number; name: string; status: boolean }[]>([])
  const [checkAll, setCheckAll] = useState(false)

  useEffect(() => {
    if (notificationSettings && notificationSettings.length) {
      setState(notificationSettings)
      if (_.some(notificationSettings, ['status', false])) {
        setCheckAll(false)
      } else {
        setCheckAll(true)
      }
    }
  }, [notificationSettings])

  useEffect(() => {
    if (_.every(state, ['status', false])) {
      setCheckAll(false)
    } else if (_.every(state, ['status', true])) {
      setCheckAll(true)
    }
  }, [state])

  const handleChange = (index: number) => {
    const tmp = state.map((s, i) => {
      if (i === index) {
        return {
          id: s.id,
          name: s.name,
          status: !state[i].status,
        }
      }
      return s
    })
    setState(tmp)
  }

  const handleCheckAll = () => {
    setCheckAll(!checkAll)
    const tmp = state.map((s) => {
      return {
        id: s.id,
        name: s.name,
        status: !checkAll,
      }
    })
    setState(tmp)
  }

  useEffect(() => {
    const updateSettingsParam = { ntypes: state }
    updateNotificationSettings(updateSettingsParam)
  }, [state])

  return (
    <div>
      <HeaderWithButton title={t('notification_settings.title')} />
      {state.length > 0 && (
        <SettingsRowItem
          title={t('notification_settings.settings_select_all')}
          name="settings_select_all"
          showSwitch={true}
          checked={checkAll}
          handleChange={handleCheckAll}
        />
      )}
      {state.map((settings, i) => (
        <SettingsRowItem
          key={i}
          title={settings.name}
          checked={settings.status}
          handleChange={() => handleChange(i)}
          name={settings.name}
          showSwitch={true}
        />
      ))}
      {meta.pending && <ESLoader open={meta.pending} />}
    </div>
  )
}

export default ESNotificationSettings
