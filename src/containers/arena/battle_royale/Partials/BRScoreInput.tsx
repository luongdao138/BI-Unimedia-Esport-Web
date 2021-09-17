import ESInput from '@components/Input'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

interface BRScoreInputProps {
  index: string
  score?: string | null
  editable?: boolean
  onChange?: (score: string) => void
  onClick?: () => void
  clickable?: boolean
}
const BRScoreInput: React.FC<BRScoreInputProps> = (props: BRScoreInputProps) => {
  const classes = useStyles()
  const handleChange = (e) => {
    props.onChange(e.target.value.replace(/[^0-9.]/g, ''))
  }
  return (
    <div className={classes.scoreWrap}>
      <ESInput placeholder="未入力" value={props.score} onChange={handleChange} />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  scoreWrap: {
    width: 158,
    transform: 'translate(0,-50%)',
    '& .MuiOutlinedInput-root': {
      borderRadius: 5,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderWidth: 0,
    },
    '& .PrivateNotchedOutline-root-23': {
      borderWidth: '0',
    },
    '& .MuiInputBase-input::placeholder': {
      textAlign: 'center',
      fontSize: 20,
      color: Colors.white_opacity[30],
    },
    '& .MuiInputBase-input': {
      textAlign: 'center',
      fontSize: 20,
      color: Colors.white,
      fontWeight: 'bolder',
    },
    '& .MuiOutlinedInput-input': {
      padding: '19.5px 4px',
    },
    '& .MuiOutlinedInput-inputMarginDense': {
      paddingTop: 4.5,
      paddingBottom: 4.5,
    },
    '& .Mui-disabled': {
      backgroundColor: Colors.black,
    },
  },
}))

export default BRScoreInput
