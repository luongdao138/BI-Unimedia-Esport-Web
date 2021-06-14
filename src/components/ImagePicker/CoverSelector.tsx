import { useState, useCallback, useEffect } from 'react'
import { Box, Typography, Slider } from '@material-ui/core'
import getCroppedImg from './Partials/cropImage'
import ESDialog from '@components/Dialog'
import ESButton from '@components/Button'
import Avatar from '@components/Avatar'
import { useDropzone } from 'react-dropzone'
import Cropper from 'react-easy-crop'
import { CameraAlt as Camera } from '@material-ui/icons'
import ESLoader from '@components/Loader'
import { makeStyles } from '@material-ui/core/styles'

interface CoverSelectorProps {
  src?: string
  cancel: () => void
  onUpdate: (file: File, blob: any) => void
}

const WH = 200

const CoverSelector: React.FC<CoverSelectorProps> = ({ src, cancel, onUpdate }) => {
  const classes = useStyles()
  const [rawFile, setRawFile] = useState<null | File>(null)
  const [file, setFile] = useState<any>(null)
  const [fileLocation, setFileLocation] = useState<string | null>(null)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [zoom, setZoom] = useState<number>(1)
  const [uploading, setUploading] = useState<boolean>(false)
  const [mediaDimensions, setMediaDimensions] = useState<{ width: number; height: number }>({ width: WH, height: WH })
  const [fitType, setFit] = useState<'contain' | 'vertical-cover' | 'horizontal-cover'>('contain')

  useEffect(() => {
    return setUploading(false)
  }, [])

  useEffect(() => {
    setFileLocation(src)
  }, [src])

  const dropZoneConfig = {
    accept: 'image/*',
    onDrop: (files: any) => handleChange(files),
  }
  const { getRootProps, getInputProps } = useDropzone(dropZoneConfig)

  const calcDimensions = (width: number, height: number) => {
    let h = height,
      w = width
    if (w <= h && w < WH) {
      const gap = WH / w
      w = WH
      h = h * gap
    } else if (h < w && h < WH) {
      const gap = WH / h
      h = WH
      w = w * gap
    } else if (h > WH && w > WH) {
      let gap = 0
      if (h > w) {
        gap = w / WH
        w = WH
        h = h / gap
      } else {
        gap = h / WH
        h = WH
        w = w / gap
      }
    }
    setMediaDimensions({ height: h, width: w })
    // console.log('AvatarSelector.tsx 61 height: ' + height + ' width: ' + width)
    // console.log('AvatarSelector.tsx 61 h: ' + h + ' w: ' + w)
  }

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
          calcDimensions(width, height)
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
    setFileLocation(src)
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
    <ESDialog open={true} title={'Avatar Selector'} handleClose={cancel} bkColor={'#2C2C2C'} alignTop={true}>
      <Box className={classes.container}>
        <Typography className={classes.title}>{'Select Avatar'}</Typography>
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
              <Avatar className={classes.avatar} src={fileLocation ?? '/images/avatar.png'} />
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
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(_, zoom) => setZoom(typeof zoom === 'object' ? zoom[0] : zoom)}
            />
          </Box>
        ) : null}
        <Typography className={classes.description}>{'test test test test test test test'}</Typography>
        <Box>
          <ESButton onClick={update} variant="outlined" size="medium" round>
            UPDATE
          </ESButton>
          <ESButton onClick={cancel} variant="outlined" size="medium" round>
            CANCEL
          </ESButton>
          <ESButton onClick={reset} variant="outlined" size="medium" round>
            RESET
          </ESButton>
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

export default CoverSelector

const useStyles = makeStyles(() => ({
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
    position: 'relative',
    display: 'flex',
    height: WH,
    width: WH,
  },
  controls: {
    width: '50%',
    margin: 20,
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
    position: 'absolute',
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
