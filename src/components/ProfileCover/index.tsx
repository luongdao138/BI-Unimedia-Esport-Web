import { useEffect, useState, BaseSyntheticEvent } from 'react'
import { makeStyles } from '@material-ui/core'
import { CameraAlt as Camera } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  root: {
    display: 'inline-block',
  },
  dropAreaThumb: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  touch: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
    '&:hover $camera': {
      display: 'flex',
    },
    '&:hover $backdrop': {
      display: 'flex',
    },
  },
  camera: {
    display: 'none',
    position: 'absolute',
    color: '#fff',
    bottom: 30,
    right: 30,
    zIndex: 2,
  },
  backdrop: {
    display: 'none',
    opacity: 0.6,
    background: '#000',
    position: 'absolute',
    height: '65%',
    width: '100%',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  input: {
    display: 'none',
  },
}))

const ProfileCover: React.FC<{ src: string; onChange?: (files: File) => void }> = (props) => {
  const classes = useStyles(props)
  const [value, setValue] = useState<string | ArrayBuffer>('')

  useEffect(() => {
    setValue(props.src)
  }, [props.src])

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setValue(URL.createObjectURL(e.dataTransfer.files[0]))
  }
  const handleChange = (e: BaseSyntheticEvent) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    if (file) {
      if (props.onChange) {
        props.onChange(file)
      }
      reader.readAsDataURL(file)
    }
    reader.addEventListener(
      'load',
      () => {
        setValue(reader.result)
      },
      false
    )
  }
  return (
    <div
      className={classes.root}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDrag(e)}
      onDragLeave={(e) => handleDragOut(e)}
      onDragEnter={(e) => handleDragEnter(e)}
    >
      {
        <label htmlFor="cover-img-upload" className={classes.touch}>
          <input type="file" id="cover-img-upload" accept="image/*" onChange={handleChange} className={classes.input} />

          <img src={value.toString()} className={classes.dropAreaThumb} />
          <Camera fontSize="large" className={classes.camera} />
          <div className={classes.backdrop} />
        </label>
      }
    </div>
  )
}

export default ProfileCover
