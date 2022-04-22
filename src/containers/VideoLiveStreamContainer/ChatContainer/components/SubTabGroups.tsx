import TabsGroup from '@components/TabsGroup'
import { SUB_TABS } from '@constants/common.constants'
import { useVideoTabContext } from '@containers/VideoLiveStreamContainer/VideoContext/VideTabContext'
import i18n from '@locales/i18n'
import React, { useEffect, useState } from 'react'

interface Props {
  successGetListMessTip: boolean
  isSwitchingSubTabRef: any
  successGetListMess: boolean
}

const SubTabGroups: React.FC<Props> = ({ successGetListMess, successGetListMessTip, isSwitchingSubTabRef }) => {
  const { setActiveSubTab } = useVideoTabContext()
  const [value, setValue] = useState(SUB_TABS.MESS.ALL)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isSwitchingSubTabRef.current = value === SUB_TABS.MESS.TIP
      setActiveSubTab(value)
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value])

  return (
    <TabsGroup
      data={[
        {
          value: SUB_TABS.MESS.ALL,
          label: i18n.t('common:live_stream_screen.all_mess_tab_title'),
        },
        {
          value: SUB_TABS.MESS.TIP,
          label: i18n.t('common:live_stream_screen.tip_mess_tab_title'),
        },
      ]}
      value={value}
      onClick={(v) => {
        if (successGetListMessTip && successGetListMess) {
          if (isSwitchingSubTabRef) {
            isSwitchingSubTabRef.current = v === SUB_TABS.MESS.TIP
          }
          setValue(v)
        }
      }}
    ></TabsGroup>
  )
}

export default SubTabGroups
