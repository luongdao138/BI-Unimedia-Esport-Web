import { PLAYBACK_TIMEOUT, VOLUME_TIMEOUT } from '@constants/video.constants'
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

type VolumeChange = 'off' | 'up' | 'down'
interface ContextState {
  isStreaming: boolean
  state: any
  setState: any
  setIsStreaming: Dispatch<SetStateAction<boolean>>
  playBackRightRef: React.MutableRefObject<HTMLDivElement>
  playBackLeftRef: React.MutableRefObject<HTMLDivElement>
  playbackBackdropRef: React.MutableRefObject<HTMLDivElement>
  handleSkipVideoTime: (type: 'prev' | 'next', cb?: () => void) => void
  volumeDownRef: React.MutableRefObject<HTMLDivElement>
  volumeUpRef: React.MutableRefObject<HTMLDivElement>
  volumeOffRef: React.MutableRefObject<HTMLDivElement>
  volumeLabelRef: React.MutableRefObject<HTMLDivElement>
  handleShowVolumeIndicator: (value: number, type: VolumeChange) => void
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

  // skip video time ref
  const playBackRightRef = useRef<HTMLDivElement>(null)
  const playBackLeftRef = useRef<HTMLDivElement>(null)
  const playbackBackdropRef = useRef<HTMLDivElement>(null)
  const playbackTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // change video volume ref
  const volumeDownRef = useRef<HTMLDivElement>(null)
  const volumeUpRef = useRef<HTMLDivElement>(null)
  const volumeOffRef = useRef<HTMLDivElement>(null)
  const volumeLabelRef = useRef<HTMLDivElement>(null)
  const volumeTimeoutRef = useRef<NodeJS.Timeout>(null)

  const handleSkipVideoTime = (type: 'prev' | 'next', cb?: () => void) => {
    const parentRef = type === 'next' ? playBackRightRef : playBackLeftRef
    if (!parentRef.current) return
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
    }, 3 * PLAYBACK_TIMEOUT + 200)

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
        duration: PLAYBACK_TIMEOUT,
        delay: type === 'next' ? 0 : 2 * PLAYBACK_TIMEOUT,
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
        duration: PLAYBACK_TIMEOUT,
        delay: PLAYBACK_TIMEOUT,
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
        duration: PLAYBACK_TIMEOUT,
        delay: type === 'next' ? 2 * PLAYBACK_TIMEOUT : 0,
      }
    )
  }

  const handleShowVolumeIndicator = (value: number, type: VolumeChange) => {
    if (volumeLabelRef.current && volumeUpRef.current && volumeDownRef.current && volumeOffRef.current) {
      const spanEl = volumeLabelRef.current.getElementsByTagName('span')[0]
      volumeLabelRef.current.style.opacity = '0'
      volumeDownRef.current.style.opacity = '0'
      volumeOffRef.current.style.opacity = '0'
      volumeUpRef.current.style.opacity = '0'
      if (volumeTimeoutRef.current) {
        clearTimeout(volumeTimeoutRef.current)
      }
      if (spanEl) spanEl.innerText = `${value * 100}%`

      volumeLabelRef.current.style.opacity = '1'
      switch (type) {
        case 'down':
          volumeDownRef.current.animate(
            [
              {
                opacity: 1,
                transform: 'translate(-50%, -50%) scale(0.6)',
              },
              {
                opacity: 0,
                transform: 'translate(-50%, -50%) scale(1)',
              },
            ],
            { duration: VOLUME_TIMEOUT }
          )
          break
        case 'up':
          volumeUpRef.current.animate(
            [
              {
                opacity: 1,
                transform: 'translate(-50%, -50%) scale(0.6)',
              },
              {
                opacity: 0,
                transform: 'translate(-50%, -50%) scale(1)',
              },
            ],
            { duration: VOLUME_TIMEOUT }
          )
          break

        default:
          volumeOffRef.current.animate(
            [
              {
                opacity: 1,
                transform: 'translate(-50%, -50%) scale(0.6)',
              },
              {
                opacity: 0,
                transform: 'translate(-50%, -50%) scale(1)',
              },
            ],
            { duration: VOLUME_TIMEOUT }
          )
          break
      }
      volumeTimeoutRef.current = setTimeout(() => {
        volumeLabelRef.current.style.opacity = '0'
      }, VOLUME_TIMEOUT)
    }
  }

  return (
    <VideoPlayerContext.Provider
      value={{
        state,
        setState,
        isStreaming,
        setIsStreaming,
        handleSkipVideoTime,
        playBackLeftRef,
        playBackRightRef,
        playbackBackdropRef,
        volumeDownRef,
        volumeUpRef,
        volumeOffRef,
        volumeLabelRef,
        handleShowVolumeIndicator,
      }}
    >
      {children}
    </VideoPlayerContext.Provider>
  )
}

export const useVideoPlayerContext = () => useContext(VideoPlayerContext)
export default VideoPlayerContextProvider
