import BRInput from './BRInput'
import { OutlinedInputProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const BRTimeInput: React.FC<OutlinedInputProps> = ({ ...props }) => {
  const classes = useStyles()
  return (
    <>
      <BRInput {...props} placeholder="時" />
      <span className={classes.colon}>:</span>
      <BRInput {...props} placeholder="分" />
      <span className={classes.colon}>:</span>
      <BRInput {...props} placeholder="秒" />
      <span className={classes.colon}>:</span>
      <BRInput {...props} placeholder="ミリ秒" />
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  colon: {
    fontSize: 15,
    marginLeft: theme.spacing(1 / 6),
    marginRight: theme.spacing(1 / 6),
  },
}))

export default BRTimeInput
