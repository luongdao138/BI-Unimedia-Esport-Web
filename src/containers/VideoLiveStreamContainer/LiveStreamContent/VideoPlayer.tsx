/* eslint-disable no-console */
// import ESLoader from '@components/Loader'
import { Icon, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { memo, useEffect, useRef, useState } from 'react'
// import { Player, ControlBar, BigPlayButton, ProgressControl } from 'video-react'
import ControlBarPlayer from './ControlBar'
import SeekBar from './ControlComponent/SeekBar'
import ReactPlayer from 'react-player'
import ESLoader from '@components/Loader'
import screenfull from 'screenfull'

import useDetailVideo from '../useDetailVideo'
import { hhmmss } from '@containers/VideoPlayer/customPlugins/time'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
import { STATUS_VIDEO } from '@services/videoTop.services'

interface PlayerProps {
  src?: string
  thumbnail?: string
  statusVideo?: boolean
  mediaOverlayIsShown?: boolean
  videoType?: any
  onVideoEnd?: () => void
  startLive?: number
  endLive?: string
  type?: number
}

declare global {
  interface Window {
    IVSPlayer: any
  }
}

const VideoPlayer: React.FC<PlayerProps> = ({
  src,
  // statusVideo,
  mediaOverlayIsShown,
  onVideoEnd,
  thumbnail,
  startLive,
  endLive,
  videoType,
  type,
}) => {
  const checkStatusVideo = 1
  const classes = useStyles({ checkStatusVideo })
  const { width: videoDisplayWidth } = useWindowDimensions(0)

  const player = useRef(null)
  // const videoEl = useRef(null)

  const { IVSPlayer } = window
  const isPlayerSupported = IVSPlayer?.isPlayerSupported
  const [durationPlayer, setDurationPlayer] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const reactPlayerRef = useRef(null)
  const playerContainerRef = useRef(null)
  const [isLive, setIsLive] = useState(false)
  const [playState, setPlayState] = useState()

  //As of Chrome 66, videos must be muted in order to play automatically
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume: 0,
    ended: false,
    loading: false,
    errorVideo: false,
    videoLoaded: false, //check lai khi live
    begin: true,
  })

  const {
    // changeStreamingSecond,
    // streamingSecond,
    // changeIsViewingStream,
    // isViewingStream,
    // changePlayedSecond,
    // playedSecond,
    changeVideoTime,
    changeIsEndLive,
    changeIsPausingLive,
    liveStreamInfo,
    changeSeekCount,
  } = useDetailVideo()

  const onProgress = async (event) => {
    // setState({ ...state, loading: false, begin: false })
    // if (isLive) {
    //   console.log('🚀 ~ onProgress ~ 1111-----playedSeconds', player.current.getPosition())
    //   //live stream => duration = current
    //   // setDurationPlayer(event.playedSeconds)
    //   // setDurationPlayer(event.playedSeconds)
    //   if (Math.floor(event.playedSeconds) > Math.floor(durationPlayer)) {
    //     await setDurationPlayer(event.playedSeconds)
    //   } else {
    //     setDurationPlayer(durationPlayer + 1)
    //   }
    // }
    if (!isLive) {
      setPlayedSeconds(event.playedSeconds)
      if (event.playedSeconds === 0 && playState === 'Ready') {
        setState({ ...state, begin: true })
      }
    }
    setState({ ...state, loading: false, begin: false })

    // // trigger change streaming second in redux
    // if (Math.floor(event.loadedSeconds) !== streamingSecond) {
    //   let is_viewing_video = true
    //   if (Math.floor(event.playedSeconds) < Math.floor(event.loadedSeconds)) {
    //     is_viewing_video = false
    //   }
    //   if (isViewingStream !== is_viewing_video) {
    //     changeIsViewingStream(is_viewing_video)
    //   }
    //   changeStreamingSecond(Math.floor(event.loadedSeconds))
    // }
    // if (Math.floor(event.playedSeconds) !== playedSecond) {
    //   changePlayedSecond(Math.floor(event.playedSeconds))
    // }

    console.log(' 🚀 🚀 🚀 🚀 🚀 🚀 🚀 --111111 ', playedSeconds, durationPlayer)
    // trigger change streaming second in redux
    // if (Math.floor(durationPlayer) !== streamingSecond) {
    console.log('🚀 ~ onProgress ~ durationPlayer', durationPlayer)
    // let is_viewing_video = true
    // if (Math.floor(playedSeconds) < Math.floor(durationPlayer)) {
    //   is_viewing_video = false
    // }
    // if (isViewingStream !== is_viewing_video) {
    //   changeIsViewingStream(is_viewing_video)
    // }
    const livingSeconds = videoType === STATUS_VIDEO.LIVE_STREAM ? Math.floor(playedSeconds) : Math.floor(durationPlayer)
    changeVideoTime(livingSeconds, Math.floor(playedSeconds))
    // changeStreamingSecond(Math.floor(durationPlayer))
    // }
    // if (Math.floor(playedSeconds) !== playedSecond) {
    console.log('🚀 ~ onProgress ~ playedSeconds', playedSeconds)
    // changePlayedSecond(Math.floor(playedSeconds))
    // }
  }
  const onDuration = (duration) => {
    if (!isLive) {
      setDurationPlayer(duration) //video archive
    } else {
      console.log('getCurrentTime====', reactPlayerRef.current.getCurrentTime(), duration)
      // setDurationPlayer(reactPlayerRef.current.getCurrentTime())
    }
  }

  useEffect(() => {
    const ENDED = IVSPlayer?.PlayerState?.ENDED
    const PLAYING = IVSPlayer?.PlayerState?.PLAYING
    const READY = IVSPlayer?.PlayerState?.READY
    const BUFFERING = IVSPlayer?.PlayerState?.BUFFERING
    const ERROR = IVSPlayer?.PlayerEventType?.ERROR
    const IDLE = IVSPlayer?.PlayerState?.IDLE
    if (!isPlayerSupported) {
      console.warn('The current browser does not support the Amazon IVS player.')
      return
    }

    const onStateChange = () => {
      const playerState = player.current.getState()
      console.warn(
        `Player State - ${playerState} - ${player.current.getDuration()}- src=${src}- getLiveLatency=${player.current.getPosition()}`
      )
      setPlayState(playerState)

      if (playerState === IVSPlayer?.PlayerState?.ENDED) {
        onVideoEnd()
      }
      if (playerState === 'Ended') {
        changeIsEndLive(true)
        setState({ ...state, ended: true })
      }
      // if(playerState === 'Ready'){
      //   setState({ ...state, videoLoaded:true, loading:false })
      // }
      setIsLive(player.current.getDuration() === Infinity ? true : false)
      // setDurationPlayer(player.current.getDuration() === Infinity && reactPlayerRef.current.getCurrentTime())
      setDurationPlayer(player.current.getDuration() === Infinity ? reactPlayerRef.current.getCurrentTime() : player.current.getDuration())
    }
    const onError = (err) => {
      console.warn('Player Event - ERROR:', err)
      setState({ ...state, errorVideo: true, loading: false, begin: true })
    }

    player.current = IVSPlayer.create() //MediaPlayer
    // player.current.attachHTMLVideoElement(videoEl.current)
    player.current.load(src)
    player.current.play()
    player.current.setMuted(true)
    // player.current.setAutoplay(true)

    player.current.addEventListener(READY, onStateChange)
    player.current.addEventListener(PLAYING, onStateChange)
    player.current.addEventListener(ENDED, onStateChange)
    player.current.addEventListener(ERROR, onError)
    player.current.addEventListener(BUFFERING, onStateChange)
    player.current.addEventListener(IDLE, onStateChange)
    console.log('🚀 ~ useEffect ~ player.current-----11111', player.current)

    return () => {
      player.current.removeEventListener(READY, onStateChange)
      player.current.removeEventListener(PLAYING, onStateChange)
      player.current.removeEventListener(ENDED, onStateChange)
      player.current.removeEventListener(ERROR, onError)
      player.current.removeEventListener(BUFFERING, onStateChange)
      player.current.removeEventListener(IDLE, onStateChange)
    }
  }, [
    IVSPlayer,
    // isPlayerSupported,
    src,
  ])

  const handlePauseAndSeekVideo = () => {
    console.log(' 🚀 🚀 🚀 🚀 🚀 🚀 🚀 --01234 ', playedSeconds, durationPlayer, state.playing)
    // seek to current live stream second if is pausing live and is not playing
    if (!state.playing && liveStreamInfo.is_pausing_live) {
      const newSecond = Math.floor(durationPlayer)
      reactPlayerRef.current.seekTo(newSecond, 'seconds')
      console.log('🚀 ~ handleChange ~ newSecond--- 0000', newSecond)
      changeSeekCount(Math.floor(newSecond))
    }
    // if pause video when is live streaming => set is pausing to true
    if (state.playing && Math.floor(playedSeconds) === Math.floor(durationPlayer)) {
      console.log('-----aaaa----')
      changeIsPausingLive(true)
    } else {
      console.log('-----bbbb----')
      changeIsPausingLive(false)
    }
  }

  const handlePlayPause = () => {
    console.log('-----handlePlayPause----')
    handlePauseAndSeekVideo()
    setState({ ...state, playing: !state.playing })
  }

  const onPlay = () => {
    setState({ ...state, playing: true })
  }
  const onPause = () => {
    setState({ ...state, playing: false })
  }

  const theme = useTheme()
  const isMobile = theme.breakpoints.down('sm')
  const isDownMd = useMediaQuery(theme.breakpoints.down(769))
  const isDown1100 = useMediaQuery(theme.breakpoints.down(1100))
  const isDown960 = useMediaQuery(theme.breakpoints.down(960))

  const [isPortrait, setIsPortrait] = useState<boolean>(!!isMobile)
  console.log('isPortrait', isPortrait)
  useEffect(() => {
    // if (!isPortrait) {
    // screenfull.request(playerContainerRef.current)
    // }
  }, [isPortrait])

  const handleOrientationChange = (event) => {
    console.log('event::', event)
    const { orientation } = event.target
    if (orientation === 90 || orientation === 270) {
      setIsPortrait(false)
    } else {
      setIsPortrait(true)
    }
  }

  useEffect(() => {
    window.addEventListener('orientationchange', handleOrientationChange)
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  const toggleFullScreen = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    screenfull.toggle(playerContainerRef.current)
  }

  const handleMute = () => {
    setState({ ...state, muted: !state.muted, volume: !state.muted ? 0 : 1 })
  }

  const handleChangeVol = (_, val) => {
    setState({ ...state, volume: val, muted: val === 0 ? true : false })
  }
  const handleChangeVolDrag = (_, val) => {
    setState({ ...state, volume: val, muted: val === 0 ? true : false })
  }
  const onEnded = () => {
    console.log('-----ENDED RN----')
    setState({ ...state, ended: true })
    onVideoEnd()
  }
  const handlePlayPauseOut = () => {
    console.log('-----handlePlayPauseOut----')
    handlePauseAndSeekVideo()
    setState({ ...state, playing: !state.playing })
  }
  const onError = (error, data) => {
    console.warn('onError player', error, data)
    // if (data.response === 404) {
    setState({ ...state, loading: true, videoLoaded: true })
    // }
  }
  const onBuffer = () => {
    console.log('BUFFER=')
    setState({ ...state, loading: true, videoLoaded: true })
  }
  const onSeek = (se) => {
    console.log('SEEK=', se)
    setState({ ...state, loading: true })
  }
  const onReady = () => {
    console.log('READY---')
    setState({ ...state, begin: true, videoLoaded: false })
  }

  //video
  useEffect(() => {
    if (isLive) {
      const updTime = () => {
        const diff = (Date.now() - startLive) / 1000
        hhmmss(diff)
        setDurationPlayer(diff)
        setPlayedSeconds(diff)
      }
      const interval = setInterval(() => {
        if (startLive && !state.ended && !endLive) {
          updTime()
        }
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [startLive, state.ended, endLive, isLive])

  const { playing, muted, volume, ended, loading, errorVideo, videoLoaded, begin } = state
  const chatBoardWidth = () => {
    if (!isDown1100) return 482
    if (!isDownMd) return 350
    return 0
  }
  const sizeMenuWidth = () => {
    if (!isDown960) return 98
    return 0
  }

  const calculateVideoHeight = () => {
    const videoWidth = videoDisplayWidth - (chatBoardWidth() + sizeMenuWidth())
    return (videoWidth * 9) / 16
  }

  return (
    <div className={classes.videoPlayer}>
      {/* <video ref={videoEl} controls playsinline src={src}></video> */}
      <div ref={playerContainerRef} className={classes.playerContainer}>
        <div style={{ height: '100%' }} onClick={handlePlayPauseOut}>
          <ReactPlayer
            ref={reactPlayerRef}
            url={src}
            playsinline
            width="100%"
            height={calculateVideoHeight()}
            playing={playing}
            onProgress={onProgress}
            onDuration={onDuration}
            onBuffer={onBuffer}
            onPlay={onPlay}
            onPause={onPause}
            volume={volume}
            muted={muted}
            onEnded={onEnded}
            className={classes.reactPlayer}
            config={{
              file: {
                attributes: {
                  autoPlay: true,
                  // autoPlay: statusVideo ? !statusVideo : true,
                  muted: muted,
                  volume: volume,
                },
              },
            }}
            onError={onError}
            onReady={onReady}
            onSeek={onSeek}
            // controls
          />

          {!mediaOverlayIsShown &&
            (ended ||
              (!playing && (
                <div className={classes.playOverView}>
                  {begin && (
                    <div
                      className={classes.thumbBegin}
                      style={{
                        backgroundImage: `url(${thumbnail ?? '/images/live_stream/thumbnail_default.png'})`,
                        backgroundSize: 'cover',
                      }}
                    >
                      <div className={classes.loadingThumbBlur} />
                    </div>
                  )}
                  {durationPlayer !== Infinity ? <Icon className={`fas fa-play ${classes.fontSizeLarge}`} /> : <ESLoader />}
                </div>
              )))}
        </div>

        <div className={classes.processControl}>
          <SeekBar videoRef={reactPlayerRef} durationsPlayer={durationPlayer} currentTime={playedSeconds} disabled={isLive} />
          <div className={classes.controlOut}>
            <ControlBarPlayer
              videoRef={reactPlayerRef}
              onPlayPause={handlePlayPause}
              playing={playing}
              muted={muted}
              durationsPlayer={durationPlayer}
              currentTime={playedSeconds}
              handleFullScreen={toggleFullScreen}
              onMute={handleMute}
              onChangeVol={handleChangeVol}
              onChangeVolDrag={handleChangeVolDrag}
              volume={volume}
              isLive={isLive}
              videoStatus={type}
            />
          </div>
        </div>
        {loading && (
          <div
            className={classes.loading}
            style={{
              ...((!videoLoaded || playState === 'Buffering') && {
                backgroundImage: `url(${thumbnail ?? '/images/live_stream/thumbnail_default.png'})`,
              }),
              ...(videoLoaded && { backgroundImage: '' }),
              backgroundSize: 'cover',
            }}
          >
            <ESLoader />
          </div>
        )}
        {errorVideo && <div className={classes.loading} />}
      </div>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  // process: (props: { checkStatusVideo: number }) => {
  //   return {
  //     zIndex: 1,
  //     opacity: props.checkStatusVideo === 1 ? 1 : 0, //always show controlBar by status video
  //     '& .video-react-slider-bar': {},
  //     '& .video-react-play-progress': {
  //       backgroundColor: '#FF4786',
  //       height: 7,
  //     },
  //     '& .video-react-progress-holder': {
  //       backgroundColor: '#4D4D4D',
  //       position: 'absolute',
  //       bottom: 40,
  //       width: '100%',
  //       height: 7,
  //     },
  //     '& .video-react-control-text': {
  //       display: 'none',
  //     },
  //     '& .video-react-load-progress': {},
  //   }
  // },
  // bigPlayButton: {
  //   display: 'none',
  //   '& .video-react-big-play-button': {},
  //   '& .video-react-big-play-button-left': {},
  //   '& .video-react-control-text': {
  //     display: 'none',
  //   },
  // },
  playOverView: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    // backgroundColor: 'rgba(174,3,250,0.3)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loading: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    // backgroundColor: 'rgba(174,3,250,0.7)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  //video-react-video
  // videoPlayerCustom: {
  //   '& .video-react-video': {
  //     display: 'flex',
  //     width: '100%',
  //     height: '100%',
  //   },
  //   '&:hover $controlBar': {
  //     transition: 'opacity 0.3s ease-in',
  //     opacity: 1,
  //   },
  //   '&:hover $process': {
  //     opacity: 1,
  //     transition: 'opacity 0.3s ease-in',
  //   },
  // },
  controlBar: (props: { checkStatusVideo: number }) => {
    return {
      width: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      height: 40,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 26,
      justifyContent: 'space-between',
      zIndex: 9,
      transition: 'opacity 0.3s ease-in',
      opacity: props.checkStatusVideo === 1 ? 1 : 0, //always show controlBar by status video
    }
  },
  fontSizeLarge: {
    fontSize: 100,
    color: Colors.white,
    zIndex: 2,
  },
  blurBackground: {
    backgroundColor: 'rgba(4,4,4,0.71)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  sliderSeek: {
    width: '100%',
    display: 'block',
    transition: 'width 0.4s ease-in',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  seekSlider: {
    position: 'relative',
    bottom: 60,
    left: 0,
  },
  videoPlayer: {
    height: '100%',
  },
  controlOut: {
    // backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  processControl: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    // visibility:'hidden',
    // opacity: 1,
    // height: 40,
    // display: 'flex',
    // alignItems: 'center',
    // paddingLeft: 26,
    // justifyContent: 'space-between',
    zIndex: 99,
    transition: 'opacity 0.1s ease-in',
    opacity: 0, //always show controlBar by status video
    background: 'linear-gradient(rgb(128 128 128 / 0%) 20%, rgb(39 39 39) 100%)',
  },
  playerContainer: {
    '&:hover $processControl': {
      opacity: 1,
      background: 'linear-gradient(rgb(128 128 128 / 0%) 20%, rgb(39 39 39) 100%)',
      transition: 'opacity 0.1s ease-in',
    },
  },
  reactPlayer: {
    '&:hover $.processControl': {
      transition: 'opacity 0.3s ease-in',
      opacity: 1,
      backgroundColor: 'yellow',
    },
  },
  [theme.breakpoints.down('xs')]: {
    fontSizeLarge: {
      fontSize: '50px',
    },
  },
  thumbBegin: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
  },
  loadingThumbBlur: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
    backdropFilter: 'blur(5px)',
  },
}))

export default memo(VideoPlayer)
