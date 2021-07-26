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
  getPrTop: () => {
    return api.get<{
      data: {
        id: string
        type: string
        attributes: {
          id: number
          title: string
          description: string
          channel_name: string
          channel_id: string
          vendor_name: string
          chat_room_id: string
          cm_start_datetime: string
          live_start_datetime: string
          archive_start_datetime: string
          archive_end_datetime: string
          shared_hash: string
          archive_view_count: number
          archive_video_endpoint: string
          live_stream_endpoint: string
          flag: string
          title_static: string
        }
      }
    }>(URI.PR_TOP)
  },
  getCookie: (): Promise<any> => axios.get('/api/signedcookie'),
}
