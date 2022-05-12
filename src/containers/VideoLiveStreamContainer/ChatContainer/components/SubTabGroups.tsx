import TabsGroup from '@components/TabsGroup'
import { SUB_TABS } from '@constants/common.constants'
import { useVideoTabContext } from '@containers/VideoLiveStreamContainer/VideoContext/VideTabContext'
import i18n from '@locales/i18n'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  prevMessSubTabRef: any
  needLoadMessRef: any
}

const SubTabGroups: React.FC<Props> = ({prevMessSubTabRef, needLoadMessRef}) => {
  const { setActiveSubTab } = useVideoTabContext()
  const [value, setValue] = useState(prevMessSubTabRef.current)
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    const timeoutId = setTimeout(() => {
      // isSwitchingSubTabRef.current = value === SUB_TABS.MESS.TIP
      setActiveSubTab(value)
      prevMessSubTabRef.current = value;
      needLoadMessRef.current = true;
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
        // if (successGetListMessTip && successGetListMess) {
        // if (isSwitchingSubTabRef) {
        //   isSwitchingSubTabRef.current = v === SUB_TABS.MESS.TIP
        // }
        setValue(v)
        // }
      }}
    ></TabsGroup>
  )
}

export default SubTabGroups
