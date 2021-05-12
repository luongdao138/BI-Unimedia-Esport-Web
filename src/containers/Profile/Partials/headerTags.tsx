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
  items: Array<Feature> | []
}

type Feature = { id: number; feature: string }

const HeaderTags: React.FC<TagsProps> = ({ items }) => {
  const classes = useStyles()
  return (
    <Box display="flex" className={classes.marginTop8}>
      {items.map((item: Feature, index: number) => {
        return (
          <Typography key={`key-${index}`} className={classes.marginRight}>
            #{item.feature}
          </Typography>
        )
      })}
    </Box>
  )
}

export default HeaderTags
