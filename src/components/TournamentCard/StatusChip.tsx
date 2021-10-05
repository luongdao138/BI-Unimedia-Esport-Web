import { Chip, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

interface StatusChipProps {
  label: string
  color?: 'white' | 'black'
}

const StatusChip: React.FC<StatusChipProps> = ({ label, color = 'white' }) => {
  const classes = useStyles()
  return (
    <Chip
      className={color === 'white' ? classes.chipSecondary : classes.chipPrimary}
      size="small"
      variant="outlined"
      label={
        <Box color={color === 'white' ? '#545454' : '#B6B5B7'} justifyContent="flex-start" className={classes.label}>
          <Typography variant="overline">{label}</Typography>
        </Box>
      }
    />
  )
}

export default StatusChip

const useStyles = makeStyles(() => ({
  chipPrimary: {
    minWidth: 64,
    height: 17,
    backgroundColor: Colors.black_opacity[70],
    borderRadius: 4,
    border: `0.2px solid ${Colors.grey[300]}`,
  },
  chipSecondary: {
    minWidth: 64,
    height: 17,
    backgroundColor: Colors.white_opacity[87],
    borderRadius: 4,
    borderColor: Colors.grey[350],
    borderWidth: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 8,
  },
}))
