import { UPLOADER_TYPE, ACTION_TYPE } from '@constants/image.constants'
import { getPreSignedUrl, upload, getLobbyPreSignedUrl, getThumbnailPreSignedUrl } from '@services/image.service'
import { useState } from 'react'

const useUploadImage = (): {
  progress: number
  uploadArenaTeamImage: (file: File, blob: any, id: number, isCreate: boolean, onSuccess: (imageUrl: string) => void) => void
  uploadArenaCoverImage: (file: File, blob: any, id: number, isCreate: boolean, onSuccess: (imageUrl: string) => void) => void
  uploadArenaSummaryImage: (file: File, blob: any, id: number, isCreate: boolean, onSuccess: (imageUrl: string) => void) => void
  uploadLiveStreamThumbnailImage: (file: File, blob: any, onSuccess: (imageUrl: string) => void) => void
  uploadCommentImage: (file: File, blob: any, onSuccess: (imageUrl: string) => void) => void
  uploadLobbyCoverImage: (file: File, blob: any, id: number, isCreate: boolean, onSuccess: (imageUrl: string) => void) => void
  isUploading: boolean
  hasError: boolean
} => {
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const uploadArenaTeamImage = async (file, blob, id, isCreate, onSuccess) => {
    await uploadImage(
      file,
      blob,
      {
        type: UPLOADER_TYPE.TEAM,
        fileName: file.name,
        contentType: file.type,
        room: id,
        action_type: isCreate ? ACTION_TYPE.CREATE : ACTION_TYPE.UPDATE,
      },
      onSuccess
    )
  }

  const uploadArenaCoverImage = async (file, blob, id, isCreate, onSuccess) => {
    await uploadImage(
      file,
      blob,
      {
        type: UPLOADER_TYPE.TOURNAMENT,
        fileName: file.name,
        contentType: file.type,
        room: id,
        action_type: isCreate ? ACTION_TYPE.CREATE : ACTION_TYPE.UPDATE,
      },
      onSuccess
    )
  }

  const uploadLobbyCoverImage = async (file, blob, id, isCreate, onSuccess) => {
    await uploadLobbyImage(
      file,
      blob,
      {
        type: UPLOADER_TYPE.LOBBY,
        fileName: file.name,
        contentType: file.type == 'image/gif' ? 'image/png' : file.type,
        room: id,
        action_type: isCreate ? ACTION_TYPE.CREATE : ACTION_TYPE.UPDATE,
      },
      onSuccess
    )
  }

  const uploadArenaSummaryImage = async (file, blob, id, isCreate, onSuccess) => {
    await uploadImage(
      file,
      blob,
      {
        type: UPLOADER_TYPE.TOURNAMENT_SUMMARY,
        fileName: file.name,
        contentType: file.type,
        room: id,
        action_type: isCreate ? ACTION_TYPE.CREATE : ACTION_TYPE.UPDATE,
      },
      onSuccess
    )
  }

  const uploadCommentImage = async (file, blob, onSuccess) => {
    await uploadImage(
      file,
      blob,
      {
        type: UPLOADER_TYPE.POST,
        fileName: file.name,
        contentType: file.type,
        room: '',
        action_type: ACTION_TYPE.CREATE,
      },
      onSuccess
    )
  }

  const uploadImage = async (file, blob, params, onSuccess) => {
    setIsUploading(true)

    try {
      const res = await getPreSignedUrl(params)
      await upload(blob ? blob : file, res.url, (_progress) => setProgress(_progress))
      onSuccess(`https://${res.file_url}`)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsUploading(false)
    }
  }

  //[CW] upload thumbnail live stream
  const uploadThumbnail = async (file, blob, params, onSuccess) => {
    setIsUploading(true)

    try {
      const res = await getThumbnailPreSignedUrl(params)
      await upload(blob ? blob : file, res.url, (_progress) => setProgress(_progress))
      onSuccess(`https://${res.file_url}`)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsUploading(false)
    }
  }

  const uploadLobbyImage = async (file, blob, params, onSuccess) => {
    setIsUploading(true)

    try {
      const res = await getLobbyPreSignedUrl(params)
      await upload(blob ? blob : file, res.url, (_progress) => setProgress(_progress))
      onSuccess(`https://${res.file_url}`)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsUploading(false)
    }
  }

  //[CW] upload thumbnail live stream
  const uploadLiveStreamThumbnailImage = async (file, blob, onSuccess) => {
    await uploadThumbnail(
      file,
      blob,
      {
        thumbnail: file.name,
        contentType: file.type,
      },
      onSuccess
    )
  }

  return {
    progress,
    isUploading,
    hasError,
    uploadArenaTeamImage,
    uploadArenaCoverImage,
    uploadArenaSummaryImage,
    uploadCommentImage,
    uploadLiveStreamThumbnailImage,
    uploadLobbyCoverImage,
  }
}

export default useUploadImage
