import _ from 'lodash'
import { MessageType, ChatDataType } from '@components/Chat/types/chat.types'

const messagesMerge = (olddata: MessageType[], newdata: MessageType[]): MessageType[] => {
  const unsent = _.filter(olddata, { sent: false })
  const unsentArray = _.map(unsent, 'clientId')
  let updatedObj
  if (unsentArray.length === 0 || unsentArray.length < 0) {
    const isMerged = newdata[0] !== undefined ? _.filter(olddata, { sortKey: newdata[0].sortKey }) : []
    if (_.isEmpty(isMerged)) {
      olddata = _.concat(olddata, newdata)
    }
    updatedObj = olddata
  } else {
    updatedObj = olddata
    unsentArray.forEach(function (item) {
      const indexMsg = _.findIndex(olddata, { clientId: item })
      const newObj = _.find(newdata, function (chr) {
        return chr.clientId == item
      })
      if (newObj) {
        olddata[indexMsg] = _.assign({}, updatedObj[indexMsg], newObj)
        updatedObj = olddata
      }
    })
  }
  return updatedObj
}

const roomListUpdate = (roomList: ChatDataType[], message: MessageType[], activeRoom: string): ChatDataType[] => {
  // check if room exist in new msg
  let updatedRoom: ChatDataType[]
  const msg = message[0]
  const hasRoomValue = roomList.find(function (value) {
    return !!(value.chatRoomId === msg.chatRoomId)
  })

  if (hasRoomValue && _.isArray(roomList)) {
    if (activeRoom === msg.chatRoomId) {
      updatedRoom = _.map(roomList, function (a: ChatDataType) {
        return a.chatRoomId === msg.chatRoomId ? { ...a, lastMsgAt: msg.createdAt, lastMsg: msg.msg } : a
      })
    } else {
      updatedRoom = _.map(roomList, function (a: ChatDataType) {
        return a.chatRoomId === msg.chatRoomId ? { ...a, lastMsgAt: msg.createdAt, lastMsg: msg.msg, unseenCount: a.unseenCount + 1 } : a
      })
    }
  } else {
    updatedRoom = roomList
  }
  return updatedRoom
}

const unseenClear = (roomList: ChatDataType[], activeRoom: string): ChatDataType[] => {
  // check if room exist in new msg
  let updatedRoom: ChatDataType[]
  if (_.isArray(roomList)) {
    updatedRoom = _.map(roomList, function (a: ChatDataType) {
      return a.chatRoomId === activeRoom ? { ...a, unseenCount: 0 } : a
    })
  }
  return updatedRoom
}

export const ChatHelper = {
  messagesMerge,
  roomListUpdate,
  unseenClear,
}
