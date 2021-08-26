import { useEffect, useState } from 'react'
import { Grid, Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useSearch from '@containers/Search/useSearch'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import useSearchVideoResult from './useSearchVideoResult'
import ESLoader from '@components/Loader'

const VideoSearchContainer: React.FC = () => {
  const dataLiveVideo = Array(20)
    .fill('')
    .map((_, i) => ({
      id: i,
      uuid: 'VOjyj1m048y7sAjx',
      archived_file_url: null,
      thumbnail: null,
      title: 'CW_title schedule_3',
      description: 'hello, this is my stream_2',
      use_ticket: 1,
      ticket_price: 0,
      share_sns_flag: 0,
      stream_url: '5RKqYdoCrR',
      stream_key: 'xKMbdzmRte',
      publish_flag: 1,
      stream_notify_time: '2021-08-25 12:00:00',
      stream_schedule_start_time: '2021-08-26 02:00:00',
      stream_schedule_end_time: '2021-08-26 03:15:00',
      archived_end_time: null,
      sell_ticket_start_time: '2021-08-25 02:07:00',
      video_publish_end_time: null,
      scheduled_flag: 1,
      view_count: 0,
      live_view_count: 0,
      like_count: 0,
      unlike_count: 0,
      status: 0,
      user_nickname: 'aitx',
      user_avatar: 'https://s3-ap-northeast-1.amazonaws.com/dev-esports-avatar/users/avatar/345/1629260048-345.png',
    }))
  const classes = useStyles()
  const { searchKeyword } = useSearch()
  // const [searchVideos, setSearchVideos] = useState([])
  const [searchVideos, setSearchVideos] = useState([])
  const { t } = useTranslation(['common'])
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  // const [keyword, setKeyword] = useState<string>('')
  const { searchVideosSelector, videoSearch, resetMeta, resetSearchVideo, meta } = useSearchVideoResult()

  useEffect(() => {
    // setKeyword(searchKeyword)
    videoSearch({ page: 1, keyword: searchKeyword, limit: 10 })

    return () => {
      resetSearchVideo()
      resetMeta()
    }
  }, [searchKeyword])

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
            {`${t('common:common.search_results')} ${searchVideosSelector?.total}${t('common:common.total')}`}
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
      {meta.pending && (
        <Grid item xs={12}>
          <Box my={4} display="flex" justifyContent="center" alignItems="center">
            <ESLoader />
          </Box>
        </Grid>
      )}
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
