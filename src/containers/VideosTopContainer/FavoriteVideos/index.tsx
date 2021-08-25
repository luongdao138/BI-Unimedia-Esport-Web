import { Box, Theme, makeStyles, Grid, Typography } from '@material-ui/core'
import i18n from '@locales/i18n'
import VideoPreviewItem from '../VideoPreviewItem'
import TitleSeeMore from '../TitleSeeMore'
import { TabsVideo } from '../index'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import useFavoriteVideos from './useFavoriteVideos'
import { useEffect } from 'react'
import { TypeVideo } from '@services/videoTop.services'
import ESLoader from '@components/Loader'

type FavoriteVideosProps = {
  setTab: (value: number) => void
}
const FavoriteVideos: React.FC<FavoriteVideosProps> = ({ setTab }) => {
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const classes = useStyles()
  const { listFavoriteVideo, meta, listLiveVideo } = useFavoriteVideos()

  const renderLiveItem = (item: TypeVideo, index: number) => {
    return (
      <>
        {downMd ? (
          <Box className={classes.xsItemContainer} key={index}>
            <VideoPreviewItem data={item} key={item.id} />
          </Box>
        ) : (
          <Grid item xs={6} lg={6} xl={4} className={classes.itemContainer} key={index}>
            <VideoPreviewItem data={item} key={item.id} />
          </Grid>
        )}
      </>
    )
  }

  useEffect(() => {
    listLiveVideo()
  }, [])

  const onClickSeeMoreLiveStream = () => {
    setTab(TabsVideo.LIVE_VIDEOS)
  }
  const onClickSeeMoreSchedule = () => {
    setTab(TabsVideo.SCHEDULE_VIDEOS)
  }
  const onClickSeeMoreArchive = () => {
    setTab(TabsVideo.ARCHIVED_VIDEOS)
  }
  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        {meta.pending && (
          <Grid item xs={12}>
            <Box my={4} display="flex" justifyContent="center" alignItems="center">
              <ESLoader />
            </Box>
          </Grid>
        )}
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
            rightText={listFavoriteVideo?.archive?.length > 0 ? i18n.t('common:videos_top_tab.view_more') : ''}
            onPress={onClickSeeMoreArchive}
          />
        </Box>
        <Box className={classes.wrapContentContainer}>
          <Grid container spacing={3} className={classes.contentContainer}>
            {listFavoriteVideo?.archive?.length > 0 ? (
              listFavoriteVideo?.archive?.map(renderLiveItem)
            ) : (
              <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
                <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
              </Box>
            )}
          </Grid>
        </Box>
        {listFavoriteVideo?.archive?.length > 0 && (
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
