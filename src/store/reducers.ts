import { combineReducers } from 'redux'
import metadata from '@store/metadata'
import auth from '@store/auth'
import userProfile from '@store/userProfile'
import search from '@store/search'
import common from '@store/common'
import settings from '@store/settings'
import report from '@store/report'
import ngWords from '@store/ngWords'
import community from '@store/community'
import arena from '@store/arena'
import lobby from '@store/lobby'
import chat from '@store/chat'
import recruitment from './recruitment'
import game from '@store/game'
import notification from '@store/notification'
import socket from '@store/socket'
import { videoDetailReducer } from '@store/videoDetail/reducers'
import liveSocket from '@store/live_socket/reducers'
import { liveEventsReducer } from '@store/liveEvents/reducers'
import chatHistory from '@store/chatHistory/reducers'
import { prReducer as pr } from '@store/pr/reducers'
import stream from '@store/stream'
import videoTop from '@store/videoTop'
import purchasePoint from '@store/purchasePoint'
import pointsManage from '@store/pointsManage'
import liveStreamDetail from '@store/liveStreamDetail'
import financial from '@store/financial'
import streamerArchiveList from '@store/archivedlist'
import giftManage from './giftManage'
import deliveryReport from './deliveryReport'

const reducer = combineReducers({
  liveSocket,
  pr,
  videoDetail: videoDetailReducer,
  auth: auth.reducers,
  metadata: metadata.reducer,
  search: search.reducers,
  common: common.reducers,
  settings: settings.reducers,
  report: report.reducers,
  ngWords: ngWords.reducers,
  userProfile: userProfile.reducers,
  community: community.reducers,
  arena: arena.reducers,
  lobby: lobby.reducers,
  recruitment: recruitment.reducers,
  gameTitle: game.reducers,
  notification: notification.reducers,
  chat: chat.reducers,
  socket: socket.reducers,
  liveEvent: liveEventsReducer,
  chatHistory,
  // [CW] Add reducer setting livestream, video top, video detail, purchase point, point manager screens.
  liveSetting: stream.reducers,
  videoTop: videoTop.reducers,
  purchasePoint: purchasePoint.reducers,
  pointsManage: pointsManage.reducers,
  liveStreamDetail: liveStreamDetail.reducers,
  financial: financial.reducers,
  streamerArchiveList: streamerArchiveList.reducers,
  giftManage: giftManage.reducers,
  deliveryReport: deliveryReport.reducers,
})
export default reducer

export type RootState = ReturnType<typeof reducer>
