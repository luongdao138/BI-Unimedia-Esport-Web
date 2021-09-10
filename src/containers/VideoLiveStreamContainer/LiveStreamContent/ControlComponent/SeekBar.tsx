import { Slider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { memo, useEffect, useState } from 'react'
import useDetailVideo from '../../useDetailVideo'
interface Props {
  currentTime?: number
  durations?: number
  videoRef: any
}

const SeekBar: React.FC<Props> = ({ currentTime, videoRef }) => {
  const classes = useStyles()
  // const [currentTimeState, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0)
  const [timePlayed, setTimePlayed] = useState(0)
  const { changeStreamingSecond, streamingSecond } = useDetailVideo()

  useEffect(() => {
    const onTimeUpdate = (event) => {
      // console.log("===CHECK TIME PLAYED ===",event, videoRef.current.duration)
      if(Math.floor(event.target.currentTime) !== streamingSecond) {
        changeStreamingSecond(Math.floor(event.target.currentTime))
      }
      // setCurrentTime(event.target.currentTime)
      setTimePlayed(((event.target.currentTime ? event.target.currentTime : 0) / duration) * 100)
    }
    videoRef.current.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      videoRef.current.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [currentTime, timePlayed])

  useEffect(() => {
    const onDurationChange = (event) => {
      setDuration(videoRef.current.duration)
      if (videoRef.current.duration == Infinity) {
        setDuration(event.target.currentTime)
      }
    }
    videoRef.current.addEventListener('durationchange', onDurationChange)
    return () => {
      videoRef.current.removeEventListener('durationchange', onDurationChange)
    }
  })

  const handleChange = (_, value) => {
    setTimePlayed(value)
    // setCurrentTime((value/duration)*100)
    videoRef.current.currentTime = (value * duration) / 100
  }

  const handleCommit = (_, value) => {
    setTimePlayed(value)
    // setCurrentTime((value/duration)*100)
    videoRef.current.currentTime = (value * duration) / 100
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
    // backgroundColor: 'white',
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
      height: 4,
      borderRadius: 2,
    },
    '& .MuiSlider-track': {
      color: '#FF4786',
      height: 4,
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
