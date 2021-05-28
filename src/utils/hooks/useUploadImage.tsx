import { UPLOADER_TYPE, ACTION_TYPE } from '@constants/image.constants'
import { getPreSignedUrl, upload } from '@services/image.service'
import { useState } from 'react'

const useUploadImage = (): {
  progress: number
  uploadArenaTeamImage: (file: File, id: number, isCreate: boolean, onSuccess: (imageUrl: string) => void) => void
  uploadArenaCoverImage: (file: File, id: number, isCreate: boolean, onSuccess: (imageUrl: string) => void) => void
  uploadArenaSummaryImage: (file: File, id: number, isCreate: boolean, onSuccess: (imageUrl: string) => void) => void
  isUploading: boolean
  hasError: boolean
} => {
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const uploadArenaTeamImage = async (file, id, isCreate, onSuccess) => {
    await uploadImage(
      file,
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

  const uploadArenaCoverImage = async (file, id, isCreate, onSuccess) => {
    await uploadImage(
      file,
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

  const uploadArenaSummaryImage = async (file, id, isCreate, onSuccess) => {
    await uploadImage(
      file,
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

  const uploadImage = async (file, params, onSuccess) => {
    setIsUploading(true)
    setIsUploading(false)
    try {
      const res = await getPreSignedUrl(params)
      await upload(file, res.url, (_progress) => setProgress(_progress))
      onSuccess(`https://${res.file_url}`)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsUploading(false)
    }
  }

  return {
    progress,
    isUploading,
    hasError,
    uploadArenaTeamImage,
    uploadArenaCoverImage,
    uploadArenaSummaryImage,
  }
}

export default useUploadImage
