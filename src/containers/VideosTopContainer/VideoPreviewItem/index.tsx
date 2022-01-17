import React from 'react'
import { Box, Typography, Theme, makeStyles } from '@material-ui/core'
import { TypeVideo } from '@services/videoTop.services'
import { useTranslation } from 'react-i18next'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import moment from 'moment'
import { FORMAT_DATE_ARCHIVED, LIVE_VIDEO_TYPE } from '@constants/common.constants'
import { TypeVideoArchived } from '@services/liveStreamDetail.service'
import ESAvatar from '@components/Avatar'
import { STATUS_VIDEO } from '@services/videoTop.services'

type VideoPreviewItemProps = {
  data?: TypeVideo | TypeVideoArchived
  containerStyle?: any
}
const VideoPreviewItem: React.FC<VideoPreviewItemProps> = ({ data, containerStyle = {} }) => {
  const classes = useStyles()
  const { t } = useTranslation(['common'])
  const IMG_PLACEHOLDER = '/images/live_stream/thumbnail_default.png'
  //status = 0-schedule|1-live|2-archive
  const router = useRouter()
  const onNavigateLive = (data) => {
    let vid = data?.uuid
    if (data.status === STATUS_VIDEO.LIVE_STREAM && data.scheduled_flag === LIVE_VIDEO_TYPE.LIVE) {
      vid = data?.user_id
    }
    router.push(
      {
        pathname: ESRoutes.TOP,
        query: { vid: vid },
      },
      undefined,
      {
        shallow: true,
      }
    )
  }

  return (
    <Box className={classes.container} key={data?.id} onClick={() => onNavigateLive(data)} style={containerStyle}>
      <Box className={classes.videoContainer}>
        <Box
          className={classes.video}
          style={{
            backgroundImage: `url(${
              data?.thumbnail ? data.thumbnail : !data?.thumbnail && data?.video_thumbnail ? data?.video_thumbnail : IMG_PLACEHOLDER
            })`,
          }}
        />
        <Box className={classes.tagContainer}>
          {data?.use_ticket === 1 && (
            <Box className={classes.premiumTagContainer}>
              <Typography className={classes.tagStyle}>{t('common:videos_top_tab.premium')}</Typography>
            </Box>
          )}
          {data?.status === 1 && (
            <Box className={classes.liveTagContainer} style={data?.use_ticket === 1 ? { marginLeft: '10px' } : {}}>
              <Typography className={classes.tagStyle}>{t('common:videos_top_tab.type_live_stream')}</Typography>
            </Box>
          )}
        </Box>
        {/* <Box className={classes.previewUser}> */}
        {/* <img src={data?.user_avatar ? data.user_avatar : IMG_PLACEHOLDER} className={classes.previewUser} /> */}
        {/* </Box> */}
        {/* <Box className={classes.previewVideo}></Box> */}
        {/* <img src={data?.thumbnail ? data.thumbnail : IMG_PLACEHOLDER} className={classes.previewVideo} /> */}
        {data?.status === 0 && data?.stream_schedule_start_time && (
          <Box className={classes.scheduleContainer}>
            <Typography className={classes.scheduleTextStyle}>{CommonHelper.formatTimeVideo(data?.stream_schedule_start_time)}</Typography>
          </Box>
        )}
      </Box>
      <Box className={classes.informationContainer}>
        {data?.title && (
          <Box className={classes.titleItemContainer}>
            <Typography className={classes.label}>{FormatHelper.textSizeMode(data?.title, 30)}</Typography>
          </Box>
        )}
        <Box className={classes.userItemContainer}>
          <Box className={classes.userStyle}>
            <ESAvatar className={classes.iconStyle} alt={data?.user_nickname} src={data?.user_avatar} size={36} />
            <Box className={classes.nameContainer}>
              <Typography className={classes.userNameStyle}>{data?.user_nickname}</Typography>
            </Box>
          </Box>
          <Box className={classes.watchContainer}>
            {data?.status !== 2 && (
              <Typography className={classes.nameStyle}>
                {data?.type !== 'related'
                  ? FormatHelper.currencyFormat(`${data?.view_count}`) +
                    (data?.status === 1 ? t('common:videos_top_tab.view_count_text') : t('common:videos_top_tab.view_count_schedule_text'))
                  : '2021/06/22'}
              </Typography>
            )}
            {data?.status === 2 && data?.archived_end_time && (
              <Typography className={classes.nameStyle}>{moment(data?.archived_end_time).format(FORMAT_DATE_ARCHIVED)}</Typography>
            )}
            {data?.category_name && <Typography className={classes.valorantStyle}>{data?.category_name}</Typography>}
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
    '&:hover': {
      cursor: 'pointer',
    },
  },
  tagContainer: {
    display: 'flex',
    position: 'absolute',
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'row',
  },
  liveTagContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: '#FF4786',
  },
  premiumTagContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: '#212121',
    filter: 'drop-shadow(0px 0px 2px #FFFFFF)',
  },
  tagStyle: {
    textAlign: 'center',
    paddingRight: 6,
    paddingLeft: 6,
  },
  videoContainer: {
    borderRadius: 4,
    position: 'relative',
    paddingBottom: '55%',
    overflow: 'hidden',
  },
  video: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
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
    width: 'calc(100% - 100px)',
    justifyContent: 'flex-start',
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
    width: 'calc(100% - 52px)',
  },
  nameStyle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#FFFFFF',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  userNameStyle: {
    textAlign: 'left',
    fontSize: 12,
    color: '#FFFFFF',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  watchContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignSelf: 'center',
    width: '90px',
    justifyContent: 'flex-end',
  },
  label: {
    textAlign: 'left',
    fontSize: 14,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#FFFFFF',
  },
  valorantStyle: {
    textAlign: 'right',
    color: '#424242',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
    fontSize: 12,
  },
  [theme.breakpoints.down(650)]: {
    container: {
      width: 465,
    },
  },
  [theme.breakpoints.down(515)]: {
    container: {
      width: 320,
    },
  },
  [theme.breakpoints.down(415)]: {
    container: {
      width: 299,
    },
  },
  [theme.breakpoints.down(360)]: {
    container: {
      width: 260,
    },
  },
}))
export default VideoPreviewItem
