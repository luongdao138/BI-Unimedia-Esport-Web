import ESInput from '@components/Input'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

interface BRScoreInputProps {
  value: string | number | null
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
      <ESInput placeholder="未入力" value={props.value} onChange={handleChange} />
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
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 5,
    },
  },
}))

export default BRScoreInput
