import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'
import Box from '@material-ui/core/Box'

interface detailProps {
  time?: number
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     background: '#212121',
//     padding: 8,
//   },
//   input: {
//     borderRadius: 24,
//     position: 'relative',
//     backgroundColor: theme.palette.grey[700],
//     border: 'none',
//     overflow: 'hidden',
//     width: '100%',
//     resize: 'none',
//     margin: 0,
//     flex: 1,
//     padding: 8,
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//   },
// }))

const Time: React.FC<detailProps> = (props) => {
  const { time } = props

  const hhmmss = (duration: number) => {
    if (duration < 0) return '00:00:00'
    const _duration = parseInt(duration.toString())
    const hrs = ~~(_duration / 3600)
    const mins = ~~((_duration % 3600) / 60)
    const secs = ~~_duration % 60

    // Output "01:01" or "04:03:59" or "123:03:59"
    let ret = ''
    ret += (hrs < 10 ? '0' : '') + +hrs + ':'
    ret += (mins < 10 ? '0' : '') + mins + ':'
    ret += (secs < 10 ? '0' : '') + secs
    return ret
  }

  return <Box style={{ color: Colors.grey[450], fontSize: 9 }}>{time && hhmmss(time)}</Box>
}
export default Time
