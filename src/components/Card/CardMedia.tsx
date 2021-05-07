import { CardMedia, CardMediaProps, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const ESCardMedia: React.FC<CardMediaProps & { cornerIcon?: any }> = ({ children, ...rest }) => {
  const classes = useStyles()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cornerIcon } = rest

  return (
    <>
      {cornerIcon && (
        <div className={classes.cornerWrap}>
          <div className={classes.iconWrap}>{cornerIcon}</div>
          <div className={classes.triangle}></div>
        </div>
      )}
      <Box className={classes.mediaWrap}>
        <CardMedia className={classes.media} image={rest.image}>
          {children}
        </CardMedia>
      </Box>
    </>
  )
}

const useStyles = makeStyles(() => ({
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
