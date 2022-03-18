/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
// import ReactPlayer from 'react-player'
import ESLoader from '@components/Loader'
import { DELAY_SECONDS } from '@constants/common.constants'
import { Box, Icon, makeStyles, Theme, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { STATUS_VIDEO } from '@services/videoTop.services'
import useLiveStreamDetail from '../useLiveStreamDetail'
import { Colors } from '@theme/colors'
import React, { memo, useCallback, useContext, useEffect, useRef, useState } from 'react'
import ControlBarPlayer from './ControlBar'
import SeekBar from './ControlComponent/SeekBar'
// import { useTranslation } from 'react-i18next'

import useDetailVideo from '../useDetailVideo'
import Hls from 'hls.js'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
import { VIDEO_RESOLUTION_HLS } from '@services/liveStreamDetail.service'
import { VideoContext } from '@containers/VideoLiveStreamContainer/VideoContext'
import { useTranslation } from 'react-i18next'
import { LiveStreamSettingHelper } from '@utils/helpers/LiveStreamSettingHelper'

declare global {
  interface Document {
    readonly pictureInPictureEnabled: boolean
    readonly disablePictureInPicture: boolean
    exitPictureInPicture(): Promise<void>
    requestPictureInPicture(): Promise<void>
    pictureInPictureElement: HTMLVideoElement
  }
}

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
  isArchived?: boolean
  componentsSize?: {
    chatWidth: number
    videoWidth: number
    videoHeight: number
  }
  qualities?: Array<string>
}

const VideoPlayer: React.FC<PlayerProps> = ({
  src,
  // // statusVideo,
  mediaOverlayIsShown,
  onVideoEnd,
  thumbnail,
  // startLive,
  // endLive,
  isArchived,
  // type,
  videoType,
  // componentsSize,
  qualities,
}) => {
  const { setVideoRefInfo } = useContext(VideoContext)
  // const checkStatusVideo = 1
  const classes = useStyles({ checkStatusVideo: videoType })
  const videoEl = useRef(null)
  const { t } = useTranslation('common')

  const [durationPlayer, setDurationPlayer] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [isStreaming, setIsStreaming] = useState(true)
  // const reactPlayerRef = useRef(null)
  const playerContainerRef = useRef(null)
  const [isLive, setIsLive] = useState(null)

  //As of Chrome 66, videos must be muted in order to play automatically
  const [state, setState] = useState({
    playing: true,
    muted: true,
    volume: 0,
    ended: false,
  })

  const [visible, setVisible] = useState({
    loading: true,
    videoLoaded: true,
    videoError: false,
  })
  const [flagResol, setFlagResol] = useState(false)
  const refControlBar = useRef<any>(null)
  const { liveStreamInfo, changeSeekCount, detailVideoResult } = useDetailVideo()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true })
  const isDownMd = useMediaQuery(theme.breakpoints.down(769), { noSsr: true })
  const isDown1100 = useMediaQuery(theme.breakpoints.down(1100), { noSsr: true })
  const isDown960 = useMediaQuery(theme.breakpoints.down(960), { noSsr: true })
  const { width: videoDisplayWidth } = useWindowDimensions(0)
  const androidPl = /Android/i.test(window.navigator.userAgent)
  const iPhonePl = /iPhone/i.test(window.navigator.userAgent)

  const { videoWatchTimeReportRequest, getMiniPlayerState, changeMiniPlayerState } = useLiveStreamDetail()
  const isStreamingEnd = useRef(liveStreamInfo.is_streaming_end)
  const handlePauseAndSeekVideo = () => {
    // // seek to current live stream second if is pausing live and is not playing
    // if (!state.playing && liveStreamInfo.is_pausing_live) {
    //   const newSecond = Math.floor(durationPlayer)
    //   changeSeekCount(Math.floor(newSecond))
    // }
    // // if pause video when is live streaming => set is pausing to true
    // if (state.playing && Math.floor(playedSeconds) === Math.floor(durationPlayer)) {
    //   changeIsPausingLive(true)
    // } else {
    //   changeIsPausingLive(false)
    // }
  }

  const [isPortrait, setIsPortrait] = useState<boolean>(!!isMobile)
  const [resolution, setResolution] = useState(VIDEO_RESOLUTION_HLS.AUTO)
  useEffect(() => {
    if (getMiniPlayerState) {
      console.log('videoEl::', videoEl)
      if (document.pictureInPictureEnabled && !videoEl.current.disablePictureInPicture) {
        try {
          if (document.pictureInPictureElement) {
            document.exitPictureInPicture()
          }
          videoEl.current.requestPictureInPicture()
        } catch (err) {
          console.error(err)
        }
      }
    }
    return () => {
      if (getMiniPlayerState) {
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture()
          changeMiniPlayerState(false)
        }
      }
    }
  }, [getMiniPlayerState])
  function handleExitPictureInPicture() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture()
      changeMiniPlayerState(false)
    }
  }

  useEffect(() => {
    // if (!isPortrait) {
    //   toggleFullScreen1()
    // }
  }, [isPortrait])

  useEffect(() => {
    isStreamingEnd.current = liveStreamInfo.is_streaming_end
  }, [liveStreamInfo.is_streaming_end])

  useEffect(() => {
    if (isArchived) {
      if (videoEl.current !== null) {
        videoEl.current.currentTime = 0
      }
      setState({ ...state, playing: false })
      setAutoPlay(false)
    }
  }, [!isArchived])

  // video watch time report request
  const videoTimeReport = () => {
    // call api time report if video is streaming and not archived
    if (detailVideoResult?.status === STATUS_VIDEO.LIVE_STREAM && !isArchived) {
      console.count('==================== report video time ===================')
      videoWatchTimeReportRequest({ video_id: detailVideoResult?.uuid })
    }
  }
  // call api time report every 60s
  useEffect(() => {
    const intervalTimer = setInterval(() => {
      videoTimeReport()
    }, 60000)
    return () => clearInterval(intervalTimer)
  }, [])

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

  // useEffect(() => {
  //   if(Math.floor(playedSeconds) !== liveStreamInfo.played_second) {
  //     changePlayedSecond(Math.floor(playedSeconds))
  //   }
  // }, [playedSeconds])

  // useEffect(() => {
  //   if(Math.floor(durationPlayer) !== liveStreamInfo.streaming_second) {
  //     changeStreamingSecond(Math.floor(durationPlayer))
  //   }
  // }, [durationPlayer])

  // const toggleFullScreen = () => {
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   //@ts-ignore
  //   screenfull.toggle(playerContainerRef.current)
  // }

  const handleMute = () => {
    setState({ ...state, muted: !state.muted, volume: videoEl.current?.volume })
  }

  const handleChangeVol = (_, val) => {
    if (videoEl.current !== null) {
      videoEl.current.volume = val
    }
    setState({ ...state, volume: val, muted: videoEl.current?.volume === 0 ? true : false })
  }
  const handleChangeVolDrag = (_, val) => {
    if (videoEl.current !== null) {
      videoEl.current.volume = val
    }
    setState({ ...state, volume: val, muted: videoEl.current?.volume === 0 ? true : false })
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
  // const hls = new Hls()
  const chatBoardWidth = () => {
    if (!isDown1100) return 482
    if (!isDownMd) return 350
    return 0
  }
  const sizeMenuWidth = () => {
    if (!isDown960) return 98
    return 0
  }

  //@ts-ignore
  const calculateVideoHeight = () => {
    const videoWidth = videoDisplayWidth - (chatBoardWidth() + sizeMenuWidth())
    return (videoWidth * 9) / 16
  }

  // ===================hls.js==================================
  useEffect(() => {
    const video = document.getElementById('video')

    const hls = new Hls()
    console.warn('HLS=====>>>', hls.levels, hls.currentLevel)
    //function event MEDIA_ATTACHED
    const handleMedia = () => {
      console.log('video and hls.js are now bound together !')
      // video.play(); //auto play video
      //@ts-ignore
      video.muted = true
      hls.on(Hls.Events.LEVEL_LOADED, handleLoaded)
      hls.on(Hls.Events.ERROR, handleError)
    }

    const handleLoaded = (_, data) => {
      console.log('~~~~LEVEL_LOADED~~~~~', data)
      console.warn('HLS=====>>>', hls.levels, hls.currentLevel)
      // setDurationPlayer(data.details.totalduration)
      setIsLive(data.details.live)
    }
    const handleError = (_, data) => {
      console.log('~~~~~~~~> ERROR', data)
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            // try to recover network error
            console.log('fatal network error encountered, try to recover')
            setVisible({ ...visible, videoError: true })
            hls.startLoad()
            break
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log('fatal media error encountered, try to recover')
            setVisible({ ...visible, videoError: true })
            hls.recoverMediaError()
            break
          default:
            // cannot recover
            hls.destroy()
            break
        }
      } else {
        setVisible({ ...visible, videoError: true })
        hls.startLoad()
      }
    }
    // if (Hls.isSupported() && !isMobile) {
    if ((Hls.isSupported() || androidPl) && src) {
      // bind them together
      hls.loadSource(src)
      //@ts-ignore
      hls.attachMedia(video)
      hls.on(Hls.Events.MEDIA_ATTACHED, handleMedia)
    }
    return () => {
      if (hls && src) {
        hls.detachMedia()
        hls.destroy()
        hls.stopLoad()
      }
    }
  }, [src])

  //on switch resolution
  useEffect(() => {
    setIsLive(videoType === STATUS_VIDEO.LIVE_STREAM)
    const hls = new Hls({
      // liveSyncDurationCount: 1,
      // initialLiveManifestSize: 1,
      // liveMaxLatencyDurationCount:10,
      startPosition: videoType === STATUS_VIDEO.LIVE_STREAM ? -1 : playedSeconds,
      startLevel: resolution,
    })

    if ((Hls.isSupported() || androidPl) && src) {
      // bind them together
      hls.loadSource(src)
      //@ts-ignore
      hls.attachMedia(document.getElementById('video'))
      // hls.on(Hls.Events.MEDIA_ATTACHED, handleMedia)
    }
    return () => {
      if (hls && src) {
        hls.detachMedia()
        hls.destroy()
        hls.stopLoad()
      }
    }
  }, [src, resolution])

  // useEffect(() => {
  //   if(Math.floor(playedSeconds) !== liveStreamInfo.played_second) {
  //     changePlayedSecond(Math.floor(playedSeconds))
  //   }
  // }, [playedSeconds])

  // useEffect(() => {
  // if(Math.floor(durationPlayer) !== liveStreamInfo.streaming_second) {
  //   changeStreamingSecond(Math.floor(durationPlayer))
  // }
  // }, [durationPlayer])

  const handleUpdateVideoTime = useRef(null)
  const onUpdateVideoTime = (videoInfo) => {
    const newPlayedSecondTime = videoInfo.currentTime
    let durationTime = videoType === STATUS_VIDEO.LIVE_STREAM ? videoInfo.duration - DELAY_SECONDS : videoInfo.duration
    // handle delayed time when is living
    if (isStreaming && videoType === STATUS_VIDEO.LIVE_STREAM) {
      const isDelayedTime = newPlayedSecondTime < durationTime || newPlayedSecondTime > durationTime
      // reset duration time to equal played time when live is delayed
      if (isDelayedTime) {
        durationTime = newPlayedSecondTime
      }
    }
    // if(!isStreaming && durationTime < newPlayedSecondTime && videoType === STATUS_VIDEO.LIVE_STREAM){
    if (!isStreaming && videoType === STATUS_VIDEO.LIVE_STREAM) {
      durationTime = videoInfo.duration
    }
    const newDurationTime = durationTime
    // const newDurationTime = videoInfo.duration
    setPlayedSeconds(newPlayedSecondTime)
    setDurationPlayer(newDurationTime)
    if (
      Math.floor(newPlayedSecondTime) !== liveStreamInfo.played_second ||
      Math.floor(newDurationTime) !== liveStreamInfo.streaming_second
    ) {
      // changeVideoTime(Math.floor(newDurationTime), Math.floor(newPlayedSecondTime))
    }
  }
  handleUpdateVideoTime.current = onUpdateVideoTime

  const handleUpdateVideoDuration = useRef(null)
  const onUpdateVideoduration = (duration) => {
    if (!state.playing) {
      if (Math.floor(duration) !== liveStreamInfo.played_second) {
        // changeVideoTime(Math.floor(duration), Math.floor(duration))
      }
      setDurationPlayer(duration)
    }
  }
  handleUpdateVideoDuration.current = onUpdateVideoduration

  //archived
  useEffect(() => {
    console.log('videoEl.current?.paused==', videoEl.current?.paused, playing)
    setVideoRefInfo(videoEl)
    handleReturnPlayPause()
    //console.log('🚀 ~ useEffect ~ videoEl---0000', videoEl)
    // onSaveVideoRef(document.querySelector('video'), document.createElement('video'))
    videoEl.current?.addEventListener('timeupdate', (event) => {
      const videoInfo = event.target
      // console.log(
      //   '->current->duration-> range',
      //   videoInfo.currentTime,
      //   videoInfo.duration,
      //   videoInfo.duration - videoInfo.currentTime,
      //   videoInfo.duration - DELAY_SECONDS
      // )
      videoInfo ? handleUpdateVideoTime.current(videoInfo) : ''
    })

    videoEl.current.addEventListener('durationchange', (event) => {
      console.log('------->>durationchange<<<-----', event.target.duration, state.playing)
      if (isStreamingEnd.current) {
        onVideoEnd()
      }
      handleUpdateVideoDuration.current(event.target.duration)
    })

    videoEl.current?.addEventListener('volumechange', () => {
      setState({
        ...state,
        muted: videoEl.current?.muted,
        volume: videoEl.current?.muted === true ? 0 : videoEl.current?.volume,
        playing: !videoEl.current?.paused,
      })
      // setState({ ...state, muted: videoEl.current?.volume!==0?false:true, volume:  videoEl.current?.volume, playing: !videoEl.current?.paused })
    })

    videoEl.current?.addEventListener('ended', () => {
      console.log('================END VIDEO HTML====================')
      setState({ ...state, playing: false })
      setVisible({ ...visible, loading: true, videoLoaded: true })
    })

    //check event video
    videoEl.current?.addEventListener('seeking', () => {
      console.log('=================SEEKING===================')
      if (!isStreamingEnd.current) {
        setVisible({ ...visible, loading: true, videoLoaded: false })
      }
    })
    videoEl.current?.addEventListener('seeked', () => {
      //rewind complete
      console.log('=================SEEKED===================')
      if (iPhonePl || androidPl || isMobile) {
        changeSeekCount(Math.floor(videoEl.current.currentTime))
      }

      if (!isStreamingEnd.current) {
        setVisible({ ...visible, loading: false, videoLoaded: false })
      }
    })

    //load data
    videoEl.current?.addEventListener('loadedmetadata', (event) => {
      console.log('=================loadedmetadata===================')
      console.log(event)
      setFlagResol(false)
      if (!isStreamingEnd.current) {
        setVisible({ ...visible, loading: true, videoLoaded: true })
      }
    })
    videoEl.current?.addEventListener('loadeddata', () => {
      console.log('=================loadeddata===================')
      // setVisible({ ...visible, loading: true, videoLoaded: true })
    })
    videoEl.current?.addEventListener('emptied', (event) => {
      console.log('=================emptied===================')
      console.log(event)
      if (flagResol) {
        setVisible({ ...visible, loading: true, videoLoaded: true })
      }
    })
    videoEl.current?.addEventListener('canplay', (event) => {
      console.log('=================canplay===================')
      console.log(event)
      if (!isStreamingEnd.current) {
        setVisible({ ...visible, loading: videoEl.current?.paused })
      }
    })
    videoEl.current?.addEventListener('error', (event) => {
      console.log('=================error===================')
      console.log(event)
    })
    videoEl.current?.addEventListener('play', (event) => {
      console.log('=================play===================')
      console.log(event)
      setVisible({ ...visible, loading: true, videoLoaded: true })
    })
    videoEl.current?.addEventListener('playing', (event) => {
      console.log('=================playing===================', playing)
      console.log(event)
      if (!isStreamingEnd.current) {
        setVisible({ ...visible, loading: false, videoLoaded: false })
      }
      // setState({...state, playing:true})
    })
    videoEl.current?.addEventListener(
      'leavepictureinpicture',
      () => {
        console.log('leavepictureinpicture')
        changeMiniPlayerState(false)
      },
      false
    )

    return () => {
      //@ts-ignore
      window.onscroll = () => {
        //TODO: remove event onscroll window
      }
    }
  }, [resolution])
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
    if (!isMobile && !iPhonePl && !androidPl) {
      handlePauseAndSeekVideo()
      if (videoEl.current?.paused || videoEl.current?.ended) {
        videoEl.current?.play()
        //new version
        if (videoType === STATUS_VIDEO.LIVE_STREAM && videoEl.current !== null) {
          videoEl.current.currentTime = durationPlayer
        }
        setState({ ...state, playing: true })
        setVisible({ ...visible, loading: false, videoLoaded: false })
      } else {
        videoEl.current.pause()
        setState({ ...state, playing: false })
        setVisible({ ...visible, loading: true, videoLoaded: false })
        setIsStreaming(false)
      }
    }
  }
  const handlePlayPause = () => {
    handlePauseAndSeekVideo()
    //new version
    if (videoType === STATUS_VIDEO.LIVE_STREAM && videoEl.current !== null) {
      videoEl.current.currentTime = durationPlayer
    }
    if (videoEl.current?.paused || videoEl.current?.ended) {
      videoEl.current?.play()
      setState({ ...state, playing: true })
      setVisible({ ...visible, loading: false, videoLoaded: false })
    } else {
      videoEl.current?.pause()
      setState({ ...state, playing: false })
      setVisible({ ...visible, loading: true, videoLoaded: false })
      setIsStreaming(false)
    }
  }
  const handleReturnPlayPause = () => {
    if (flagResol) {
      if (videoEl.current?.paused || videoEl.current?.ended) {
        videoEl.current?.play()
        // setState({ ...state, playing: true })
        // setVisible({ ...visible, loading: false, videoLoaded: false })
      } else {
        videoEl.current?.pause()
        // setState({ ...state, playing: false })
        // setVisible({ ...visible, loading: true, videoLoaded: false })
        // setIsStreaming(false)
      }
    }
  }

  // const handleTryAgain = () => {
  //   hls.loadSource(src)
  //   //@ts-ignore
  //   hls.attachMedia(document.getElementById('video'))
  //   hls.startLoad(-1)
  // }

  //rewind video to time newest
  const handleReloadTime = () => {
    // document.querySelector("video").load()
    if (videoEl.current !== null) {
      videoEl.current.currentTime = durationPlayer
    }
    setPlayedSeconds(durationPlayer)
    const newDurationPlayer = Math.floor(durationPlayer)
    // changeVideoTime(newDurationPlayer, newDurationPlayer)
    changeSeekCount(newDurationPlayer)
    setIsStreaming(true)
  }

  window.onscroll = () => {
    if (playing) {
      videoEl.current?.play()
    }
  }

  const handleOnRestart = () => {
    setIsStreaming(false)
  }

  const changeResolution = useCallback(
    (index, flag) => {
      setResolution(index - 1)
      // setResolution(index===0?-1:0)
      setFlagResol(flag)
    },
    [resolution]
  )

  //new version
  // useEffect(() => {
  //   let interval
  //   if (videoType === STATUS_VIDEO.LIVE_STREAM ) {
  //     if(videoEl.current?.paused ){
  //       interval = setTimeout(() => {
  //         console.log('playedSeconds:::', playedSeconds)
  //         setPlayedSeconds(playedSeconds+1)
  //       }, 1000)
  //     }else{
  //       if(interval){
  //         clearTimeout(interval)
  //       }

  //     }
  //   }else{
  //     if(interval){
  //       clearTimeout(interval)
  //     }
  //   }
  //   return () => {
  //     if(interval){
  //       clearTimeout(interval)
  //     }
  //   }
  // }, [playing, playedSeconds])

  return (
    <div className={classes.videoPlayer}>
      {/* {(iPhonePl || androidPl || (!iPadPl && isDownMd)) && (
        <div>
          <video
            id="video"
            ref={videoEl}
            muted
            className="video_player"
            style={{ width: '100%', height: '100%' }}
            src={src}
            autoPlay={autoPlay}
            controls
            //@ts-ignore
            playsInline
            preload={'auto'}
            controlsList="noplaybackrate foobar"
          >
            <source src={src} type={'video/MP4'} />
          </video>
          {getMiniPlayerState && (
            <Box className={classes.miniPlayerContainer}>
              <img src="/images/ic_mini_player.svg" className={classes.miniPlayerIcon} />
              <Typography className={classes.miniPlayerText}>{t('videos_top_tab.mini_player_message')}</Typography>
            </Box>
          )}
        </div>
      )} */}
      {/* {(!isMobile && !androidPl && !iPhonePl)  && ( */}
      <div ref={playerContainerRef} className={classes.playerContainer}>
        <div style={{ height: '100%', position: 'relative' }} onClick={handlePlayPauseOut}>
          <video
            id="video"
            ref={videoEl}
            muted={muted}
            style={{ width: '100%', height: '100%' }}
            autoPlay={autoPlay}
            src={src}
            controls={iPhonePl || androidPl || isMobile}
            //@ts-ignore
            playsInline={iPhonePl || androidPl}
            preload={'auto'}
            controlsList="noplaybackrate foobar"
            // className={classes.video}
          />
          {getMiniPlayerState && (
            <Box id="exist-picture-in-picture" className={classes.existPictureInPicture} onClick={handleExitPictureInPicture}>
              <Box textAlign="center">
                <img src={'/images/ic_picture_in_picture.svg'} />
                <Typography className={classes.textInPictureInPicture}>{t('videos_top_tab.mini_player_message')}</Typography>
              </Box>
            </Box>
          )}

          {!isMobile && !androidPl && !iPhonePl && !mediaOverlayIsShown && loading && (
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
              {ended || !playing ? (
                <Icon className={`fas fa-play ${classes.fontSizeLarge}`} />
              ) : (
                <div className={classes.showLoader}>
                  <ESLoader />
                </div>
              )}
            </div>
          )}
        </div>

        {!isMobile && !androidPl && !iPhonePl && (
          <div className={classes.processControl}>
            {videoType !== STATUS_VIDEO.LIVE_STREAM && (
              <SeekBar
                videoRef={videoEl}
                durationsPlayer={durationPlayer}
                currentTime={playedSeconds}
                changeStatusStreaming={(status) => {
                  setIsStreaming(status)
                }}
              />
            )}
            <div className={classes.controlOut}>
              <ControlBarPlayer
                ref={refControlBar}
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
                isLive={isLive}
                videoStatus={videoType}
                onReloadTime={handleReloadTime}
                handleOnRestart={handleOnRestart}
                resultResolution={(index, flag) => changeResolution(index, flag)}
                qualities={qualities}
              />
            </div>
          </div>
        )}
        {/*errorVideo && <div className={classes.loading} />} */}
        {/* {visible.videoError && (
          <div className={classes.overViewError}>
            <div
              className={classes.thumbBegin}
              style={{
                backgroundImage: `url(${thumbnail ?? '/images/live_stream/thumbnail_default.png'})`,
                backgroundSize: 'cover',
              }}
            >
              <div className={classes.loadingThumbBlur} />
            </div>
            <Box className={classes.boxError}>
              <Typography className={classes.errorType}>{'Network Error'}</Typography>
              <div className={classes.buttonReload} onClick={handleTryAgain}>
                <Typography className={classes.tryAgain}>{'もう一度試す'}</Typography>
              </div>
            </Box>
          </div>
        )} */}
      </div>
      {/* )} */}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  existPictureInPicture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: '#191919',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  textInPictureInPicture: {
    color: Colors.white,
    fontSize: 16,
    marginTop: 20,
  },
  miniPlayerContainer: {
    backgroundColor: '#191919',
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 3,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  miniPlayerIcon: {
    width: '130px',
    height: '130px',
  },
  miniPlayerText: {
    marginTop: '34px',
    color: Colors.white,
    fontSize: '16px',
  },
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
  fontSizeLarge: {
    fontSize: 100,
    color: Colors.white,
    zIndex: 2,
  },
  videoPlayer: {
    height: '100%',
  },
  controlOut: {
    // backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    height: 40,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      transition: 'opacity 0.1s ease-in',
      opacity: 0, //always show controlBar by status video
      background:
        props.checkStatusVideo !== STATUS_VIDEO.LIVE_STREAM
          ? 'linear-gradient(rgb(128 128 128 / 0%) 20%, rgb(39 39 39) 100%)'
          : 'linear-gradient(rgb(128 128 128 / 0%) 0%, rgb(39 39 39) 100%)',
    }
  },
  playerContainer: (props: { checkStatusVideo: number }) => {
    return {
      height: '100%',
      '&:hover $processControl': {
        opacity: 1,
        background:
          props.checkStatusVideo !== STATUS_VIDEO.LIVE_STREAM
            ? 'linear-gradient(rgb(128 128 128 / 0%) 20%, rgb(39 39 39) 100%)'
            : 'linear-gradient(rgb(128 128 128 / 0%) 0%, rgb(39 39 39) 100%)',
        transition: 'opacity 0.1s ease-in',
      },
    }
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
  tryAgain: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  errorType: {
    color: '#FFFFFF',
  },
  boxError: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1,
  },
  overViewError: {
    backgroundColor: 'rgba(0,0,0,0.3)',
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
  buttonReload: {
    border: '1px solid #FF4786',
    padding: '3px 7px',
    borderRadius: 15,
    marginTop: 7,
    background: '#FF4786',
    cursor: 'pointer',
  },
  showLoader: {
    zIndex: 2,
  },
}))

export default memo(VideoPlayer, (prev, next) => {
  console.warn('===redenr===', prev.src !== next.src)
  if (prev.src !== next.src) {
    return false
  }
  return true
})
