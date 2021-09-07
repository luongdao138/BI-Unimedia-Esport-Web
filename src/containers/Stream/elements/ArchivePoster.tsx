import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import { weekDay } from '@containers/Stream/elements/helper'
import { Typography } from '@material-ui/core'
import moment from 'moment'

export interface ArchivePosterProps {
  time: any
  text: any
}

const useStyles = makeStyles((theme) => ({
  archiveOnePlay: {
    top: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    cursor: 'pointer',
    bottom: 0,
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    height: '100%',
    flexDirection: 'column',
    display: 'flex',
  },
  posterTitle: {
    fontSize: 38,
    textAlign: 'center',
    color: theme.palette.grey[300],
  },
  posterData: {
    fontSize: 24,
    textAlign: 'center',
    color: theme.palette.grey[300],
  },
  equalBox: {
    flexGrow: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    display: 'flex',
  },
  [theme.breakpoints.down('md')]: {
    posterTitle: {
      fontSize: 24,
      textAlign: 'center',
      color: theme.palette.grey[300],
    },
    posterData: {
      fontSize: 14,
      textAlign: 'center',
      color: theme.palette.grey[300],
    },
  },
  [theme.breakpoints.down('sm')]: {
    posterTitle: {
      fontSize: 18,
      textAlign: 'center',
      color: theme.palette.grey[300],
    },
    posterData: {
      fontSize: 12,
      textAlign: 'center',
      color: theme.palette.grey[300],
    },
  },
}))

const ArchivePoster: React.FC<ArchivePosterProps> = (props) => {
  const { time, text } = props

  const date = time ? moment(time).format('YYYY/MM/DD') : null
  const hours = time ? moment(time).format('HH:mm') : null

  const classes = useStyles()

  return (
    <Box className={classes.archiveOnePlay}>
      <Box className={classes.equalBox}>
        <Typography className={classes.posterTitle}>{text}</Typography>
      </Box>
      <Box className={classes.equalBox}>
        <Box className={classes.posterData}>
          <Box display="flex" flexDirection="row" alignItems="center" style={{ height: 36 }}>
            <Box style={{ paddingRight: 20 }}>配信終了</Box>
            <Box>
              {date}（{weekDay(time)}）
            </Box>
            <Box>{hours} まで</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ArchivePoster
