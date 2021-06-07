import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'
import moment from 'moment'

export interface SystemMessageProps {
  text?: string
  time?: number | string
}

const SystemMessage: React.FC<SystemMessageProps> = (props) => {
  const classes = useStyles()

  const { text, time } = props
  const formatTime = moment(time).format('HH:mm')

  return (
    <Box className={classes.section}>
      <Box className={classes.box}>
        <Typography className={classes.textTime} variant="body2">
          {formatTime}
        </Typography>
        <Typography className={classes.text} variant="body2">
          {text}
        </Typography>
      </Box>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  section: {
    width: '100%',
    textAlign: 'center',
  },
  box: {
    width: '80%',
    paddingTop: 6,
    height: '100%',
    margin: '0 auto',
    borderRadius: 24,
    background: '#FFFFFF1A',
    display: 'inline-block',
    textAlign: 'center',
  },
  text: {
    display: 'inline-block',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 2,
    color: Colors.text[200],
    paddingBottom: 6,
  },
  textTime: {
    color: Colors.text[200],
    textAlign: 'center',
  },
}))

export default SystemMessage
