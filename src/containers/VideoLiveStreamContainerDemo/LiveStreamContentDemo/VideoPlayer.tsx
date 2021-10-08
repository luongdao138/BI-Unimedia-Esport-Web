/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
import { Icon, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { memo, useEffect, useRef, useState } from 'react'
import ControlBarPlayer from './ControlBar'
import SeekBar from './ControlComponent/SeekBar'
// import ReactPlayer from 'react-player'
import ESLoader from '@components/Loader'
// import screenfull from 'screenfull'

import useDetailVideo from '../useDetailVideo'
import Hls from 'hls.js'

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
  // // statusVideo,
  mediaOverlayIsShown,
  // onVideoEnd,
  thumbnail,
  // startLive,
  // endLive,
  // videoType,
  type,
}) => {
  const checkStatusVideo = 1
  const classes = useStyles({ checkStatusVideo })
  // const { width: videoDisplayWidth } = useWindowDimensions(0)

  // const player = useRef(null)
  const videoEl = useRef(null)

  // const { IVSPlayer } = window
  // const isPlayerSupported = IVSPlayer?.isPlayerSupported
  const [durationPlayer, setDurationPlayer] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  // const reactPlayerRef = useRef(null)
  const playerContainerRef = useRef(null)
  // const [isLive, setIsLive] = useState(false)
  // const [playState, setPlayState] = useState()

  //As of Chrome 66, videos must be muted in order to play automatically
  const [state, setState] = useState({
    playing: false,
    muted: true,
    volume: 0,
    ended: false,
  })

  const [visible, setVisible] = useState({
    loading: true,
    videoLoaded: false,
  })

  const {
    // changeStreamingSecond,
    // streamingSecond,
    // changeIsViewingStream,
    // isViewingStream,
    // changePlayedSecond,
    // playedSecond,
    // changeVideoTime,
    // changeIsEndLive,
    changeIsPausingLive,
    liveStreamInfo,
    changeSeekCount,
  } = useDetailVideo()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true })

  const handlePauseAndSeekVideo = () => {
    // seek to current live stream second if is pausing live and is not playing
    if (!state.playing && liveStreamInfo.is_pausing_live) {
      const newSecond = Math.floor(durationPlayer)
      changeSeekCount(Math.floor(newSecond))
    }
    // if pause video when is live streaming => set is pausing to true
    if (state.playing && Math.floor(playedSeconds) === Math.floor(durationPlayer)) {
      changeIsPausingLive(true)
    } else {
      changeIsPausingLive(false)
    }
  }

  const [isPortrait, setIsPortrait] = useState<boolean>(!!isMobile)
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

  // const toggleFullScreen = () => {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   //@ts-ignore
  //   screenfull.toggle(playerContainerRef.current)
  // }

  const handleMute = () => {
    setState({ ...state, muted: !state.muted, volume: videoEl.current.volume })
  }

  const handleChangeVol = (_, val) => {
    videoEl.current.volume = val
    setState({ ...state, volume: val, muted: videoEl.current.volume === 0 ? true : false })
  }
  const handleChangeVolDrag = (_, val) => {
    videoEl.current.volume = val
    setState({ ...state, volume: val, muted: videoEl.current.volume === 0 ? true : false })
  }

  //video
  // useEffect(() => {
  //   if (isLive) {
  //     const updTime = () => {
  //       const diff = (Date.now() - startLive) / 1000
  //       hhmmss(diff)
  //       setDurationPlayer(diff)
  //       setPlayedSeconds(diff)
  //     }
  //     const interval = setInterval(() => {
  //       if (startLive && !state.ended && !endLive) {
  //         updTime()
  //       }
  //     }, 1000)
  //     return () => {
  //       clearInterval(interval)
  //     }
  //   }
  // }, [startLive, state.ended, endLive, isLive])

  const { playing, muted, volume, ended } = state
  const { loading, videoLoaded } = visible
  // const chatBoardWidth = () => {
  //   if (!isDown1100) return 482
  //   if (!isDownMd) return 350
  //   return 0
  // }
  // const sizeMenuWidth = () => {
  //   if (!isDown960) return 98
  //   return 0
  // }

  // const calculateVideoHeight = () => {
  //   const videoWidth = videoDisplayWidth - (chatBoardWidth() + sizeMenuWidth())
  //   return (videoWidth * 9) / 16
  // }

  // ===================hls.js==================================
  useEffect(() => {
    if (Hls.isSupported() && !isMobile) {
      const video = document.getElementById('video')
      const hls = new Hls({
        liveSyncDurationCount: 1,
        initialLiveManifestSize: 1,
        // liveMaxLatencyDurationCount:10
        liveDurationInfinity: true,
        startPosition: 0,
      })
      // bind them together
      hls.loadSource(src)
      // hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')
      //@ts-ignore
      hls.attachMedia(video)
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        console.log('video and hls.js are now bound together !')
        // video.play(); //auto play video
        //@ts-ignore
        video.muted = true
        // hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
        //   console.log('~~~~LEVEL_LOADED~~~~~', data);
        //   setDurationPlayer(data.details.totalduration)
        //   setIsLive(data.details.live)
        // });
      })
    }
  }, [])
  //archived
  useEffect(() => {
    videoEl.current.addEventListener('timeupdate', (event) => {
      if (event.target) {
        setPlayedSeconds(event.target.currentTime)
      }
    })

    videoEl.current.addEventListener('durationchange', (event) => {
      if (event.target) {
        setDurationPlayer(event.target.duration)
      }
    })

    videoEl.current.addEventListener('volumechange', () => {
      setState({
        ...state,
        muted: videoEl.current.muted,
        volume: videoEl.current.muted === true ? 0 : videoEl.current.volume,
        playing: !videoEl.current.paused,
      })
      // setState({ ...state, muted: videoEl.current.volume!==0?false:true, volume:  videoEl.current.volume, playing: !videoEl.current.paused })
    })

    videoEl.current.addEventListener('ended', () => {
      setState({ ...state, playing: false })
      setVisible({ ...visible, loading: true, videoLoaded: true })
    })

    //check event video
    videoEl.current.addEventListener('seeking', () => {
      console.log('=================SEEKING===================')
      setVisible({ ...visible, loading: true, videoLoaded: false })
    })
    videoEl.current.addEventListener('seeked', () => {
      //rewind complete
      console.log('=================SEEKED===================')
      setVisible({ ...visible, loading: false, videoLoaded: false })
    })

    //load data
    videoEl.current.addEventListener('loadedmetadata', (event) => {
      console.log('=================loadedmetadata===================')
      console.log(event)
      setVisible({ ...visible, loading: true, videoLoaded: true })
    })
    videoEl.current.addEventListener('loadeddata', () => {
      console.log('=================loadeddata===================')
      setVisible({ ...visible, loading: true, videoLoaded: true })
    })
    videoEl.current.addEventListener('emptied', (event) => {
      console.log('=================emptied===================')
      console.log(event)
    })
    videoEl.current.addEventListener('canplay', (event) => {
      console.log('=================canplay===================')
      console.log(event)
    })

    return () => {
      // videoEl.current.removeEventListener('timeupdate',onStateChange)
    }
  }, [])
  const toggleFullScreen1 = () => {
    if (!document.fullscreenElement) {
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen()
      } else if (playerContainerRef.current.mozRequestFullScreen) {
        playerContainerRef.current.mozRequestFullScreen()
      } else if (playerContainerRef.current.webkitRequestFullscreen) {
        playerContainerRef.current.webkitRequestFullscreen()
      } else if (playerContainerRef.current.msRequestFullscreen) {
        playerContainerRef.current.msRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }
  const handlePlayPauseOut = () => {
    handlePauseAndSeekVideo()
    if (videoEl.current.paused || videoEl.current.ended) {
      videoEl.current.play()
      setState({ ...state, playing: true })
      setVisible({ ...visible, loading: false, videoLoaded: false })
    } else {
      videoEl.current.pause()
      setState({ ...state, playing: false })
      setVisible({ ...visible, loading: true, videoLoaded: false })
    }
  }
  const handlePlayPause = () => {
    handlePauseAndSeekVideo()
    if (videoEl.current.paused || videoEl.current.ended) {
      videoEl.current.play()
      setState({ ...state, playing: true })
      setVisible({ ...visible, loading: false, videoLoaded: false })
    } else {
      videoEl.current.pause()
      setState({ ...state, playing: false })
      setVisible({ ...visible, loading: true, videoLoaded: false })
    }
  }

  return (
    <div className={classes.videoPlayer}>
      <div ref={playerContainerRef} className={classes.playerContainer}>
        <div style={{ height: '100%' }} onClick={handlePlayPauseOut}>
          {!isMobile ? (
            <video id="video" ref={videoEl} muted={muted} style={{ width: '100%', height: '100%' }} autoPlay={false} />
          ) : (
            <video
              id="video"
              ref={videoEl}
              muted={muted}
              style={{ width: '100%', height: '100%' }}
              // src={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'}
              src={src}
              autoPlay={false}
              controls
            />
          )}
          {!mediaOverlayIsShown && loading && (
            <div className={classes.playOverView}>
              {videoLoaded && (
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
              {ended || !playing ? <Icon className={`fas fa-play ${classes.fontSizeLarge}`} /> : <ESLoader />}
            </div>
          )}
        </div>
        {!isMobile && (
          <div className={classes.processControl}>
            <SeekBar videoRef={videoEl} durationsPlayer={durationPlayer} currentTime={playedSeconds} />
            <div className={classes.controlOut}>
              <ControlBarPlayer
                videoRef={videoEl}
                onPlayPause={handlePlayPause}
                playing={playing}
                muted={muted}
                durationsPlayer={durationPlayer}
                currentTime={playedSeconds}
                handleFullScreen={toggleFullScreen1}
                onMute={handleMute}
                onChangeVol={handleChangeVol}
                onChangeVolDrag={handleChangeVolDrag}
                volume={volume}
                // isLive={isLive}
                videoStatus={type}
              />
            </div>
          </div>
        )}
        {/* {loading && (
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
        {errorVideo && <div className={classes.loading} />} */}
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
    height: '100%',
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
