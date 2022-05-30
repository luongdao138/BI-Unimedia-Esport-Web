import { CommonHelper } from '@utils/helpers/CommonHelper'
import React, { createContext, useCallback, useContext, useState, useEffect } from 'react'

interface ContextState {
  isFullscreenMode: boolean
  isShowHeader: boolean
  changeFullscreenMode: (value: boolean) => void
  changeShowHeader: (value: boolean) => void
}

const FullscreenContext = createContext<ContextState>({} as ContextState)

const FullscreenContextProvider: React.FC = ({ children }: { children: React.ReactNode }) => {
  const [isFullscreenMode, setIsFullScreenMode] = useState<boolean>(false)
  const [isShowHeader, setIsShowHeader] = useState<boolean>(false)

  const isSafariBrowser = CommonHelper.checkIsSafariBrowser()

  const changeFullscreenMode = useCallback((value: boolean) => {
    setIsFullScreenMode(value)
  }, [])

  const changeShowHeader = useCallback((value: boolean) => {
    setIsShowHeader(value)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [isFullscreenMode])

  useEffect(() => {
    if (!isSafariBrowser) {
      const handleFullscreenChange = () => {
        if (document.fullscreenElement) {
          setIsFullScreenMode(true)
        } else {
          setIsFullScreenMode(false)
        }
      }

      const handleScroll = () => {
        setIsShowHeader(scrollY > 0)
      }
      addEventListener('fullscreenchange', handleFullscreenChange)
      addEventListener('scroll', handleScroll)

      return () => {
        removeEventListener('fullscreenchange', handleFullscreenChange)
        removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <FullscreenContext.Provider value={{ changeFullscreenMode, isFullscreenMode, changeShowHeader, isShowHeader }}>
      {children}
    </FullscreenContext.Provider>
  )
}

export const useFullscreenContext = () => useContext(FullscreenContext)
export default FullscreenContextProvider
