// import ESLoader from '@components/Loader'
import { makeStyles, Theme } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { useEffect, useRef } from 'react'
// import { Player, ControlBar, BigPlayButton, ProgressControl } from 'video-react'
import ControlBarPlayer from './ControlBar'
import SeekBar from './ControlComponent/SeekBar'

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
  const videoEl = useRef(null)
  const STREAM_PLAYBACK_URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'

  const { IVSPlayer } = window
  const { isPlayerSupported } = IVSPlayer

  useEffect(() => {
    const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState
    const { ERROR } = IVSPlayer.PlayerEventType
    if (!isPlayerSupported) {
      console.warn('The current browser does not support the Amazon IVS player.')

      return
    }

    const onStateChange = () => {
      const playerState = player.current.getState()
      console.warn(`Player State - ${playerState} `)
    }
    const onError = (err) => {
      console.warn('Player Event - ERROR:', err)
    }
    // const metaData = (cue) => {
    //   const metadataText = cue.text;
    //   const position = player.current.getPosition().toFixed(2);
    //   console.warn(
    //     `PlayerEvent - TEXT_METADATA_CUE: "${metadataText}". Observed ${position}s after playback started.`
    //   );
    // };

    player.current = IVSPlayer.create() //MediaPlayer
    player.current.attachHTMLVideoElement(videoEl.current)
    player.current.load(STREAM_PLAYBACK_URL)
    player.current.play()
    player.current.setAutoplay(true)

    player.current.addEventListener(READY, onStateChange)
    player.current.addEventListener(PLAYING, onStateChange)
    player.current.addEventListener(ENDED, onStateChange)
    player.current.addEventListener(ERROR, onError)
    // player.current.addEventListener(TEXT_METADATA_CUE, metaData);

    return () => {
      player.current.removeEventListener(READY, onStateChange)
      player.current.removeEventListener(PLAYING, onStateChange)
      player.current.removeEventListener(ENDED, onStateChange)
      player.current.removeEventListener(ERROR, onError)
      // player.current.removeEventListener(TEXT_METADATA_CUE, metaData);
    }
  }, [IVSPlayer, isPlayerSupported, STREAM_PLAYBACK_URL])

  // useEffect(() => {
  //   setCurrentTime(player.current.getPosition())
  //   setDuration(player.current.getDuration())
  //   setIsMuted(videoEl.current.muted)
  //   setVolumeValue(videoEl.current.muted ? 1 : 0)
  // })

  const onHandleVolume = (value) => {
    videoEl.current.muted = false
    videoEl.current.volume = value
    player.current.setVolume(value)
  }

  return (
    <div className={classes.videoPlayer}>
      <video ref={videoEl} playsInline style={{ width: '100%', height: '100%' }} src={STREAM_PLAYBACK_URL} autoPlay id={'videoId'} />
      <div className={classes.seekSlider}>
        <SeekBar videoRef={videoEl} />
      </div>

      <div className={classes.controlBar}>
        <ControlBarPlayer
          onChangeVolume={(value) => {
            onHandleVolume(value)
          }}
          videoRef={videoEl}
          videoId={document.getElementById('videoId')}
        />
      </div>
      {/* <div className={classes.blurBackground} /> */}
      {/* </div> */}
      {/* <Player
        ref={playerRef}
        src={src}
        autoPlay={true}
        fluid={false}
        height={'448px'}
        width="100%"
        videoWidth={'100%'}
        videoHeight={'448px'}
        poster={thumbnail}
        className={classes.videoPlayerCustom}
      >
        <BigPlayButton className={classes.bigPlayButton} />
        <ProgressControl className={classes.process} />
        <ControlBar disableDefaultControls={true} />
        {playState?.paused && (
          <div className={classes.playOverView}>
            <Icon className={`fas fa-play ${classes.fontSizeLarge}`} /> */}
      {/* <img src={'/images/ic_play_big.svg'} /> */}
      {/* </div>
        )}
        {(playState?.error === null && !playState.waiting) ||
          (playState?.readyState !== 0 && (
            <div className={classes.playOverView}>
              <ESLoader />
            </div>
          ))}

        <div className={classes.controlBar}> */}
      {/* <ControlBarPlayer
            currentTime={currentTime}
            duration={duration}
            paused={playState?.paused}
            isFullscreen={playState?.isFullscreen}
            muted={playState?.muted}
            volume={playState?.volume}
            onTogglePlay={onTogglePlay}
            onReLoad={onReLoad}
            onPrevious={onChangeCurrentTime(-10)}
            onNext={onChangeCurrentTime(10)}
            fullScreen={toggleFullscreen}
            onMuteVolume={onMuteVolume()}
            onChangeVolume={onHandleVolume()}
            setVolume={setVolume}
            statusVideo={statusVideo}
          />
        </div>
      </Player> */}
      {/* {playState?.ended && <div className={classes.blurBackground} />} */}
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
}))

export default VideoPlayer
