import { useState, useCallback, useEffect } from 'react'
import { Box, Typography, Slider, Link, Theme } from '@material-ui/core'
import getCroppedImg from './Partials/cropImage'
import { calculateDimensionsCover } from './Partials/calculateDimensions'
import ESDialog from '@components/Dialog'
import ButtonPrimary from '@components/ButtonPrimary'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import Cropper from 'react-easy-crop'
import { CameraAlt as Camera, Crop169 as RectIcon } from '@material-ui/icons'
import ESLoader from '@components/Loader'
import i18n from '@locales/i18n'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'
import { REMOVE_TYPE } from '@constants/image.constants'

interface CoverSelectorProps {
  src?: string
  ratio?: number
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

const STATIC_WIDTH = 600
const STATIC_HEIGHT = 200

const CoverSelector: React.FC<CoverSelectorProps> = ({ src, ratio, is_required, cancel, onUpdate, onRemove }) => {
  const [rawFile, setRawFile] = useState<null | File>(null)
  const [file, setFile] = useState<any>(null)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [zoom, setZoom] = useState<number>(1)
  const [imgLoad, setImgLoad] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [fitType, setFit] = useState<'vertical-cover' | 'horizontal-cover'>('horizontal-cover')
  const [mediaDimensions, setMediaDimensions] = useState<{ width: number; height: number }>({ width: STATIC_WIDTH, height: STATIC_HEIGHT })
  const { width: containerWidth } = useWindowDimensions(64)
  const [dynamicWidth, setDynamicWidth] = useState<number>(STATIC_WIDTH)
  const [error, setError] = useState<boolean>(false)
  const classes = useStyles({ width: dynamicWidth })
  const [imgSrc, setImgSrc] = useState<any>(null)
  const [is_clicked_reset, setIsClickedReset] = useState<boolean>(false)

  useEffect(() => {
    return setUploading(false)
  }, [])

  useEffect(() => {
    setDynamicWidth(containerWidth > STATIC_WIDTH ? STATIC_WIDTH : containerWidth)
  }, [containerWidth])

  const MAX_SIZE = 1048576 * 5 //1MB * 5 = 5MB
  const FILE_TYPES = 'image/jpeg, image/jpg, image/png, image/gif'
  const dropZoneConfig = {
    accept: FILE_TYPES,
    onDrop: (files: any) => handleChange(files),
    maxSize: MAX_SIZE,
  }
  const { getRootProps, getInputProps, fileRejections } = useDropzone(dropZoneConfig)

  useEffect(() => {
    if (fileRejections.length > 0 && fileRejections[0].file) {
      setError(fileRejections[0].file.size > MAX_SIZE || !FILE_TYPES.includes(fileRejections[0].file.type))
    } else {
      setError(false)
    }
  }, [fileRejections])

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  const handleChange = (files: Array<File>) => {
    const f = files[0]
    const reader = new FileReader()
    if (f) {
      setRawFile(f)
      reader.onload = (e) => {
        const img = document.createElement('img')
        img.src = e.target.result as string
        img.onload = function () {
          const w = img.naturalWidth || img.width
          const h = img.naturalHeight || img.height
          setMediaDimensions(calculateDimensionsCover(w, h, dynamicWidth, STATIC_HEIGHT))
          if (h >= w) {
            setFit('horizontal-cover')
          } else if (w > h) {
            setFit('vertical-cover')
          }
          setImgLoad(true)
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
    onRemove(src, REMOVE_TYPE.cover)
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
          {file && imgLoad ? (
            <Cropper
              image={file}
              crop={crop}
              zoom={zoom}
              objectFit={fitType}
              aspect={ratio || 4 / 1}
              style={{
                containerStyle: { width: dynamicWidth, height: STATIC_HEIGHT, position: 'relative' },
                mediaStyle: { width: mediaDimensions.width, height: mediaDimensions.height, position: 'relative' },
              }}
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          ) : (
            <div className={classes.imageContainer}>
              {imgSrc ? <img src={imgSrc} className={classes.image} /> : <Image height="148" width="116" src="/images/big_logo.png" />}
              <div className={classes.backdrop} />
              <Camera fontSize="large" className={classes.camera} />
              <div {...getRootProps()} className={classes.dropZone}>
                <input {...getInputProps()} />
              </div>
            </div>
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

CoverSelector.defaultProps = {
  ratio: null,
}

export default CoverSelector

export interface StyleProps {
  width: number
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
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
  linkContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  link: {
    color: '#FFFFFF30',
    '&:focus': {
      color: '#ffffff9c',
    },
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  linkDisabled: {
    color: '#FFFFFF30',
    '&:focus': {
      color: '#ffffff9c',
    },
    cursor: 'default',
    textDecoration: 'underline',
  },
  //--------Control--------------------
  controls: {
    display: 'flex',
    flexDirection: 'row',
    width: '60%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  rect: {
    color: '#FFFFFF30',
    marginRight: 10,
  },
  rect2: {
    color: '#FFFFFF30',
    marginLeft: 10,
  },
  //---------Crop and image-----------------
  cropContainer: {
    position: 'relative',
    width: ({ width }) => width,
    height: STATIC_HEIGHT,
    margin: 'auto',
  },
  imageContainer: {
    display: 'flex',
    width: ({ width }) => width,
    height: STATIC_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: undefined,
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
  camera: {
    display: 'flex',
    position: 'absolute',
    zIndex: 50,
  },
  touch: {
    zIndex: 30,
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    width: ({ width }) => width,
    height: STATIC_HEIGHT,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  avatar: {
    zIndex: 30,
    width: ({ width }) => width,
    height: STATIC_HEIGHT,
  },

  backdrop: {
    opacity: 0.6,
    background: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  button: {
    minWidth: 170,
    marginLeft: 20,
    marginTop: 10,
  },
}))
