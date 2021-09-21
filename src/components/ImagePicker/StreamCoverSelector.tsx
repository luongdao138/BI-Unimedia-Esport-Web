import { useState, useCallback, useEffect } from 'react'
import { Box, Typography, Slider, Link, Theme } from '@material-ui/core'
import getCroppedImg from './Partials/cropImage'
import { calculateDimensionsThumbStream } from './Partials/calculateDimensions'
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

interface StreamCoverSelectorProps {
  src?: string
  ratio?: number
  cancel: () => void
  onUpdate: (file: File, blob: any, blobUrl: string) => void
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

const STATIC_WIDTH = 640
const STATIC_HEIGHT = 480
const MIN_WIDTH = 640

const StreamCoverSelector: React.FC<StreamCoverSelectorProps> = ({ src, ratio, cancel, onUpdate }) => {
  const [rawFile, setRawFile] = useState<null | File>(null)
  const [file, setFile] = useState<any>(null)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [zoom, setZoom] = useState<number>(1)
  const [uploading, setUploading] = useState<boolean>(false)
  const [fitType, setFit] = useState<'vertical-cover' | 'horizontal-cover'>('horizontal-cover')
  const [mediaDimensions, setMediaDimensions] = useState<{ width: number; height: number }>({ width: STATIC_WIDTH, height: STATIC_HEIGHT })
  const { width: containerWidth } = useWindowDimensions(64)
  const [dynamicWidth, setDynamicWidth] = useState<number>(STATIC_WIDTH)
  const [error, setError] = useState<boolean>(false)
  const classes = useStyles({ width: dynamicWidth })
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    return setUploading(false)
  }, [])

  useEffect(() => {
    setDynamicWidth(containerWidth > STATIC_WIDTH ? STATIC_WIDTH : containerWidth)
  }, [containerWidth])

  const MAX_SIZE = 1048576 * 2 //1MB * 2 = 2MB
  const dropZoneConfig = {
    accept: 'image/jpeg, image/jpg, image/png, image/gif',
    onDrop: (files: any) => handleChange(files),
    maxSize: MAX_SIZE,
  }
  const { getRootProps, getInputProps, fileRejections } = useDropzone(dropZoneConfig)

  useEffect(() => {
    if (fileRejections.length > 0) {
      setError(fileRejections.length > 0 && fileRejections[0].file.size > MAX_SIZE)
      setErrorMessage(i18n.t('common:messages.file_size_2mb_limit'))
    } else {
      setError(false)
      setErrorMessage('')
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
          const w = img.naturalWidth || img.width
          const h = img.naturalHeight || img.height
          setMediaDimensions(calculateDimensionsThumbStream(w, h, dynamicWidth, STATIC_HEIGHT))
          if (h >= w) {
            setFit('horizontal-cover')
          } else if (w > h) {
            setFit('vertical-cover')
          }
          if (w >= MIN_WIDTH) {
            setFile(reader.result)
            setError(false)
            setErrorMessage('')
          } else {
            setError(true)
            setErrorMessage(i18n.t('common:messages.file_size_2mb_limit'))
          }
        }
        // setFile(reader.result)
      }
      reader.readAsDataURL(f)
    }
  }

  const reset = () => {
    setFile(null)
    setRawFile(null)
    setCroppedAreaPixels(null)
    setZoom(null)
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

  return (
    <ESDialog open={true} title={i18n.t('common:profile.update_image')} handleClose={cancel} bkColor={'#2C2C2C'} alignTop={true}>
      <Box className={classes.container}>
        <Typography className={classes.title}>{i18n.t('common:profile.update_image')}</Typography>
        {error && (
          <Typography color="secondary" className={classes.warning}>
            {errorMessage}
          </Typography>
        )}
        <Box className={classes.cropContainer}>
          {file ? (
            <Cropper
              image={file}
              crop={crop}
              zoom={zoom}
              objectFit={fitType}
              // aspect={ratio || 4 / 1}
              aspect={ratio || 16 / 9}
              style={{
                containerStyle: { width: dynamicWidth, height: STATIC_HEIGHT, position: 'relative' },
                mediaStyle: {
                  width: mediaDimensions.width,
                  height: mediaDimensions.height,
                  position: 'relative',
                },
              }}
              showGrid={false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          ) : (
            <div className={classes.imageContainer}>
              {src ? <img src={src} className={classes.image} /> : <Image height="148" width="116" src="/images/big_logo.png" />}
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
          <ButtonPrimary round gradient={false} onClick={cancel}>
            {i18n.t('common:common.cancel')}
          </ButtonPrimary>
          <ButtonPrimary round onClick={update} style={{ marginLeft: 20 }} disabled={file === null || rawFile === null}>
            {i18n.t('common:button.use')}
          </ButtonPrimary>
        </Box>
        <Box className={classes.linkContainer}>
          <Link className={file === null || rawFile === null ? classes.linkDisabled : classes.link} onClick={reset}>
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

StreamCoverSelector.defaultProps = {
  ratio: null,
}

export default StreamCoverSelector

export interface StyleProps {
  width: number
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
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
    zIndex: 20,
  },
  imageContainer: {
    display: 'flex',
    width: ({ width }) => width,
    height: STATIC_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  [theme.breakpoints.down(768)]: {
    cropContainer: {
      height: ({ width }) => width,
      display: 'flex',
      alignItems: 'center',
    },
    imageContainer: {
      height: ({ width }) => width,
    },
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
}))
