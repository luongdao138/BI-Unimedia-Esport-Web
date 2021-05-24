import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

export interface MessageImageProps {
  currentMessage?: string
}

const PhotoMessage: React.FC<MessageImageProps> = (props) => {
  const classes = useStyles()

  const { currentMessage } = props

  return <Box className={classes.box}>{<img className={classes.img} src={currentMessage} />}</Box>
}

const useStyles = makeStyles(() => ({
  box: {
    width: '100%',
    height: '100%',
    paddingTop: '66.6666%',
    position: 'relative',
    display: 'block',
  },
  img: {
    width: '100%',
    height: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    objectFit: 'cover',
  },
}))

PhotoMessage.defaultProps = {}

export default PhotoMessage
