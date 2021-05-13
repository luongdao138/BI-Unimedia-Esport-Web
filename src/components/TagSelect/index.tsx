import { Box, Theme, makeStyles } from '@material-ui/core'
import ESChip from '@components/Chip'
import { UserFeaturesResponse } from '@services/settings.service'

interface Props {
  features: UserFeaturesResponse
  selectedFeatures: any[]
  onSelectChange: (selectedIds) => void
}

const TagSelect: React.FC<Props> = ({ selectedFeatures, features, onSelectChange }) => {
  const classes = useStyles()

  const checkIsSelected = (id: number) => selectedFeatures.find((feature) => feature.id === id)

  const handleSelect = (selectedFeature) => {
    const selectedId = parseInt(selectedFeature.id)
    const tempSelectedFeatures = selectedFeatures.concat()
    if (checkIsSelected(selectedId)) {
      const filtered = tempSelectedFeatures.filter((feature) => feature.id !== selectedId)
      onSelectChange(filtered)
    } else {
      tempSelectedFeatures.push({ id: selectedId, feature: selectedFeature.attributes.feature })
      onSelectChange(tempSelectedFeatures)
    }
  }

  return (
    <Box>
      {features.map((feature) => (
        <ESChip
          key={feature.id}
          className={classes.chipSpacing}
          label={feature.attributes.feature}
          onClick={() => handleSelect(feature)}
          color={checkIsSelected(parseInt(feature.id)) ? 'primary' : 'default'}
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
