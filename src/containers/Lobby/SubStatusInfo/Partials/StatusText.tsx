import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { Colors } from '@theme/colors'

interface Props {
  value: string
  isImportant?: boolean
}

const StatusText: React.FC<Props> = ({ value, isImportant }) => {
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="row">
      <Typography className={`${classes.roundInfoText} ${isImportant && classes.yellow}`}>{value}</Typography>
    </Box>
  )
}

StatusText.defaultProps = {
  isImportant: false,
}

const useStyles = makeStyles((theme: Theme) => ({
  roundInfoText: {
    fontSize: 24,
    color: theme.palette.common.white,
    opacity: 0.7,
    fontWeight: 'bold',
  },
  yellow: {
    fontSize: 14,
    color: Colors.yellow,
    opacity: 1,
    fontWeight: 'normal',
  },
}))

export default StatusText
