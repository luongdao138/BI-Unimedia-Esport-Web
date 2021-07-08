import { Box } from '@material-ui/core'
import ESChip from '@components/Chip'
import { makeStyles } from '@material-ui/core/styles'

interface TagsProps {
  items: Array<Feature> | null
}

type Feature = { id: number; feature: string }

const HeaderTags: React.FC<TagsProps> = ({ items }) => {
  const classes = useStyles()
  return (
    <Box display="flex" className={classes.tagContainer}>
      {items.length > 0 && items !== null
        ? items.map((item: Feature, i: number) => {
            return <ESChip key={i} className={classes.chip} label={item.feature} />
          })
        : null}
    </Box>
  )
}
export default HeaderTags

const useStyles = makeStyles(() => ({
  tagContainer: {
    marginTop: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
}))
