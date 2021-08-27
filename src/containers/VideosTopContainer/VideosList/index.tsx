import { Box, Theme, makeStyles, Grid, Typography } from '@material-ui/core'
import i18n from '@locales/i18n'
import VideoPreviewItem from '../VideoPreviewItem'
import TitleSeeMore from '../TitleSeeMore'
import { TabsVideo } from '../index'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import useListVideoAll from './useListVideoAll'
import React, { useEffect } from 'react'
import { CategoryPopularData, TypeVideo } from '@services/videoTop.services'
import PreLoadContainer from '../PreLoadContainer'

type VideoListProps = {
  setTab: (value: number) => void
}
const VideosList: React.FC<VideoListProps> = ({ setTab }) => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const classes = useStyles()
  const { listLiveVideo, meta, videoTop, videoPopular, videoCategoryPopular } = useListVideoAll()

  useEffect(() => {
    listLiveVideo()
    videoPopular()
  }, [])

  const renderLiveItem = (item: TypeVideo, index: number) => {
    return (
      <>
        {downMd ? (
          <Box className={classes.xsItemContainer} key={index}>
            <VideoPreviewItem data={item} key={item.id} />
          </Box>
        ) : (
          <Grid item xs={6} className={classes.itemContainer} key={index}>
            <VideoPreviewItem data={item} key={item.id} />
          </Grid>
        )}
      </>
    )
  }

  const renderPopularItem = (item: CategoryPopularData, index: number) => {
    return (
      <>
        <Box className={classes.titleContainer} key={index}>
          <TitleSeeMore titleText={item.name} rightText={i18n.t('common:videos_top_tab.view_more')} onPress={onClickSeeMoreLiveStream} />
        </Box>
        <Box className={classes.wrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {item?.videos.length > 0 && item?.videos.map((item, index) => renderLiveItem(item, index))}
          </Grid>
        </Box>
        <Box paddingTop={3} />
      </>
    )
  }

  const onClickSeeMoreLiveStream = () => {
    setTab(TabsVideo.LIVE_VIDEOS)
  }
  const onClickSeeMoreSchedule = () => {
    setTab(TabsVideo.SCHEDULE_VIDEOS)
  }
  const onClickSeeMoreArchive = () => {
    setTab(TabsVideo.ARCHIVED_VIDEOS)
  }

  const renderPreLoad = (maxLength: number) => {
    const arrayPreLoad = Array(maxLength)
      .fill('')
      .map((_, i) => ({ i }))
    return arrayPreLoad.map(() => (
      <>
        {downMd ? (
          <Box className={classes.xsItemContainer}>
            <Box className={classes.wrapPreLoadContainer}>
              <PreLoadContainer />
            </Box>
          </Box>
        ) : (
          <Grid item xs={6} className={classes.itemContainer}>
            <PreLoadContainer />
          </Grid>
        )}
      </>
    ))
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        {/* {meta.pending && (
          <Grid item xs={12}>
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          </Grid>
        )}  */}
        {/* live video */}
        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_live_videos')}
            rightText={videoTop?.live?.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreLiveStream}
          />
        </Box>
        <Box className={classes.wrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {videoTop?.live?.length > 0 ? (
              videoTop?.live.map(renderLiveItem)
            ) : videoTop?.live?.length === 0 && meta.pending ? (
              renderPreLoad(6)
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {videoTop?.live?.length > 0 && (
          <Box className={classes.spViewMore} onClick={onClickSeeMoreLiveStream}>
            <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.view_more')}</Typography>
          </Box>
        )}
        <Box paddingTop={2} />

        {/* schedule video */}
        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_schedule_videos')}
            rightText={videoTop?.schedule?.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreSchedule}
          />
        </Box>
        <Box className={classes.wrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {videoTop?.schedule?.length > 0 ? (
              videoTop?.schedule.map(renderLiveItem)
            ) : videoTop?.live?.length === 0 && meta.pending ? (
              renderPreLoad(6)
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {videoTop?.schedule?.length > 0 && (
          <Box className={classes.spViewMore} onClick={onClickSeeMoreSchedule}>
            <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.view_more')}</Typography>
          </Box>
        )}
        <Box paddingTop={2} />

        {/* archived videos */}
        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_archived_videos')}
            rightText={videoTop?.archive?.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreArchive}
          />
        </Box>
        <Box className={classes.wrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {videoTop?.archive?.length > 0 ? (
              videoTop?.archive.map(renderLiveItem)
            ) : videoTop?.live?.length === 0 && meta.pending ? (
              renderPreLoad(6)
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {videoTop?.archive?.length > 0 && (
          <Box className={classes.spViewMore} onClick={onClickSeeMoreArchive}>
            <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.view_more')}</Typography>
          </Box>
        )}
        <Box paddingTop={2} />

        {/* popular category */}
        {/* {videoCategoryPopular.length > 0 && (
          <> */}
        <Box className={classes.popularCategoryTitle}>
          <Typography className={classes.popularText}> {i18n.t('common:videos_top_tab.popular_category')} </Typography>
        </Box>
        {videoCategoryPopular.length > 0
          ? videoCategoryPopular.map(renderPopularItem)
          : videoCategoryPopular.length === 0 &&
            meta.pending && (
              <Box className={classes.wrapContentContainer}>
                <Grid container spacing={3} className={classes.contentContainer}>
                  {renderPreLoad(9)}
                </Grid>
              </Box>
            )}
      </Box>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    // flexDirection: 'column',
    marginTop: 45,
  },
  content: {
    width: '100%',
  },
  titleContainer: {},
  contentContainer: {
    marginTop: theme.spacing(0),
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
  viewMoreContainer: {
    display: 'flex',
    paddingLeft: 32,
    height: '100%',
  },
  viewMoreStyle: {
    color: '#707070',
  },
  popularCategoryTitle: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(7),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  popularText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wrapVideos: {},
  wrapContentContainer: {},
  spViewMore: {
    display: 'none',
  },
  [theme.breakpoints.up(960)]: {
    itemContainer: {
      flexGrow: "0", 
      maxWidth: "33.333333%", 
      flexBasis: "33.333333%"
    },
  },
  [theme.breakpoints.up(1680)]: {
    itemContainer: {
      flexGrow: "0", 
      maxWidth: "25%", 
      flexBasis: "25%", 
    },
  },
  [theme.breakpoints.up(1920)]: {
    itemContainer: {
      flexGrow: "0", 
      maxWidth: "25%", 
      flexBasis: "25%", 
    },
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
    titleContainer: {
      paddingBottom: 12,
    },
    spViewMore: {
      display: 'block',
      padding: '16px 0 8px 0',
      textAlign: 'center',
    },
    wrapPreLoadContainer: {
      width: 465,
    },
  },
  [theme.breakpoints.down(415)]: {
    wrapPreLoadContainer: {
      width: 299,
    },
  },
}))
export default VideosList