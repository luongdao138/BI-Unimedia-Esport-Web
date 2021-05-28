import React from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'

export interface SystemMessageProps {
  text?: string
}

const SystemMessage: React.FC<SystemMessageProps> = (props) => {
  const classes = useStyles()

  const { text } = props

  return (
    <Box className={classes.section}>
      <Box className={classes.box}>
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
    height: '100%',
    margin: '0 auto',
    borderRadius: 24,
    background: '#FFFFFF',
    display: 'inline-block',
    textAlign: 'center',
  },
  text: {
    display: 'inline-block',
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 6,
    color: Colors.grey[200],
    paddingBottom: 6,
  },
}))

export default SystemMessage
