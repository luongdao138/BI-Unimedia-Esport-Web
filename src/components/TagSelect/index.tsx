import { Box, Theme, makeStyles } from '@material-ui/core'
import ESChip from '@components/Chip'
import { UserFeaturesResponse } from '@services/settings.service'

interface Props {
  features: UserFeaturesResponse
  selectedFeatures: string[]
  onSelect: (id: string) => void
}

const TagSelect: React.FC<Props> = (props) => {
  const { selectedFeatures, features } = props
  const classes = useStyles()
  const checkIsActive = (id: string) => !!selectedFeatures.find((selectedId) => selectedId === id)

  return (
    <Box marginTop={5}>
      {features.map((chip) => (
        <ESChip
          key={chip.id}
          className={classes.chipSpacing}
          label={chip.attributes.feature}
          onClick={() => props.onSelect(chip.id)}
          color={checkIsActive(chip.id) ? 'primary' : undefined}
        />
      ))}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  chipSpacing: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

export default TagSelect
