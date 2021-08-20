import React from 'react'
import { Box, Typography, Theme, makeStyles, CardMedia } from '@material-ui/core'
import { VideoPreviewProps } from '../VideosList'

type VideoPreviewItemProps = {
  data?: VideoPreviewProps
}
const VideoPreviewItem: React.FC<VideoPreviewItemProps> = ({ data }) => {
  const classes = useStyles()
  const IMG_PLACEHOLDER = '/images/default_card.png'
  const iconDefault = '/images/avatar.png'
  return (
    <Box className={classes.container} key={data?.id}>
      <Box className={classes.videoContainer}>
        <CardMedia className={classes.video} image={data?.thumbnailLive ? data.thumbnailLive : IMG_PLACEHOLDER} />
        {data?.type === 'live' && (
          <Box className={classes.tagContainer}>
            <Typography className={classes.tagStyle}>{'ライブ配信中'}</Typography>
          </Box>
        )}
        {/* <Box className={classes.previewUser}> */}
        <img src={data?.thumbnailStreamer ? data.thumbnailStreamer : IMG_PLACEHOLDER} className={classes.previewUser} />
        {/* </Box> */}
        {/* <Box className={classes.previewVideo}></Box> */}
        <img src={data?.thumbnailVideo ? data.thumbnailVideo : IMG_PLACEHOLDER} className={classes.previewVideo} />
        {data?.type === 'schedule' && data?.scheduleTime && (
          <Box className={classes.scheduleContainer}>
            <Typography className={classes.scheduleTextStyle}>{data?.scheduleTime}</Typography>
          </Box>
        )}
      </Box>
      <Box className={classes.informationContainer}>
        {data?.title && (
          <Box className={classes.titleItemContainer}>
            <Typography variant="h3" className={classes.label}>
              {data?.title}
            </Typography>
          </Box>
        )}
        <Box className={classes.userItemContainer}>
          <Box className={classes.userStyle}>
            <Box className={classes.iconStyle}>
              <img src={data?.iconStreamer ? data.iconStreamer : iconDefault} width={36} height={36} className={classes.iconStyle} />
            </Box>
            <Box className={classes.nameContainer}>
              <Typography className={classes.nameStyle}>{data?.nameStreamer}</Typography>
            </Box>
          </Box>
          <Box className={classes.watchContainer}>
            {data?.waitingNumber && <Typography className={classes.nameStyle}>{data?.waitingNumber + '人 視聴中'}</Typography>}
            {data?.category && <Typography className={classes.valorantStyle}>{data?.category}</Typography>}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tagContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    position: 'absolute',
    backgroundColor: '#FF4786',
    marginTop: 10,
    marginLeft: 10,
  },
  tagStyle: {
    textAlign: 'center',
    paddingRight: 6,
    paddingLeft: 6,
  },
  videoContainer: {
    height: 150,
    borderRadius: 4,
    display: 'flex',
    position: 'relative',
  },
  video: {
    height: '100%',
    borderRadius: 4,
    display: 'flex',
    width: '100%',
  },
  previewUser: {
    position: 'absolute',
    height: 76,
    width: 96,
    marginTop: 40,
  },
  previewVideo: {
    width: 152,
    height: 72,
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    right: 0,
  },
  informationContainer: {
    padding: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  titleItemContainer: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'black',
  },
  userItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  userStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: theme.spacing(2),
  },
  nameContainer: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
  nameStyle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#fff',
  },
  watchContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignSelf: 'center',
  },
  label: {
    textAlign: 'center',
  },
  valorantStyle: {
    textAlign: 'right',
    color: '#424242',
  },
  scheduleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#F7F735',
  },
  scheduleTextStyle: {
    textAlign: 'center',
    paddingRight: 6,
    paddingLeft: 6,
    color: 'black',
  },
  [theme.breakpoints.down(769)]: {
    container: {
      width: 465,
    },
  },
  [theme.breakpoints.down(415)]: {
    container: {
      width: 299,
    },
  },
}))
export default VideoPreviewItem
