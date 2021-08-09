import React from 'react'
import { useTranslation } from 'react-i18next'

import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import SettingsCompleted from '@components/SettingsCompleted'

const Step03: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common'])

  return (
    <SettingsCompleted 
      onClose={() => {router.push(ESRoutes.DELIVERY_MANAGEMENT)}}
      onComplete={() => {router.push(ESRoutes.DELIVERY_MANAGEMENT)}}
      titleNotification={t('common:delivery_reservation_tab.complete_delivery_settings')}
    >
    </SettingsCompleted>
  )
}

export default Step03
