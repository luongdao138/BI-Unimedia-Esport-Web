/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useEffect } from 'react'
import videojs, { VideoJsPlayer } from 'video.js'
// import 'video.js/src/css/video-js.scss'
import 'videojs-contrib-eme'
import onPlayerReady from './customPlugins'
const Button = videojs.getComponent('Button')
import usePrevious from './usePrevious'
import { hhmmss } from './customPlugins/time'

const defaults = {
  forwardIndex: 1,
  backIndex: 1,
}

type VideoJsPlayerPluginOptions = {
  [pluginName: string]: any
}

type Props = {
  src: string
  sources?: videojs.Tech.SourceObject[]
  aspectRatio?: string
  autoplay?: boolean | string
  controlBar?: videojs.ControlBarOptions | false
  textTrackSettings?: videojs.TextTrackSettingsOptions
  controls?: boolean
  defaultVolume?: number
  fluid?: boolean
  responsive?: boolean
  width?: number
  height?: number
  html5?: any
  inactivityTimeout?: number
  language?: string
  languages?: { [code: string]: videojs.LanguageTranslations }
  liveui?: boolean
  loop?: boolean
  muted?: boolean
  nativeControlsForTouch?: boolean
  notSupportedMessage?: string
  playbackRates?: number[]
  plugins?: Partial<VideoJsPlayerPluginOptions>
  poster?: string
  preload?: string
  sourceOrder?: boolean
  techOrder?: string[]
  tracks?: videojs.TextTrackOptions[]
  hideControls?: string[]
  bigPlayButton?: boolean
  bigPlayButtonCentered?: boolean
  onReady?: (player: VideoJsPlayer) => void
  onPlay?: (currentTime?: number) => void
  onFirstPlay?: () => void
  onPause?: (currentTime?: number) => void
  onTimeUpdate?: (currentTime: number) => void
  onSeeking?: (currentTime: number) => void
  onSeeked?: (position: number, currentTime: number) => void
  onEnd?: (currentTime?: number) => void
  className?: string
  fill: boolean
  trackSource?: string
  onActiveCue?: (data?: string) => void
  updateTime?: any
  type?: 'live' | 'archive'
  liveTime?: any
  hotKeys?: boolean
  playsinline?: boolean
  liveTracker?: any
}

export function useVideojs({
  src,
  autoplay,
  onReady,
  onPlay,
  onFirstPlay,
  onPause,
  onTimeUpdate,
  onSeeking,
  onSeeked,
  onEnd,
  className,
  trackSource,
  playsinline,
  onActiveCue,
  updateTime,
  type,
  liveTime,
  hotKeys,
  liveTracker,
  ...props
}: Props) {
  const vjsId = `vjs-${Date.now()}`
  const vjsRef = useRef(null)

  let player: VideoJsPlayer

  const previousSrc = usePrevious(src)
  const previousAutoplay = usePrevious(autoplay)

  useEffect(() => {
    if (previousSrc !== src && !previousSrc) {
      _initPlayer()
      _initPlayerEvents()
    }
    if (previousSrc !== src && previousSrc) {
      _changeSrc()
      _unregisterEvents()
      _initPlayerEvents()
    }

    if (previousAutoplay !== autoplay && previousAutoplay !== undefined) {
      _changeAutoplay()
      _unregisterEvents()
      _initPlayerEvents()
    }
  }, [src, autoplay])

  useEffect(() => {
    if (updateTime != undefined) {
      _changeTime(updateTime)
    }
  }, [updateTime])

  useEffect(() => {
    let interval
    class SeekButton extends Button {
      [x: string]: any
      constructor(player: any, options: any) {
        super(player, options)
        if (this.options_.direction === 'forward') {
          this.controlText('10')
        } else if (this.options_.direction === 'back') {
          this.controlText('10')
        } else if (this.options_.direction === 'time') {
          const startDate = this.options_.seconds
          const updTime = () => {
            const diff = (Date.now() - startDate) / 1000
            this.controlText(hhmmss(diff))
          }
          updTime()
          interval = this.player_.setInterval(() => {
            if (startDate) {
              updTime()
            }
          }, 1000)
        }
      }

      buildCSSClass() {
        let className
        if (this.options_.direction == 'time') {
          className = 'live-duration'
        } else {
          className = `vjs-seek-button skip-${this.options_.direction} ` + `skip-${this.options_.seconds} ${super.buildCSSClass()}`
        }
        return className
      }

      handleClick() {
        const now = this.player_.currentTime()
        if (this.options_.direction === 'forward') {
          this.player_.currentTime(now + this.options_.seconds)
        } else if (this.options_.direction === 'back') {
          this.player_.currentTime(now - this.options_.seconds)
        }
      }
    }
    videojs.registerComponent('SeekButton', SeekButton)

    return () => clearInterval(interval)
  }, [])

  const _initPlayer = () => {
    player = videojs(vjsRef.current, props)
    player.src(src)
    videojs.log.level('off')
    const seekButton = function (this: any, options: any) {
      // document.sbInit++;
      this.ready(() => {
        onPlayerReady(this, videojs.mergeOptions(defaults, options))
      })
    }

    videojs.registerPlugin('seekButton', seekButton)

    player.seekButton({
      forward: 10,
      back: 10,
      time: liveTime ? liveTime : 0,
      timeDisplay: type == 'live' ? true : false, // change later!!
    })

    if (type == 'archive') {
      trackSource &&
        player.addRemoteTextTrack({
          src: trackSource,
          kind: 'metadata',
          manualCleanup: false,
          mode: 'hidden',
        })
      const tracks = player.textTracks()

      let metadataTrack

      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i]
        // find the metadata track that's labeled ads
        if (track.kind === 'metadata') {
          track.mode = 'hidden'
          metadataTrack = track
        }
      }

      metadataTrack &&
        metadataTrack.on('cuechange', function () {
          const cues = metadataTrack.activeCues[0]
          // console.log(cues)
          if (cues !== undefined) {
            onActiveCue ? onActiveCue(cues?.text) : null
          }
        })
    }

    player.autoplay(autoplay)
  }

  const _changeSrc = () => {
    player = videojs(vjsRef.current)
    player.src(src)
  }

  const _changeAutoplay = () => {
    player = videojs(vjsRef.current)
    player.autoplay(autoplay)
  }

  const _changeTime = (time) => {
    player = videojs(vjsRef.current)
    player.currentTime(time)
  }

  const _initPlayerEvents = () => {
    let currentTime = 0
    let previousTime = 0
    let position = 0

    let seekToLive = false

    player.ready(() => {
      if (onReady) {
        onReady(player)
      }
    })

    player.on('play', () => {
      // player.saveHlsObject()
      player.bigPlayButton.hide()
      if (onPlay) {
        onPlay(player.currentTime())
      }
    })

    //stream related

    // player.tech().on('usage', (event) => {
    //   console.log('tech events', event)
    //   if (event.name === 'hls-live-resync') {
    //     console.log('hls-live-resync')
    //   }
    // })

    player.one('play', () => {
      seekToLive = true
      onFirstPlay ? onFirstPlay() : undefined
    })

    player.liveTracker.on('liveedgechange', () => {
      if (seekToLive && type == 'live') {
        player.liveTracker.seekToLiveEdge()
        seekToLive = false
      }
    })

    player.on('pause', () => {
      player.bigPlayButton.show()
      if (onPause) {
        onPause(player.currentTime())
      }
    })

    player.on('timeupdate', () => {
      if (onTimeUpdate) {
        onTimeUpdate(player.currentTime())
        previousTime = currentTime
        currentTime = player.currentTime()
        if (previousTime < currentTime) {
          position = previousTime
          previousTime = currentTime
        }
      }
    })

    player.on('seeking', () => {
      if (onSeeking) {
        onSeeking(player.currentTime())
      }
    })

    player.on('seeked', () => {
      if (onSeeked) {
        const completeTime = Math.floor(player.currentTime())
        onSeeked(position, completeTime)
      }
    })

    player.on('ended', () => {
      if (onEnd) {
        onEnd(player.currentTime())
      }
    })

    player.on('error', (_) => {
      if (type == 'live') {
        setTimeout(() => {
          const isLive = player.liveTracker.isLive()
          if (!isLive) {
            //player.load()
            // console.log('trying to load again')
          }
        }, 10000)
      }
    })
  }

  const _unregisterEvents = () => {
    player.off('play')
    player.off('pause')
    player.off('timeupdate')
    player.off('seeking')
    player.off('seeked')
    // player.tech().off('usage')
    player.off('ended')
    player.off('error')
  }

  const videoClassNames = `video-js ${className} ${props.bigPlayButtonCentered ? 'vjs-big-play-centered' : ''}`

  return { vjsRef, vjsId, vjsClassName: videoClassNames }
}
