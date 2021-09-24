import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import useReturnHref from '@utils/hooks/useReturnHref'
import userProfile from '@store/userProfile'
import { ESRoutes } from '@constants/route.constants'
import { createMetaSelector } from '@store/metadata/selectors'
import { clearMetaData } from '@store/metadata/actions'
import { useRouter } from 'next/router'
import { HomeSettingsParams } from '@services/user.service'
import { HOME_SETTINGS } from '@constants/common.constants'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

const { selectors, actions } = userProfile
const getUpdateHomeSettings = createMetaSelector(actions.updateHomeSettings)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useOrderData = () => {
  const { t } = useTranslation(['common'])
  const dispatch = useAppDispatch()
  const router = useRouter()

  const metaUpdateHomeSettings = useAppSelector(getUpdateHomeSettings)
  const userProfile = useAppSelector(selectors.getUserProfile)
  const homeSettings = userProfile ? userProfile.attributes.home_settings : []

  const updateHomeSettings = (param: HomeSettingsParams) => dispatch(actions.updateHomeSettings(param))
  const resetHomeSettings = () => dispatch(actions.clearHomeSettings())

  const [items, setItems] = useState([])

  const getSettingName = (id: string) => {
    switch (id) {
      case HOME_SETTINGS.RECOMMENDED_USER:
        return t('common:home.recommended_user')
      // case HOME_SETTINGS.RECOMMENDED_RECRUITMENT: //TODO skip 2.0
      //   return t('common:home.recommended_recruitment')
      // case HOME_SETTINGS.RECOMMENDED_EVENT: //TODO skip 2.0
      //   return t('common:home.recommended_event')
      case HOME_SETTINGS.LOBBY_FOLLOW: //TODO skip 2.0
        return t('common:home.recruitment_follow')
      case HOME_SETTINGS.TOURNAMENT_FOLLOW:
        return t('common:tournament.follower_entering')
      case HOME_SETTINGS.TOURNAMENT_RESULT:
        return t('common:tournament.follower_ended')
      case HOME_SETTINGS.TOPIC_FOLLOW:
        return t('common:home.topic_follow')
      default:
        return ''
    }
  }

  useEffect(() => {
    const newItems = _.map(homeSettings, function (id) {
      return { id: id, name: getSettingName(id) }
    })
    setItems(newItems)
  }, [userProfile])

  useEffect(() => {
    return () => {
      resetHomeSettings()
      dispatch(clearMetaData(actions.updateHomeSettings.typePrefix))
    }
  }, [])

  useEffect(() => {
    if (metaUpdateHomeSettings.loaded) {
      router.push(ESRoutes.HOME)
    }
  }, [metaUpdateHomeSettings.loaded])

  const { handleReturn } = useReturnHref()

  const handleCancel = () => handleReturn()

  const handleDone = () => {
    const newHomeSettings = _.map(items, function (item) {
      return item.id
    })
    updateHomeSettings({ home_settings: newHomeSettings })
  }

  return {
    items,
    handleCancel,
    handleDone,
    setItems,
  }
}

export default useOrderData
