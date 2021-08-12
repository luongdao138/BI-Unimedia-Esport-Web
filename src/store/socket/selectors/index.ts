import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@store/store'
// import { ChatSelectorHelper } from './helpers'
import { mentionData } from '@components/Chat/constants'
import _ from 'lodash'
import { ChatSuggestionList } from '@components/Chat/types/chat.types'
import { CHAT_MEMBER_STATUS } from '@constants/socket.constants'
import moment from 'moment'

const getRoot = (state: RootState) => state.socket
const memberSelector = (state: RootState) => state.socket.members
const errorSelector = (state: RootState) => state.socket.error
const roomList = (state: RootState) => state.socket.roomList

export const getRoomList = createSelector(getRoot, (state) => {
  if (state.roomList === undefined) {
    return undefined
  } else {
    return _.orderBy(
      state.roomList,
      [
        (o) => {
          if (_.has(o, 'lastMsgAt')) {
            if (o.lastMsgAt === null || o.lastMsgAt === undefined) {
              return (o['lastMsgAt'] = 0)
            } else {
              return moment(o.lastMsgAt).format('x')
            }
          } else {
            return (o['lastMsgAt'] = 0)
          }
        },
      ],
      ['desc']
    )
  }
})
export const messages = createSelector(getRoot, (state) => state.messages)
export const socketReady = createSelector(getRoot, (state) => state.socketReady)
export const members = createSelector(getRoot, (state) => state.members)
export const lastKey = createSelector(getRoot, (state) => state.lastKey)
export const paginating = createSelector(getRoot, (state) => state.paginating)
export const actionPending = createSelector(getRoot, (state) => state.actionPending)
export const newRoomId = createSelector(getRoot, (state) => state.newRoomId)

export const selectedRoomInfo = createSelector(getRoot, (state) => state.selectedRoomInfo)
export const blocked = createSelector(getRoot, (state) => {
  return _.isNumber(_.get(state, 'selectedRoomInfo.blocked[0]', false))
})

export const membersSuggest = createSelector(getRoot, (state) => {
  let withAll: ChatSuggestionList[]
  if (state.selectedRoomInfo && state.selectedRoomInfo.sortKey.includes('direct')) {
    withAll = state.members
  } else {
    withAll = _.concat(state.members, mentionData.toall)
  }
  return withAll
})
export const availableMembers = createSelector(getRoot, (state) => {
  let withAll: ChatSuggestionList[]
  if (state.selectedRoomInfo && state.selectedRoomInfo.sortKey.includes('direct')) {
    withAll = state.members
  } else {
    let members = state.members
    if (_.isArray(members)) members = members.filter((member) => member.memberStatus === CHAT_MEMBER_STATUS.ACTIVE)
    withAll = _.concat(members, mentionData.toall)
  }
  return withAll
})

export const membersFilter = createSelector(memberSelector, (members) => {
  return members
})

export const unseenCount = createSelector(roomList, (state) => {
  const total = _.sumBy(state, function (o) {
    return o.unseenCount
  })
  return total
})

export const hasError = createSelector(errorSelector, (error) => _.isString(error))
