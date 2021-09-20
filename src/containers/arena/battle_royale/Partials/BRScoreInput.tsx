import ESInput from '@components/Input'
import { OutlinedInputProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

const BRScoreInput: React.FC<OutlinedInputProps> = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.scoreWrap}>
      <ESInput {...props} />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  scoreWrap: {
    width: '100%',
    '& .MuiOutlinedInput-inputMarginDense': {
      paddingTop: 6,
      paddingBottom: 6,
      backgroundColor: Colors.white_opacity['10'],
      borderRadius: 5,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 5,
    },

    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderWidth: 0,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-inputMarginDense': {
      borderWidth: 0,
      backgroundColor: Colors.white_opacity['7'],
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderWidth: 0,
    },
  },
}))

export default BRScoreInput
