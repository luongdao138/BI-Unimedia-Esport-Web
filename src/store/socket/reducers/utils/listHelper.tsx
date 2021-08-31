import { ChatDataType } from '@components/Chat/types/chat.types'
import _ from 'lodash'

const storeList = (state: ChatDataType[], payload: ChatDataType[]): ChatDataType[] => {
  const data = _.union(state, payload)
  return data
}

const mergeList = (state: ChatDataType[], payload: ChatDataType[]): ChatDataType[] => {
  const data = _.uniqBy(_.union(state, payload), 'chatRoomId')
  return data
}

export const ListHelper = {
  storeList,
  mergeList,
}
