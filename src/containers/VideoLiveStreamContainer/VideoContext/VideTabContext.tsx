import { SUB_TABS, VIDEO_TABS } from '@constants/common.constants'
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from 'react'

interface ContextState {
  activeTab: number
  activeSubTab: number
  setActiveTab: Dispatch<SetStateAction<number>>
  setActiveSubTab: Dispatch<SetStateAction<number>>
  prevMessSubTabRef: React.MutableRefObject<number>
}

const VideoTabContext = createContext<ContextState>({} as ContextState)

const VideoTabContextProvider: React.FC = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<number>(VIDEO_TABS.CHAT)
  const [activeSubTab, setActiveSubTab] = useState<number>(SUB_TABS.MESS.ALL)
  const prevMessSubTabRef = useRef<number>(SUB_TABS.MESS.ALL)

  return (
    <VideoTabContext.Provider value={{ activeSubTab, activeTab, setActiveSubTab, setActiveTab, prevMessSubTabRef }}>
      {children}
    </VideoTabContext.Provider>
  )
}

export const useVideoTabContext = () => useContext(VideoTabContext)
export default VideoTabContextProvider
