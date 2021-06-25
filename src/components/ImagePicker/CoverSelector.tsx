import { useState, useCallback, useEffect } from 'react'
import { Box, Typography, Slider, Link } from '@material-ui/core'
import getCroppedImg from './Partials/cropImage'
import ESDialog from '@components/Dialog'
import ButtonPrimary from '@components/ButtonPrimary'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import Cropper from 'react-easy-crop'
import { CameraAlt as Camera, Crop169 as RectIcon } from '@material-ui/icons'
import ESLoader from '@components/Loader'
import i18n from '@locales/i18n'
// import { Colors } from '@theme/colors'
import { makeStyles, withStyles } from '@material-ui/core/styles'

interface CoverSelectorProps {
  src?: string
  cancel: () => void
  onUpdate: (file: File, blob: any) => void
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

const WIDTH = 600
const HEIGHT = 200

const CoverSelector: React.FC<CoverSelectorProps> = ({ src, cancel, onUpdate }) => {
  const classes = useStyles()
  const [rawFile, setRawFile] = useState<null | File>(null)
  const [file, setFile] = useState<any>(null)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [zoom, setZoom] = useState<number>(1)
  const [uploading, setUploading] = useState<boolean>(false)
  const [fitType, setFit] = useState<'contain' | 'vertical-cover' | 'horizontal-cover'>('contain')

  useEffect(() => {
    return setUploading(false)
  }, [])

  const dropZoneConfig = {
    accept: 'image/*',
    onDrop: (files: any) => handleChange(files),
  }
  const { getRootProps, getInputProps } = useDropzone(dropZoneConfig)

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
      const croppedImage = await getCroppedImg(file, croppedAreaPixels, rawFile.type)
      onUpdate(rawFile, croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  return (
    <ESDialog open={true} title={i18n.t('common:profile.update_image')} handleClose={cancel} bkColor={'#2C2C2C'} alignTop={true}>
      <Box className={classes.container}>
        <Typography className={classes.title}>{i18n.t('common:profile.update_image')}</Typography>
        <Box className={classes.cropContainer}>
          {file ? (
            <Cropper
              image={file}
              crop={crop}
              zoom={zoom}
              objectFit={fitType}
              aspect={4 / 1}
              style={{
                containerStyle: { width: 400, height: 300, position: 'relative' },
                mediaStyle: { width: 400, height: 200, position: 'relative' },
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
        <Link className={classes.link} onClick={reset}>
          {i18n.t('common:profile.reset')}
        </Link>

        {uploading ? (
          <Box className={classes.loader}>
            <ESLoader />
          </Box>
        ) : null}
      </Box>
    </ESDialog>
  )
}

export default CoverSelector

const useStyles = makeStyles(() => ({
  imageContainer: {
    display: 'flex',
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // backgroundColor: 'yellow',
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
  link: {
    color: '#FFFFFF30',
    '&:focus': {
      color: '#ffffff9c',
    },
    marginTop: 20,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  camera: {
    display: 'flex',
    position: 'absolute',
    zIndex: 50,
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rect: {
    color: '#FFFFFF30',
    marginRight: 10,
  },
  rect2: {
    color: '#FFFFFF30',
    marginLeft: 10,
  },
  //----------------------------
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: 400,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 40,
    marginBottom: 40,
  },
  description: {
    marginTop: 40,
    marginBottom: 120,
    maxWidth: 400,
  },
  cropContainer: {
    position: 'relative',
    display: 'flex',
    height: HEIGHT,
    width: WIDTH,
  },
  touch: {
    zIndex: 30,
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    height: HEIGHT,
    width: WIDTH,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  avatar: {
    zIndex: 30,
    height: HEIGHT,
    width: WIDTH,
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
    position: 'absolute',
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
