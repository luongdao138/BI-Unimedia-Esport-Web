import { useState } from 'react'
import { CardMedia, CardMediaProps, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import _ from 'lodash'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ESCardMedia: React.FC<CardMediaProps & { cornerIcon?: any; triangleColor?: string }> = ({ children, ...rest }) => {
  const image = _.get(rest, 'image', null)

  const [src, setSrc] = useState(image)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cornerIcon, triangleColor } = rest
  const classes = useStyles({ triangleColor })
  const IMG_PLACEHOLDER = '/images/default_card.png'

  const handleError = () => {
    setSrc(IMG_PLACEHOLDER)
  }

  return (
    <>
      <Box className={classes.mediaWrap}>
        <CardMedia className={classes.media}>
          <Box className={classes.coverImage}>
            <LazyLoadImage
              onError={() => handleError()}
              src={src === null || src === undefined ? IMG_PLACEHOLDER : src}
              className={classes.coverImageInner}
              alt={'cover-image'}
            />
          </Box>
          {children}
        </CardMedia>
      </Box>
      <Box className={classes.cornerWrap}>
        <Box className={classes.iconWrap}>{cornerIcon}</Box>
        <Box className={classes.triangle}></Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles(() => ({
  coverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    right: 0,
    height: '100%',
    bottom: 0,
  },
  coverImageInner: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  mediaWrap: {
    position: 'relative',
    paddingTop: '50%',
    overflow: 'hidden',
  },
  media: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cornerWrap: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 3,
    willChange: 'transform',
    transform: 'translateZ(0)',
    WebkitTransform: 'translateZ(0)',
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 50,
    borderTopStyle: 'solid',
    borderTopColor: (props: { triangleColor: string }) => props.triangleColor || Colors.black_opacity[70],
    borderRightWidth: 50,
    borderRightStyle: 'solid',
    borderRightColor: 'transparent',
  },
  iconWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 7,
    zIndex: 1,
  },
}))

export default ESCardMedia
