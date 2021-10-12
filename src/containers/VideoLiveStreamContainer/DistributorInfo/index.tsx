import { Box, Typography, makeStyles, Grid, Theme, Icon } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import SocialDistributionCircle from '@components/Button/SocialDistributionCircle'
import i18n from '@locales/i18n'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PreloadChannel, PreloadPreviewItem } from '../PreloadContainer'
import useLiveStreamDetail from '../useLiveStreamDetail'
import { LIMIT_ITEM, TypeVideoArchived } from '@services/liveStreamDetail.service'
import ESLoader from '@components/Loader'
import useDetailVideo from '../useDetailVideo'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'

interface dataItem {
  id: number
  type: string
}
type DistributorInfoProps = {
  video_id?: string | string[]
  videoItemStyle?: any
}

const DistributorInfo: React.FC<DistributorInfoProps> = ({ video_id, videoItemStyle }) => {
  const classes = useStyles()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769), { noSsr: true })
  const isLoading = false
  const { detailVideoResult } = useDetailVideo()
  const { meta_archived_video_stream, archivedVideoStreamData, getArchivedVideoStream, resetArchivedVideoStream } = useLiveStreamDetail()
  const isLoadingData = meta_archived_video_stream?.pending

  const getChannelDescriptionText = CommonHelper.linkifyString(detailVideoResult?.channel_description)

  const [descriptionCollapse, setDescriptionCollapse] = useState(true)
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState(true)
  const { width: itemWidthDownMdScreen } = useWindowDimensions(48)

  const handleLoadMore = async () => {
    if (archivedVideoStreamData.length > 0 && archivedVideoStreamData.length < LIMIT_ITEM * page) {
      setHasMore(false)
      return
    }
    if (archivedVideoStreamData.length > 0 && archivedVideoStreamData.length == LIMIT_ITEM * page) {
      await setPage(page + 1)
    }
  }

  useEffect(() => {
    if (video_id) {
      getArchivedVideoStream({ video_id: video_id, page: page, limit: LIMIT_ITEM })
    }
    return () => {
      setPage(1)
      resetArchivedVideoStream()
    }
  }, [video_id])

  useEffect(() => {
    if (page > 1) getArchivedVideoStream({ video_id: video_id, page: page, limit: LIMIT_ITEM })
  }, [page])

  const getDistributorSocialInfo = [
    {
      id: 0,
      type: 'twitter',
    },
    {
      id: 1,
      type: 'instagram',
    },
    {
      id: 2,
      type: 'discord',
    },
  ]

  const getSocialIcon = (item: dataItem) => {
    switch (item?.type) {
      case 'twitter':
        return (
          <React.Fragment key={item?.id}>
            {detailVideoResult?.channel_twitter_link && (
              <SocialDistributionCircle
                onlyIcon={!!detailVideoResult?.channel_twitter_link}
                className={classes.socialIcon}
                social={item?.type}
                key={item?.id}
                link={detailVideoResult?.channel_twitter_link}
              />
            )}
          </React.Fragment>
        )
      case 'instagram':
        return (
          <React.Fragment key={item?.id}>
            {detailVideoResult?.channel_instagram_link && (
              <SocialDistributionCircle
                onlyIcon={!!detailVideoResult?.channel_instagram_link}
                className={classes.socialIcon}
                social={item?.type}
                key={item?.id}
                link={detailVideoResult?.channel_instagram_link}
              />
            )}
          </React.Fragment>
        )
      default:
        return (
          <React.Fragment key={item?.id}>
            {detailVideoResult?.channel_discord_link && (
              <SocialDistributionCircle
                onlyIcon={!!detailVideoResult?.channel_discord_link}
                className={classes.socialIcon}
                social={item?.type}
                key={item?.id}
                link={detailVideoResult?.channel_discord_link}
              />
            )}
          </React.Fragment>
        )
    }
  }

  const renderArchiveVideo = (item: TypeVideoArchived, index: number) => {
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
          <Box className={classes.wrapPreLoadContainer} style={{ width: itemWidthDownMdScreen }}>
            <PreloadPreviewItem />
          </Box>
        </Box>
      ) : (
        <Grid item xs={6} className={classes.itemContainer} style={videoItemStyle} key={index}>
          <PreloadPreviewItem />
        </Grid>
      )
    )
  }

  const getDescriptionTruncated = () => {
    return descriptionCollapse ? `${getChannelDescriptionText.substring(0, downMd ? 70 : 200)}...` : getChannelDescriptionText
  }

  const toggleDescriptionViewMore = () => {
    setDescriptionCollapse(!descriptionCollapse)
  }

  const collapseButton = () => (
    <Box className={classes.seeMoreContainer}>
      <Box onClick={toggleDescriptionViewMore} className={classes.seeMore}>
        <Typography className={classes.seeMoreTitle}>
          {descriptionCollapse ? i18n.t('common:live_stream_screen.view_more') : i18n.t('common:live_stream_screen.view_less')}
        </Typography>
        <Icon className={`fa ${descriptionCollapse ? 'fa-angle-down' : 'fa-angle-up'} ${classes.angleDownIcon}`} fontSize="small" />
      </Box>
    </Box>
  )

  const channelDescription = () => {
    return (
      <Box className={classes.channelDescription}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{
            __html: getChannelDescriptionText?.length < 200 ? getChannelDescriptionText : getDescriptionTruncated(),
          }}
        />
        {getChannelDescriptionText.length > 200 && collapseButton()}
      </Box>
    )
  }
  const renderPreloadChannel = () => {
    return (
      <>
        {downMd ? (
          <Box className={classes.wrapPreLoadDescription}>
            <PreloadChannel isMobile={true} />
          </Box>
        ) : (
          <Box className={classes.preloadDescription}>
            <PreloadChannel isMobile={false} />
          </Box>
        )}
      </>
    )
  }
  return (
    <Box className={classes.container}>
      <Box className={classes.titleContainer}>
        {getChannelDescriptionText.length > 0 && !isLoading ? (
          <>
            <Box className={classes.channelContainer}>
              <ESAvatar className={classes.avatar} alt={detailVideoResult?.user_nickname} src={detailVideoResult?.user_avatar} />
              <Box className={classes.textContainer}>
                {/* <Typography className={classes.title}>{'配信者の名前がはいります'}</Typography> */}
                {detailVideoResult?.channel_name && <Typography className={classes.title}>{detailVideoResult?.channel_name}</Typography>}
                {channelDescription()}
              </Box>
            </Box>
            {detailVideoResult?.channel_twitter_link ||
            detailVideoResult?.channel_instagram_link ||
            detailVideoResult?.channel_discord_link ? (
              <Box className={classes.socialMediaContainer}>
                {getDistributorSocialInfo.map((item: dataItem) => {
                  return getSocialIcon(item)
                })}
              </Box>
            ) : (
              ''
            )}
          </>
        ) : (
          <>{renderPreloadChannel()}</>
        )}
      </Box>
      {/* Archive Video */}
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
            isLoadingData &&
            !downMd && (
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
              {archivedVideoStreamData.map(renderArchiveVideo)}
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
const useStyles = makeStyles((theme: Theme) => ({
  loaderCenter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    textAlign: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    flexDirection: 'column',
  },
  titleContainer: {
    display: 'flex',
    width: '100%',
    // justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 24,
  },
  wrapTitleContainer: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 16,
  },
  channelContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  label: {},
  seeMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    height: '100%',
  },
  seeMore: {
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
  },
  seeMoreTitle: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 14,
    marginRight: 8,
  },
  angleDownIcon: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 12,
  },
  channelDescription: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  avatar: {
    marginRight: '14px',
    width: '72px',
    height: '72px',
  },
  textContainer: {
    flex: 1,
    display: 'flex',
    marginLeft: '22px',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    marginTop: 7,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
  socialMediaContainer: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'flex-end',
    marginLeft: '124px',
  },
  socialIcon: {
    width: 60,
    height: 60,
    marginRight: 22,
    borderRadius: 30,
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
    overflow: 'hidden',
    padding: '0 24px 8px 24px',
  },
  itemContainer: {
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapPreLoadDescription: {},
  [theme.breakpoints.up(1920)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '25%',
      flexBasis: '25%',
    },
  },
  [theme.breakpoints.up(1680)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '25%',
      flexBasis: '25%',
    },
  },
  [theme.breakpoints.down(1401)]: {
    socialMediaContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginLeft: '30px',
    },
    textContainer: {
      marginLeft: '12px',
    },
    socialIcon: {
      width: 60,
      height: 60,
      marginLeft: 5,
      borderRadius: 30,
    },
  },
  [theme.breakpoints.up(1167)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '50%',
      flexBasis: '50%',
    },
  },
  // [theme.breakpoints.up(1401)]: {
  //   itemContainer: {
  //     flexGrow: '0',
  //     maxWidth: '33.333333%',
  //     flexBasis: '33.333333%',
  //   },
  // },
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  [theme.breakpoints.down(769)]: {
    titleContainer: {
      position: 'relative',
      marginTop: 16,
      flexDirection: 'column',
    },
    socialMediaContainer: {
      justifyContent: 'flex-start',
      marginTop: 24,
      marginLeft: 10,
    },
    wrapContentContainer: {
      // paddingLeft: 10,
      // paddingRight: 10,
      width: 'calc(100vw)',
      overflow: 'auto',
    },
    wrapPreLoadContainer: {
      width: 290,
    },
    wrapPreLoadDescription: {
      width: 'calc(100vw)',
      flexDirection: 'column',
      marginTop: 0,
    },
    contentContainer: {
      flexWrap: 'nowrap',
      margin: '0px',
      paddingBottom: '0px',
      flexDirection: 'column',
    },
    xsItemContainer: {
      paddingRight: '24px',
      marginBottom: '24px',
      '&:last-child': {
        paddingRight: 0,
      },
    },
    seeMoreContainer: {
      marginTop: 12,
      justifyContent: 'center',
    },
    seeMore: {
      justifyContent: 'center',
    },
  },
}))
export default DistributorInfo
