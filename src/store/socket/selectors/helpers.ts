import { MessageType } from '@components/Chat/types/chat.types'
import _ from 'lodash'
import moment from 'moment'
import { CHAT_MESSAGE_TYPE } from '@constants/socket.constants'

export const DateFormat = {
  MONTH_DAY: 'M/DD (dd)',
  YEAR_MONTH_DAY: 'YYYY-MM-DD',
}

const groupByDate = (items: MessageType[]): MessageType[] => {
  const grouped = _.chain(items)
    .groupBy((item) => {
      const itemTimestamp = item.createdAt ? item.createdAt : +item.createdAt
      return moment(itemTimestamp).format(DateFormat.MONTH_DAY)
    })
    .map((groupItems, groupTitle) => {
      const withDate = _.concat([{ title: groupTitle, type: CHAT_MESSAGE_TYPE.DATE }], groupItems)
      return withDate
    })
    .value()

  const flat = _.flattenDeep(grouped)

  return flat
}

export const ChatSelectorHelper = {
  groupByDate,
}
