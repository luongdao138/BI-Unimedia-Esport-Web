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
import { searchTypes } from '@constants/common.constants'
import { useRouter } from 'next/router'
import { ESRoutes } from '@constants/route.constants'
import useVideoSearch from '@containers/Search/useVideoSearch'

type VideoListProps = {
  setTab: (value: number) => void
  videoItemStyle: any
}

const VideosList: React.FC<VideoListProps> = ({ setTab, videoItemStyle }) => {
  const router = useRouter()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const up2569 = useMediaQuery(theme.breakpoints.up(2569))
  const up1920 = useMediaQuery(theme.breakpoints.up(1920))

  const classes = useStyles()
  const { setSearch, setSearchCategoryID } = useVideoSearch()
  const { listLiveVideo, meta, videoTop, videoPopular, videoCategoryPopular } = useListVideoAll()

  useEffect(() => {
    listLiveVideo()
    videoPopular()
  }, [])

  const renderLiveItem = (item: TypeVideo, index: number) => {
    return (
      <React.Fragment key={item?.id || index}>
        {downMd ? (
          <Box className={classes.xsItemContainer}>
            <VideoPreviewItem data={item} />
          </Box>
        ) : (
          <Grid item xs={6} className={classes.itemContainer} style={videoItemStyle}>
            <VideoPreviewItem data={item} />
          </Grid>
        )}
      </React.Fragment>
    )
  }

  const renderPopularItem = (item: CategoryPopularData, index: number) => {
    return (
      <React.Fragment key={item?.id || index}>
        <Box className={classes.titleContainer} key={index}>
          <TitleSeeMore
            titleText={item.name}
            rightText={item?.videos.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            // iconSource={item.image}
            onPress={() => onClickSeeMorePopular(item)}
          />
        </Box>
        <Box className={classes.wrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {item?.videos.length > 0 ? (
              getDisplayData(item?.videos, true).map((item, index) => renderLiveItem(item, index))
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {getDisplayData(item?.videos)?.length > 0 && (
          <Box className={classes.spViewMore} onClick={() => onClickSeeMorePopular(item)}>
            <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.view_more')}</Typography>
          </Box>
        )}
        <Box paddingTop={3} />
      </React.Fragment>
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
  const onClickSeeMorePopular = (item) => {
    setSearch({ type: searchTypes.VIDEO, keyword: item.name })
    setSearchCategoryID({ type: searchTypes.VIDEO, category_id: item.id })
    router.push(ESRoutes.SEARCH_VIDEO)
  }

  const renderPreLoad = (number) => {
    const arrayPreLoad = Array(number)
      .fill('')
      .map((_, i) => ({ i }))
    return arrayPreLoad.map((_item: any, index: number) =>
      downMd ? (
        <Box className={classes.xsItemContainer} key={index}>
          <Box className={classes.wrapPreLoadContainer}>
            <PreLoadContainer />
          </Box>
        </Box>
      ) : (
        <Grid item xs={6} className={classes.itemContainer} key={index} style={videoItemStyle}>
          <PreLoadContainer />
        </Grid>
      )
    )
  }

  const renderPreLoadPopular = () => {
    return (
      <>
        <Box className={classes.popularCategoryTitle}>
          <Typography className={classes.popularText}> {i18n.t('common:videos_top_tab.popular_category')} </Typography>
        </Box>
        <Grid container spacing={3} className={classes.contentContainer}>
          {renderPreLoad(9)}
        </Grid>
      </>
    )
  }

  const listLimitData = (categoryList) => {
    if (up2569) return categoryList ? 5 : 10
    if (up1920) return categoryList ? 4 : 8
    return categoryList ? 3 : 6
  }

  const getDisplayData = (fullData, categoryList = false) => {
    return fullData.slice(0, listLimitData(categoryList))
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
        )} */}
        {/* live video */}
        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_live_videos')}
            rightText={videoTop?.live?.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreLiveStream}
          />
        </Box>
        <Box className={getDisplayData(videoTop?.live)?.length > 0 ? classes.wrapContentContainer : classes.noDataWrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {getDisplayData(videoTop?.live)?.length > 0 ? (
              getDisplayData(videoTop?.live).map(renderLiveItem)
            ) : getDisplayData(videoTop?.live)?.length === 0 && meta.pending ? (
              renderPreLoad(6)
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {getDisplayData(videoTop?.live)?.length > 0 && (
          <Box className={classes.spViewMore} onClick={onClickSeeMoreLiveStream}>
            <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.view_more')}</Typography>
          </Box>
        )}
        <Box paddingTop={2} />

        {/* schedule video */}
        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_schedule_videos')}
            rightText={getDisplayData(videoTop?.schedule)?.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreSchedule}
          />
        </Box>
        <Box className={getDisplayData(videoTop?.live)?.length > 0 ? classes.wrapContentContainer : classes.noDataWrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {getDisplayData(videoTop?.schedule)?.length > 0 ? (
              getDisplayData(videoTop?.schedule).map(renderLiveItem)
            ) : getDisplayData(videoTop?.schedule)?.length === 0 && meta.pending ? (
              renderPreLoad(6)
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {getDisplayData(videoTop?.schedule)?.length > 0 && (
          <Box className={classes.spViewMore} onClick={onClickSeeMoreSchedule}>
            <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.view_more')}</Typography>
          </Box>
        )}
        <Box paddingTop={2} />

        {/* archived videos */}
        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_archived_videos')}
            rightText={getDisplayData(videoTop?.archived)?.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreArchive}
          />
        </Box>
        <Box className={getDisplayData(videoTop?.live)?.length > 0 ? classes.wrapContentContainer : classes.noDataWrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {getDisplayData(videoTop?.archived)?.length > 0 ? (
              getDisplayData(videoTop?.archived).map(renderLiveItem)
            ) : getDisplayData(videoTop?.archived)?.length === 0 && meta.pending ? (
              renderPreLoad(6)
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {getDisplayData(videoTop?.archived)?.length > 0 && (
          <Box className={classes.spViewMore} onClick={onClickSeeMoreArchive}>
            <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.view_more')}</Typography>
          </Box>
        )}
        <Box paddingTop={2} />

        {/* popular category */}
        {getDisplayData(videoCategoryPopular).length > 0 && (
          <Box className={classes.popularCategoryTitle}>
            <Typography className={classes.popularText}> {i18n.t('common:videos_top_tab.popular_category')} </Typography>
          </Box>
        )}
        {getDisplayData(videoCategoryPopular).length > 0
          ? getDisplayData(videoCategoryPopular).map(renderPopularItem)
          : getDisplayData(videoCategoryPopular).length === 0 && meta.pending && renderPreLoadPopular()}
      </Box>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
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
  wrapContentContainer: {
    overflow: 'hidden',
  },
  spViewMore: {
    display: 'none',
  },
  [theme.breakpoints.up(960)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '33.333333%',
      flexBasis: '33.333333%',
    },
  },
  [theme.breakpoints.up(1920)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '465px',
      flexBasis: '25%',
    },
  },
  [theme.breakpoints.down(769)]: {
    wrapContentContainer: {
      width: 'calc(100vw - 24px)',
      overflow: 'scroll',
      scrollbarColor: '#222 transparent',
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        height: 10,
        opacity: 1,
        padding: 10,
      },
      '&::-webkit-scrollbar-track': {
        paddingLeft: 1,
        backgroundColor: '#222222',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 6,
        background: 'rgba(0,0,0,0.5)',
      },
      '&::-webkit-scrollbar-corner': {
        backgroundColor: '#222222',
      },
    },
    noDataWrapContentContainer: {
      width: 'calc(100vw - 24px)',
      overflow: 'hidden',
      scrollbarColor: '#222 transparent',
      scrollbarWidth: 'thin',
      '&::-webkit-scrollbar': {
        height: 10,
        opacity: 1,
        padding: 10,
      },
      '&::-webkit-scrollbar-track': {
        paddingLeft: 1,
        backgroundColor: '#222222',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(0,0,0,0.5)',
        borderRadius: 6,
      },
      '&::-webkit-scrollbar-corner': {
        backgroundColor: '#222222',
      },
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
  },
}))
export default VideosList
