import React, { createContext, useCallback, useContext, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

interface ContextState {
  isShowControlBar: boolean
  changeShowControlBar: (value: boolean) => void
  isShowSettingPanel: boolean
  changeShowSettingPanel: (value: boolean) => void
  timeoutRef: any
  canHideChatTimeoutRef: React.MutableRefObject<boolean>
}

const ControlBarContext = createContext<ContextState>({} as ContextState)

const ControlBarContextProvider: React.FC = ({ children }: { children: React.ReactNode }) => {
  const [isShowControlBar, setIsShowControlBar] = useState<boolean>(false)
  const [isShowSettingPanel, setIsShowSettingPanel] = useState<boolean>(false)
  const timeoutRef = useRef<any>(null)

  const canHideChatTimeoutRef = useRef<boolean>(true)

  const changeShowControlBar = useCallback(
    (value: boolean) => {
      if (!isMobile) {
        setIsShowControlBar(value)
      }
    },
    [isMobile]
  )

  const changeShowSettingPanel = useCallback(
    (value: boolean) => {
        setIsShowSettingPanel(value)
    },
    [isMobile]
  )

  return (
    <ControlBarContext.Provider
      value={{
        isShowControlBar,
        changeShowControlBar,
        isShowSettingPanel,
        changeShowSettingPanel,
        timeoutRef,
        canHideChatTimeoutRef,
      }}
    >
      {children}
    </ControlBarContext.Provider>
  )
}

export const useControlBarContext = () => useContext(ControlBarContext)
export default ControlBarContextProvider
