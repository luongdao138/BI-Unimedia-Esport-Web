import { Box, Typography, Icon } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

interface TagsProps {
  text: string
  icon: string
}

const Iconic: React.FC<TagsProps> = ({ text, icon }) => {
  const classes = useStyles()
  return (
    <Box display="flex" className={classes.rowContainer}>
      <Icon className={icon} style={{ marginRight: 5 }} fontSize="inherit" />
      <Typography>{text}</Typography>
    </Box>
  )
}

export default Iconic

const useStyles = makeStyles(() => ({
  rowContainer: {
    display: 'flex',
    marginTop: 8,
    marginRight: 20,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
}))
