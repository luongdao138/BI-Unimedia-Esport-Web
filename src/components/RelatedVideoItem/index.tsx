import { makeStyles, Box, Typography } from '@material-ui/core'
import React from 'react'
import { STATUS_VIDEO } from '@services/videoTop.services'
import { LIVE_VIDEO_TYPE } from '@constants/common.constants'
import { ESRoutes } from '@constants/route.constants'
import { useRouter } from 'next/router'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { useTranslation } from 'react-i18next'

interface Props {
  data: any
  handleCloseRelatedVideos: () => void
}

const useStyles = makeStyles(() => ({
  wrapper: {},
  thumbnailWrapper: {
    height: '100px',
    aspectRatio: '1.75',
    marginBottom: '0.5rem',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    border: '1px solid #947955',
    objectFit: 'cover',
  },
  duration: {
    position: 'absolute',
    right: '0.5rem',
    bottom: '0.5rem',
    padding: '0px 4px',
    borderRadius: '2px',
    backgroundColor: 'rgba(0,0,0,0.8)',
    '& span': {
      color: '#fff',
      fontSize: '10px',
      fontWeight: 500,
    },
  },
  videoInfo: {
    maxWidth: '175px',
  },
  videoTitle: {
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    lineClamp: 1,
    '-webkit-box-orient': 'vertical',
    color: '#fff',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '12px',
  },
  streamer: {
    fontSize: '10px',
  },
  liveTagContainer: {
    position: 'absolute',
    right: '0.5rem',
    bottom: '0.5rem',
    padding: '0px 4px',
    borderRadius: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4786',
  },
  tagStyle: {
    textAlign: 'center',
    paddingRight: 6,
    paddingLeft: 6,
    fontSize: '10px',
  },
}))

const RelatedVideoItem: React.FC<Props> = ({ data, handleCloseRelatedVideos }) => {
  const IMG_PLACEHOLDER = '/images/live_stream/thumbnail_default.png'
  const { t } = useTranslation(['common'])
  const thumbNail = data?.thumbnail ? data.thumbnail : !data?.thumbnail && data?.video_thumbnail ? data?.video_thumbnail : IMG_PLACEHOLDER
  const classes = useStyles()
  const router = useRouter()

  const onNavigateLive = () => {
    let vid = data?.uuid
    if (data.status === STATUS_VIDEO.LIVE_STREAM && data.scheduled_flag === LIVE_VIDEO_TYPE.LIVE) {
      vid = data?.user_id
    }
    router.push(
      {
        pathname: ESRoutes.TOP,
        query: { vid: vid },
      },
      `${ESRoutes.TOP}?vid=${vid}`,
      {
        shallow: true,
      }
    )
    handleCloseRelatedVideos()
  }

  return (
    <Box className={classes.wrapper} onClick={onNavigateLive}>
      <Box className={classes.thumbnailWrapper}>
        <img src={thumbNail} alt="thumbnail" className={classes.thumbnail} />
        {data?.status === 2 && (
          <span className={classes.duration}>
            <span>{FormatHelper.formatTime(data.duration)}</span>
          </span>
        )}
        {data?.status === 1 && (
          <Box className={classes.liveTagContainer} style={data?.use_ticket === 1 ? { marginLeft: '10px' } : {}}>
            <Typography className={classes.tagStyle}>{t('common:videos_top_tab.type_live_stream')}</Typography>
          </Box>
        )}
      </Box>
      <Box className={classes.videoInfo}>
        <Typography variant="body1" className={classes.videoTitle}>
          {data?.title}
        </Typography>
        <Typography variant="body2" className={classes.streamer}>
          {data?.user_nickname}
        </Typography>
      </Box>
    </Box>
  )
}

export default RelatedVideoItem
