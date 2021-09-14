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
  // const { changeStreamingSecond, streamingSecond } = useDetailVideo()

  useEffect(() => {
    // setCurrentTime(videoRef.current.getCurrentTime()) //
    setTimePlayed((currentTime / durationsPlayer) * 100)
  })

  const handleChange = (_, value) => {
    setTimePlayed(value)
    videoRef.current.seekTo((value * durationsPlayer) / 100, 'seconds')
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
    backgroundColor: 'rgba(0,0,0,0.3)',
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
      color: '#FF4786', //circle
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
