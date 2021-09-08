import React, { forwardRef, Ref, useImperativeHandle, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { getPreSignedUrl, upload } from '@services/image.service'
import { UPLOADER_TYPE, ACTION_TYPE } from '@constants/image.constants'
import _ from 'lodash'
import { useAppDispatch } from '@store/hooks'
import * as commonActions from '@store/common/actions'
import i18n from '@locales/i18n'

export interface ImageUploaderRef {
  handleUpload: () => void
}

interface ImageUploaderProps {
  onResponse: (presignedUrl: string, isPending: boolean) => void
  onImageSelected?: (localUrl: string, isPending: boolean) => void
  onError?: (error: any) => void
  ref: Ref<ImageUploaderRef>
  roomId: string | string[]
}

const ImageUploader: React.FC<ImageUploaderProps> = forwardRef<ImageUploaderRef, ImageUploaderProps>(
  ({ onResponse, onImageSelected, onError, roomId }, ref) => {
    useImperativeHandle(ref, () => ({
      handleUpload: () => {
        open()
      },
    }))

    const dispatch = useAppDispatch()
    const MAX_SIZE = 1048576 * 5 //1MB * 5 = 5MB
    const FILE_TYPES = 'image/jpeg, image/jpg, image/png, image/gif'
    const dropZoneConfig = {
      noClick: true,
      noKeyboard: true,
      multiple: false,
      accept: FILE_TYPES,
      maxSize: MAX_SIZE,
      onDrop: (files) => handleFile(files),
    }

    const { getRootProps, getInputProps, fileRejections, open } = useDropzone(dropZoneConfig)

    useEffect(() => {
      if (fileRejections.length > 0 && fileRejections[0].file) dispatch(commonActions.addToast(i18n.t('common:messages.file_size_limit')))
    }, [fileRejections])

    const handleFile = (files: File[]) => {
      const file = files[0]
      const reader = new FileReader()
      if (file) {
        // eslint-disable-next-line no-console
        imageProcess(file)
          .then((result) => {
            result
          })
          .catch((e) => {
            onError(e)
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
      const fileUrl = res.file_url as string
      const signedUrl = res.url
      await upload(file, signedUrl)
      let imageFineUrl = ''
      if (_.isString(fileUrl)) {
        const httpPrefix = 'https://'
        imageFineUrl = fileUrl.startsWith(httpPrefix) ? fileUrl : `https://${fileUrl}`
      }
      onResponse && onResponse(imageFineUrl, false)
    }

    return (
      <div style={{ display: 'none' }} {...getRootProps()}>
        <input {...getInputProps()} />
      </div>
    )
  }
)

export default ImageUploader
