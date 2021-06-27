import { useState, useEffect, useCallback } from 'react'
import { Box, Theme, Slider, Link, Dialog } from '@material-ui/core'
// import ESDialog from '@components/Dialog'
import ButtonPrimary from '@components/ButtonPrimary'
import { Crop169 as RectIcon } from '@material-ui/icons'
import i18n from '@locales/i18n'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'

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
interface CoverSelectorProps {
  src?: string
  cancel: () => void
  onUpdate?: (file: File, blob: any) => void
}

const STATIC_WIDTH = 600
const STATIC_HEIGHT = 200

const CoverSelector: React.FC<CoverSelectorProps> = ({ cancel }) => {
  const { width: containerWidth } = useWindowDimensions(64)
  const [dynamicWidth, setDynamicWidth] = useState<number>(STATIC_WIDTH)
  const [zoom, setZoom] = useState<number>(1)
  // const [rawFile, setRawFile] = useState<null | File>(null)
  // const [file, setFile] = useState<any>(null)
  // const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [croppedAreaPixels] = useState(null)
  // const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const classes = useStyles({ width: dynamicWidth })

  useEffect(() => {
    setDynamicWidth(containerWidth > STATIC_WIDTH ? STATIC_WIDTH : containerWidth)
  }, [containerWidth])

  const reset = () => {
    // setFile(null)
    // setRawFile(null)
    // setCroppedAreaPixels(null)
    setZoom(null)
  }

  // const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
  //   setCroppedAreaPixels(croppedAreaPixels)
  // }, [])

  const update = useCallback(async () => {
    try {
      // setUploading(true)
      // const croppedImage = await getCroppedImg(file, croppedAreaPixels, rawFile.type)
      // onUpdate(rawFile, croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      aria-labelledby="Followers"
      open={true}
      onClose={cancel}
      disableBackdropClick
      BackdropProps={{
        classes: {
          root: classes.backDrop,
        },
        style: { backgroundColor: '#2C2C2C' },
        // children: fixedFooter ? fixedFooter : undefined,
      }}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      onEntered={() => {
        document.body.style.overflow = 'hidden'
      }}
    >
      <Box className={classes.container}>
        <Box className={classes.cropContainer}></Box>
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
        <Box className={classes.cropContainer}></Box>
        <Box>
          <ButtonPrimary round gradient={false} onClick={cancel}>
            {i18n.t('common:common.cancel')}
          </ButtonPrimary>
          <ButtonPrimary round onClick={update} style={{ marginLeft: 20 }}>
            {/* <ButtonPrimary round onClick={update} style={{ marginLeft: 20 }} disabled={file === null || rawFile === null}> */}
            {i18n.t('common:button.use')}
          </ButtonPrimary>
        </Box>
        <Link className={classes.link} onClick={reset}>
          {i18n.t('common:profile.reset')}
        </Link>
      </Box>
    </Dialog>
    // <ESDialog open={true} title={i18n.t('common:profile.update_image')} handleClose={cancel} bkColor={'#2C2C2C'} alignTop={true}>
    // </ESDialog>
  )
}

export default CoverSelector

export interface StyleProps {
  width: number
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    // minHeight: 400,
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  title: {
    marginTop: 40,
    marginBottom: 40,
  },
  description: {
    marginTop: 40,
    marginBottom: 100,
    maxWidth: 400,
  },
  link: {
    color: '#FFFFFF30',
    '&:focus': {
      color: '#ffffff9c',
    },
    marginTop: 20,
    marginBottom: 20,
    cursor: 'pointer',
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
    backgroundColor: 'black',
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
    // position: 'relative',
    // display: 'flex',
    width: 200,
    // width: ({ width }) => width,
    backgroundColor: 'yellow',
    height: 400,
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
