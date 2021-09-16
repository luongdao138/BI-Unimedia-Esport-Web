/* eslint-disable no-console */
import { Slider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { memo, useEffect, useState } from 'react'
// import useDetailVideo from '../../useDetailVideo'
interface Props {
  currentTime?: number
  durationsPlayer?: number
  videoRef: any
}

{
  /*currentTime: seconds
timePlayed: time by 100*/
}

const SeekBar: React.FC<Props> = ({ currentTime, durationsPlayer, videoRef }) => {
  const classes = useStyles()
  // const [currentTimeState, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0)
  const [timePlayed, setTimePlayed] = useState(0)
  // const { changePlayedSecond, playedSecond, streamingSecond, changeIsViewingStream, isViewingStream } = useDetailVideo()

  useEffect(() => {
    // setCurrentTime(videoRef.current.getCurrentTime()) //
    setTimePlayed((currentTime / durationsPlayer) * 100)
  })

  const handleChange = (_, value) => {
    console.log('🚀 ~ 11111', value)
    const newSecond = (value * durationsPlayer) / 100
    setTimePlayed(value)
    videoRef.current.seekTo(newSecond, 'seconds')
    console.log('🚀 ~ handleChange', newSecond)
    // trigger change played second in redux
    // if(Math.floor(newSecond) !== playedSecond) {
    //   changePlayedSecond(Math.floor(newSecond))
    // }
    // let is_viewing_video = true
    // if(Math.floor(newSecond) < Math.floor(streamingSecond)) {
    //   is_viewing_video = false
    // }
    // if(isViewingStream !== is_viewing_video) {
    //   changeIsViewingStream(is_viewing_video)
    // }
  }

  const handleCommit = (_, value) => {
    setTimePlayed(value)
    videoRef.current.seekTo((value * durationsPlayer) / 100, 'seconds')
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
        onChangeCommitted={handleCommit}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  sliderSeek: {
    width: '100%',
    display: 'block',
    transition: 'width 0.4s ease-in',
    alignItems: 'flex-end',
    justifyContent: 'center',
    // backgroundColor: 'pink',
    paddingBottom: 10,
    // height:20,
  },
  seekBar: {
    // width: 90,
    // marginLeft: 16,
    // marginRight: 8,
    borderRadius: 2,
    padding: 0,
    '& .MuiSlider-rail': {
      color: '#C3C3C3',
      height: 7,
      borderRadius: 2,
    },
    '& .MuiSlider-track': {
      color: '#FF4786',
      height: 7,
      borderRadius: 2,
    },
    '& .MuiSlider-thumb': {
      color: 'transparent', //circle
      width: 14,
      height: 14,
      borderRadius: 7,
    },
    '& .MuiSlider-thumb.Mui-focusVisible, .MuiSlider-thumb:hover': {
      boxShadow: 'none',
    },
    '& .MuiSlider-root': {
      padding: 0,
    },
  },
}))

export default memo(SeekBar)
