/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState, useRef } from 'react'
import MainLayout from '@layouts/MainLayout'
import { Grid, Tabs, Tab, Container, useMediaQuery, Typography, Box, Paper } from '@material-ui/core'
import { TabContext, TabPanel } from '@material-ui/lab/'
import StreamDetail from '@containers/Stream/elements/StreamDetail'
import { PaperDetail, PlayerCard } from '@components/Styled/chat'
import Chat from '@containers/Chat'
import json2mq from 'json2mq'
import theme from '@theme/index'
import VideoPlayer from '@containers/VideoPlayer'
import { useSelector, useDispatch } from 'react-redux'
import { roomMeta } from '@store/live_socket/selectors'
import { chatHistoryActions } from '@store/chatHistory/actions'
import { videoDetailActions } from '@store/videoDetail/actions'
import { detailSelectors } from '@store/videoDetail/selectors'
import { historySelectors } from '@store/chatHistory/selectors'
import { getMeta as videoMeta } from '@store/videoDetail/selectors'
import { getAuth as getCurrentUser } from '@store/auth/selectors'
import Router from 'next/router'
import { STREAM_STATUS } from '@constants/stream.constants'
import BeforeHolder from '@containers/Stream/elements/BeforeHolder'
import ArchivePoster from '@containers/Stream/elements/ArchivePoster'
import { useStyles } from '@theme/css/detail'
import { useShareHash } from '@utils/useShareHash'
import ChatWarningModal from '@containers/Stream/elements/ChatWarningModal'
import _ from 'lodash'
import Ad from '@components/Ad'
import { prServices } from '@services/pr.services'
import { ESRoutes } from '@constants/route.constants'
import LiveThemeProvider from '@theme/live/LiveThemeProvider'
import withAuth from '@utils/withAuth'

const ArchivePage = () => {
  const [value, setValue] = useState<string>('1')
  const [history, setHistory] = useState<any>(null)
  const [archiveText, setArchiveText] = useState<boolean>(true)
  const [onTime, timeUpdate] = useState<any>(undefined)
  const [isOpen, setPanel] = useState<boolean>(false)

  const dispatch = useDispatch()

  const data = useSelector(detailSelectors)
  const historyList = useSelector(historySelectors)
  const meta = useSelector(videoMeta)
  const currentUser = useSelector(getCurrentUser)
  const roomCountInfo = useSelector(roomMeta)
  const userId = _.get(currentUser, 'id', null)
  const status = _.get(data, 'attributes.flag', undefined)
  const hash = _.get(data, 'attributes.shared_hash', undefined)
  const hasTicked = _.get(data, 'attributes.has_ticket', undefined)
  // const title = _.get(data, 'attributes.title_static', undefined)
  const ref = useRef<any>()
  const timer = data && (data.attributes.current_time - Date.parse(data.attributes.live_start_datetime)) / 1000

  const url = useShareHash(hash)

  const isDesktop = useMediaQuery(
    json2mq({
      minWidth: theme.breakpoints.values.md,
    })
  )

  const handleChange = (_event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (isDesktop) {
      setValue('1')
    } else {
      setValue('2')
    }
  }, [isDesktop]) // Only re-run the effect if count changes

  useEffect(() => {
    if (hasTicked === false && meta.loaded && !meta.error && !meta.pending) {
      Router.push(ESRoutes.EVENTS)
    } else if (hasTicked === true && meta.loaded && !meta.error && !meta.pending && data) {
      if (status === STREAM_STATUS.LIVE_STREAMING || status === STREAM_STATUS.BEFORE_START || status === STREAM_STATUS.CM_STARTED) {
        // console.log(status)
        Router.push(ESRoutes.STREAM)
      } else {
        const url = data.attributes.archive_messages
        if (url) {
          dispatch(
            videoDetailActions.getArchiveData(url, (data) => {
              setHistory(data)
            })
          )
        } else {
          setHistory([])
        }
      }
    }
  }, [data])

  useEffect(() => {
    dispatch(videoDetailActions.detail())
    dispatch(chatHistoryActions.chatListClear)
    return () => {}
  }, [])

  useEffect(() => {
    if (onTime !== undefined) timeUpdate(undefined)
  }, [onTime])

  const _onChatTrigger = (array: any) => {
    if (!_.isEmpty(array)) {
      let msg: any
      // console.log(array)
      if (array.length == 1) {
        msg = history[array[0]]
      } else {
        msg = _.slice(history, array[0], array[array.length - 1])
      }

      dispatch(chatHistoryActions.chatPlay(msg))
    }
  }

  const renderArchivePlayer = () => {
    if (status == STREAM_STATUS.ARCHIVE_DELIVERY && history !== null) {
      return (
        <>
          {archiveText ? <ArchivePoster text={'この動画はアーカイブです'} time={data.attributes.archive_end_datetime} /> : null}
          <VideoPlayer
            src={data.attributes.archive_video_endpoint}
            // src="https://multiplatform-f.akamaihd.net/i/multi/april11/sintel/sintel-hd_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8"
            type="archive"
            onChatTrigger={_onChatTrigger}
            trackSource={data.attributes.archive_captions}
            onSeekPlayer={_onSeekPlayer}
            updateTime={onTime}
            handleFirstPlay={_handleFirstPlay}
            liveTime={timer}
          />
        </>
      )
    }
    return null
  }

  const chatPlaceHolder = () => {
    if (status == STREAM_STATUS.BEFORE_START || status == STREAM_STATUS.CM_STARTED) {
      return (
        <Box display="flex" flex={1} className={classes.chatHolder}>
          <Typography>コメントは配信中のみ可能です</Typography>
        </Box>
      )
    }
    return null
  }

  const _onPressTime = (time: any) => {
    timeUpdate(time)
  }

  const renderChatHistory = () => {
    if (status == STREAM_STATUS.ARCHIVE_DELIVERY) {
      return (
        <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Box className={classes.touchPanel} onTouchStart={() => setPanel(true)} />
          <Chat
            userId={userId}
            onSend={() => {}}
            messages={historyList}
            input={false}
            ref={ref}
            timeJump={true}
            onPressTime={_onPressTime}
          />
        </Box>
      )
    }
    return null
  }

  const renderArchiveEnd = () => {
    if (status == STREAM_STATUS.END_OF_ARCHIVED) {
      return (
        <BeforeHolder
          text={
            <Box style={{ textAlign: 'center' }}>
              この動画の視聴期間は
              <br />
              終了しました
            </Box>
          }
        />
      )
    }
    return null
  }

  const _onSeekPlayer = (currentTime: number) => {
    const time = parseInt(currentTime.toString(), 10) + 1
    //const start = performance.now()
    const filtered = _.filter(history, function (obj) {
      return obj.streamTime < time
    })
    //var duration = performance.now() - start
    dispatch(chatHistoryActions.chatTop(filtered))

    if (ref.current) {
      ref.current.triggerScroll()
    }
  }

  const _handleFirstPlay = () => {
    if (status == STREAM_STATUS.ARCHIVE_DELIVERY && data) {
      setArchiveText(false)
      dispatch(videoDetailActions.archivePlay(data.id))
    }
  }

  const _setOpenBottomPanel = (e: boolean) => {
    setPanel(e)
  }

  const classes = useStyles()

  return (
    <MainLayout>
      <LiveThemeProvider>
        {data && hasTicked == true ? (
          <>
            <div className="content-wrapper-stream">
              <div className={classes.root}>
                <Container className={classes.spacing} disableGutters maxWidth="xl">
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} className={classes.grid}>
                      <Paper className={classes.playerContainer} elevation={2} square>
                        <PlayerCard>
                          {renderArchivePlayer()}
                          {renderArchiveEnd()}
                        </PlayerCard>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.grid}>
                      {status == STREAM_STATUS.END_OF_ARCHIVED ? (
                        <>
                          <Box className={classes.endDetail}>
                            <StreamDetail url={url} data={data} countData={roomCountInfo} />
                          </Box>
                          <Ad link={'https://info.exelab.jp/'} src="/images/info_exelab.jpg" />
                        </>
                      ) : (
                        <TabContext value={value}>
                          <Box
                            style={{
                              position: 'relative',
                              height: '100%',
                            }}
                          >
                            <Box className={classes.tabHeader}>
                              <Box>LIVEチャット</Box>
                            </Box>
                            <Box className={classes.tabContainer}>
                              <Tabs
                                className={classes.tabs}
                                value={value}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={handleChange}
                              >
                                <Tab disableRipple={true} className={classes.tab} label="LIVEチャット" value="1" />
                                <Tab disableRipple={true} className={classes.tab} label="番組情報" value="2" />
                              </Tabs>
                            </Box>
                            <TabPanel className={classes.panel} value="1">
                              {chatPlaceHolder()}
                              {renderChatHistory()}
                            </TabPanel>
                            <TabPanel className={classes.panel} value="2">
                              <StreamDetail url={url} data={data} countData={roomCountInfo} />
                              <Box className={classes.mobileBanner}>
                                <Ad link={'https://info.exelab.jp/'} src="/images/info_exelab.jpg" />
                              </Box>
                            </TabPanel>
                          </Box>
                        </TabContext>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} className={classes.grid}>
                      <PaperDetail className={classes.detail} elevation={2} square>
                        <StreamDetail url={url} data={data} countData={roomCountInfo} />
                      </PaperDetail>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.grid}>
                      {status == STREAM_STATUS.END_OF_ARCHIVED ? null : (
                        <Box className={classes.desktopBanner}>
                          <Ad link={'https://info.exelab.jp/'} src="/images/info_exelab.jpg" />
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Container>
              </div>
              <ChatWarningModal openBottomPanel={isOpen} setOpenBottomPanel={_setOpenBottomPanel} />
            </div>
          </>
        ) : (
          <div className="content-wrapper-stream">
            <div className={classes.root}>
              <Container className={classes.spacing} disableGutters maxWidth="xl">
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} className={classes.grid}>
                    <Paper className={classes.playerContainer} elevation={2} square>
                      <PlayerCard>
                        <BeforeHolder text="配信情報が見つかりませんでした。" />
                      </PlayerCard>
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </div>
        )}
      </LiveThemeProvider>
    </MainLayout>
  )
}

export async function getStaticProps() {
  try {
    const {
      data: { data },
    } = await prServices.getTop()
    return {
      props: {
        title: 'NTTe-Sports動画配信',
        description: data.attributes.description,
      },
    }
  } catch (error) {
    return { props: {} }
  }
}

export default withAuth(ArchivePage)
