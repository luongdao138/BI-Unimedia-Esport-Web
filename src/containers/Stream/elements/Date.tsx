import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/live/colors'
import Box from '@material-ui/core/Box'
import moment from 'moment'
import { weekDay } from '@containers/Stream/elements/helper'

export interface DateProps {
  time: any
  absolute?: boolean
  showLabel?: boolean
}

const useStyles = makeStyles((theme) => ({
  infoText: {
    fontSize: 13,
    color: Colors.grey[400],
  },
  [theme.breakpoints.down('xs')]: {
    infoText: {
      fontSize: 12,
    },
  },
}))

const DateComponent: React.FC<DateProps> = (props) => {
  const { time, absolute, showLabel } = props

  const date = time ? moment(time).format('YYYY/MM/DD') : null
  const hours = time ? moment(time).format('HH:mm') : null

  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="row" alignItems="center" style={{ height: 36 }}>
      <Box className={classes.infoText}>
        {date}（{weekDay(time)}）
      </Box>
      <Box className={classes.infoText}>
        {hours} {!showLabel ? '' : absolute ? '開始' : '~'}
      </Box>
    </Box>
  )
}

DateComponent.defaultProps = {
  absolute: true,
  showLabel: true,
}

export default DateComponent
