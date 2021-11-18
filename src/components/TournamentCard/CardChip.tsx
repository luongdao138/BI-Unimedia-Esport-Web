import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import ESChip from '@components/Chip'

interface ArenaCardChipProps {
  chipLabel: string
  value: string | number
  extra?: string | number
}

const ArenaCardChip: React.FC<ArenaCardChipProps> = ({ chipLabel, value, extra }) => {
  const classes = useStyles()
  return (
    <Box display="flex" flexDirection="row" mt={0.5} alignItems="center" color={Colors.white}>
      <ESChip
        className={classes.chip}
        size="small"
        label={
          <Box className={classes.chippedRowText}>
            <Typography variant="overline">{chipLabel}</Typography>
          </Box>
        }
      />
      <Box ml={1} color={Colors.white}>
        <Typography variant="caption" className={classes.chippedValue}>
          {`${value}`}
        </Typography>
      </Box>
      {extra ? (
        <Typography variant="caption" className={classes.chippedExtra}>
          &nbsp;{extra}
        </Typography>
      ) : null}
    </Box>
  )
}

export default ArenaCardChip

const useStyles = makeStyles((theme) => ({
  chip: {
    height: 15,
    backgroundColor: Colors.white_opacity[20],
    borderRadius: 2,
  },
  chippedRowText: {
    fontSize: 10,
    marginTop: 2,
    color: Colors.white,
  },
  chippedValue: {
    fontSize: 12,
  },
  chippedExtra: {
    fontSize: 12,
    wordBreak: 'keep-all',
  },
  [theme.breakpoints.up('lg')]: {
    chippedValue: {
      fontSize: 10,
    },
    chippedExtra: {
      fontSize: 10,
    },
  },
}))
