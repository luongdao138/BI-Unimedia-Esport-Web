import { useEffect, useState } from 'react'
import { Grid, Box, makeStyles, Theme } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
import useSearch from '@containers/Search/useSearch'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'

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

  useEffect(() => {
    if (searchKeyword.length <= 0) {
      setSearchVideos([])
    } else {
      setSearchVideos(dataLiveVideo)
    }
  }, [searchKeyword])

  return (
    <Box className={classes.container}>
      <Grid container spacing={3} className={classes.contentContainer}>
        {searchVideos.map((data, i) => (
          <Grid item xs={4} className={classes.itemContainer} key={i}>
            <VideoPreviewItem data={data} key={i} />
          </Grid>
        ))}
      </Grid>
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
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  itemContainer: {
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}))
export default VideoSearchContainer
