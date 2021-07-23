import api from './api'
import { URI } from '@constants/uri.constants'
import axios from 'axios'

export const liveEventsServices = {
  getTop: () => {
    return api.get(URI.LIVE_EVENTS_TOP)
  },
  getGmoTicketPurchaseUri: (payload: any) => {
    return api.post(URI.LIVE_EVENTS_TICKET_PURCHASE_URI, payload)
  },
  gmoCallBack: (payload: any) => {
    return api.post(URI.LIVE_EVENT_PURCHASE_GMO_CALLBACK, payload)
  },
  getChatJson: async (url) => {
    const { data } = await axios.get(url)
    return data
  },
  archivePlay: (id: number) => {
    return api.put(URI.LIVE_EVENT_ARCHIVE_PLAY, { id: id })
  },
}
