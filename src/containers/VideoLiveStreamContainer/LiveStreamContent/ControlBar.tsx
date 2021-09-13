import { Box, Icon, makeStyles, Slider } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { memo, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { VIDEO_TYPE } from '..'
import Play from './ControlComponent/Play'
import Reload from './ControlComponent/Reload'
import TimeBar from './ControlComponent/TimeBar'
interface ControlProps {
  isFullscreen?: boolean
  onChangeVolume?: (value?: number) => void
  videoRef?: any
  videoId?: any
}

const ControlBarPlayer: React.FC<ControlProps> = ({ isFullscreen = false, onChangeVolume, videoRef, videoId }) => {
  const classes = useStyles()
  const [volumeValue, setVolumeValue] = useState<number>(0)
  const [isMuted, setIsMuted] = useState<boolean>(true)

  const handleChange = (_, newValue) => {
    setVolumeValue(newValue)
    // setVolume(newValue)
    setIsMuted(newValue !== 0 ? false : true)

    videoRef.current.volume = newValue
    videoRef.current.muted = newValue !== 0 ? false : true
    onChangeVolume(newValue)
  }
  const handleClickChange = (_, value) => {
    setVolumeValue(value)
    // setVolume(newValue)
    setIsMuted(value !== 0 ? false : true)

    videoRef.current.volume = value
    videoRef.current.muted = value !== 0 ? false : true
    onChangeVolume(value)
  }
  const matchMuteVolume = () => {
    setIsMuted(!isMuted)
    videoRef.current.muted = !videoRef.current.muted
    videoRef.current.volume = !videoRef.current.muted ? 1 : 0
    setVolumeValue(videoRef.current.volume)
  }

  //Tooltip
  const PlayerTooltip = (id: string, title: string, offset?: any) => {
    return (
      <ReactTooltip id={id} type="dark" effect="solid" className={classes.playerTooltip} offset={offset || { top: -10, left: 10 }}>
        <span>{title}</span>
      </ReactTooltip>
    )
  }
  const fullscreenRef = document.getElementById('fullscreenRef')
  const fullScreenFUNC = () => {
    fullscreenRef.addEventListener('click', function () {
      console.warn('=====fullscreenRef =====', videoId.requestFullscreen)
      if (videoId.requestFullscreen) {
        videoId.requestFullscreen()
      } else if (videoId.mozRequestFullScreen) {
        videoId.mozRequestFullScreen() // Firefox
      } else if (videoId.webkitRequestFullscreen) {
        videoId.webkitRequestFullscreen() // Chrome and Safari
      }
    })
  }

  return (
    // <div className={classes.controlBar}>
    <>
      <div className={classes.controlLeft}>
        {/* <Box pr={2} className={classes.buttonNormal} onClick={onTogglePlay} data-tip data-for="togglePlay">
          {paused ? (
            <img src={'/images/ic_play_small.svg'} />
          ) : (
            <Icon fontSize={'small'} className={`fas fa-pause ${classes.pauseSmall}`} />
          )}
          {PlayerTooltip('togglePlay', paused ? '再生' : '一時停止')}
        </Box> */}

        <Play videoRef={videoRef} />

        {/* <Box pr={2} className={classes.buttonNormal} onClick={onReLoad} data-tip data-for="reload">
          <img src={'/images/ic_reload.svg'} />
          {PlayerTooltip('reload', '再読み込み')}
        </Box> */}
        <Reload videoRef={videoRef} typeButton={'reload'} />
        <Box className={classes.buttonVolume}>
          <Box
            className={classes.boxIconVolume}
            onClick={() => {
              matchMuteVolume()
              // onMuteVolume()
            }}
            data-tip
            data-for="mute"
          >
            {!isMuted ? (
              <img src={'/images/ic_volume.svg'} />
            ) : (
              <Icon fontSize={'small'} className={`fas fa-volume-mute ${classes.mutedIcon}`} />
            )}
          </Box>
          {PlayerTooltip('mute', !isMuted ? 'ミュート' : 'ミュート解除', { top: 0, left: 0 })}
          <div className={classes.slider}>
            <Slider
              max={1}
              min={0}
              value={volumeValue}
              step={0.1}
              className={classes.volumeBar}
              onChange={handleChange}
              onChangeCommitted={handleClickChange}
            />
          </div>
        </Box>

        <div className={classes.time}>
          <TimeBar videoRef={videoRef} statusVideo={VIDEO_TYPE.LIVE_STREAM} />
        </div>
        {/* <Box pl={2} className={classes.buttonNormal} onClick={onPrevious}>
          <img src={'/images/ic_previous.svg'} />
        </Box>
        <Box pl={2} className={classes.buttonNormal} onClick={onNext}>
          <img src={'/images/ic_next.svg'} />
        </Box> */}
        <Reload videoRef={videoRef} typeButton={'previous'} />
        <Reload videoRef={videoRef} typeButton={'next'} />
      </div>
      <Box pr={2} className={classes.buttonNormal} onClick={fullScreenFUNC} data-tip data-for="toggleFullScreen" id={'fullscreenRef'}>
        {!isFullscreen ? (
          <img src={'/images/ic_full_screen.svg'} />
        ) : (
          <Icon fontSize={'small'} className={`fas fa-compress ${classes.pauseSmall}`} />
        )}
        {PlayerTooltip('toggleFullScreen', !isFullscreen ? '全画面モード' : '全画面モードの終了', { top: 0, left: 10 })}
      </Box>
    </>
    // </div>
  )
}

const useStyles = makeStyles(() => ({
  fontSizeLarge: {
    fontSize: 100,
  },
  controlLeft: {
    display: 'flex',
  },
  controlBar: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(255,71,134,0.5)',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 26,
    justifyContent: 'space-between',
    zIndex: 99,
  },
  buttonNormal: {
    alignItems: 'center',
    display: 'flex',
  },
  time: {
    //  borderWidth:1,
    // borderStyle:'solid',
    alignItems: 'center',
    display: 'flex',
    paddingLeft: 16,
  },
  textTime: {
    fontSize: 15,
    color: Colors.white,
  },
  pauseSmall: {
    color: Colors.white,
    fontSize: 15,
  },
  buttonVolume: {
    alignItems: 'center',
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'row',
    '&:hover $slider': {
      width: 120,
      cursor: 'pointer',
    },
  },
  slider: {
    width: 0,
    display: 'block',
    transition: 'width 0.4s ease-in',
    overflow: 'hidden',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  volumeBar: {
    width: 90,
    marginLeft: 16,
    marginRight: 8,
    borderRadius: 2,
    '& .MuiSlider-rail': {
      color: '#C3C3C3',
      height: 4,
      borderRadius: 2,
    },
    '& .MuiSlider-track': {
      color: '#FF4786',
      height: 4,
      borderRadius: 2,
    },
    '& .MuiSlider-thumb': {
      color: Colors.white,
      width: 14,
      height: 14,
      borderRadius: 7,
    },
    '& .MuiSlider-thumb.Mui-focusVisible, .MuiSlider-thumb:hover': {
      boxShadow: 'none',
    },
  },
  mutedIcon: {
    color: Colors.white,
    fontSize: 23,
  },
  boxIconVolume: {
    alignItems: 'center',
    display: 'flex',
  },
  playerTooltip: {
    padding: '5px 7px !important',
    transition: 'opacity 0.3s ease-out',
  },
}))

export default memo(ControlBarPlayer)
