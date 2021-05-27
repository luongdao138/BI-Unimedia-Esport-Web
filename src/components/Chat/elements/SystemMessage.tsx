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
    <Box className={classes.box}>
      <Typography variant="body2">{text}</Typography>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  box: {
    width: '100%',
    height: '100%',
    marginRight: 10,
    marginleft: 10,
    borderRadius: 24,
    background: Colors.white,
    paddding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
}))

export default SystemMessage
