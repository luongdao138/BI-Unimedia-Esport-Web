import React, { useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { SRLWrapper } from 'simple-react-lightbox'
import { LIGHTBOX_OPTIONS } from '@constants/common.constants'

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

  return (
    <SRLWrapper options={LIGHTBOX_OPTIONS}>
      <Box className={classes.box}>{<img onLoad={() => props.onLoadImage()} onError={onError} className={classes.img} src={src} />}</Box>
    </SRLWrapper>
  )
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
