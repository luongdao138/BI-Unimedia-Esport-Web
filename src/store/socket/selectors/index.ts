import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'
// import { ChatSelectorHelper } from './helpers'
import { mentionData } from '@components/Chat/constants'
import _ from 'lodash'
import { ChatSuggestionList } from '@components/Chat/types/chat.types'

const getRoot = (state: RootState) => state.socket

export const getRoomList = createSelector(getRoot, (state) => state.roomList)
export const messages = createSelector(getRoot, (state) => state.messages)
export const getRoomMembers = createSelector(getRoot, (state) => state.chatMembers)
export const socketReady = createSelector(getRoot, (state) => state.socketReady)
export const members = createSelector(getRoot, (state) => state.members)
export const lastKey = createSelector(getRoot, (state) => state.lastKey)
export const paginating = createSelector(getRoot, (state) => state.paginating)
export const actionPending = createSelector(getRoot, (state) => state.actionPending)
export const newRoomId = createSelector(getRoot, (state) => state.newRoomId)
export const selectedRoomInfo = createSelector(getRoot, (state) => state.selectedRoomInfo)
export const membersSuggest = createSelector(getRoot, (state) => {
  let withAll: ChatSuggestionList[]
  if (state.selectedRoomInfo && state.selectedRoomInfo.sortKey.includes('direct')) {
    withAll = state.members
  } else {
    withAll = _.concat(state.members, mentionData.toall)
  }
  return withAll
})
