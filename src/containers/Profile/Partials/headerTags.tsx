import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  marginTop8: {
    marginTop: 8,
  },
  marginRight: {
    marginRight: 8,
  },
}))

interface TagsProps {
  items: Array<String>
}

const HeaderTags: React.FC<TagsProps> = ({ items }) => {
  const classes = useStyles()
  return (
    <Box display="flex" className={classes.marginTop8}>
      {items.map((item) => {
        return <Typography className={classes.marginRight}>#{item}</Typography>
      })}
    </Box>
  )
}

export default HeaderTags
