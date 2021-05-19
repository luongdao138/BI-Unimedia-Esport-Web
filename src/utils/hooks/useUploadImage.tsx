import { getPreSignedUrl, upload } from '@services/image.service'
import { useState } from 'react'

const useUploadImage = (): {
  progress: number
  uploadArenaTeamImage: (file: File, id: number, type: number, actionType: number, onSuccess: (imageUrl: string) => void) => void
} => {
  const [progress, setProgress] = useState(0)

  const uploadArenaTeamImage = async (file, id, type, actionType, onSuccess) => {
    const params = {
      type: type,
      fileName: file.name,
      contentType: file.type,
      room: id,
      action_type: actionType,
    }

    try {
      const res = await getPreSignedUrl(params)
      await upload(file, res.url, (_progress) => setProgress(_progress))

      onSuccess(`https://${res.file_url}`)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('useUserData', error)
    }
  }

  return {
    progress,
    uploadArenaTeamImage,
  }
}

export default useUploadImage
