import { Box, Theme, makeStyles, Grid, Typography } from '@material-ui/core'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'
import { PreloadPreviewItem } from '../PreloadContainer'
import { TypeVideo } from '@services/videoTop.services'
import InfiniteScroll from 'react-infinite-scroll-component'
// import { useTranslation } from 'react-i18next'
import i18n from '@locales/i18n'

const RelatedVideos: React.FC = () => {
  // const { t } = useTranslation('common')
  const isLoading = false
  const dataLiveVideo = Array(6)
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

  const renderRelatedVideoItem = (item: TypeVideo, index: number) => {
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

  const renderPreLoadRelatedVideoItem = () => {
    const arrayPreLoad = Array(10)
      .fill('')
      .map((_, i) => ({ i }))
    return arrayPreLoad.map(() => (
      <>
        {downMd ? (
          <Box className={classes.xsItemContainer}>
            <Box className={classes.wrapPreLoadContainer}>
              <PreloadPreviewItem />
            </Box>
          </Box>
        ) : (
          <Grid item xs={6} className={classes.itemContainer}>
            <PreloadPreviewItem />
          </Grid>
        )}
      </>
    ))
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapContentContainer}>
        <InfiniteScroll
          className={classes.scrollContainer}
          dataLength={dataLiveVideo.length}
          next={() => {
            // loadMore(page, follow)
          }}
          hasMore={true}
          loader={null}
          scrollThreshold={0.8}
          style={{ overflow: 'hidden' }}
        >
          {dataLiveVideo?.length > 0 ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {dataLiveVideo.map(renderRelatedVideoItem)}
            </Grid>
          ) : dataLiveVideo?.length === 0 && isLoading ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {renderPreLoadRelatedVideoItem()}
            </Grid>
          ) : (
            <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
              <Typography className={classes.viewMoreStyle}>{i18n.t('common:videos_top_tab.no_data_text')}</Typography>
            </Box>
          )}
        </InfiniteScroll>
      </Box>
    </Box>
  )
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    flexDirection: 'column',
  },
  wrapContentContainer: {
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
    paddingBottom: 24,
    paddingLeft: 10,
    paddingRight: 10,
  },
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  [theme.breakpoints.up(960)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '33.333333%',
      flexBasis: '33.333333%',
    },
  },
  [theme.breakpoints.up(1680)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '25%',
      flexBasis: '25%',
    },
  },
  [theme.breakpoints.up(1920)]: {
    itemContainer: {
      flexGrow: '0',
      maxWidth: '25%',
      flexBasis: '25%',
    },
  },
  [theme.breakpoints.down(769)]: {
    wrapContentContainer: {
      paddingLeft: 10,
      width: 'calc(100vw)',
      overflow: 'auto',
      justifycContent: 'center',
    },
    wrapPreLoadContainer: {
      width: 290,
    },
    contentContainer: {
      flexWrap: 'nowrap',
      margin: '0px',
      paddingBottom: '0px',
      overflow: 'auto',
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
