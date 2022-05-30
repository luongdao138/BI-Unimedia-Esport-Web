/* eslint-disable no-console */
import { SliderProps, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { QualitiesType, STATUS_VIDEO } from '@services/videoTop.services'
import { useVideoPlayer } from '@utils/hooks/useVideoPlayer'
import React, { memo } from 'react'
import ControlBarPlayer from './ControlBar'
import SeekBar from './ControlComponent/SeekBar'

interface Props {
  ref: any
  videoRef?: any
  isFull?: boolean
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
}

{
  /*currentTime: seconds
timePlayed: time by 100*/
}

const UtilityArea: React.FC<Props & SliderProps> = ({ ref, isStreaming, isStreamingEnd, state, videoType, changeRef, isFull, ...rest }) => {
  const classes = useStyles()
  const { durationPlayer, playedSeconds } = useVideoPlayer()
  const commonProps = { durationPlayer, playedSeconds }

  return (
    <>
      {videoType !== STATUS_VIDEO.LIVE_STREAM && <SeekBar {...commonProps} />}
      <div className={classes.controlOut}>
        <ControlBarPlayer
          ref={ref}
          isStreaming={isStreaming}
          isStreamingEnd={isStreamingEnd}
          state={state}
          videoType={videoType}
          changeRef={changeRef}
          isFull={isFull}
          {...rest}
          {...commonProps}
        />
      </div>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  controlOut: {
    // backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    height: 40,
  },
  [theme.breakpoints.down('xs')]: {
    controlOut: {
      height: 26,
    },
  },
}))

export default memo(UtilityArea)
