import { useState } from 'react'
import { useAppDispatch } from '@store/hooks'
import { getPreSignedUrl, upload } from '@services/image.service'
import { CHAT_ACTION_TYPE } from '@constants/socket.constants'
import { UPLOADER_TYPE, ACTION_TYPE } from '@constants/image.constants'
import { socketActions } from '@store/socket/actions'
import _ from 'lodash'

interface ReturnType {
  imageProcess: (file: File, userId: number, roomId: string, blob: any) => void
  uploadMeta: UploadStateType
}

interface UploadStateType {
  uploading: boolean
}

const useRoomImageUploader = (): ReturnType => {
  const [uploadMeta, setMeta] = useState<UploadStateType>({ uploading: false })
  const dispatch = useAppDispatch()

  const imageProcess = async (file: File, _userId: number, roomId: string, blob: any) => {
    setMeta({ uploading: true })
    const params = {
      type: UPLOADER_TYPE.CHAT,
      room: roomId as string,
      fileName: file.name,
      contentType: file.type,
      action_type: ACTION_TYPE.CREATE,
    }
    const res = await getPreSignedUrl(params)
    const fileUrl = res.file_url as string
    const signedUrl = res.url
    await upload(blob, signedUrl)
    let imageFineUrl = ''
    if (_.isString(fileUrl)) {
      const httpPrefix = 'https://'
      imageFineUrl = fileUrl.startsWith(httpPrefix) ? fileUrl : `https://${fileUrl}`
    }

    const payload = {
      action: CHAT_ACTION_TYPE.CHANGE_ROOM_IMG,
      roomId: roomId,
      img: imageFineUrl,
    }
    dispatch(socketActions.socketSend(payload))
    setMeta({ uploading: false })
  }

  return { imageProcess, uploadMeta }
}

export default useRoomImageUploader
