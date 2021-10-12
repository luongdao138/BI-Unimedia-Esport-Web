import { Box, Theme, makeStyles, Grid, Typography } from '@material-ui/core'
import i18n from '@locales/i18n'
import VideoPreviewItem from '../VideoPreviewItem'
import TitleSeeMore from '../TitleSeeMore'
import { TabsVideo } from '../index'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import useFavoriteVideos from './useFavoriteVideos'
import React, { useEffect } from 'react'
import { TypeVideo } from '@services/videoTop.services'
import PreLoadContainer from '../PreLoadContainer'

type FavoriteVideosProps = {
  setTab: (value: number) => void
  setFollow?: (value: number) => void
  videoItemStyle?: any
}
const FavoriteVideos: React.FC<FavoriteVideosProps> = ({ setTab, setFollow, videoItemStyle }) => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const classes = useStyles()
  const { listFavoriteVideo, meta, listLiveVideo } = useFavoriteVideos()
  const up2569 = useMediaQuery(theme.breakpoints.up(2569))
  const up1920 = useMediaQuery(theme.breakpoints.up(1920))

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

  useEffect(() => {
    listLiveVideo(10)
  }, [])

  const onClickSeeMoreLiveStream = () => {
    setTab(TabsVideo.LIVE_VIDEOS)
    setFollow(1)
  }
  const onClickSeeMoreSchedule = () => {
    setTab(TabsVideo.SCHEDULE_VIDEOS)
    setFollow(1)
  }
  const onClickSeeMoreArchive = () => {
    setTab(TabsVideo.ARCHIVED_VIDEOS)
    setFollow(1)
  }

  const renderPreLoad = () => {
    const arrayPreLoad = Array(6)
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
        <Grid item xs={6} className={classes.itemContainer} style={videoItemStyle} key={index}>
          <PreLoadContainer />
        </Grid>
      )
    )
  }

  const listLimitData = () => {
    if (up2569) return 10
    if (up1920) return 8
    return 6
  }
  const getDisplayData = (fullData) => {
    return fullData.slice(0, listLimitData())
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
        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_live_videos')}
            rightText={listFavoriteVideo?.live?.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreLiveStream}
          />
        </Box>
        <Box className={listFavoriteVideo?.live?.length > 0 ? classes.wrapContentContainer : classes.noDataWrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {getDisplayData(listFavoriteVideo?.live)?.length > 0 ? (
              getDisplayData(listFavoriteVideo?.live)?.map(renderLiveItem)
            ) : getDisplayData(listFavoriteVideo?.live)?.length === 0 && meta.pending ? (
              renderPreLoad()
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {getDisplayData(listFavoriteVideo?.live)?.length > 0 && (
          <Box className={classes.spViewMore} onClick={onClickSeeMoreLiveStream}>
            <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.view_more')}</Typography>
          </Box>
        )}
        <Box paddingTop={2} />

        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_schedule_videos')}
            rightText={getDisplayData(listFavoriteVideo?.schedule)?.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreSchedule}
          />
        </Box>
        <Box className={listFavoriteVideo?.schedule?.length > 0 ? classes.wrapContentContainer : classes.noDataWrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {getDisplayData(listFavoriteVideo?.schedule)?.length > 0 ? (
              getDisplayData(listFavoriteVideo?.schedule)?.map(renderLiveItem)
            ) : getDisplayData(listFavoriteVideo?.schedule)?.length === 0 && meta.pending ? (
              renderPreLoad()
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {getDisplayData(listFavoriteVideo?.schedule)?.length > 0 && (
          <Box className={classes.spViewMore} onClick={onClickSeeMoreSchedule}>
            <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.view_more')}</Typography>
          </Box>
        )}
        <Box paddingTop={2} />

        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_archived_videos')}
            rightText={getDisplayData(listFavoriteVideo?.archived)?.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreArchive}
          />
        </Box>
        <Box className={listFavoriteVideo?.archived?.length > 0 ? classes.wrapContentContainer : classes.noDataWrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {getDisplayData(listFavoriteVideo?.archived)?.length > 0 ? (
              getDisplayData(listFavoriteVideo?.archived)?.map(renderLiveItem)
            ) : getDisplayData(listFavoriteVideo?.archived)?.length === 0 && meta.pending ? (
              renderPreLoad()
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {getDisplayData(listFavoriteVideo?.archived)?.length > 0 && (
          <Box className={classes.spViewMore} onClick={onClickSeeMoreArchive}>
            <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.view_more')}</Typography>
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
  wrapContentContainer: {},
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
      marginLeft: '-24px',
      width: 'calc(100vw)',
      overflow: 'auto',
    },
    noDataWrapContentContainer: {
      overflow: 'hidden',
    },
    wrapPreLoadContainer: {
      width: 290,
    },
    contentContainer: {
      flexWrap: 'nowrap',
      margin: '0px',
      paddingBottom: '0px',
    },
    xsItemContainer: {
      paddingRight: '24px',
      '&:first-child': {
        paddingLeft: '24px',
      },
    },
    titleContainer: {
      paddingBottom: 12,
    },
    spViewMore: {
      display: 'block',
      padding: '15px 0 26px 0',
      textAlign: 'center',
    },
  },
}))
export default FavoriteVideos
