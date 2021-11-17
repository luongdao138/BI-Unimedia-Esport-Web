import { InputAdornment, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export type LimitedProps = {
  value?: string
  limit?: string | number
  multiLines?: boolean
}

const ESCharacterLimited: React.FC<LimitedProps> = ({ value, limit, multiLines }) => {
  const classes = useStyles()
  const styleText = {
    alignSelf: multiLines ? 'flex-end' : 'center',
  }
  return (
    <InputAdornment position="end" style={styleText}>
      <Typography className={classes.textLimit}>{`${value?.length} / ${limit}`}</Typography>
    </InputAdornment>
  )
}
const useStyles = makeStyles(() => ({
  textLimit: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#4D4D4D',
  },
}))

export default ESCharacterLimited
