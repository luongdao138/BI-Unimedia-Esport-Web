import { CardMedia, CardMediaProps, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

const ESCardMedia: React.FC<CardMediaProps & { cornerIcon?: any }> = ({ children, ...rest }) => {
  const classes = useStyles()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cornerIcon } = rest
  const IMG_PLACEHOLDER = '/images/img_404.jpg'

  return (
    <>
      {cornerIcon && (
        <div className={classes.cornerWrap}>
          <div className={classes.iconWrap}>{cornerIcon}</div>
          <div className={classes.triangle}></div>
        </div>
      )}
      <Box className={classes.mediaWrap}>
        <CardMedia className={classes.media} image={rest?.image ? rest.image : IMG_PLACEHOLDER}>
          {children}
        </CardMedia>
      </Box>
    </>
  )
}

const useStyles = makeStyles(() => ({
  mediaWrap: {
    position: 'relative',
    height: 120,
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
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 50,
    borderTopStyle: 'solid',
    borderTopColor: Colors.black_opacity[70],
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
