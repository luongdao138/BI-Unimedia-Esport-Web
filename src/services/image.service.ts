import api from './api'
import axios from 'axios'
import { URI } from '@constants/uri.constants'

export type PresignedDataParams = {
  type: number
  fileName: string
  contentType: string
  room: string | number
  action_type: number
}

export const getPreSignedUrl = async (params: PresignedDataParams): Promise<any> => {
  const { data } = await api.post<any>(URI.S3_PRESIGNED_URL, params)
  return data
}

export const upload = async (file: File, signed_url: string, uploadListener?: (p: number) => void): Promise<any> => {
  const { status } = await axios.put(signed_url, file, {
    onUploadProgress: (ProgressEvent) => {
      if (uploadListener) uploadListener(Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100))
    },
    headers: { 'Content-Type': file.type },
  })
  return status
}
