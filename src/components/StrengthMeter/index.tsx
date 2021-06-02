import { Colors } from '@theme/colors'
import { Box, LinearProgress } from '@material-ui/core'
import { createStyles, withStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 6,
      borderRadius: 2,
      width: 80,
      marginRight: theme.spacing(1),
      '&:nth-last-child(1)': {
        marginRight: 0,
      },
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
  const [percentages, setPercentages] = useState<number[]>([0, 0, 0])
  const classes = useStyles({ isFull: percentages[0] === 100 })

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
    setPercentages(getPartPercentage(value))
  }, [value])

  return (
    <Box width="50%" display="flex" justifyContent="flex-end">
      <LinearProgress variant="determinate" value={percentages[0]} classes={classes} />
      <BorderLinearProgress variant="determinate" value={percentages[1]} />
      <BorderLinearProgress variant="determinate" value={percentages[2]} />
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 6,
    borderRadius: 2,
    width: 80,
    marginRight: theme.spacing(1),
    '&:nth-last-child(1)': {
      marginRight: 0,
    },
  },
  colorPrimary: {
    backgroundColor: Colors.white_opacity[30],
  },
  bar: (props: { isFull: boolean }) => ({
    borderRadius: 2,
    backgroundColor: props.isFull ? Colors.green : Colors.primary,
  }),
}))

ESStrengthMeter.defaultProps = {
  value: 0,
}

export default ESStrengthMeter
