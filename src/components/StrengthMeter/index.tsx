import { Colors } from '@theme/colors'
import { Box, LinearProgress } from '@material-ui/core'
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'

const useStyles = makeStyles(() => ({
  strengthWrap: { display: 'flex' },
}))
const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 6,
      borderRadius: 2,
      width: 80,
      marginRight: theme.spacing(1),
    },
    colorPrimary: {
      backgroundColor: Colors.white_opacity[30],
    },
    bar: {
      borderRadius: 2,
      backgroundColor: Colors.green,
    },
  })
)(LinearProgress)

const ESStrengthMeter: React.FC<{ value: number }> = ({ value }) => {
  const classes = useStyles()
  const [percentages, setPercentages] = useState<number[]>([0, 0, 0])

  const getPartPercentage = (value: number) => {
    const ary = [0, 0, 0]
    const part = 3
    const fill = (value * part) / 100
    for (let i = 0; i < part; i++) {
      if (i < Math.floor(fill)) {
        ary[i] = 100
      } else {
        ary[i] = Math.ceil((fill - Math.floor(fill)) * 100)
        break
      }
    }
    return ary
  }

  useEffect(() => {
    if (value) {
      setPercentages(getPartPercentage(value))
    }
  }, [value])

  return (
    <Box className={classes.strengthWrap}>
      <BorderLinearProgress variant="determinate" value={percentages[0]} />
      <BorderLinearProgress variant="determinate" value={percentages[1]} />
      <BorderLinearProgress variant="determinate" value={percentages[2]} />
    </Box>
  )
}

ESStrengthMeter.defaultProps = {
  value: 0,
}
export default ESStrengthMeter
