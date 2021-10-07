import ESInput from '@components/Input'
import { OutlinedInputProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

const BRInput: React.FC<OutlinedInputProps> = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.scoreWrap}>
      <ESInput {...props} />
    </div>
  )
}

export type ErrorType = {
  only_digit?: boolean
  time_attack_format_invalid?: boolean
  time_attack_max_exceeds?: boolean
  score_attack_format_invalid?: boolean
  score_attack_max_exceeds?: boolean
  placement_max_exceeds?: boolean
}

const useStyles = makeStyles(() => ({
  scoreWrap: {
    width: '100%',
    '& .MuiOutlinedInput-inputMarginDense': {
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 6,
      paddingBottom: 6,
      backgroundColor: Colors.white_opacity['10'],
      borderRadius: 5,
    },
    '& .MuiInputBase-input': {
      textAlign: 'center',
      '&::-webkit-input-placeholder': {
        fontSize: 11,
      },
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
    '& .MuiOutlinedInput-root .MuiInputBase-input.Mui-disabled': {
      paddingTop: '6px',
      paddingLeft: '2px',
      borderRadius: '5px',
      paddingRight: '2px',
      paddingBottom: '6px',
      backgroundColor: 'transparent',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 16,
    },
  },
}))

export default BRInput
