import _ from 'lodash'
import { MessageType } from '@components/Chat/types/chat.types'
import { State } from '@store/socket/actions/types'

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
      selectedRoomInfo: { ...oldState.selectedRoomInfo, roomName: newRoom.roomName, roomImg: newRoom.Img },
    }
  }
  return {
    ...oldState,
    roomList: clonedList,
  }
}

export const ChatHelper = {
  messagesMerge,
  changeSingleRoom,
}
