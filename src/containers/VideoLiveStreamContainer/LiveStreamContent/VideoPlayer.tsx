// import ESLoader from '@components/Loader'
import { makeStyles, Theme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { useEffect, useRef, useState } from 'react'
// import { Player, ControlBar, BigPlayButton, ProgressControl } from 'video-react'
import ControlBarPlayer from './ControlBar'
import SeekBar from './ControlComponent/SeekBar'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'

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

const VideoPlayer: React.FC<PlayerProps> = () => {
  const checkStatusVideo = 1
  const classes = useStyles({ checkStatusVideo })

  const player = useRef(null)
  const STREAM_PLAYBACK_URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  // const STREAM_PLAYBACK_URL = 'https://usher.ttvnw.net/api/lvs/hls/lvs.lvs-client-example.c6341be8-a3c7-42bc-b89a-8dabe040eae9.m3u8'

  const { IVSPlayer } = window
  const { isPlayerSupported } = IVSPlayer
  const [durationPlayer, setDurationPlayer] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const reactPlayerRef = useRef(null)
  const playerContainerRef = useRef(null)
  const [isLive, setIsLive] = useState(false)
  const [state, setState] = useState({
    playing: false,
  })
  const [volumePlayer, setVolumePlayer] = useState(1)

  const onProgress = (event) => {
    setPlayedSeconds(event.playedSeconds)
    if (isLive) {
      setDurationPlayer(event.loadedSeconds)
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
      console.warn(`Player State - ${playerState} - ${player.current.getDuration()}--${player.current.getBuffered()}`)
      setIsLive(player.current.getDuration() === Infinity ? true : false)
    }
    const onError = (err) => {
      console.warn('Player Event - ERROR:', err)
    }

    player.current = IVSPlayer.create() //MediaPlayer
    // player.current.attachHTMLVideoElement(videoEl.current)
    player.current.load(STREAM_PLAYBACK_URL)
    player.current.play()
    player.current.setAutoplay(true)

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
    STREAM_PLAYBACK_URL,
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

  const onHandleVolume = (value) => {
    setVolumePlayer(value)
  }

  const toggleFullScreen = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    screenfull.toggle(playerContainerRef.current)
  }

  const { playing } = state
  return (
    <div className={classes.videoPlayer}>
      <div ref={playerContainerRef} className={classes.playerContainer}>
        <ReactPlayer
          ref={reactPlayerRef}
          url={STREAM_PLAYBACK_URL}
          // controls
          playsinline
          width="100%"
          height={'100%'}
          playing={playing}
          onProgress={onProgress}
          onDuration={onDuration}
          // onBuffer={onBuffer}
          onPlay={onPlay}
          onPause={onPause}
          volume={volumePlayer}
          className={classes.reactPlayer}
        />

        <div className={classes.processControl}>
          <SeekBar videoRef={reactPlayerRef} durationsPlayer={durationPlayer} currentTime={playedSeconds} />
          <div className={classes.controlOut}>
            <ControlBarPlayer
              onChangeVolume={(value) => {
                onHandleVolume(value)
              }}
              videoRef={reactPlayerRef}
              onPlayPause={handlePlayPause}
              playing={playing}
              durationsPlayer={durationPlayer}
              currentTime={playedSeconds}
              handleFullScreen={toggleFullScreen}
            />
          </div>
        </div>
      </div>
      {/* {playState?.ended && <div className={classes.blurBackground} />} 
       {playState?.paused && (
          <div className={classes.playOverView}>
            <Icon className={`fas fa-play ${classes.fontSizeLarge}`} /> 
       <img src={'/images/ic_play_big.svg'} /> 
       </div>
        )}
        {(playState?.error === null && !playState.waiting) ||
          (playState?.readyState !== 0 && (
            <div className={classes.playOverView}>
              <ESLoader />
            </div>
          ))} */}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  process: (props: { checkStatusVideo: number }) => {
    return {
      zIndex: 1,
      opacity: props.checkStatusVideo === 1 ? 1 : 0, //always show controlBar by status video
      '& .video-react-slider-bar': {},
      '& .video-react-play-progress': {
        backgroundColor: '#FF4786',
        height: 7,
      },
      '& .video-react-progress-holder': {
        backgroundColor: '#4D4D4D',
        position: 'absolute',
        bottom: 40,
        width: '100%',
        height: 7,
      },
      '& .video-react-control-text': {
        display: 'none',
      },
      '& .video-react-load-progress': {},
    }
  },
  bigPlayButton: {
    display: 'none',
    '& .video-react-big-play-button': {},
    '& .video-react-big-play-button-left': {},
    '& .video-react-control-text': {
      display: 'none',
    },
  },
  playOverView: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [theme.breakpoints.down('xs')]: {
    fontSizeLarge: {
      fontSize: '50px',
    },
  },
  //video-react-video
  videoPlayerCustom: {
    '& .video-react-video': {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    '&:hover $controlBar': {
      transition: 'opacity 0.3s ease-in',
      opacity: 1,
    },
    '&:hover $process': {
      opacity: 1,
      transition: 'opacity 0.3s ease-in',
    },
  },
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
    backgroundColor: 'rgba(0,0,0,0.3)',
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
      zIndex: 9,
      // transition: 'opacity 0.3s ease-in',
      opacity: props.checkStatusVideo === 1 ? 1 : 0, //always show controlBar by status video
    }
  },
  playerContainer: {},
  reactPlayer: {
    '&:hover $.videoPlayer': {
      transition: 'opacity 0.3s ease-in',
      opacity: 1,
      backgroundColor: 'yellow',
    },
  },
}))

export default VideoPlayer
