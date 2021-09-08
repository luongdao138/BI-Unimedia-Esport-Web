import { useState, useCallback, useEffect } from 'react'
import { Box, Typography, Slider, Link } from '@material-ui/core'
import getCroppedImg from './Partials/cropImage'
import { calculateDimensions } from './Partials/calculateDimensions'
import ESDialog from '@components/Dialog'
import ButtonPrimary from '@components/ButtonPrimary'
import ESAvatar from '@components/Avatar'
import { useDropzone } from 'react-dropzone'
import Cropper from 'react-easy-crop'
import i18n from '@locales/i18n'
import { CameraAlt as Camera, Crop169 as RectIcon } from '@material-ui/icons'
import ESLoader from '@components/Loader'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { REMOVE_TYPE } from '@constants/image.constants'

interface AvatarSelectorProps {
  src?: string
  alt: string
  is_required?: boolean | true
  cancel: () => void
  onUpdate: (file: File, blob: any, blobUrl: string) => void
  onRemove?: (path: string, file_type: number) => void
}

const ImageSlider = withStyles({
  root: {
    color: '#E11AD4',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -10,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  track: {
    height: 4,
    borderRadius: 2,
  },
  rail: {
    height: 4,
    borderRadius: 2,
    color: '#FFFFFF30',
  },
})(Slider)

const WH = 200

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ src, alt, is_required, cancel, onUpdate, onRemove }) => {
  const classes = useStyles()
  const [rawFile, setRawFile] = useState<null | File>(null)
  const [file, setFile] = useState<any>(null)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [zoom, setZoom] = useState<number>(1)
  const [uploading, setUploading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [mediaDimensions, setMediaDimensions] = useState<{ width: number; height: number }>({ width: WH, height: WH })
  const [fitType, setFit] = useState<'contain' | 'vertical-cover' | 'horizontal-cover'>('contain')
  const [imgSrc, setImgSrc] = useState<any>(null)
  const [is_clicked_reset, setIsClickedReset] = useState<boolean>(false)

  useEffect(() => {
    return setUploading(false)
  }, [])

  // useEffect(() => {
  //   setFileLocation(src)
  // }, [src])

  const MAX_SIZE = 1048576 * 5 //1MB * 5 = 5MB
  const FILE_TYPES = 'image/jpeg, image/jpg, image/png, image/gif'
  const dropZoneConfig = {
    accept: FILE_TYPES,
    multiple: false,
    onDrop: (files: any) => handleChange(files),
    maxSize: MAX_SIZE,
  }
  const { getRootProps, getInputProps, fileRejections } = useDropzone(dropZoneConfig)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  useEffect(() => {
    if (fileRejections.length > 0 && fileRejections[0].file) {
      setError(fileRejections[0].file.size > MAX_SIZE || !FILE_TYPES.includes(fileRejections[0].file.type))
    } else {
      setError(false)
    }
  }, [fileRejections])

  const handleChange = (files: Array<File>) => {
    const f = files[0]
    const reader = new FileReader()
    if (f) {
      setRawFile(f)
      reader.onload = (e) => {
        const img = document.createElement('img')
        img.src = e.target.result as string
        img.onload = function () {
          const width = img.naturalWidth || img.width
          const height = img.naturalHeight || img.height
          setMediaDimensions(calculateDimensions(width, height, WH, WH))
          if (height > width) {
            setFit('horizontal-cover')
          } else if (width > height) {
            setFit('vertical-cover')
          } else {
            setFit('contain')
          }
        }
        setFile(reader.result)
      }
      reader.readAsDataURL(f)
    }
  }

  const reset = () => {
    if (file) {
      setFile(null)
      setRawFile(null)
      setIsClickedReset(false)
    } else {
      setImgSrc(null)
      if (src) setIsClickedReset(true)
    }
    setCroppedAreaPixels(null)
    setZoom(1)
  }

  const disableUseButton = () => {
    if (file !== null && rawFile !== null) return false
    else if (is_required == false && is_clicked_reset) return false
    return true
  }

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const update = useCallback(async () => {
    try {
      setUploading(true)
      const { blob, blobUrl } = await getCroppedImg(file, croppedAreaPixels, rawFile.type)
      onUpdate(rawFile, blob, blobUrl)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  const remove = useCallback(async () => {
    onRemove(src, REMOVE_TYPE.profile)
  }, [])

  return (
    <ESDialog open={true} title={i18n.t('common:profile.update_image')} handleClose={cancel} bkColor={'#2C2C2C'} alignTop={true}>
      <Box className={classes.container}>
        <Typography className={classes.title}>{i18n.t('common:profile.update_image')}</Typography>
        {error && (
          <Typography color="secondary" className={classes.warning}>
            {i18n.t('common:messages.file_size_limit')}
          </Typography>
        )}
        <Box className={classes.cropContainer}>
          {file ? (
            <Cropper
              image={file}
              style={{
                containerStyle: { width: WH, height: WH, position: 'relative' },
                mediaStyle: { width: mediaDimensions.width, height: mediaDimensions.height, position: 'relative' },
              }}
              crop={crop}
              zoom={zoom}
              objectFit={fitType}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          ) : (
            <label htmlFor="cover-upload" className={classes.touch}>
              <ESAvatar className={classes.avatar} src={imgSrc ?? '/images/avatar.png'} alt={alt} />
              <Camera fontSize="large" className={classes.camera} />
              <div className={classes.backdrop} />
              <div {...getRootProps()} className={classes.dropZone}>
                <input {...getInputProps()} />
              </div>
            </label>
          )}
        </Box>
        {file ? (
          <Box className={classes.controls}>
            <RectIcon fontSize="small" className={classes.rect} />
            <ImageSlider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(_, zoom) => setZoom(typeof zoom === 'object' ? zoom[0] : zoom)}
            />
            <RectIcon fontSize="small" className={classes.rect2} />
          </Box>
        ) : null}
        <Typography className={classes.description}>{i18n.t('common:messages.image_update')}</Typography>
        <Box>
          <ButtonPrimary round className={classes.button} gradient={false} onClick={cancel}>
            {i18n.t('common:common.cancel')}
          </ButtonPrimary>
          <ButtonPrimary round className={classes.button} onClick={file && rawFile ? update : remove} disabled={disableUseButton()}>
            {i18n.t('common:button.use')}
          </ButtonPrimary>
        </Box>
        <Box className={classes.linkContainer}>
          <Link className={classes.link} onClick={reset}>
            {i18n.t('common:profile.reset')}
          </Link>
        </Box>

        {uploading ? (
          <Box className={classes.loader}>
            <ESLoader />
          </Box>
        ) : null}
      </Box>
    </ESDialog>
  )
}

export default AvatarSelector

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    minHeight: 400,
    textAlign: 'center',
    overflow: 'overlay',
    scrollbarColor: '#222 transparent',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: 5,
      opacity: 0,
      padding: 2,
    },
    '&::-webkit-scrollbar-track': {
      paddingLeft: 1,
      color: 'red',
      opacity: 0,
      background: 'rgba(0,0,0,0.5)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#222',
      opacity: 0,
      borderRadius: 6,
    },
  },
  title: {
    marginTop: 40,
    marginBottom: 40,
  },
  warning: {
    marginBottom: 20,
  },
  description: {
    marginTop: 40,
    marginBottom: 100,
    maxWidth: 400,
    margin: 'auto',
  },
  image: {
    marginTop: 20,
    marginBottom: 20,
  },
  dropZone: {
    display: 'flex',
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 60,
  },
  cropContainer: {
    height: WH,
    width: WH,
    margin: 'auto',
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  touch: {
    zIndex: 30,
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    width: WH,
    height: WH,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  avatar: {
    zIndex: 30,
    width: WH,
    height: WH,
  },
  camera: {
    display: 'flex',
    position: 'absolute',
    zIndex: 50,
  },
  backdrop: {
    display: 'flex',
    opacity: 0.6,
    background: '#000',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    content: '""',
    zIndex: 40,
  },
  loader: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  link: {
    color: '#FFFFFF30',
    '&:focus': {
      color: '#ffffff9c',
    },
    marginTop: 20,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  linkDisabled: {
    color: '#FFFFFF30',
    '&:focus': {
      color: '#ffffff9c',
    },
    marginTop: 20,
    textDecoration: 'underline',
    cursor: 'default',
  },
  rect: {
    color: '#FFFFFF30',
    marginRight: 10,
  },
  rect2: {
    color: '#FFFFFF30',
    marginLeft: 10,
  },
  button: {
    minWidth: 170,
    marginLeft: 20,
    marginTop: 10,
  },
}))
