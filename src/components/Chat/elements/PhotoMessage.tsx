import React, { useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'

export interface MessageImageProps {
  msg?: string
  onLoadImage: () => void
}

const IMG_PLACEHOLDER = '/images/img_404.jpg'

const PhotoMessage: React.FC<MessageImageProps> = (props) => {
  const classes = useStyles()

  const { msg } = props

  const [src, setSrc] = useState<string>(msg)

  const onError = () => {
    setSrc(IMG_PLACEHOLDER)
  }

  return <Box className={classes.box}>{<img onLoad={() => props.onLoadImage()} onError={onError} className={classes.img} src={src} />}</Box>
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
