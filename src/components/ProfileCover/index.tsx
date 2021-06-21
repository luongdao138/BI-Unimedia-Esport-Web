import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Image from 'next/image'
import { CameraAlt as Camera } from '@material-ui/icons'
import CoverSelector from '@components/ImagePicker/CoverSelector'
// import ESLoader from '@components/Loader'
// import { useDropzone } from 'react-dropzone'
import { Colors } from '@theme/colors'

type ProfileCoverProps = {
  editable?: boolean
  src: string
  onChange?: (file: File, blob: any) => void
}

const ProfileCover: React.FC<ProfileCoverProps> = ({ editable, src, onChange }) => {
  const classes = useStyles()
  const [setCover, toggleSetCover] = useState<boolean>(false)
  const [drag, setDrag] = useState<boolean>(false)
  // const dropZoneConfig = {
  //   accept: 'image/*',
  //   onDrop: (files: any) => handleChange(files),
  // }
  // const { getRootProps, getInputProps } = useDropzone(dropZoneConfig)

  useEffect(() => {
    toggleSetCover(false)
  }, [src])

  // const handleChange = (files: Array<File>) => {
  //   // setUpdate(true)
  //   setDrag(false)
  //   const file = files[0]
  //   const reader = new FileReader()
  //   if (file) {
  //     if (onChange) {
  //       onChange(file)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  return (
    // <div className={classes.root}>
    // {src ? (
    //   <img src={src} className={classes.image} />
    // ) : (
    //   <Image height="148" width="116" src="/images/big_logo.png" className={classes.defaultBackground} />
    // )}
    //   {editable ? (
    //     <>
    //       {drag && !update ? <Camera fontSize="small" className={classes.camera} /> : null}
    //       {drag || update ? <div className={classes.backdrop} /> : null}
    //       <div
    //         {...getRootProps()}
    //         className={classes.dropZone}
    //         onMouseEnter={() => {
    //           if (!update) setDrag(true)
    //         }}
    //         onMouseLeave={() => setDrag(false)}
    //         onDragEnter={() => {
    //           if (!update) setDrag(true)
    //         }}
    //         onDragLeave={() => setDrag(false)}
    //       >
    //         <input {...getInputProps()} />
    //       </div>
    //       {update ? (
    //         <Box className={classes.loader}>
    //           <ESLoader />
    //         </Box>
    //       ) : null}
    //     </>
    //   ) : null}
    // </div>

    <div className={classes.root}>
      {src ? (
        <img src={src} className={classes.image} />
      ) : (
        <Image height="148" width="116" src="/images/big_logo.png" className={classes.defaultBackground} />
      )}
      {editable ? (
        <label htmlFor="cover-upload" onClick={() => toggleSetCover(true)}>
          {drag ? <div className={classes.backdrop} /> : null}
          {drag ? <Camera fontSize="small" className={classes.camera} /> : null}
          <div
            className={classes.dropZone}
            onMouseEnter={() => setDrag(true)}
            onMouseLeave={() => setDrag(false)}
            onDragEnter={() => setDrag(true)}
            onDragLeave={() => setDrag(false)}
          ></div>
        </label>
      ) : null}
      {setCover ? (
        <CoverSelector src={src} cancel={() => toggleSetCover(false)} onUpdate={(file: File, blob: any) => onChange(file, blob)} />
      ) : null}
    </div>
  )
}

export default ProfileCover

const COVER_HEIGHT = 188
const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    background:
      'linear-gradient(234deg, rgb(214, 0, 253) 0%, rgb(252, 94, 102) 100%, rgb(251, 92, 105) 100%, rgb(253, 97, 97) 100%) 0% 0% no-repeat padding-box padding-box transparent',
    display: 'flex',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    width: '100%',
    height: COVER_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultBackground: {
    position: 'absolute',
    width: '100%',
    height: 'auto',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  backdrop: {
    opacity: 0.6,
    background: Colors.black,
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 4,
  },
  camera: {
    display: 'flex',
    position: 'absolute',
    right: 30,
    bottom: 30,
    zIndex: 5,
  },
  loader: {
    display: 'flex',
    position: 'absolute',
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropZone: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 6,
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))
