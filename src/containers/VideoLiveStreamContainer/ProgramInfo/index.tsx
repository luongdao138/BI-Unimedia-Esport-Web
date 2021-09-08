import { Box, Typography, Theme, makeStyles, Icon, Grid } from '@material-ui/core'
// import { useTranslation } from 'react-i18next'
import i18n from '@locales/i18n'
import React, { useState } from 'react'
import VideoPreviewItem from '@containers/VideosTopContainer/VideoPreviewItem'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { PreloadDescription, PreloadPreviewItem } from '../PreloadContainer'
import { TypeVideo } from '@services/videoTop.services'
import InfiniteScroll from 'react-infinite-scroll-component'

const ProgramInfo: React.FC = () => {
  const [descriptionCollapse, setDescriptionCollapse] = useState(true)
  const isLoading = false

  // const { t } = useTranslation('common')
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
  const getDescription = () => {
    return (
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。番組の説明や情報がここに入ります。\n' +
      '番組の説明や情報がここに入ります。番組の説明や情報がここに入ります'
    )
  }

  const classes = useStyles()
  const theme = useTheme()
  const downMd = useMediaQuery(theme.breakpoints.down(769))
  const renderArchiveVideoItem = (item: TypeVideo, index: number) => {
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
  const renderPreLoadArchiveVideoItem = () => {
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
  const getDescriptionTruncated = () => {
    return descriptionCollapse ? `${getDescription().substring(0, downMd ? 70 : 200)}...` : getDescription()
  }
  const renderDescription = () => {
    return (
      <>
        <Typography gutterBottom className={classes.label}>
          {getDescription().length < 200 ? getDescription() : getDescriptionTruncated()}
        </Typography>
        {getDescription().length > 200 && (
          <Box
            onClick={() => {
              setDescriptionCollapse(!descriptionCollapse)
            }}
            className={classes.seeMoreContainer}
          >
            <Typography className={classes.seeMoreTitle}>
              {descriptionCollapse ? i18n.t('common:live_stream_screen.view_more') : i18n.t('common:live_stream_screen.view_less')}
            </Typography>
            <Icon className={`fa ${descriptionCollapse ? 'fa-angle-down' : 'fa-angle-up'} ${classes.angleDownIcon}`} fontSize="small" />
          </Box>
        )}
      </>
    )
  }
  const renderPreloadDescription = () => {
    return (
      <>
        {downMd ? (
          <Box className={classes.xsItemContainer}>
            <Box className={classes.wrapPreLoadDescription}>
              <PreloadDescription height={50} />
            </Box>
          </Box>
        ) : (
          <Grid item xs={6} className={classes.itemContainer}>
            <PreloadDescription height={100} />
          </Grid>
        )}
      </>
    )
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.descriptionContainer}>
        {getDescription().length > 0 && !isLoading ? <>{renderDescription()}</> : <>{renderPreloadDescription()}</>}
      </Box>
      <Box className={classes.archiveVideoTitleContainer}>
        <Typography className={classes.archiveVideoTitle}>{i18n.t('common:live_stream_screen.archived_stream_video')}</Typography>
      </Box>
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
              {dataLiveVideo.map(renderArchiveVideoItem)}
            </Grid>
          ) : dataLiveVideo?.length === 0 && isLoading ? (
            <Grid container spacing={3} className={classes.contentContainer}>
              {renderPreLoadArchiveVideoItem()}
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
  descriptionContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 8,
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  seeMoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 36,
    cursor: 'pointer',
  },
  contentContainer: {
    marginTop: theme.spacing(0),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    height: '100%',
  },
  seeMoreTitle: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 14,
    marginRight: 8,
  },
  angleDownIcon: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 12,
  },
  archiveVideoTitleContainer: {
    paddingLeft: 10,
    marginTop: 34,
    marginBottom: 34,
  },
  archiveVideoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  wrapContentContainer: {
    overflow: 'hidden',
    paddingBottom: 24,
    paddingLeft: 10,
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
  scrollContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  [theme.breakpoints.down(769)]: {
    wrapContentContainer: {
      paddingLeft: 10,
      paddingRight: 10,
      width: 'calc(100vw)',
      overflow: 'auto',
    },
    wrapPreLoadContainer: {
      width: 290,
    },
    wrapPreLoadDescription: {
      width: 'calc(100vw)',
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
    seeMoreContainer: {
      marginTop: 0,
    },
  },
}))
export default ProgramInfo
