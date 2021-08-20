import { useEffect, useState } from 'react'
import { Grid, Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useSearch from '@containers/Search/useSearch'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

const VideoSearchContainer: React.FC = () => {
  const dataLiveVideo = Array(20)
    .fill('')
    .map((_, i) => ({
      id: i,
      type: 'live',
      title: `ムービータイトルムービータイトル ...`,
      iconStreamer: '/images/dataVideoFake/fake_avatar.png',
      thumbnailLive: '/images/dataVideoFake/thumbnailLive.png',
      thumbnailStreamer: '/images/dataVideoFake/banner_01.png',
      thumbnailVideo: '/images/dataVideoFake/banner_04.png',
      nameStreamer: 'だみだみだみだみ',
      waitingNumber: 1500,
      category: 'Valorant',
    }))
  const classes = useStyles()
  const { searchKeyword } = useSearch()
  const [searchVideos, setSearchVideos] = useState([])
  const { t } = useTranslation(['common'])
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))

  useEffect(() => {
    if (searchKeyword.length <= 0) {
      setSearchVideos([])
    } else {
      setSearchVideos(dataLiveVideo)
    }
  }, [searchKeyword])

  return (
    <Box className={classes.container}>
      <Grid item xs={12}>
        <Box pt={3} pb={3}>
          <Typography variant="caption" gutterBottom className={classes.title}>
            {`${t('common:common.search_results')} ${dataLiveVideo.length}${t('common:common.total')}`}
          </Typography>
        </Box>
      </Grid>
      <Box className={classes.wrapContentContainer}>
        <Grid container spacing={3} className={classes.contentContainer}>
          {searchVideos.map((data, i) => (
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
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  contentContainer: {
    paddingBottom: theme.spacing(2),
    display: 'flex',
    height: '100%',
  },
  itemContainer: {
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    color: '#ADABAB',
  },
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
export default VideoSearchContainer
