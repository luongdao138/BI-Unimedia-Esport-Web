import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface ContextState {
  isStreaming: boolean
  state: any
  setState: any
  setIsStreaming: Dispatch<SetStateAction<boolean>>
}

const VideoPlayerContext = createContext<ContextState>({} as ContextState)

const VideoPlayerContextProvider: React.FC = ({ children }: { children: React.ReactNode }) => {
  const [isStreaming, setIsStreaming] = useState<boolean>(false)
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume: 0,
    ended: false,
  })

  return <VideoPlayerContext.Provider value={{ state, setState, isStreaming, setIsStreaming }}>{children}</VideoPlayerContext.Provider>
}

export const useVideoPlayerContext = () => useContext(VideoPlayerContext)
export default VideoPlayerContextProvider
