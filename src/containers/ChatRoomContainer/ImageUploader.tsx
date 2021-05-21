import React, { forwardRef, Ref, useImperativeHandle } from 'react'
import { useDropzone } from 'react-dropzone'
import { getPreSignedUrl, upload } from '@services/image.service'
import { UPLOADER_TYPE, ACTION_TYPE } from '@constants/image.constants'

export interface ImageUploaderRef {
  handleUpload: () => void
}

interface ImageUploaderProps {
  onResponse: (presignedUrl: string, isPending: boolean) => void
  onImageSelected?: (localUrl: string, isPending: boolean) => void
  ref: Ref<ImageUploaderRef>
  roomId: string | string[]
}

const ImageUploader: React.FC<ImageUploaderProps> = forwardRef<ImageUploaderRef, ImageUploaderProps>(
  ({ onResponse, onImageSelected, roomId }, ref) => {
    useImperativeHandle(ref, () => ({
      handleUpload: () => {
        dropZone.open()
      },
    }))
    const dropZone = useDropzone({
      noClick: true,
      noKeyboard: true,
      multiple: false,
      accept: 'image/*',
      onDrop: (files) => handleFile(files),
    })

    const handleFile = (files: File[]) => {
      const file = files[0]
      const reader = new FileReader()
      if (file) {
        // eslint-disable-next-line no-console
        imageProcess(file).then((result) => {
          result
        })
        reader.readAsDataURL(file)
      }
    }

    const imageProcess = async (file: File) => {
      const params = {
        type: UPLOADER_TYPE.CHAT,
        room: roomId as string,
        fileName: file.name,
        contentType: file.type,
        action_type: ACTION_TYPE.CREATE,
      }
      onImageSelected && onImageSelected(URL.createObjectURL(file), true)

      const res = await getPreSignedUrl(params)
      const fileUrl = res.file_url
      const signedUrl = res.url
      await upload(file, signedUrl)

      onResponse && onResponse(fileUrl, false)
    }

    return (
      <div style={{ display: 'none' }} {...dropZone.getRootProps()}>
        <input {...dropZone.getInputProps()} />
      </div>
    )
  }
)

export default ImageUploader
