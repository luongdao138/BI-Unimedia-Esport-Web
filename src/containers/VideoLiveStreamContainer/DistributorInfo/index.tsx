import { Box, Typography, makeStyles, Grid, Theme, Icon } from '@material-ui/core'
import ESAvatar from '@components/Avatar'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import React, { useState } from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import SocialDistributionCircle from '@components/Button/SocialDistributionCircle'
import i18n from '@locales/i18n'
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

  const dataLiveVideo = () =>
    Array(6)
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

  const archiveVideo = () => (
    <Box className={classes.archiveVideoContainer}>
      <Typography gutterBottom className={classes.archiveVideoTitle}>
        {i18n.t('common:live_stream_screen.archived_stream_video')}
      </Typography>
      <Grid container spacing={3} className={classes.contentContainer}>
        {dataLiveVideo().map((data, i) => (
          <>
            {downMd ? (
              <Box className={classes.xsItemContainer} key={i}>
                <VideoPreviewItem data={data} key={i} />
              </Box>
            ) : (
              <Grid item xs={6} lg={6} xl={4} className={classes.itemContainer} key={i}>
                <VideoPreviewItem data={data} key={i} />
              </Grid>
            )}
          </>
        ))}
      </Grid>
    </Box>
  )

  const getChannelDescriptionText = () =>
    '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
    '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
    '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
    '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
    '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。\n' +
    '配信者のプロフィールがここに表示されます。配信者のプロフィールがここに表示されます。'

  const getDescriptionTruncated = () => {
    return descriptionCollapse ? `${getChannelDescriptionText().substring(0, 200)}...` : getChannelDescriptionText()
  }

  const collapseButton = () => (
    <Box className={classes.seeMoreContainer}>
      <Box
        onClick={() => {
          setDescriptionCollapse(!descriptionCollapse)
        }}
        className={classes.seeMore}
      >
        <Typography className={classes.seeMoreTitle}>{i18n.t('common:profile.read_more')}</Typography>
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
  return (
    <Box>
      <Box className={classes.container}>
        <ESAvatar className={classes.avatar} src={'/images/avatar.png'} />
        <Box className={classes.textContainer}>
          <Typography className={classes.title}>{'配信者の名前がはいります'}</Typography>
          {channelDescription()}
        </Box>
        <Box className={classes.socialMediaContainer}>
          {getDistributorSocialInfo().map((item: dataItem) => {
            return getSocialIcon(item.type)
          })}
        </Box>
      </Box>
      {archiveVideo()}
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    marginTop: 58,
    flexDirection: 'row',
    paddingLeft: 22,
    paddingRight: 22,
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
  },
  seeMoreTitle: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 14,
    marginRight: 6,
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
    justifyContent: 'flex-end',
    marginLeft: '124px',
  },
  socialIcon: {
    width: 60,
    height: 60,
    marginLeft: 22,
    borderRadius: 30,
  },
  archiveVideoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  archiveVideoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 80,
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
  [theme.breakpoints.down(769)]: {
    contentContainer: {
      flexWrap: 'nowrap',
      margin: '0px',
      paddingBottom: '0px',
      marginLeft: 10,
      marginRight: 10,
    },
    xsItemContainer: {
      paddingRight: '24px',
      '&:last-child': {
        paddingRight: 0,
      },
    },
  },
}))
export default DistributorInfo
