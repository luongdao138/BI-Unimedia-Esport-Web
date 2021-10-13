import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormatHelper } from '@utils/helpers/FormatHelper'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import i18n from '@locales/i18n'
import InfiniteScroll from 'react-infinite-scroll-component'
import ESLoader from '@components/Loader'
import useLiveStreamDetail from '@containers/VideoLiveStreamContainer/useLiveStreamDetail'
import { LIMIT_ITEM, TypeVideoArchived } from '@services/liveStreamDetail.service'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { PreloadPreviewItem } from '@containers/VideoLiveStreamContainer/PreloadContainer'
import { useTheme } from '@material-ui/core/styles'
import _ from 'lodash'
import moment from 'moment'
import { FORMAT_DATE_SIMPLE, FORMAT_SCHEDULE_TIME, FORMAT_TIME_SIMPLE } from '@constants/common.constants'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'

interface InfoSectionProps {
  title?: string
  containerClass?: string
  content?: string
  htmlEnable?: boolean
  contentClass?: string
}

interface ProgramInfoProps {
  videoInfo?: any
  videoItemStyle?: any
}

const ProgramInfoNoViewingTicket: React.FC<ProgramInfoProps> = ({ videoInfo, videoItemStyle }) => {
  const { meta_archived_video_stream, archivedVideoStreamData, getArchivedVideoStream, resetArchivedVideoStream } = useLiveStreamDetail()
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState(true)
  const isLoadingData = meta_archived_video_stream?.pending
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769), { noSsr: true })
  const { width: itemWidthDownMdScreen } = useWindowDimensions(48)

  useEffect(() => {
    if (videoInfo?.uuid) {
      getArchivedVideoStream({ video_id: videoInfo?.uuid, page: page, limit: LIMIT_ITEM })
    }
    return () => {
      setPage(1)
      resetArchivedVideoStream()
    }
  }, [videoInfo])

  useEffect(() => {
    if (page > 1) {
      getArchivedVideoStream({ video_id: videoInfo?.uuid, page: page, limit: LIMIT_ITEM })
    }
  }, [page])

  const handleLoadMore = async () => {
    if (archivedVideoStreamData.length > 0 && archivedVideoStreamData.length < LIMIT_ITEM * page) {
      setHasMore(false)
      return
    }
    if (archivedVideoStreamData.length > 0 && archivedVideoStreamData.length == LIMIT_ITEM * page) {
      await setPage(page + 1)
    }
  }

  const { t } = useTranslation('common')
  const classes = useStyles()
  const InfoSection = (props: InfoSectionProps) => {
    const { title, containerClass, content, htmlEnable = false, contentClass = '' } = props
    return (
      <Box className={`${classes.infoSectionContainer} ${containerClass}`}>
        <Typography className={classes.infoSectionTitle}>{title}</Typography>
        {htmlEnable ? (
          <div
            className={classes.infoContent + ' ' + classes.infoSectionContent + ' ' + contentClass}
            dangerouslySetInnerHTML={{
              __html: CommonHelper.linkifyString(content),
            }}
          />
        ) : (
          <Box className={classes.infoContent}>
            <Typography className={classes.infoSectionContent}>{content}</Typography>
          </Box>
        )}
      </Box>
    )
  }

  const renderArchiveVideoItem = (item: TypeVideoArchived, index: number) => {
    return (
      <React.Fragment key={item?.id || index}>
        {downMd ? (
          <Box className={classes.xsItemContainer}>
            <VideoPreviewItem data={item} containerStyle={{ width: itemWidthDownMdScreen }} />
          </Box>
        ) : (
          <Grid item xs={6} lg={6} xl={4} className={classes.itemContainer} style={videoItemStyle}>
            <VideoPreviewItem data={item} />
          </Grid>
        )}
      </React.Fragment>
    )
  }

  const renderPreLoadArchiveVideoItem = () => {
    const arrayPreLoad = Array(6)
      .fill('')
      .map((_, i) => ({ i }))
    return arrayPreLoad.map((_item: any, index: number) =>
      downMd ? (
        <Box className={classes.xsItemContainer} key={index}>
          <Box className={classes.wrapPreLoadContainer}>
            <PreloadPreviewItem />
          </Box>
        </Box>
      ) : (
        <Grid item xs={6} className={classes.itemContainer} key={index}>
          <PreloadPreviewItem />
        </Grid>
      )
    )
  }

  const archivedVideo = () => {
    return (
      <Box>
        <Box className={classes.archiveVideoTitleContainer}>
          <Typography className={classes.archiveVideoTitle}>{i18n.t('common:live_stream_screen.archived_stream_video')}</Typography>
        </Box>
        <Box className={classes.wrapContentContainer}>
          <InfiniteScroll
            className={classes.scrollContainer}
            dataLength={archivedVideoStreamData.length}
            next={handleLoadMore}
            hasMore={hasMore}
            loader={
              isLoadingData && (
                <div className={classes.loaderCenter}>
                  <ESLoader />
                </div>
              )
            }
            scrollThreshold={0.8}
            style={{ overflow: 'hidden' }}
          >
            {archivedVideoStreamData?.length > 0 ? (
              <Grid container spacing={3} className={classes.contentContainer}>
                {archivedVideoStreamData.map(renderArchiveVideoItem)}
              </Grid>
            ) : archivedVideoStreamData?.length === 0 && isLoadingData ? (
              <Grid container spacing={3} className={classes.contentContainer}>
                {renderPreLoadArchiveVideoItem()}
              </Grid>
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </InfiniteScroll>
        </Box>
      </Box>
    )
  }

  const getLiveStreamDateAndTime = () => {
    if (_.isEmpty(videoInfo)) {
      return ''
    }
    const { stream_schedule_start_time: startTime, stream_schedule_end_time: endTime } = videoInfo
    // const {
    //   stream_schedule_start_time: startTime,
    //   stream_schedule_end_time: endTime
    // } = { stream_schedule_start_time: '2021-10-07 23:00:00', stream_schedule_end_time: '2021-10-08 02:00:00' }

    const startMoment = moment(startTime).startOf('days')
    const endMoment = moment(endTime).startOf('days')
    const dateDiff = startMoment.diff(endMoment, 'days')

    if (dateDiff === 0) {
      return `${startMoment.format(FORMAT_DATE_SIMPLE)} ${moment(startTime).format(FORMAT_TIME_SIMPLE)}〜${moment(endTime).format(
        FORMAT_TIME_SIMPLE
      )}`
    }
    return `${moment(startTime).format(FORMAT_SCHEDULE_TIME)}〜${moment(endTime).format(FORMAT_SCHEDULE_TIME)}`
  }

  const getSellingTicketDate = () => {
    if (_.isEmpty(videoInfo)) {
      return ''
    }
    const { sell_ticket_start_time } = videoInfo
    return `${moment(sell_ticket_start_time).format(FORMAT_SCHEDULE_TIME)} から`
  }

  const getPublicVideoArchivedTime = () => {
    if (_.isEmpty(videoInfo)) {
      return ''
    }
    const { video_publish_end_time: endPublishTime, stream_schedule_end_time: endLiveTime } = videoInfo
    if (!endPublishTime) {
      return t('live_stream_screen.after_stream_ended')
    }
    const startMoment = moment(endPublishTime).startOf('days')
    const endMoment = moment(endLiveTime).startOf('days')
    const dateDiff = startMoment.diff(endMoment, 'days')

    return `配信終了後から ${dateDiff} ${t('common.day')}後の${moment(endPublishTime).format(FORMAT_TIME_SIMPLE)}まで`
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.infoFirstRow}>
        <InfoSection title={t('live_stream_screen.delivery_start_date_and_time')} content={getLiveStreamDateAndTime()} />
        <InfoSection
          title={t('live_stream_screen.ticket_sales_date_and_time')}
          containerClass={classes.infoRowRightItem}
          content={getSellingTicketDate()}
        />
      </Box>
      <Box className={classes.infoSecondRow}>
        <InfoSection title={t('live_stream_screen.archive_publication_period')} content={getPublicVideoArchivedTime()} />
        <InfoSection
          title={t('live_stream_screen.point_required_for_viewing')}
          containerClass={classes.infoRowRightItem}
          content={`${FormatHelper.currencyFormat(videoInfo?.ticket_price)} eXeポイント`}
        />
      </Box>
      <Box className={`${classes.infoSectionContainer} ${classes.infoLastItem}`}>
        <Typography className={classes.infoSectionTitle}>{t('live_stream_screen.explanation')}</Typography>
        <Box className={classes.infoContent + ' ' + classes.infoContentDescription}>
          <Box className={classes.description}>
            <div
              className={classes.infoSectionContent}
              dangerouslySetInnerHTML={{
                __html: CommonHelper.linkifyString(videoInfo?.description),
              }}
            />
          </Box>
        </Box>
      </Box>
      {archivedVideo()}
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    width: '100%',
    paddingLeft: '22px',
    paddingRight: '16px',
    flexDirection: 'column',
  },
  infoSectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  infoFirstRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  infoSectionTitle: {
    fontSize: 14,
    color: 'white',
  },
  infoContent: {
    marginTop: '9px',
    padding: '16px 14px',
    backgroundColor: 'black',
    border: '1px solid #4c4c4c',
    borderRadius: '4px',
    width: '100%',
    whiteSpace: 'pre-wrap',
  },
  infoContentDescription: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxHeight: '80px',
  },
  description: {
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 1,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222222',
      borderRadius: 6,
    },
  },
  infoSectionContent: {
    color: 'white',
  },
  infoSecondRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
  },
  infoLastItem: {
    marginTop: 24,
  },
  archiveVideoTitleContainer: {
    paddingLeft: 10,
    marginTop: 34,
    marginBottom: 34,
  },
  archiveVideoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  wrapContentContainer: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    height: '100%',
  },
  scrollContainer: {
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  loaderCenter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    textAlign: 'center',
  },
  contentContainer: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    height: '100%',
  },
  itemContainer: {
    flexGrow: 0,
    maxWidth: '25%',
    flexBasis: '25%',
  },
  infoRowRightItem: {
    marginLeft: '81px',
  },
  [theme.breakpoints.down(1680)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '33.333333%',
      flexBasis: '33.333333%',
    },
    infoRowRightItem: {
      marginLeft: '40px',
    },
    infoSectionTitle: {
      fontSize: '13px',
    },
    infoSectionContent: {
      fontSize: '13px',
    },
  },
  [theme.breakpoints.down(1401)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '50%',
      flexBasis: '50%',
    },
    infoRowRightItem: {
      marginLeft: '10px',
      flex: 0.8,
    },
    infoSectionTitle: {
      fontSize: '9px',
    },
    infoSectionContent: {
      fontSize: '9px',
    },
  },
  [theme.breakpoints.down(1167)]: {},
  [theme.breakpoints.down(992)]: {},
  [theme.breakpoints.down(769)]: {
    wrapContentContainer: {
      overflow: 'auto',
    },
    wrapPreLoadContainer: {
      width: 290,
    },
    contentContainer: {
      margin: '0px',
      paddingBottom: '0px',
    },
    xsItemContainer: {
      paddingRight: '16px',
      marginBottom: '24px',
      display: 'flex',
      justifyContent: 'center',
      width: 'calc(100vw)',
    },
    xsItemContainerBonus: {
      marginRight: '20.7px',
      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  [theme.breakpoints.down(576)]: {
    infoRowRightItem: {
      marginLeft: '0px !important',
    },
    infoSecondRow: {
      flexDirection: 'column',
      marginTop: '0px',
    },
    infoFirstRow: {
      flexDirection: 'column',
      marginTop: '0px',
    },
    infoSectionContainer: {
      marginTop: '16px',
    },
    infoSectionContent: {
      fontSize: '14px',
    },
    infoSectionTitle: {
      fontSize: '14px',
    },
  },
}))
export default ProgramInfoNoViewingTicket
