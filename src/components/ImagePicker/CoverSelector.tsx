import { useState, useEffect } from 'react'
import { Theme, Dialog, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useWindowDimensions } from '@utils/hooks/useWindowDimensions'

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
  const classes = useStyles({ width: dynamicWidth })

  useEffect(() => {
    setDynamicWidth(containerWidth > STATIC_WIDTH ? STATIC_WIDTH : containerWidth)
  }, [containerWidth])

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
      {/* <div
        style={{ width: '100%', height: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
      >
        GGGG
        <Grid style={{ backgroundColor: 'yellow', height: 400, width: 50 }}></Grid>
        <Grid style={{ backgroundColor: 'black', height: 400, width: 50 }}></Grid>
        <Grid style={{ backgroundColor: 'blue', height: 400, width: 50 }}></Grid>
        <Grid style={{ backgroundColor: 'green', height: 400, width: 50 }}></Grid>
        <Grid style={{ backgroundColor: 'red', height: 400, width: 50 }}></Grid>
      </div> */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {/* <div className={classes.centerContent}> */}
        <Box style={{ backgroundColor: 'yellow', height: 400, width: 50 }}></Box>
        <Box style={{ backgroundColor: 'black', height: 400, width: 50 }}></Box>
        <Box style={{ backgroundColor: 'blue', height: 400, width: 50 }}></Box>
        <Box style={{ backgroundColor: 'green', height: 400, width: 50 }}></Box>
        <Box style={{ backgroundColor: 'red', height: 400, width: 50 }}></Box>
        {/* </div> */}
      </div>
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
    // display: 'flex',
    width: '100%',
    height: '100%',
    display: 'inline',
    float: 'none',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'gray',
  },

  centerContent: {
    marginLeft: 'auto',
    marginRight: 'auto',

    // position: 'absolute',
    // left: 0,
    // right: 0,
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
