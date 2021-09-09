import { Box, Typography, makeStyles, Grid, Theme, Icon } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import React, { useState } from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import SocialDistributionCircle from '@components/Button/SocialDistributionCircle'
import i18n from '@locales/i18n'
import InfiniteScroll from 'react-infinite-scroll-component'
import { TypeVideo } from '@services/videoTop.services'
import { PreloadChannel, PreloadPreviewItem } from '../PreloadContainer'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'

interface dataItem {
  id: number
  type: string
}

const DistributorInfo: React.FC = () => {
  const [descriptionCollapse, setDescriptionCollapse] = useState(true)

  // const { t } = useTranslation('common')
  const classes = useStyles()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const isLoading = false

  const getDistributorSocialInfo = () => [
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

  const dataLiveVideo = Array(6)
    .fill('')
    .map((_, i) => ({
      id: i,
      type: 'related',
      title: `ムービータイトルムービータイトル ...`,
      user_avatar: '/images/dataVideoFake/fake_avatar.png',
      thumbnailLive: '/images/dataVideoFake/thumbnailLive.png',
      thumbnailStreamer: '/images/dataVideoFake/banner_01.png',
      thumbnail: '/images/dataVideoFake/banner_04.png',
      user_nickname: 'だみだみだみだみ',
      waitingNumber: 1500,
      category_name: 'Valorant',
    }))

  const getSocialIcon = (type) => {
    switch (type) {
      case 'twitter':
        return <SocialDistributionCircle onlyIcon={true} className={classes.socialIcon} social={type} />
      case 'instagram':
        return <SocialDistributionCircle onlyIcon={true} className={classes.socialIcon} social={type} />
      default:
        return <SocialDistributionCircle onlyIcon={true} className={classes.socialIcon} social={type} />
    }
  }

  const renderArchiveVideo = (item: TypeVideo, index: number) => {
    return (
      <>
        {downMd ? (
          <Box className={classes.xsItemContainer} key={index}>
            <VideoPreviewItem data={item} key={item.id} />
          </Box>
        ) : (
          <Grid item xs={6} lg={6} xl={4} className={classes.itemContainer} key={index}>
            <VideoPreviewItem data={item} key={item.id} />
          </Grid>
        )}
      </>
    )
  }
  const renderPreLoadArchiveVideoItem = () => {
    const arrayPreLoad = Array(10)
      .fill('')
      .map((_, i) => ({ i }))
    return arrayPreLoad.map(() => (
      <>
        {downMd ? (
          <Box className={classes.xsItemContainer}>
            <Box className={classes.wrapPreLoadContainer}>
              <PreloadPreviewItem />
            </Box>
          </Box>
        ) : (
          <Grid item xs={6} className={classes.itemContainer}>
            <PreloadPreviewItem />
          </Grid>
        )}
      </>
    ))
  }

  const getChannelDescriptionText = () =>
    '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
    '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
    '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
    '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
    '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
    '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。'

  const getDescriptionTruncated = () => {
    return descriptionCollapse ? `${getChannelDescriptionText().substring(0, downMd ? 70 : 200)}...` : getChannelDescriptionText()
  }

  const collapseButton = () => (
    <Box className={classes.seeMoreContainer}>
      <Box
        onClick={() => {
          setDescriptionCollapse(!descriptionCollapse)
        }}
        className={classes.seeMore}
      >
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
        <Typography className={classes.content}>{getDescriptionTruncated()}</Typography>
        {getChannelDescriptionText().length > 200 && collapseButton()}
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
        {getChannelDescriptionText().length > 0 && !isLoading ? (
          <>
            <Box className={classes.channelContainer}>
              <ESAvatar className={classes.avatar} src={'/images/avatar.png'} />
              <Box className={classes.textContainer}>
                <Typography className={classes.title}>{'配信者の名前がはいります'}</Typography>
                {channelDescription()}
              </Box>
            </Box>
            <Box className={classes.socialMediaContainer}>
              {getDistributorSocialInfo().map((item: dataItem) => {
                return getSocialIcon(item.type)
              })}
            </Box>
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
          dataLength={dataLiveVideo.length}
          next={() => {
            // loadMore(page, follow)
          }}
          hasMore={true}
          loader={null}
          scrollThreshold={0.8}
          style={{ overflow: 'hidden' }}
        >
          {dataLiveVideo?.length > 0 ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {dataLiveVideo.map(renderArchiveVideo)}
            </Grid>
          ) : dataLiveVideo?.length === 0 && isLoading ? (
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
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    flexDirection: 'column',
  },
  titleContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 54,
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
  },
  label: {},
  seeMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 36,
    justifyContent: 'flex-end',
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
    paddingBottom: 24,
    paddingLeft: 10,
  },
  wrapPreLoadDescription: {},
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
  [theme.breakpoints.up(960)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '33.333333%',
      flexBasis: '33.333333%',
    },
  },
  [theme.breakpoints.up(1680)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '25%',
      flexBasis: '25%',
    },
  },
  [theme.breakpoints.up(1920)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '25%',
      flexBasis: '25%',
    },
  },
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
      paddingLeft: 10,
      paddingRight: 10,
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
      overflow: 'auto',
    },
    xsItemContainer: {
      paddingRight: '24px',
      '&:last-child': {
        paddingRight: 0,
      },
    },
    seeMoreContainer: {
      marginTop: 16,
      justifyContent: 'center',
    },
    seeMore: {
      justifyContent: 'center',
    },
  },
}))
export default DistributorInfo
