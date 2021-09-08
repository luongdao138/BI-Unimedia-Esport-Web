import React from 'react'
import videojs from 'video.js'
import { useVideojs } from './useVideojs'

import _ from 'lodash'

interface Props {
  src: string
  trackSource?: string
  onChatTrigger?: (data: any) => void
  type?: 'archive' | 'live'
  onSeekPlayer?: (currentTime: number) => void
  handleFirstPlay?: () => void
  updateTime?: any
  poster?: any
  liveTime?: any
}

const VideoPlayer = (props: Props) => {
  const { trackSource, onChatTrigger, src, onSeekPlayer, updateTime, handleFirstPlay, poster, type, liveTime } = props

  const onPlay = (_currentTime?: number) => {
    // console.log('Video played at: ', currentTime)
  }

  const onFirstPlay = () => {
    handleFirstPlay ? handleFirstPlay() : undefined
  }

  const onPause = (_currentTime?: number) => {
    // console.log('Video paused at: ', currentTime)
  }

  const onEnd = (_currentTime?: number) => {
    // console.log(`Video ended at ${currentTime}`)
  }

  const onTimeUpdate = (_currentTime: number) => {
    // // console.log(`Video current time is ${currentTime}`)
  }

  const onSeeked = (_position: number, currentTime: number) => {
    // console.log(`Seeked ${currentTime}`)
    onSeekPlayer ? onSeekPlayer(currentTime) : undefined
  }

  const onSeeking = (_currentTime: number) => {
    // console.log(`Seeking `)
  }

  const onActiveCue = (data: any) => {
    if (!_.isEmpty(data)) {
      const array = _.split(data, ',')
      // console.log('active cue do something send chat data ', array)
      onChatTrigger ? onChatTrigger(array) : null
    }
  }

  const { vjsId, vjsRef, vjsClassName } = useVideojs({
    src: src,
    controls: true,
    autoplay: false,
    responsive: true,
    bigPlayButtonCentered: true,
    className: 'vjs-theme-ntt',
    onPlay,
    onFirstPlay,
    onPause,
    onEnd,
    onTimeUpdate,
    onSeeked,
    hotKeys: true,
    onSeeking,
    onActiveCue,
    trackSource: trackSource,
    liveTracker: {
      trackingThreshold: 0,
    },
    fluid: false,
    fill: true,
    liveui: true,
    html5: {
      nativeTextTracks: false,
      nativeAudioTracks: false,
      nativeVideoTracks: false,
      vhs: {
        overrideNative: !videojs.browser.IS_SAFARI,
        withCredentials: true,
      },
    },
    textTrackSettings: false,
    updateTime: updateTime,
    poster: poster,
    type,
    liveTime,
    language: 'ja',
    playsinline: true,
  })

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  return (
    <div data-vjs-player>
      <video
        ref={vjsRef}
        playsInline // disable fullscreen IOS
        id={vjsId}
        className={vjsClassName}
        // crossOrigin="anonymous"
      ></video>
    </div>
  )
}

VideoPlayer.defaultProps = {
  type: 'live',
}

export default VideoPlayer
