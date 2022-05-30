/* eslint-disable no-console */
import useDetailVideo from '@containers/VideoLiveStreamContainer/useDetailVideo'
import { VideoContext } from '@containers/VideoLiveStreamContainer/VideoContext'
import { useControlBarContext } from '@containers/VideoLiveStreamContainer/VideoContext/ControlBarContext'
import { useVideoPlayerContext } from '@containers/VideoLiveStreamContainer/VideoContext/VideoPlayerContext'
import { Slider, SliderProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { debounce } from 'lodash'
import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

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

  const { setIsStreaming, state } = useVideoPlayerContext()
  const { videoRefInfo } = useContext(VideoContext)
  const { canHideChatTimeoutRef, timeoutRef, isShowSettingPanel } = useControlBarContext()

  useEffect(() => {
    setTimePlayed((playedSeconds / durationPlayer) * 100)
  }, [playedSeconds, durationPlayer])

  const handleChange = (_, value) => {
    const newSecond = (value * durationPlayer) / 100
    setTimePlayed(value)
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
    debounce((_, value, durationPlayer) => {
      console.log('~~~VALUE SEEK TO ~~~~~', value, (value * durationPlayer) / 100)
      setTimePlayed(value)
      const newSecond = (value * durationPlayer) / 100
      videoRefInfo.current.currentTime = newSecond
      changeSeekCount(Math.floor(newSecond))
    }, 10),
    []
  )

  const handleChangeCanHideControlBar = (value: boolean) => {
    canHideChatTimeoutRef.current = value
  }

  return (
    <div className={classes.sliderSeek}>
      <Slider
        min={0}
        max={100}
        step={0.1}
        value={timePlayed}
        className={classes.seekBar}
        onChange={handleChange}
        onMouseMove={() => handleChangeCanHideControlBar(false)}
        onMouseLeave={() => handleChangeCanHideControlBar(true)}
        onMouseEnter={() => handleChangeCanHideControlBar(false)}
        onChangeCommitted={(_, value) => handleCommit(_, value, durationPlayer)}
        {...rest}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
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
