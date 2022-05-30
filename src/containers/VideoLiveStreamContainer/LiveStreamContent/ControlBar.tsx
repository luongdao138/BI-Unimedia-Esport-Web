import ReportPanel from '@containers/VideoLiveStreamContainer/LiveStreamContent/ReportPanel'
import SettingPanel from '@containers/VideoLiveStreamContainer/LiveStreamContent/SettingPanel'
import VideoResolutionPanel from '@containers/VideoLiveStreamContainer/LiveStreamContent/VideoResolutionPanel'
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
import useLiveStreamDetail from '@containers/VideoLiveStreamContainer/useLiveStreamDetail'
import { Box, ClickAwayListener, Icon, makeStyles, Slider, Theme, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Crop54 as TheatreViewMode, Crop75 as NormalViewMode } from '@material-ui/icons'
import { VIDEO_RESOLUTION } from '@services/liveStreamDetail.service'
import { QualitiesType } from '@services/videoTop.services'
import { Colors } from '@theme/colors'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'
import Play from '@containers/VideoLiveStreamContainer/LiveStreamContent/ControlComponent/Play'
import PlayerTooltip from '@containers/VideoLiveStreamContainer/LiveStreamContent/ControlComponent/PlayerTooltip'
import Reload from '@containers/VideoLiveStreamContainer/LiveStreamContent/ControlComponent/Reload'
import TimeBar from '@containers/VideoLiveStreamContainer/LiveStreamContent/ControlComponent/TimeBar'
import { useControlBarContext } from '@containers/VideoLiveStreamContainer/VideoContext/ControlBarContext'

interface ControlProps {
  ref: any
  videoRef?: any
  onPlayPause?: () => void
  playing?: boolean
  handleFullScreen?: () => void
  muted?: boolean
  onMute?: () => void
  onChangeVol?: (_, value) => void
  volume?: number
  isLive?: boolean | null
  videoStatus?: number
  onReloadTime?: () => void
  handleOnRestart?: () => void
  resultResolution?: (index?: number, flag?: boolean, item?: string) => void
  qualities?: Array<QualitiesType>
  videoType?: any
  isStreaming: boolean
  isStreamingEnd: React.MutableRefObject<boolean>
  onVideoEnd?: () => void
  changeRef: any
  state: {
    playing: boolean
    muted: boolean
    volume: number
    ended: boolean
  }
  playedSeconds: number
  durationPlayer: number
  isFull?: boolean
}

export enum SettingPanelState {
  NONE,
  MAIN_DISPLAY,
  VIDEO_RESOLUTION,
  REPORT_PANEL,
  PLAY_SPEED,
}

const ControlBarPlayer: React.FC<ControlProps> = forwardRef(
  (
    {
      videoRef,
      onPlayPause,
      playing = false,
      handleFullScreen,
      muted,
      onMute,
      onChangeVol,
      volume,
      isLive = null,
      videoStatus,
      // onReloadTime,
      handleOnRestart,
      resultResolution,
      qualities,
      onVideoEnd,
      videoType,
      state,
      isStreaming,
      isStreamingEnd,
      playedSeconds,
      durationPlayer,
      changeRef,
      isFull,
    },
    ref
  ) => {
    // duration and timeupdate state
    //  const [durationPlayer, setDurationPlayer] = useState(0)
    //  const [playedSeconds, setPlayedSeconds] = useState(0)

    // const classes = useStyles({ liveStreaming: durationPlayer === playedSeconds ? true : false })
    const { t } = useTranslation('common')
    // const [isFull, setFull] = useState<boolean>(false)
    const { changeVideoViewMode, liveStreamInfo } = useDetailVideo()
    const { changeShowSettingPanel, canHideChatTimeoutRef } = useControlBarContext()
    const { is_normal_view_mode } = liveStreamInfo
    const [settingPanel, setSettingPanel] = useState(SettingPanelState.NONE)
    const { changeMiniPlayerState } = useLiveStreamDetail()
    const [resolution, setResolution] = useState(t('videos_top_tab.auto'))
    const [speed, setSpeed] = useState(t('videos_top_tab.standard'))

    const androidPl = /Android/i.test(window.navigator.userAgent)
    const iPhonePl = /iPhone/i.test(window.navigator.userAgent)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true }) || androidPl || iPhonePl
    const durationPlayerRef = useRef<number>(0)
    const playerSecondsRef = useRef<number>(0)
    const classes = useStyles({ liveStreaming: durationPlayerRef.current === playerSecondsRef.current ? true : false })
    const { isChrome } = CommonHelper.getBrowserInfo()
    // console.log('------------- Controlbar rerender -------------');

    const commonProps = { durationPlayer, playedSeconds }

    // useEffect(() => {
    //   videoRef.current.addEventListener('timeupdate', () => {
    //     // const videoInfo = event.target
    //   })

    //   videoRef.current.addEventListener('durationchange', () => {
    //     // const duration = event.target.duration
    //   })
    // }, [])

    function isEnableBtnPIP() {
      if (isMobile) {
        if (!CommonHelper.isDeviceAndroid()) {
          if (CommonHelper.isCheckVersionIOSAllowPIP()) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
      return true
    }
    // console.log('isMobile=>', isMobile)
    // console.log('CommonHelper.versionIOS()=>', CommonHelper.isCheckVersionIOSAllowPIP())
    // console.log('CommonHelper.isDeviceAndroid()=>', CommonHelper.isDeviceAndroid())
    // console.log('isEnablePI=>', isEnableBtnPIP())

    const closeSettingPanel = () => {
      setSettingPanel(SettingPanelState.NONE)
    }

    useImperativeHandle(ref, () => {
      return {
        // isFull: isFull,
        isFull: isChrome ? document.fullscreenElement : document['webkitFullscreenElement'],
        settingPanel: settingPanel,
      }
    })

    useEffect(() => {
      changeShowSettingPanel(settingPanel !== SettingPanelState.NONE)
    }, [settingPanel])

    const tooltipRef = React.createRef<any>()

    const toggleFullScreen = () => {
      handleFullScreen()
      // setFull(!isFull)
    }

    // useEffect(() => {
    //   document.addEventListener('fullscreenchange', () => {
    //     if (document.fullscreenElement) {
    //       setFull(true)
    //     } else {
    //       setFull(false)
    //     }
    //   })
    // }, [])

    const handleOnSettingButtonClick = (e) => {
      // e.stopPropagation()
      CommonHelper.disableOnClickEvent(e)
      setSettingPanel(settingPanel === SettingPanelState.MAIN_DISPLAY ? SettingPanelState.NONE : SettingPanelState.MAIN_DISPLAY)
      // changeIsHoveredVideoStatus(false)
    }

    const handleOnPlaySpeedButtonClick = (e) => {
      CommonHelper.disableOnClickEvent(e)
      // e.stopPropagation()
      setSettingPanel(settingPanel === SettingPanelState.PLAY_SPEED ? SettingPanelState.NONE : SettingPanelState.PLAY_SPEED)
    }

    const handleOnOpenResolutionPanel = () => {
      setSettingPanel(SettingPanelState.VIDEO_RESOLUTION)
    }

    const handleOnResolutionPanelBackClick = () => {
      setSettingPanel(SettingPanelState.MAIN_DISPLAY)
    }

    const handleOnOpenReportPanel = () => {
      setSettingPanel(SettingPanelState.REPORT_PANEL)
    }

    const handleOnReportPanelBackClick = () => {
      setSettingPanel(SettingPanelState.MAIN_DISPLAY)
    }

    const handleOnOpenPlaySpeedPanel = () => {
      setSettingPanel(SettingPanelState.PLAY_SPEED)
    }

    const handleOnMiniPlayerClick = () => {
      changeMiniPlayerState(true)
    }

    const handleSelectedResolution = (item, index) => {
      setResolution(item)
      resultResolution(index, true, item)

      closeSettingPanel()
    }

    const handleChangeSpeed = (item, index) => {
      videoRef.current.playbackRate = !isMobile
        ? parseFloat(index === 1 ? 1.0 : item)
        : parseFloat(item === t('videos_top_tab.standard') ? 1.0 : item)
      setSpeed(item)

      closeSettingPanel()
    }

    const handleQualitiesArray = () => {
      const result = []
      qualities.map((i) => result.push(i.output_name))
      return result
    }

    const handleChangeCanHideControlBar = (value: boolean) => {
      canHideChatTimeoutRef.current = value
    }

    return (
      // <div className={classes.controlBar}>
      <>
        <div
          className={classes.controlLeft}
          onMouseMove={() => handleChangeCanHideControlBar(false)}
          onMouseLeave={() => handleChangeCanHideControlBar(true)}
          onMouseEnter={() => handleChangeCanHideControlBar(false)}
        >
          <Play onPlayPause={onPlayPause} playing={playing} />
          <Reload
            videoRef={videoRef}
            typeButton={'reload'}
            onPressCallback={handleOnRestart}
            videoStatus={videoStatus}
            videoType={videoType}
            isStreaming={isStreaming}
            state={state}
            onVideoEnd={onVideoEnd}
            isStreamingEnd={isStreamingEnd}
            // durationsPlayer={durationsPlayer}
            {...commonProps}
          />
          <Box
            className={classes.buttonVolume}
            onClick={(e) => {
              // e.preventDefault()
              CommonHelper.disableOnClickEvent(e)
            }}
          >
            <Box
              className={classes.boxIconVolume}
              onClick={(e) => {
                CommonHelper.disableOnClickEvent(e)
                // e.stopPropagation()
                onMute()
              }}
              data-tip
              data-for="mute"
            >
              {!muted ? (
                <img src={'/images/ic_volume.svg'} className={classes.sizeVolumeUp} />
              ) : (
                <Icon fontSize={'small'} className={`fas fa-volume-mute ${classes.mutedIcon}`} />
              )}
            </Box>
            <PlayerTooltip
              id={'mute'}
              title={!muted ? t('videos_top_tab.mute') : t('videos_top_tab.unmute')}
              offset={{ top: -5, left: 0 }}
            />
            {!isMobile && (
              <ClickAwayListener
                onClickAway={() => {
                  changeRef.current = 'seek'
                }}
              >
                <div className={classes.slider}>
                  <Slider
                    max={1}
                    min={0}
                    value={volume}
                    step={0.1}
                    className={classes.volumeBar}
                    onChange={onChangeVol}
                    // onChangeCommitted={onChangeVolDrag}
                    onClick={() => {
                      changeRef.current = 'volume'
                    }}
                  />
                </div>
              </ClickAwayListener>
            )}
          </Box>

          <div className={classes.time}>
            <TimeBar
              statusVideo={videoStatus}
              videoRef={videoRef}
              videoType={videoType}
              isStreaming={isStreaming}
              state={state}
              onVideoEnd={onVideoEnd}
              isStreamingEnd={isStreamingEnd}
              {...commonProps}
            />
          </div>
          {!isLive && isLive !== null && !isMobile && (
            <>
              <Reload
                videoRef={videoRef}
                typeButton={'previous'}
                videoType={videoType}
                isStreaming={isStreaming}
                state={state}
                onVideoEnd={onVideoEnd}
                isStreamingEnd={isStreamingEnd}
                // currentTime={playerSecondsRef}
                // durationsPlayer={durationPlayerRef}
                isLive={isLive}
                {...commonProps}
              />
              <Reload
                videoRef={videoRef}
                typeButton={'next'}
                videoType={videoType}
                isStreaming={isStreaming}
                state={state}
                onVideoEnd={onVideoEnd}
                isStreamingEnd={isStreamingEnd}
                // currentTime={playerSecondsRef}
                // durationsPlayer={durationPlayerRef}
                isLive={isLive}
                {...commonProps}
              />
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
        <div
          className={classes.controlRight}
          onMouseMove={() => handleChangeCanHideControlBar(false)}
          onMouseLeave={() => handleChangeCanHideControlBar(true)}
          onMouseEnter={() => handleChangeCanHideControlBar(false)}
        >
          {/* toggle theater mode button */}
          {(isChrome ? !document.fullscreenElement : !document['webkitFullscreenElement']) && !isMobile && (
            <div
              ref={tooltipRef}
              className={classes.wrapViewMode}
              onClick={() => {
                changeVideoViewMode(!is_normal_view_mode)
                ReactTooltip.hide(tooltipRef?.current)
              }}
              data-tip
              data-for="view_mode"
            >
              {is_normal_view_mode ? <TheatreViewMode /> : <NormalViewMode />}
              <PlayerTooltip
                id={'view_mode'}
                title={is_normal_view_mode ? t('videos_top_tab.theatre_mode') : t('videos_top_tab.normal_mode')}
                offset={{ top: -10, left: 10 }}
                place={'top'}
              />
            </div>
          )}

          {/* Toggle mini player button */}
          {isEnableBtnPIP() && (
            <Box
              className={classes.buttonNormal}
              onClick={handleOnMiniPlayerClick}
              data-tip
              data-for="toggleMiniPlayer"
              id={'miniPlayerRef'}
            >
              <img src={'/images/ic_mini_player.svg'} className={classes.sizeMiniPlayer} />
              <PlayerTooltip
                id={'toggleMiniPlayer'}
                title={t('videos_top_tab.tooltip_control_bar.mini_player')}
                offset={{
                  top: 0,
                  left: 0,
                }}
                place={'top'}
              />
            </Box>
          )}

          {/* setting panel area */}
          <ClickAwayListener
            onClickAway={() => {
              closeSettingPanel()
            }}
          >
            <Box display={'flex'} ml={isLive ? '-16px' : '0'}>
              {/* Speed button */}
              {!isLive && (
                <Box
                  onClick={handleOnPlaySpeedButtonClick}
                  className={classes.playSpeedButton}
                  data-tip
                  data-for="togglePlaySpeed"
                  id={'playSpeedRef'}
                >
                  <Typography className={classes.textSpeed}>{parseFloat(speed) ? `${+speed}x` : '1x'}</Typography>
                  <PlayerTooltip
                    id={'togglePlaySpeed'}
                    title={t('videos_top_tab.tooltip_control_bar.play_speed')}
                    offset={{
                      top: 0,
                      left: 0,
                    }}
                    place={'top'}
                  />
                </Box>
              )}

              {/* Setting button */}
              <Box
                className={classes.buttonNormal}
                onClick={handleOnSettingButtonClick}
                data-tip
                data-for="toggleSettingPanel"
                id={'settingRef'}
              >
                <img src={'/images/ic_settings.svg'} className={classes.sizeSetting} />
                <PlayerTooltip
                  id={'toggleSettingPanel'}
                  title={t('videos_top_tab.tooltip_control_bar.setting')}
                  offset={{
                    top: 0,
                    left: 0,
                  }}
                  place={'top'}
                />
              </Box>

              {settingPanel === SettingPanelState.MAIN_DISPLAY && (
                <SettingPanel
                  handleOnQualityChangeClick={handleOnOpenResolutionPanel}
                  handleOnReportClick={handleOnOpenReportPanel}
                  isLive={isLive}
                  handleOnPlaySpeedClick={handleOnOpenPlaySpeedPanel}
                  settingResult={{ resolution, speed }}
                />
              )}
              {settingPanel === SettingPanelState.VIDEO_RESOLUTION && (
                <VideoResolutionPanel
                  selectedResolution={resolution}
                  resolutionList={[VIDEO_RESOLUTION.AUTO].concat(handleQualitiesArray())}
                  // resolutionList={['480p']}
                  handleOnBackClick={handleOnResolutionPanelBackClick}
                  onSelected={handleSelectedResolution}
                  typeSetting={settingPanel}
                />
              )}
              {settingPanel === SettingPanelState.REPORT_PANEL && <ReportPanel handleOnBackClick={handleOnReportPanelBackClick} />}
              {settingPanel === SettingPanelState.PLAY_SPEED && (
                <VideoResolutionPanel
                  selectedResolution={speed}
                  resolutionList={['0.5', t('videos_top_tab.standard'), '1.5', '2.0']}
                  handleOnBackClick={handleOnResolutionPanelBackClick}
                  onSelected={handleChangeSpeed}
                  typeSetting={settingPanel}
                />
              )}
            </Box>
          </ClickAwayListener>
          {/* end setting panel area */}

          <Box
            className={classes.buttonNormal}
            style={{ paddingLeft: 0 }}
            onClick={toggleFullScreen}
            data-tip
            data-for="toggleFullScreen"
            id={'fullscreenRef'}
          >
            {(isMobile ? !isFull : isChrome ? !document.fullscreenElement : !document['webkitFullscreenElement']) ? (
              <img src={'/images/ic_full_screen.svg'} className={classes.sizeFullscreen} />
            ) : (
              <Icon fontSize={'small'} className={`fas fa-compress ${classes.pauseSmall}`} />
            )}
            <PlayerTooltip
              id={'toggleFullScreen'}
              title={
                (isChrome ? !document.fullscreenElement : !document['webkitFullscreenElement'])
                  ? t('videos_top_tab.full_screen')
                  : t('videos_top_tab.exit_full_screen')
              }
              offset={
                (isChrome ? !document.fullscreenElement : !document['webkitFullscreenElement'])
                  ? { top: -10, left: 10 }
                  : {
                      top: 0,
                      left: 0,
                    }
              }
              place={(isChrome ? !document.fullscreenElement : !document['webkitFullscreenElement']) ? 'top' : 'left'}
            />
          </Box>
        </div>
      </>
      // </div>
    )
  }
)

const useStyles = makeStyles((theme: Theme) => ({
  controlRight: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapViewMode: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
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
    padding: '0 16px',
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
    color: '#FFFFFF',
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
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  playSpeedButton: {
    border: '1px solid #FFFFFF',
    backgroundColor: Colors.white_opacity['30'],
    borderRadius: '10px',
    width: '32px',
    height: '21px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    cursor: 'pointer',
  },
  [theme.breakpoints.down('xs')]: {
    sizeVolumeUp: {
      width: 19.4,
      height: 13.15,
    },
    mutedIcon: {
      fontSize: 16,
    },
    sizeMiniPlayer: {
      width: 15,
      height: 15,
    },
    textSpeed: {
      fontSize: 8,
    },
    playSpeedButton: {
      width: '22.82px',
      height: '15px',
    },
    sizeSetting: {
      width: '14px',
      height: '15px',
    },
    sizeFullscreen: {
      width: 12.34,
      height: 12.34,
    },
  },
}))

export default memo(ControlBarPlayer)
