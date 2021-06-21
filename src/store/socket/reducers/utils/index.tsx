import _ from 'lodash'
import { MessageType, ChatDataType } from '@components/Chat/types/chat.types'
import { State } from '@store/socket/actions/types'
import { CHAT_MESSAGE_TYPE } from '@constants/socket.constants'

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
        return a.chatRoomId === msg.chatRoomId ? { ...a, lastMsgAt: msg.createdAt, lastMsg: msg.formattedMsg } : a
      })
    } else {
      updatedRoom = _.map(roomList, function (a: ChatDataType) {
        return a.chatRoomId === msg.chatRoomId
          ? { ...a, lastMsgAt: msg.createdAt, lastMsg: msg.formattedMsg, unseenCount: a.unseenCount + 1 }
          : a
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const changeSingleRoom = (oldState: State, newRoom: any): State => {
  const clonedList = [...oldState.roomList]
  const index = _.findIndex(clonedList, (item) => item.chatRoomId === newRoom.chatRoomId)
  if (index > -1) {
    const newRoomItem = { ...clonedList[index] }
    newRoomItem.roomName = newRoom.roomName
    newRoomItem.roomImg = newRoom.roomImg
    clonedList[index] = newRoomItem
  }
  const selectedRoomId = _.get(oldState, 'selectedRoomInfo.chatRoomId')
  if (selectedRoomId === newRoom.chatRoomId) {
    return {
      ...oldState,
      roomList: clonedList,
      selectedRoomInfo: { ...oldState.selectedRoomInfo, roomName: newRoom.roomName, roomImg: newRoom.roomImg },
    }
  }
  return {
    ...oldState,
    roomList: clonedList,
  }
}

const deleteMessage = (olddata: MessageType[], newdata: any[]): MessageType[] => {
  if (olddata && olddata[0] && newdata && newdata[0]) {
    const sortKey = newdata[0].sortKey
    const replaceText = newdata[0].parentMsgDeletedText
    const deleteFrom: any = olddata
    const roomId = newdata[0].chatRoomId

    const messagesRoom = olddata[0].chatRoomId
    let updatedObj
    if (roomId == messagesRoom) {
      updatedObj = _.remove(deleteFrom, function (item: any) {
        return item.sortKey != sortKey
      }).map((item) => {
        if (item.parentMsg != null && !item.parentMsg.isDeleted) {
          item.parentMsg.msg = replaceText
          item.parentMsg.isDeleted = true
          item.parentMsg.type = CHAT_MESSAGE_TYPE.TEXT
        }
        return item
      })
    } else {
      updatedObj = olddata
    }
    return updatedObj
  }
  return olddata
}

export const ChatHelper = {
  messagesMerge,
  roomListUpdate,
  unseenClear,
  changeSingleRoom,
  deleteMessage,
}
