import _ from 'lodash'
import { MessageType } from '@components/Chat/types/chat.types'

const messagesMerge = (olddata: MessageType[], newdata: MessageType[]): MessageType[] => {
  const unsent = _.filter(olddata, { sent: false })
  const unsentArray = _.map(unsent, 'clientId')
  let updatedObj
  if (unsentArray.length === 0 || unsentArray.length < 0) {
    const isMerged = newdata[0] !== undefined ? _.filter(olddata, { sortKey: newdata[0].sortKey }) : []
    if (_.isEmpty(isMerged)) {
      olddata = _.concat(newdata, olddata)
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

export const ChatHelper = {
  messagesMerge,
}
