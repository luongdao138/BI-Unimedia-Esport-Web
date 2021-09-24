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
export type AvatarPresignedDataParams = {
  file_name: string
  content_type: string
}

export type CoverPresignedDataParams = {
  file_name: string
  content_type: string
}

export const getPreSignedUrl = async (params: PresignedDataParams): Promise<any> => {
  const { data } = await api.post<any>(URI.S3_PRESIGNED_URL, params)
  // console.log("========getPreSignedUrl CONFIG========", config)
  // console.log("========getPreSignedUrl DATA========", data)
  return data
}

export const getLobbyPreSignedUrl = async (params: PresignedDataParams): Promise<any> => {
  const { data } = await api.post<any>(URI.LOBBY_PRESIGNED_URL, params)
  return data
}

export const getAvatarPreSignedUrl = async (params: AvatarPresignedDataParams): Promise<any> => {
  const { data } = await api.post<any>(URI.AVATAR_PRESIGNED_URL, params)
  return data
}

export const getCoverPreSignedUrl = async (params: CoverPresignedDataParams): Promise<any> => {
  const { data } = await api.post<any>(URI.COVER_PRESIGNED_URL, params)
  return data
}

export const getThumbnailPreSignedUrl = async (params: PresignedDataParams): Promise<any> => {
  const { data } = await api.post<any>(URI.S3_THUMBNAIL_PRESIGNED_URL, params)
  // console.log("========getPreSignedUrl CONFIG========", config)
  // console.log("========getPreSignedUrl DATA========", data)
  return data
}

export const upload = async (file: File, signed_url: string, uploadListener?: (p: number) => void): Promise<any> => {
  // console.log('===PUT signed_url=====',signed_url)
  const { status } = await axios.put(signed_url, file, {
    onUploadProgress: (ProgressEvent) => {
      if (uploadListener) uploadListener(Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100))
    },
    headers: { 'Content-Type': file.type },
  })
  return status
}
