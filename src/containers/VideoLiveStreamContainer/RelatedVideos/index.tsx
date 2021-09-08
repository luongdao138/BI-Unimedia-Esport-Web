import { Box, Theme, makeStyles, Grid } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
// import { useTranslation } from 'react-i18next'
// import i18n from '@locales/i18n'

const RelatedVideos: React.FC = () => {
  // const { t } = useTranslation('common')
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

  const classes = useStyles()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapContentContainer}>
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
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  label: {},
  [theme.breakpoints.down(769)]: {
    wrapContentContainer: {
      width: 'calc(100vw - 24px)',
      overflow: 'auto',
    },
    contentContainer: {
      flexWrap: 'nowrap',
      margin: '0px',
      paddingBottom: '0px',
    },
    xsItemContainer: {
      paddingRight: '24px',
      '&:last-child': {
        paddingRight: 0,
      },
    },
  },
}))
export default RelatedVideos
