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
    listLiveVideo()
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
        <Box className={classes.wrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {listFavoriteVideo?.live?.length > 0 ? (
              listFavoriteVideo?.live?.map(renderLiveItem)
            ) : listFavoriteVideo?.live?.length === 0 && meta.pending ? (
              renderPreLoad()
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {listFavoriteVideo?.live?.length > 0 && (
          <Box className={classes.spViewMore} onClick={onClickSeeMoreLiveStream}>
            <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.view_more')}</Typography>
          </Box>
        )}
        <Box paddingTop={2} />

        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_schedule_videos')}
            rightText={listFavoriteVideo?.schedule?.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreSchedule}
          />
        </Box>
        <Box className={classes.wrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {listFavoriteVideo?.schedule?.length > 0 ? (
              listFavoriteVideo?.schedule?.map(renderLiveItem)
            ) : listFavoriteVideo?.schedule?.length === 0 && meta.pending ? (
              renderPreLoad()
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {listFavoriteVideo?.schedule?.length > 0 && (
          <Box className={classes.spViewMore} onClick={onClickSeeMoreSchedule}>
            <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.view_more')}</Typography>
          </Box>
        )}
        <Box paddingTop={2} />

        <Box className={classes.titleContainer}>
          <TitleSeeMore
            titleText={i18n.t('common:videos_top_tab.title_archived_videos')}
            rightText={listFavoriteVideo?.archived?.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreArchive}
          />
        </Box>
        <Box className={classes.wrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {listFavoriteVideo?.archived?.length > 0 ? (
              listFavoriteVideo?.archived?.map(renderLiveItem)
            ) : listFavoriteVideo?.archived?.length === 0 && meta.pending ? (
              renderPreLoad()
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {listFavoriteVideo?.archived?.length > 0 && (
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
      padding: '15px 0 26px 0',
      textAlign: 'center',
    },
  },
}))
export default FavoriteVideos
