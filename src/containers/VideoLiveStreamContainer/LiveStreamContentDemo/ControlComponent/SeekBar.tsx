/* eslint-disable no-console */
import { Slider, SliderProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { memo, useEffect, useState } from 'react'
import useDetailVideo from '../../useDetailVideo'
interface Props {
  currentTime?: number
  durationsPlayer?: number
  videoRef: any
}

{
  /*currentTime: seconds
timePlayed: time by 100*/
}

const SeekBar: React.FC<Props & SliderProps> = ({ currentTime, durationsPlayer, videoRef, ...rest }) => {
  const classes = useStyles()
  // const [currentTimeState, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0)
  const [timePlayed, setTimePlayed] = useState(0)
  const { changeSeekCount } = useDetailVideo()

  useEffect(() => {
    setTimePlayed((currentTime / durationsPlayer) * 100)
  }, [currentTime, durationsPlayer])

  const handleChange = (_, value) => {
    console.log('🚀 ~ handleChange ~ value --0000', value)
    const newSecond = (value * durationsPlayer) / 100
    console.log('🚀 ~ handleChange ~ newSecond', newSecond)
    setTimePlayed(value)
    videoRef.current.currentTime = newSecond
  }

  const handleCommit = (_, value) => {
    console.log('~~~VALUE SEEK TO ~~~~~', value, (value * durationsPlayer) / 100)
    setTimePlayed(value)
    const newSecond = (value * durationsPlayer) / 100
    videoRef.current.currentTime = newSecond
    changeSeekCount(Math.floor(newSecond))
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
  },
  seekBar: {
    // width: 90,
    // marginLeft: 16,
    // marginRight: 8,
    borderRadius: 2,
    padding: 0,
    '& .MuiSlider-rail': {
      color: '#C3C3C3',
      height: 3,
      // borderRadius: 2,
    },
    '& .MuiSlider-track': {
      color: '#FF4786',
      height: 3,
      // borderRadius: 2,
    },
    // '& .MuiSlider-thumb': {
    //   color: '#fff', //circle
    //   width: 8,
    //   height: 8,
    //   borderRadius: 4,
    // },
    // '& .MuiSlider-thumb.Mui-focusVisible, .MuiSlider-thumb:hover': {
    //   boxShadow: 'none',
    // },
    // '& .MuiSlider-root': {
    //   // padding: 0,
    // },
  },
}))

export default memo(SeekBar)
