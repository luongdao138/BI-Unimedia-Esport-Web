import React from 'react'
import { Box, makeStyles } from '@material-ui/core'

export interface MessageImageProps {
  msg?: string
  onLoadImage: () => void
}

const PhotoMessage: React.FC<MessageImageProps> = (props) => {
  const classes = useStyles()

  const { msg } = props

  return <Box className={classes.box}>{<img onLoad={() => props.onLoadImage()} className={classes.img} src={msg} />}</Box>
}

const useStyles = makeStyles(() => ({
  box: {
    width: '100%',
    height: 200,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}))

PhotoMessage.defaultProps = {}

export default PhotoMessage
