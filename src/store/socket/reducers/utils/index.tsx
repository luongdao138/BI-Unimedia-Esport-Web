import _ from 'lodash'
import { MessageType, ChatDataType, DeleteType } from '@components/Chat/types/chat.types'
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
    unsentArray.forEach((item) => {
      const indexMsg = _.findIndex(olddata, { clientId: item })
      const newObj = _.find(newdata, (chr) => chr.clientId == item)
      if (newObj) {
        olddata[indexMsg] = _.assign({}, updatedObj[indexMsg], newObj)
        updatedObj = olddata
      }
    })
  }
  return updatedObj
}

const roomListUpdate = (roomList: ChatDataType[] | undefined, message: MessageType[], activeRoom: string): ChatDataType[] => {
  // check if room exist in new msg
  if (roomList !== undefined) {
    const clonedList = _.cloneDeep(roomList)
    let updatedRoom: ChatDataType[]
    const msg = message[0]
    const hasRoomValue = clonedList.find(function (value) {
      return !!(value.chatRoomId === msg.chatRoomId)
    })

    if (hasRoomValue && _.isArray(clonedList)) {
      if (activeRoom === msg.chatRoomId) {
        updatedRoom = _.map(clonedList, function (a: ChatDataType) {
          return a.chatRoomId === msg.chatRoomId ? { ...a, lastMsgAt: msg.createdAt, lastMsg: msg.formattedMsg } : a
        })
      } else {
        updatedRoom = _.map(clonedList, function (a: ChatDataType) {
          return a.chatRoomId === msg.chatRoomId
            ? { ...a, lastMsgAt: msg.createdAt, lastMsg: msg.formattedMsg, unseenCount: a.unseenCount + 1 }
            : a
        })
      }
    } else {
      updatedRoom = roomList
    }
    return updatedRoom
  } else {
    return []
  }
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

const roomUpdateWithUnseen = (roomList: ChatDataType[], activeRoom: string): ChatDataType[] => {
  // check if room exist in new msg
  let updatedRoom: ChatDataType[]
  if (_.isArray(roomList) && !_.isEmpty(roomList) && activeRoom !== undefined) {
    updatedRoom = _.map(roomList, function (a: ChatDataType) {
      return a.chatRoomId === activeRoom ? { ...a, unseenCount: 0 } : a
    })
  } else {
    updatedRoom = roomList
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

const deleteMessage = (olddata: MessageType[], newdata: DeleteType[]): MessageType[] => {
  const newDataSingle = _.get(newdata, '[0]')
  const oldDataSingle = _.get(olddata, '[0]')

  if (oldDataSingle && newDataSingle) {
    const sortKey = newDataSingle.sortKey
    const replaceText = newDataSingle.parentMsgDeletedText
    const deleteFrom: MessageType[] = olddata
    const roomId = newDataSingle.chatRoomId

    const messagesRoom = oldDataSingle.chatRoomId
    let updatedObj
    if (roomId == messagesRoom) {
      updatedObj = _.filter(deleteFrom, (item: MessageType) => item.sortKey != sortKey).map((item) => {
        if (item.parentMsg != null && _.isObject(item.parentMsg) && !item.parentMsg.isDeleted && item.parentMsg.sortKey === sortKey) {
          item = Object.assign({}, item, {
            parentMsg: {
              msg: replaceText,
              isDeleted: true,
              type: CHAT_MESSAGE_TYPE.TEXT,
            },
          })
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

const onDeleteRoomListUpdate = (roomList: ChatDataType[], deletedMsg: DeleteType[]): ChatDataType[] => {
  const message = deletedMsg[0]
  if (message.isLastMsg === true && message && !_.isEmpty(roomList)) {
    //update room list
    const newRoomList: ChatDataType[] = _.map(roomList, function (a: ChatDataType) {
      return a.chatRoomId === message.chatRoomId ? { ...a, lastMsgAt: message.createdAt, lastMsg: message.lastMsgTxt } : a
    })
    return newRoomList
  }
  return roomList
}

const roomListAddRemove = (roomList: ChatDataType[], roomId: string): ChatDataType[] => {
  if (roomList !== undefined) {
    return _.filter(roomList, function (o) {
      return o.chatRoomId !== roomId
    })
  } else {
    return []
  }
}

export const ChatHelper = {
  messagesMerge,
  roomListUpdate,
  unseenClear,
  changeSingleRoom,
  deleteMessage,
  onDeleteRoomListUpdate,
  roomListAddRemove,
  roomUpdateWithUnseen,
}
