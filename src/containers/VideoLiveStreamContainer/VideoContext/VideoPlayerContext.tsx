import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

interface ContextState {
  isStreaming: boolean
  state: any
  setState: any
  setIsStreaming: Dispatch<SetStateAction<boolean>>
  playBackRightRef: React.MutableRefObject<HTMLDivElement>
  playBackLeftRef: React.MutableRefObject<HTMLDivElement>
  playbackBackdropRef: React.MutableRefObject<HTMLDivElement>
  handleSkipVideoTime: (type: 'prev' | 'next', cb?: () => void) => void
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

  const playBackRightRef = useRef<HTMLDivElement>(null)
  const playBackLeftRef = useRef<HTMLDivElement>(null)
  const playbackBackdropRef = useRef<HTMLDivElement>(null)
  // const playBackBackdropRef = useRef<HTMLDivElement>(null)
  const playbackTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleSkipVideoTime = (type: 'prev' | 'next', cb?: () => void) => {
    const parentRef = type === 'next' ? playBackRightRef : playBackLeftRef
    if (!parentRef.current) return
    const durationTime = 200
    const initialOpacity = isMobile ? '0.3' : '0.5'

    const arrow1 = parentRef.current.getElementsByTagName('svg')[0]
    const arrow2 = parentRef.current.getElementsByTagName('svg')[1]
    const arrow3 = parentRef.current.getElementsByTagName('svg')[2]
    playBackLeftRef.current.style.opacity = '0'
    playBackRightRef.current.style.opacity = '0'
    arrow1.style.opacity = initialOpacity
    arrow2.style.opacity = initialOpacity
    arrow3.style.opacity = initialOpacity
    if (playbackTimeoutRef.current) {
      clearTimeout(playbackTimeoutRef.current)
    }

    parentRef.current.style.opacity = '1'
    if (playbackBackdropRef.current) playbackBackdropRef.current.style.opacity = '1'
    playbackTimeoutRef.current = setTimeout(() => {
      parentRef.current.style.opacity = '0'
      if (playbackBackdropRef.current) playbackBackdropRef.current.style.opacity = '0'
      if (cb) {
        cb()
      }
    }, 3 * durationTime + 200)

    arrow1?.animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: Number(initialOpacity),
        },
      ],
      {
        duration: durationTime,
        delay: type === 'next' ? 0 : 2 * durationTime,
      }
    )
    arrow2?.animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: Number(initialOpacity),
        },
      ],
      {
        duration: durationTime,
        delay: durationTime,
      }
    )
    arrow3?.animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: Number(initialOpacity),
        },
      ],
      {
        duration: durationTime,
        delay: type === 'next' ? 2 * durationTime : 0,
      }
    )
  }

  return (
    <VideoPlayerContext.Provider
      value={{ state, setState, isStreaming, setIsStreaming, handleSkipVideoTime, playBackLeftRef, playBackRightRef, playbackBackdropRef }}
    >
      {children}
    </VideoPlayerContext.Provider>
  )
}

export const useVideoPlayerContext = () => useContext(VideoPlayerContext)
export default VideoPlayerContextProvider
