/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Grid, Tabs, Tab, Container, Typography, Box, Paper } from '@material-ui/core'
import { TabContext, TabPanel } from '@material-ui/lab/'
import StreamDetail from '@containers/Stream/elements/StreamDetail'
import { PlayerCard } from '@components/Styled/chat'
import LiveChat from '@containers/LiveChat'
import VideoPlayer from '@containers/VideoPlayer'
import Loader from '@components/FullScreenLoader'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { messages, roomMeta, socketConnected } from '@store/live_socket/selectors'
import { WEBSOCKET_STREAM_PREFIX, STREAM_CHAT_ACTION_TYPE } from '@constants/socket.constants'
import { socketActions } from '@store/live_socket/actions'
import { videoDetailActions } from '@store/videoDetail/actions'
import { detailSelectors, getMeta } from '@store/videoDetail/selectors'
import Router from 'next/router'
import _ from 'lodash'
import { STREAM_STATUS } from '@constants/stream.constants'
import BeforeHolder from '@containers/Stream/elements/BeforeHolder'
import Ad from '@components/Ad'
import { CommonHelper } from '@utils/helpers/CommonHelper'
import ErrorSnackbar from '@components/Snackbar'
import { useStyles } from '@utils/detail'
import { useShareHash } from '@utils/useShareHash'
import { getAuth } from '@store/auth/selectors'
import Header from '@components/HeaderWithButton'
import { useRect } from '@utils/useRect'

const contentRef = React.createRef<HTMLDivElement>()

const StreamContainer: React.FC = () => {
  const contentRect = useRect(contentRef)
  const [value, setValue] = useState<string>('1')
  const [hasNgWord, setNgWord] = useState(false)
  const dispatch = useDispatch()
  const data = useSelector(detailSelectors)
  const messageList = useSelector(messages)
  // eslint-disable-next-line @typescript-eslint/ban-types
  const meta = useSelector(getMeta)
  const currentUser = useSelector(getAuth)
  const time = _.get(data, 'attributes.live_start_datetime', null)
  const roomCountInfo = useSelector(roomMeta)
  const connected = useSelector(socketConnected)
  const store = useStore()
  const userId = _.get(currentUser, 'id', null)
  const status = _.get(data, 'attributes.flag', undefined)
  // const status = STREAM_STATUS.LIVE_STREAMING
  const hash = _.get(data, 'attributes.shared_hash', undefined)
  const hasTicked = _.get(data, 'attributes.has_ticket', undefined)
  const url = useShareHash(hash)
  console.log('connected ', connected)
  console.log('status ', status)
  const handleChange = (_, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (hasTicked == false && meta.loaded && !meta.error && !meta.pending) {
      Router.push('/events')
    } else if (hasTicked == true && meta.loaded && !meta.error && !meta.pending && data) {
      if (status == STREAM_STATUS.LIVE_STREAMING && data.attributes.chat_room_id) {
        dispatch({
          type: `${WEBSOCKET_STREAM_PREFIX}:CONNECT`,
          payload: { eventRoomId: data.attributes.chat_room_id },
        })
        console.log('connecting...')
      }
      const url = data.attributes.archive_messages
      if (url) dispatch(videoDetailActions.getArchiveData(url))
    }
  }, [data])

  useEffect(() => {
    dispatch(videoDetailActions.detail())
    dispatch(socketActions.resetConnection())
    console.log('connection reset ...->')
  }, [])

  const _onSend = (message: string) => {
    const userId = currentUser?.id
    if (hasTicked && data && userId) {
      if (CommonHelper.matchNgWords(store, message).length > 0) {
        setNgWord(true)
      } else {
        const payload = {
          action: STREAM_CHAT_ACTION_TYPE.SEND_MESSAGE,
          roomId: data.attributes.chat_room_id,
          msg: message,
          ticket: currentUser?.accessToken,
        }
        dispatch(socketActions.socketSend(payload))
      }
    }
  }

  const renderPlayer = () => {
    if (status == STREAM_STATUS.LIVE_STREAMING && connected) {
      return (
        <VideoPlayer
          // src="https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8"
          src={data.attributes.live_stream_endpoint + '?start=' + data.attributes.stream_shift_start_at}
          handleFirstPlay={_handleFirstPlay}
          liveTime={Date.parse(data.attributes.live_start_datetime)}
        />
      )
    }
    return null
  }

  const renderBeforeStart = () => {
    if (status == STREAM_STATUS.BEFORE_START || status == STREAM_STATUS.CM_STARTED) {
      return <BeforeHolder time={time} text="配信開始までお待ちください" />
    } else if (status !== STREAM_STATUS.LIVE_STREAMING) {
      const _dates = [data.attributes.archive_start_datetime, data.attributes.archive_end_datetime]
      return <BeforeHolder dates={_dates} text="この配信は終了しました" />
    }
    return null
  }

  const checkLoading = () => {
    if (status === STREAM_STATUS.LIVE_STREAMING) {
      return !(data && connected)
    }
    return false
  }

  const renderInActivePlayer = () => {
    if (meta.error?.code === STREAM_STATUS.INACTIVE_STREAM) {
      return (
        <div className={classes.root}>
          <Container className={classes.spacing} disableGutters maxWidth="xl">
            <Grid container spacing={0}>
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
      )
    }
  }

  const chatPlaceHolder = () => {
    if (status !== STREAM_STATUS.LIVE_STREAMING) {
      return (
        <Box display="flex" flex={1} className={classes.chatHolder}>
          <Typography>コメントは配信中のみ可能です</Typography>
        </Box>
      )
    }
    return null
  }

  const renderChat = () => {
    if (status == STREAM_STATUS.LIVE_STREAMING) {
      return (
        <LiveChat
          input={true}
          userId={userId}
          onSend={_onSend}
          protection={true}
          messages={messageList}
          playerHeight={contentRect.height}
        />
      )
    }
    return null
  }

  const _handleFirstPlay = () => {
    const payload = {
      action: STREAM_CHAT_ACTION_TYPE.PLAY_PRESS,
      ticket: currentUser?.accessToken,
    }
    dispatch(socketActions.socketSend(payload))
  }

  const classes = useStyles()
  return (
    <>
      <Loader open={checkLoading()} />
      {data && hasTicked && (
        <>
          <Header title="動画" withBackButton={false} />
          <div className={classes.root}>
            <Container className={classes.spacing} disableGutters maxWidth="xl">
              <div ref={contentRef} className={classes.playerWrapper}>
                <Paper className={classes.playerContainer} elevation={2} square>
                  <PlayerCard>
                    {renderBeforeStart()}
                    {renderPlayer()}
                  </PlayerCard>
                </Paper>
              </div>
              <TabContext value={value}>
                <Box
                  style={{
                    position: 'relative',
                    height: '100%',
                  }}
                >
                  <Box className={classes.tabContainer}>
                    <Tabs
                      TabIndicatorProps={{ style: { display: 'none' } }}
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
                    {renderChat()}
                  </TabPanel>
                  <TabPanel className={classes.panel} value="2">
                    <StreamDetail url={url} data={data} countData={roomCountInfo} />
                    <Box className={classes.mobileBanner}>
                      <Ad link={'https://info.exelab.jp/'} src="/images/info_exelab.jpg" />
                    </Box>
                  </TabPanel>
                </Box>
              </TabContext>
            </Container>
          </div>
        </>
      )}
      {hasNgWord && <ErrorSnackbar open={hasNgWord} message={'不適切な文字列が含まれています。'} onClose={() => setNgWord(false)} />}
      {renderInActivePlayer()}
    </>
  )
}

export default StreamContainer
