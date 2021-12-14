import { Box, Icon, makeStyles, Slider, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  muted?: boolean
  onMute?: () => void
  onChangeVol?: (_, value) => void
  onChangeVolDrag?: (_, value) => void
  volume?: number
  isLive?: boolean | null
  videoStatus?: number
  onReloadTime?: () => void
  handleOnRestart?: () => void
}

const ControlBarPlayer: React.FC<ControlProps> = ({
  videoRef,
  onPlayPause,
  playing = false,
  currentTime,
  durationsPlayer,
  handleFullScreen,
  muted,
  onMute,
  onChangeVol,
  onChangeVolDrag,
  volume,
  isLive = null,
  videoStatus,
  // onReloadTime,
  handleOnRestart,
}) => {
  const classes = useStyles({ liveStreaming: durationsPlayer === currentTime ? true : false })
  const { t } = useTranslation('common')
  const [isFull, setFull] = useState<boolean>(false)

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

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        setFull(true)
      } else {
        setFull(false)
      }
    })
  }, [])

  return (
    // <div className={classes.controlBar}>
    <>
      <div className={classes.controlLeft}>
        <Play onPlayPause={onPlayPause} playing={playing} />
        <Reload
          videoRef={videoRef}
          typeButton={'reload'}
          onPressCallback={handleOnRestart}
          videoStatus={videoStatus}
          durationsPlayer={durationsPlayer}
        />
        <Box className={classes.buttonVolume}>
          <Box className={classes.boxIconVolume} onClick={onMute} data-tip data-for="mute">
            {!muted ? (
              <img src={'/images/ic_volume.svg'} />
            ) : (
              <Icon fontSize={'small'} className={`fas fa-volume-mute ${classes.mutedIcon}`} />
            )}
          </Box>
          <PlayerTooltip id={'mute'} title={!muted ? t('videos_top_tab.mute') : t('videos_top_tab.unmute')} offset={{ top: -5, left: 0 }} />
          <div className={classes.slider}>
            <Slider
              max={1}
              min={0}
              value={volume}
              step={0.1}
              className={classes.volumeBar}
              onChange={onChangeVol}
              onChangeCommitted={onChangeVolDrag}
            />
          </div>
        </Box>

        <div className={classes.time}>
          <TimeBar statusVideo={videoStatus} currentTime={currentTime} durationsPlayer={durationsPlayer} />
        </div>
        {!isLive && isLive !== null && (
          <>
            <Reload
              videoRef={videoRef}
              typeButton={'previous'}
              currentTime={currentTime}
              durationsPlayer={durationsPlayer}
              isLive={isLive}
            />
            <Reload videoRef={videoRef} typeButton={'next'} currentTime={currentTime} durationsPlayer={durationsPlayer} isLive={isLive} />
          </>
        )}
        {/* dot live streaming */}
        {isLive && isLive !== null && (
          <>
            <div className={classes.liveStreaming}>
              {/* <div className={classes.dot} /> */}
              <div className={classes.dotAlwaysHighLight} />
            </div>
            {/* <div className={classes.btnRefreshTime} onClick={onReloadTime}>
              <Typography className={classes.textRefresh}>{t('live_stream_screen.refresh_new_live')}</Typography>
            </div> */}
            <div className={classes.btnRefreshTimeLive}>
              <Typography className={classes.textRefreshLive}>{t('live_stream_screen.tag_live_control')}</Typography>
            </div>
          </>
        )}
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
          offset={
            !isFull
              ? { top: -10, left: 10 }
              : {
                  top: 0,
                  left: 0,
                }
          }
          place={!isFull ? 'top' : 'left'}
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
    cursor: 'pointer',
  },
  time: {
    //  borderWidth:1,
    // borderStyle:'solid',
    alignItems: 'center',
    display: 'flex',
    padding: '0px 8px 0px 8px',
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
    // marginRight: 8,
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
    cursor: 'pointer',
    padding: '0px 0px 0px 8px',
  },
  playerTooltip: {
    padding: '5px 7px !important',
    transition: 'opacity 0.3s ease-out',
  },
  liveStreaming: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  dot: (props: { liveStreaming: boolean }) => {
    return {
      background: props.liveStreaming ? 'red' : '#FFFFFF4D',
      width: 8,
      height: 8,
      borderRadius: 4,
    }
  },
  textStatus: {
    fontSize: 13,
    color: '#fff',
    paddingLeft: 4,
  },
  btnRefreshTime: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    marginLeft: 8,
  },
  textRefresh: {
    fontSize: 11,
    color: '#fff',
    borderRadius: 15,
    border: '1px solid #FFFFFF4D',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    padding: '2px 3px 1px 3px',
    // background: '#FF4786'
  },
  dotAlwaysHighLight: {
    background: 'red',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  btnRefreshTimeLive: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer',
    marginLeft: 8,
  },
  textRefreshLive: {
    fontSize: 12,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
}))

export default memo(ControlBarPlayer)
