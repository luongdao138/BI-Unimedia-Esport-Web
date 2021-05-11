import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Colors } from '@theme/colors'

const useStyles = makeStyles(() => ({
  rowContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
  countContainer: {
    marginLeft: 8,
    marginRight: 10,
  },
  count: {
    fontWeight: 'bold',
    color: Colors.white,
  },
}))

interface TagsProps {
  text: String
  count: number
}

const Followers: React.FC<TagsProps> = ({ text, count }) => {
  const classes = useStyles()
  return (
    <Box display="flex" className={classes.rowContainer}>
      <Typography>{text}</Typography>
      <Box display="flex" className={classes.countContainer}>
        <Typography className={classes.count}>{count}</Typography>
        <Typography>人</Typography>
      </Box>
    </Box>
  )
}

export default Followers
