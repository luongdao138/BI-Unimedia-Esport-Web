import { Box, Typography, Theme, makeStyles, Icon, Grid } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'
import { Colors } from '@theme/colors'
import React from 'react'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

const ProgramInfo: React.FC = () => {
  // const { t } = useTranslation('common')
  const dataLiveVideo = () =>
    Array(20)
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

  const classes = useStyles()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))

  const archiveVideo = () => (
    <Box className={classes.archiveVideoContainer}>
      <Typography gutterBottom className={classes.archiveVideoTitle}>
        {'アーカイブ'}
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
  return (
    <Box className={classes.container}>
      <Typography gutterBottom className={classes.label}>
        {'番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
          '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります…'}
      </Typography>
      <Box className={classes.seeMoreContainer}>
        <Typography className={classes.seeMoreTitle}>{'もっとみる'}</Typography>
        <Icon className={`fa fa-angle-down ${classes.angleDownIcon}`} fontSize="small" />
      </Box>
      {archiveVideo()}
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    marginLeft: 9,
    marginRight: 14,
    marginTop: 8,
    fontSize: 14,
    color: Colors.grey['400'],
  },
  seeMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 36,
  },
  seeMoreTitle: {
    color: Colors.grey['400'],
    fontSize: 14,
    marginRight: 6,
  },
  angleDownIcon: {
    color: Colors.grey['400'],
    fontSize: 12,
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
    marginTop: 35,
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
export default ProgramInfo
