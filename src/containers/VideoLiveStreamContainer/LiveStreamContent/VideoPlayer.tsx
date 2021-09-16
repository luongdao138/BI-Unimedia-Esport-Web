/* eslint-disable no-console */
// import ESLoader from '@components/Loader'
import { Icon, makeStyles, Theme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { memo, useEffect, useRef, useState } from 'react'
// import { Player, ControlBar, BigPlayButton, ProgressControl } from 'video-react'
import ControlBarPlayer from './ControlBar'
import SeekBar from './ControlComponent/SeekBar'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import ESLoader from '@components/Loader'

import useDetailVideo from '../useDetailVideo'
interface PlayerProps {
  src?: string
  thumbnail?: string
  statusVideo?: number
}
declare global {
  interface Window {
    IVSPlayer: any
  }
}

const VideoPlayer: React.FC<PlayerProps> = ({ src }) => {
  const checkStatusVideo = 1
  const classes = useStyles({ checkStatusVideo })

  const player = useRef(null)
  // const videoEl = useRef(null)
  // const STREAM_PLAYBACK_URL = 'https://62a8db2bbfb6.us-west-2.playback.live-video.net/api/video/v1/us-west-2.615813521463.channel.UIkHcKPfQp9p.m3u8'
  // const STREAM_PLAYBACK_URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  // const STREAM_PLAYBACK_URL = 'https://usher.ttvnw.net/api/lvs/hls/lvs.lvs-client-example.c6341be8-a3c7-42bc-b89a-8dabe040eae9.m3u8'

  const { IVSPlayer } = window
  const { isPlayerSupported } = IVSPlayer
  const [durationPlayer, setDurationPlayer] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const reactPlayerRef = useRef(null)
  const playerContainerRef = useRef(null)
  const [isLive, setIsLive] = useState(false)

  //As of Chrome 66, videos must be muted in order to play automatically
  const [state, setState] = useState({
    playing: false,
    muted: true,
    volume: 0,
    ended: false,
    loading: true,
  })

  const {
    changeStreamingSecond,
    streamingSecond,
    changeIsViewingStream,
    isViewingStream,
    changePlayedSecond,
    playedSecond,
  } = useDetailVideo()

  // useEffect(() => {
  //   if(Math.floor(playedSeconds) !== streamingSecond) {
  //     changeStreamingSecond(Math.floor(playedSeconds))
  //   }
  // }, [playedSeconds])

  // useEffect(() => {
  //   console.log("🚀 ~ useEffect ~ durationPlayer", durationPlayer)
  // }, [durationPlayer])

  const onProgress = (event) => {
    console.log('🚀 ~ onProgress ~ 1111-----playedSeconds', event, src)
    console.log('🚀 ~ onProgress ~ 2222-----playedSeconds', event.playedSeconds)
    console.log('🚀 ~ onProgress ~ 3333-----loadedSeconds', event.loadedSeconds)
    setState({ ...state, loading: false })
    if (isLive) {
      setDurationPlayer(event.loadedSeconds)
    }
    setPlayedSeconds(event.playedSeconds)
    // trigger change streaming second in redux
    if (Math.floor(event.loadedSeconds) !== streamingSecond) {
      let is_viewing_video = true
      if (Math.floor(event.playedSeconds) < Math.floor(event.loadedSeconds)) {
        is_viewing_video = false
      }
      if (isViewingStream !== is_viewing_video) {
        changeIsViewingStream(is_viewing_video)
      }
      changeStreamingSecond(Math.floor(event.loadedSeconds))
    }
    if (Math.floor(event.playedSeconds) !== playedSecond) {
      changePlayedSecond(Math.floor(event.playedSeconds))
    }
  }
  const onDuration = (duration) => {
    if (!isLive) {
      setDurationPlayer(duration) //video archive
    }
  }

  useEffect(() => {
    const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState
    const { ERROR } = IVSPlayer.PlayerEventType
    if (!isPlayerSupported) {
      console.warn('The current browser does not support the Amazon IVS player.')

      return
    }

    const onStateChange = () => {
      const playerState = player.current.getState()
      console.warn(`Player State - ${playerState} - ${player.current.getDuration()}--${player.current.getDuration()}---src===${src}`)
      setIsLive(player.current.getDuration() === Infinity ? true : false)
    }
    const onError = (err) => {
      console.warn('Player Event - ERROR:', err)
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

    return () => {
      player.current.removeEventListener(READY, onStateChange)
      player.current.removeEventListener(PLAYING, onStateChange)
      player.current.removeEventListener(ENDED, onStateChange)
      player.current.removeEventListener(ERROR, onError)
    }
  }, [
    // IVSPlayer,
    // isPlayerSupported,
    src,
  ])

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing })
  }

  const onPlay = () => {
    setState({ ...state, playing: true })
  }
  const onPause = () => {
    setState({ ...state, playing: false })
  }

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
    setState({ ...state, ended: true })
  }
  const handlePlayPauseOut = () => {
    setState({ ...state, playing: !state.playing })
  }
  const onError = (error, data) => {
    console.warn('onError player', error, data)
  }
  const onBuffer = () => {
    setState({ ...state, loading: true })
  }
  const onSeek = () => {
    setState({ ...state, loading: true })
  }
  const onReady = () => {
    setState({ ...state, loading: false })
  }

  const { playing, muted, volume, ended, loading } = state
  return (
    <div className={classes.videoPlayer}>
      {/* <video ref={videoEl} controls playsinline src={STREAM_PLAYBACK_URL}></video> */}
      <div ref={playerContainerRef} className={classes.playerContainer}>
        <div style={{ height: '100%' }} onClick={handlePlayPauseOut}>
          <ReactPlayer
            ref={reactPlayerRef}
            url={src}
            playsinline
            width="100%"
            height={'100%'}
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
                  autoPlay: false,
                  muted: muted,
                  volume: volume,
                },
              },
            }}
            onError={onError}
            onReady={onReady}
            onSeek={onSeek}
          />
          {ended ||
            (!playing && (
              <div className={classes.playOverView}>
                <Icon className={`fas fa-play ${classes.fontSizeLarge}`} />
              </div>
            ))}
        </div>

        <div className={classes.processControl}>
          <SeekBar videoRef={reactPlayerRef} durationsPlayer={durationPlayer} currentTime={playedSeconds} />
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
            />
          </div>
        </div>
        {loading && (
          <div className={classes.loading}>
            <ESLoader />
          </div>
        )}
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
  [theme.breakpoints.down('xs')]: {
    fontSizeLarge: {
      fontSize: '50px',
    },
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
  processControl: (props: { checkStatusVideo: number }) => {
    return {
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
      // transition: 'opacity 0.3s ease-in',
      opacity: props.checkStatusVideo === 1 ? 1 : 0, //always show controlBar by status video
      background: 'linear-gradient(rgb(128 128 128 / 0%) 20%, rgb(39 39 39) 100%)',
    }
  },
  playerContainer: {},
  reactPlayer: {
    '&:hover $.processControl': {
      transition: 'opacity 0.3s ease-in',
      opacity: 1,
      backgroundColor: 'yellow',
    },
  },
}))

export default memo(VideoPlayer)
