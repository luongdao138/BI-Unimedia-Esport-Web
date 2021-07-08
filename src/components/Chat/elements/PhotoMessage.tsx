import React, { useState } from 'react'
import { Box, makeStyles } from '@material-ui/core'
import { SRLWrapper } from 'simple-react-lightbox'
import { LIGHTBOX_OPTIONS } from '@constants/common.constants'

export interface MessageImageProps {
  msg?: string
  onLoadImage?: () => void
  size?: number
  status: boolean
}

const IMG_PLACEHOLDER = '/images/img_404.jpg'

const PhotoMessage: React.FC<MessageImageProps> = (props) => {
  const { msg, size } = props
  const classes = useStyles(props)

  const [src, setSrc] = useState<string>(msg)

  const onError = () => {
    setSrc(IMG_PLACEHOLDER)
  }

  return (
    <SRLWrapper options={LIGHTBOX_OPTIONS}>
      <Box className={`${classes.box} ${size ? classes.sizedBox : ''}`}>
        {<img onLoad={() => props.onLoadImage && props.onLoadImage()} onError={onError} className={classes.img} src={src} />}
      </Box>
    </SRLWrapper>
  )
}

const useStyles = makeStyles(() => ({
  box: {
    width: '100%',
    height: 200,
    cursor: 'pointer',
    opacity: (props: MessageImageProps) => (props.status === true ? 1 : 0.4),
    transition: 'all 0.5s ease',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  sizedBox: {
    width: (props: MessageImageProps) => props.size,
    height: (props: MessageImageProps) => props.size,
  },
  notSent: {
    opacity: 0.3,
  },
}))

PhotoMessage.defaultProps = {}

export default PhotoMessage
