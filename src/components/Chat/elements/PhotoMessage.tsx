import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

export interface MessageImageProps {
  currentMessage?: string
}

const PhotoMessage: React.FC<MessageImageProps> = (props) => {
  const classes = useStyles()

  const { currentMessage } = props

  return <Box className={classes.box}>{<img src={currentMessage} />}</Box>
}

const useStyles = makeStyles(() => ({
  box: {
    width: '100%',
    height: '100%',
  },
}))

PhotoMessage.defaultProps = {}

export default PhotoMessage
