import api from './api'
import { URI } from '@constants/uri.constants'

export const prServices = {
  getTop: () => {
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
}
