import { RootState } from '@store/reducers'
import { createSelector } from 'reselect'

export const msgList = (state: RootState) => state.liveSocket.msgList
export const roomCount = (state: RootState) => state.liveSocket.roomCount
export const connected = (state: RootState) => state.liveSocket.connected

export const messages = createSelector(msgList, (items) => items)
export const roomMeta = createSelector(roomCount, (items) => items)
export const socketConnected = createSelector(connected, (items) => items)
