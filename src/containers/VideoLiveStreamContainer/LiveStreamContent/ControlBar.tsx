import { Box, Icon, makeStyles, Slider } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { VIDEO_TYPE } from '..'
import Play from './ControlComponent/Play'
import PlayerTooltip from './ControlComponent/PlayerTooltip'
import Reload from './ControlComponent/Reload'
import TimeBar from './ControlComponent/TimeBar'
interface ControlProps {
  videoRef?: any
  onPlayPause?: () => void
  playing?: boolean
  currentTime?: number
  durationsPlayer?: number
  handleFullScreen?: () => void
  onChangeVolume?: (value?: number) => void
  muted?: boolean
  onMute?: () => void
}

const ControlBarPlayer: React.FC<ControlProps> = ({
  onChangeVolume,
  videoRef,
  onPlayPause,
  playing = false,
  currentTime,
  durationsPlayer,
  handleFullScreen,
  muted,
  onMute,
}) => {
  const classes = useStyles()
  const { t } = useTranslation('common')
  const [volumeValue, setVolumeValue] = useState<number>(1)
  const [isMuted, setIsMuted] = useState<boolean>(muted)
  const [isFull, setFull] = useState<boolean>(false)

  const handleChange = (_, newValue) => {
    setVolumeValue(newValue)
    // setVolume(newValue)
    setIsMuted(newValue !== 0 ? false : true)
    onChangeVolume(newValue)
  }
  const handleClickChange = (_, value) => {
    setVolumeValue(value)
    // setVolume(newValue)
    setIsMuted(value !== 0 ? false : true)
    onChangeVolume(value)
  }
  const matchMuteVolume = () => {
    setIsMuted(!isMuted)
    setVolumeValue(!isMuted ? 0 : 1)
    onChangeVolume(!isMuted ? 0 : 1)
    onMute()
  }

  //Tooltip
  // const PlayerTooltip = (id: string, title: string, offset?: any) => {
  //   return (
  //     <ReactTooltip id={id} type="dark" effect="solid" className={classes.playerTooltip} offset={offset || { top: -10, left: 10 }}>
  //       <span>{title}</span>
  //     </ReactTooltip>
  //   )
  // }
  const toggleFullScreen = () => {
    handleFullScreen()
    setFull(!isFull)
  }

  return (
    // <div className={classes.controlBar}>
    <>
      <div className={classes.controlLeft}>
        <Play onPlayPause={onPlayPause} playing={playing} />
        <Reload videoRef={videoRef} typeButton={'reload'} />
        <Box className={classes.buttonVolume}>
          <Box
            className={classes.boxIconVolume}
            onClick={() => {
              matchMuteVolume()
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
          <PlayerTooltip
            id={'mute'}
            title={!isMuted ? t('videos_top_tab.mute') : t('videos_top_tab.unmute')}
            offset={{ top: -2, left: 0 }}
          />
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
          <TimeBar statusVideo={VIDEO_TYPE.LIVE_STREAM} currentTime={currentTime} durationsPlayer={durationsPlayer} />
        </div>
        <Reload videoRef={videoRef} typeButton={'previous'} currentTime={currentTime} durationsPlayer={durationsPlayer} />
        <Reload videoRef={videoRef} typeButton={'next'} currentTime={currentTime} durationsPlayer={durationsPlayer} />
      </div>
      <Box pr={2} className={classes.buttonNormal} onClick={toggleFullScreen} data-tip data-for="toggleFullScreen" id={'fullscreenRef'}>
        {!isFull ? (
          <img src={'/images/ic_full_screen.svg'} />
        ) : (
          <Icon fontSize={'small'} className={`fas fa-compress ${classes.pauseSmall}`} />
        )}
        <PlayerTooltip
          id={'toggleFullScreen'}
          title={!isFull ? t('videos_top_tab.full_screen') : t('videos_top_tab.exit_full_screen')}
          offset={{ top: -10, left: 10 }}
        />
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
