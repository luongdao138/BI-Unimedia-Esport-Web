import { InputAdornment, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { isMobile } from 'react-device-detect'

export type LimitedProps = {
  value?: string
  limit?: string | number
  multiLines?: boolean
  isScroll?: boolean
}

const ESCharacterLimited: React.FC<LimitedProps> = ({ value, limit, multiLines, isScroll }) => {
  const classes = useStyles()
  const styleTextNormal = {
    alignSelf: 'center',
  }
  const styleTextMultiline = {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: isMobile ? 8 : isScroll ? 32 : 8,
    bottom: 16,
  }

  return (
    <InputAdornment position="end" style={multiLines ? styleTextMultiline : styleTextNormal}>
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
