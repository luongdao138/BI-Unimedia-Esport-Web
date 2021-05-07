import { useEffect, useState, BaseSyntheticEvent } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core'
import { CameraAlt as Camera } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
  },
  avatar: (props: { size?: number }) => ({
    zIndex: 3,
    width: props.size,
    height: props.size,
  }),
  touch: (props: { size?: number }) => ({
    zIndex: 3,
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    width: props.size,
    height: props.size,
    borderRadius: '50%',
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
  }),
  camera: {
    display: 'none',
    position: 'absolute',
    zIndex: 5,
  },
  backdrop: {
    display: 'none',
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
    zIndex: 4,
  },
  input: {
    display: 'none',
  },
}))

const ESProfileAvatar: React.FC<{ editable?: boolean; size?: number; src: string; onChange?: (files: File) => void }> = (props) => {
  const classes = useStyles(props)
  const [value, setValue] = useState<string | ArrayBuffer>('')
  useEffect(() => {
    setValue(props.src)
  }, [props.src])
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
    <div className={classes.root}>
      {props.editable ? (
        <label htmlFor="cover-upload" className={classes.touch}>
          <input type="file" id="cover-upload" accept="image/*" onChange={handleChange} className={classes.input} />
          <Avatar className={classes.avatar} src={value.toString()} />
          <Camera fontSize="large" className={classes.camera} />
          <div className={classes.backdrop} />
        </label>
      ) : (
        <Avatar className={classes.avatar} src={props.src} />
      )}
    </div>
  )
}

ESProfileAvatar.defaultProps = {
  editable: false,
  size: 120,
}
export default ESProfileAvatar
