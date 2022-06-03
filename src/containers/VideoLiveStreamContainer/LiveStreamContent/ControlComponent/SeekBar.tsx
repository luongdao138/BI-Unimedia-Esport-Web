/* eslint-disable no-console */
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
import { VideoContext } from '@containers/VideoLiveStreamContainer/VideoContext'
import { useControlBarContext } from '@containers/VideoLiveStreamContainer/VideoContext/ControlBarContext'
import { useVideoPlayerContext } from '@containers/VideoLiveStreamContainer/VideoContext/VideoPlayerContext'
import { Slider, SliderProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { debounce } from 'lodash'
import React, { memo, useCallback, useContext, useEffect, useState, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { FormatHelper } from '@utils/helpers/FormatHelper'
interface Props {
  playedSeconds: number
  durationPlayer: number
}

{
  /*currentTime: seconds
timePlayed: time by 100*/
}

const SeekBar: React.FC<Props & SliderProps> = ({ playedSeconds, durationPlayer, ...rest }) => {
  const classes = useStyles()
  // const [currentTimeState, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0)
  const [timePlayed, setTimePlayed] = useState(0)
  const { changeSeekCount, changeIsHoveredVideoStatus } = useDetailVideo()
  const thumbnailsRef = useRef<any>(null)

  const { setIsStreaming, state } = useVideoPlayerContext()
  const { videoRefInfo } = useContext(VideoContext)
  const { canHideChatTimeoutRef, timeoutRef, isShowSettingPanel } = useControlBarContext()
  // const secondTimePlay = useRef<any>(0)
  useEffect(() => {
    setTimePlayed((playedSeconds / durationPlayer) * 100)
  }, [playedSeconds, durationPlayer])

  const handleChange = (_, value) => {
    const newSecond = (value * durationPlayer) / 100
    setTimePlayed(value)
    // secondTimePlay.current = value
    if (value === 100) {
      setIsStreaming(true)
    } else {
      setIsStreaming(false)
    }
    videoRefInfo.current.currentTime = newSecond

    if (isMobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        const canHideControlBar = !isShowSettingPanel && state.playing
        // const canHideControlBar = true
        if (canHideControlBar) {
          changeIsHoveredVideoStatus(false)
        }
      }, 3500)
    }
  }

  const handleCommit = useCallback(
    debounce((_, durationPlayer, value, timeHover) => {
      // console.log('~~~VALUE SEEK TO ~~~~~', value, (value * durationPlayer) / 100, timeHover)
      const newSecond = isMobile ? (value * durationPlayer) / 100 : timeHover
      if (!isMobile) {
        setTimePlayed((timeHover * 100) / durationPlayer)
        // secondTimePlay.current = value
        // const newSecond = timeHover
      } else {
        setTimePlayed(value)
        // secondTimePlay.current = value
        // const newSecond = value
      }
      if (videoRefInfo && videoRefInfo.current) {
        videoRefInfo.current.currentTime = newSecond
      }
      changeSeekCount(Math.floor(newSecond))
    }, 10),
    []
  )

  const handleChangeCanHideControlBar = (value: boolean) => {
    canHideChatTimeoutRef.current = value
  }

  const [timeHover, setTimeHover] = useState<any>()

  const handleOnMouseMove = (e) => {
    const timePreview =
      ((e.pageX - e.currentTarget.getBoundingClientRect().left) * durationPlayer) / e.currentTarget.getBoundingClientRect().width
    if (timePreview < 0) {
      setTimeHover(0)
    } else if (timePreview > durationPlayer) {
      setTimeHover(durationPlayer)
    } else {
      setTimeHover(timePreview)
    }
    // secondTimePlay.current = (timeHover*100/durationPlayer)
    // console.log('sss:', e.target, e.currentTarget)
    // console.log('timeeee 0', e.target, durationPlayer, e.pageX,
    // e.target.getBoundingClientRect().left,
    // e.target.getBoundingClientRect().width,
    // FormatHelper.formatTime((e.pageX - e.target.getBoundingClientRect().left) * durationPlayer / e.target.getBoundingClientRect().width),
    // (e.pageX - e.target.getBoundingClientRect().left) * durationPlayer / e.target.getBoundingClientRect().width,
    // )

    if (thumbnailsRef) {
      const thumbnailsWidth = parseInt(getComputedStyle(thumbnailsRef.current).getPropertyValue('width'))
      console.log(
        'ssss:',
        getComputedStyle(thumbnailsRef.current).getPropertyValue('width'),
        e.pageX,
        e.currentTarget.offsetLeft,
        e.currentTarget.getBoundingClientRect().width
      )
      const endingGap = e.currentTarget.getBoundingClientRect().width - e.pageX + 5

      if (document['webkitFullscreenElement']) {
        if (e.pageX < thumbnailsWidth / 2) {
          thumbnailsRef.current.style.left = 0 + 'px'
        } else if (endingGap < thumbnailsWidth / 2) {
          thumbnailsRef.current.style.left =
            e.pageX -
            e.currentTarget.getBoundingClientRect().left -
            (thumbnailsWidth - (e.currentTarget.getBoundingClientRect().width - e.pageX + 10)) +
            'px'
        } else {
          thumbnailsRef.current.style.left = e.pageX - e.currentTarget.getBoundingClientRect().left - thumbnailsWidth / 2 + 5 + 'px'
        }
      } else {
        if (e.pageX - 60 < thumbnailsWidth / 2) {
          thumbnailsRef.current.style.left = 0 + 'px'
        } else if (e.pageX - e.currentTarget.getBoundingClientRect().width - 5 > thumbnailsWidth / 2) {
          thumbnailsRef.current.style.left =
            e.pageX -
            e.currentTarget.getBoundingClientRect().left -
            (e.pageX - e.currentTarget.getBoundingClientRect().width + 10 - thumbnailsWidth / 2) +
            'px'
        } else {
          thumbnailsRef.current.style.left = e.pageX - e.currentTarget.getBoundingClientRect().left - thumbnailsWidth / 2 + 5 + 'px'
        }
      }
    }
    // console.log('timeeee 1', (((e.clientX - e.target.offsetLeft) / e.target.clientWidth) * durationPlayer).toFixed(2))
    handleChangeCanHideControlBar(false)
  }

  const handleOnMouseLeave = () => {
    handleChangeCanHideControlBar(true)
  }

  // console.log('timeeee', durationPlayer, videoRefInfo.current.currentTime, timePlayed)

  return (
    <div className={classes.sliderSeek}>
      {/* <Slider
        min={0}
        max={100}
        step={0.1}
        value={secondTimePlay.current}
        className={classes.secondSeekBar}
        {...rest}
      /> */}
      <Slider
        min={0}
        max={100}
        step={0.1}
        value={timePlayed}
        className={classes.seekBar}
        onChange={handleChange}
        onMouseMove={handleOnMouseMove}
        onMouseLeave={handleOnMouseLeave}
        onMouseEnter={() => handleChangeCanHideControlBar(false)}
        onChangeCommitted={(_, value) => handleCommit(_, durationPlayer, value, timeHover)}
        {...rest}
      />
      <div ref={thumbnailsRef} className={`${classes.thumbnailsContainer} thumbnailsContainer`}>
        <div className={classes.thumbnailsText}>{FormatHelper.formatTime(timeHover)}</div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  thumbnailsContainer: {
    position: 'absolute',
    opacity: '0',
    visibility: 'hidden',
    display: 'flex',
    zIndex: 1000,
    background: 'rgba(0, 0, 0, 0.5)',
    // width: '50px',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '30px',
    bottom: '60px',
    color: 'white',
    // border: '1px solid white',
  },
  thumbnailsText: {
    padding: '0 5px 0 5px',
    alignItems: 'center',
  },
  secondSeekBar: {
    display: 'none',
  },
  sliderSeek: {
    // width: '100%',
    display: 'block',
    transition: 'width 0.4s ease-in',
    alignItems: 'flex-end',
    justifyContent: 'center',
    // backgroundColor: 'pink',
    // paddingBottom: 10,
    // height:20,
    margin: '0px 5px',
    cursor: 'pointer',
    '&:hover .MuiSlider-rail': {
      transform: 'scaleY(1.5)',
    },
    '&:hover .MuiSlider-track': {
      transform: 'scaleY(1.5)',
    },
  },
  seekBar: {
    ['@media (hover: hover)']: {
      '&:hover ~ $thumbnailsContainer': {
        opacity: 1,
        visibility: 'visible',
      },
    },
    // width: 90,
    // marginLeft: 16,
    // marginRight: 8,
    borderRadius: 2,
    height: '3px',
    padding: 0,
    // '&:hover': {
    //   transform: 'scaleY(1.5)',
    // },
    '&:hover .MuiSlider-thumb': {
      visibility: 'visible',
    },
    '& .MuiSlider-rail': {
      color: '#C3C3C3',
      height: '3px',
      transition: 'transform 0.2s',
      // borderRadius: 2,
    },
    '& .MuiSlider-track': {
      color: '#FF4786',
      height: '3px',
      transition: 'transform 0.2s',
      // borderRadius: 2,
    },
    '& .MuiSlider-thumb': {
      // color: '#fff', //circle
      // width: 8,
      // height: 8,
      // borderRadius: 4,
      visibility: 'hidden',
      marginTop: '-4.5px',
    },
    '& .MuiSlider-thumb.Mui-focusVisible, .MuiSlider-thumb:hover': {
      boxShadow: 'none',
    },
    // '& .MuiSlider-root': {
    //   // padding: 0,
    // },
  },
}))

export default memo(SeekBar)
