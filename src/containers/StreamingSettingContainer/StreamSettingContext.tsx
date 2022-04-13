import { createContext, useCallback, useContext, useState } from 'react'

interface StreamSettingContextType {
  isHideFooter: boolean
  changeIsHideFooter: (value: boolean) => void
}

const StreamSettingContext = createContext<StreamSettingContextType>({} as StreamSettingContextType)

const StreamSettingProvider: React.FC = ({ children }) => {
  const [isHideFooter, setIsHideFooter] = useState<boolean>(false)
  const changeIsHideFooter = useCallback((value: boolean) => {
    setIsHideFooter(value)
  }, [])
  return <StreamSettingContext.Provider value={{ isHideFooter, changeIsHideFooter }}>{children}</StreamSettingContext.Provider>
}

export default StreamSettingProvider
export const useStreamSettingContext = (): StreamSettingContextType => useContext(StreamSettingContext)
