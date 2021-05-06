import { CardMedia, CardMediaProps, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  mediaWrap: {
    position: 'relative',
    paddingTop: '50%',
  },
  media: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  cornerWrap: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: 50,
    borderTopStyle: 'solid',
    borderTopColor: 'rgba(0,0,0,.7)',
    backdropFilter: 'blur(1px)',
    borderRightWidth: 50,
    borderRightStyle: 'solid',
    borderRightColor: 'transparent',
  },
  iconWrap: {
    position: 'absolute',
    top: 10,
    left: 5,
    zIndex: 1,
  },
}))

const ESCardMedia: React.FC<CardMediaProps & { cornerIcon?: any; imageUrl: string }> = ({ children, ...rest }) => {
  const classes = useStyles(rest)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cornerIcon, imageUrl } = rest

  return (
    <>
      {cornerIcon && (
        <div className={classes.cornerWrap}>
          <div className={classes.iconWrap}>{cornerIcon}</div>
          <div className={classes.triangle}></div>
        </div>
      )}
      <Box className={classes.mediaWrap}>
        <CardMedia className={classes.media} image={imageUrl}>
          {children}
        </CardMedia>
      </Box>
    </>
  )
}

ESCardMedia.defaultProps = {
  cornerIcon: false,
  imageUrl: '',
}
export default ESCardMedia
