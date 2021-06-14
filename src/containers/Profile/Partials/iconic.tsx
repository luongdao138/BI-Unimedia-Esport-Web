import { Box, Typography, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  rowContainer: {
    marginTop: 8,
    marginRight: 20,
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
  },
}))

interface TagsProps {
  text: string
  icon: string
}

const Iconic: React.FC<TagsProps> = ({ text, icon }) => {
  const classes = useStyles()
  return (
    <Box display="flex" className={classes.rowContainer}>
      <Icon className={icon} fontSize="inherit" />
      <Typography className={classes.text}>{text}</Typography>
    </Box>
  )
}

export default Iconic
