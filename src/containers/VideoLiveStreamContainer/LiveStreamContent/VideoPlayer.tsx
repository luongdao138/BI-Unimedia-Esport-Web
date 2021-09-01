import { makeStyles } from '@material-ui/core'
import { VideoPlayerType } from '@services/videoTop.services'
import { Colors } from '@theme/colors'
import React, { useEffect, useRef, useState } from 'react'
import { Player, ControlBar, BigPlayButton, LoadingSpinner, ProgressControl } from 'video-react'
import ControlBarPlayer from './ControlBar'

interface PlayerProps {
  src: string
  thumbnail?: string
}

const VideoPlayer: React.FC<PlayerProps> = ({ src, thumbnail }) => {
  const classes = useStyles()
  const playerRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [playState, setPlayState] = useState<VideoPlayerType>()
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeValue] = useState<number>(1)

  useEffect(() => {
    playerRef.current.subscribeToStateChange(handleStateChange)
  })

  const handleStateChange = (state) => {
    setPlayState(state)
    setCurrentTime(state.currentTime)
  }

  useEffect(() => {
    const { player } = playerRef.current.getState()
    setCurrentTime(player.currentTime)
    setDuration(player.duration)
  }, [currentTime])

  const onTogglePlay = () => {
    if (playState?.paused) {
      playerRef.current.play()
    } else {
      playerRef.current.pause()
    }
  }

  const onReLoad = () => {
    playerRef.current.load()
  }

  const onChangeCurrentTime = (seconds: number) => {
    return () => {
      const { player } = playerRef.current.getState()
      playerRef.current.seek(player.currentTime + seconds) // previous/next 10s
    }
  }

  const toggleFullscreen = () => {
    playerRef.current.toggleFullscreen()
  }

  const onMuteVolume = () => {
    return () => {
      const { player } = playerRef.current.getState()
      playerRef.current.muted = !player.muted
    }
  }

  const onHandleVolume = () => {
    return () => {
      playerRef.current.volume = volume
    }
  }
  const setVolume = (value?: number) => {
    setVolumeValue(value)
  }

  // const getPercent = () => {
  //   const time = currentTime;
  //   const percent = time / duration;
  //   const process = ((percent >= 1 ? 1 : percent) * 100).toFixed(2) + "%";
  //   return process
  // }

  return (
    <>
      <Player
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
        <LoadingSpinner />
        <ControlBar disableDefaultControls={true}>
          {/* <VolumeMenuButton /> */}
          {/* <ReplayControl seconds={10} order={2.2} /> */}
        </ControlBar>
        {playState?.paused && (
          <div className={classes.playOverView}>
            {/* <Icon fontSize="large" className={`fas fa-play ${classes.fontSizeLarge}`} /> */}
            <img src={'/images/ic_play_big.svg'} />
          </div>
        )}
        <div className={classes.controlBar}>
          <ControlBarPlayer
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
          />
        </div>
      </Player>
    </>
  )
}

const useStyles = makeStyles(() => ({
  process: {
    zIndex: 1,
    opacity: 0,
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
  controlBar: {
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
    zIndex: 99,
    transition: 'opacity 0.3s ease-in',
    opacity: 0,
  },
  fontSizeLarge: {
    fontSize: 100,
    color: Colors.white,
  },
}))

export default VideoPlayer
