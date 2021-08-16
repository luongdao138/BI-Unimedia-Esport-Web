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
import lobbydump from '@store/lobbydump'
import chat from '@store/chat'
import recruitment from './recruitment'
import game from '@store/game'
import notification from '@store/notification'
import socket from '@store/socket'

const reducer = combineReducers({
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
  lobbydump: lobbydump.reducers,
  recruitment: recruitment.reducers,
  gameTitle: game.reducers,
  notification: notification.reducers,
  chat: chat.reducers,
  socket: socket.reducers,
})
export default reducer

export type RootState = ReturnType<typeof reducer>
